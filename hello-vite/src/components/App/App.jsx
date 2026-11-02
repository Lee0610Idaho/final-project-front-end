import "./App.css";

import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { authorize, register, checkToken } from "../../utils/auth";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import SavedNews from "../SavedNews/SavedNews";
import SuccessPopup from "../SuccessPopup/SuccessPopup";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setActiveModal("login");
    setIsModalOpen(true);
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setIsModalOpen(false);
  };

  // Registration
  function handleRegistration({ email, password, username }) {
    setIsLoading(true);
    register(email, password, username)
      .then((res) => {
        console.log("Registration successful:", res);
        const userData = { name: username, email };
        localStorage.setItem("userData", JSON.stringify(userData));
        return authorize(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        setShowSuccess(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration or login failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // Login
  function handleLogin({ email, password }) {
    authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        return checkToken(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  }

  // Logout
  function handleLogout() {
    closeActiveModal();
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("jwt");
    navigate("/");
  }

  // Save article
  const handleSaveArticle = (article, keyword) => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];

    const isAlreadySaved = saved.some((a) => a.url === article.url);
    if (isAlreadySaved) return;

    const updatedSavedArticles = [...saved, { ...article, keyword }];

    localStorage.setItem("savedArticles", JSON.stringify(updatedSavedArticles));
    setSavedArticles(updatedSavedArticles);
  };

  // Delete article
  const handleDeleteArticle = (articleToDelete) => {
    const updatedArticles = savedArticles.filter(
      (article) => article.url !== articleToDelete.url,
    );
    setSavedArticles(updatedArticles);
    localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      checkToken(jwt)
        .then((userData) => {
          setCurrentUser(userData.data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token verification failed:", err);
        });
    }

    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(saved);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <div className="page__main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header
                    handleLoginClick={handleLoginClick}
                    handleRegisterClick={handleRegisterClick}
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    isModalOpen={isModalOpen}
                  />
                  <Main
                    handleRegisterClick={handleRegisterClick}
                    handleLoginClick={handleLoginClick}
                    articles={articles}
                    setArticles={setArticles}
                    handleLogout={handleLogout}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    handleSaveArticle={handleSaveArticle}
                    handleDeleteArticle={handleDeleteArticle}
                  />
                </>
              }
            />
            <Route
              isLoggedIn={isLoggedIn}
              path="/saved-news"
              element={
                <SavedNews
                  handleRegisterClick={handleRegisterClick}
                  handleLoginClick={handleLoginClick}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  handleLogout={handleLogout}
                  savedArticles={savedArticles}
                  handleDeleteArticle={handleDeleteArticle}
                />
              }
            />
          </Routes>
        </div>
        <Footer />
        <LoginModal
          activeModal={activeModal === "login"}
          closeActiveModal={closeActiveModal}
          handleRegisterClick={handleRegisterClick}
          handleLogin={handleLogin}
        />
        <RegisterModal
          activeModal={activeModal === "register"}
          closeActiveModal={closeActiveModal}
          handleLoginClick={handleLoginClick}
          handleRegistration={handleRegistration}
        />

        {showSuccess && (
          <SuccessPopup
            onClose={() => {
              setShowSuccess(false);
              closeActiveModal();
            }}
            handleLoginClick={handleLoginClick}
          />
        )}
      </div>
    </div>
  );
}

export default App;

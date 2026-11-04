import "./Main.css";

import React, { useState } from "react";
import Navigation from "../Navigation/Navigation";
import NewsCard from "../NewsCard/NewsCard";
import AboutAuthor from "../About/About";
import Preloader from "../Preloader/Preloader";
import NotFound from "../../assets/Not-found.svg";

function Main({
  articles,
  setArticles,
  isLoggedIn,
  handleSaveArticle,
  handleDeleteArticle,
}) {
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [newsError, setNewsError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [visibleCount, setVisibleCount] = useState(3);
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <main className="main">
      <section className="main__search-section">
        <Navigation
          setArticles={setArticles}
          articles={articles}
          setLoading={setLoading}
          setSearchError={setSearchError}
          setHasSearched={setHasSearched}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </section>
      {loading && <Preloader />}
      {!loading && articles.length > 0 && (
        <section className="news">
          <div className="news__content">
            <h2 className="news__title">Search results</h2>
            <ul className="cards">
              {visibleArticles.map((article, index) => (
                <NewsCard
                  key={index}
                  article={article}
                  isLoggedIn={isLoggedIn}
                  handleSaveArticle={handleSaveArticle}
                  keyword={searchText}
                  handleDeleteArticle={handleDeleteArticle}
                />
              ))}
            </ul>
            {visibleCount < articles.length && (
              <button onClick={handleShowMore} className="news__button">
                Show more
              </button>
            )}
          </div>
        </section>
      )}

      {!loading &&
        hasSearched &&
        articles.length === 0 &&
        !searchError &&
        !newsError && (
          <div className="main__not-found">
            <div className="main__not-found-box">
              <img
                src={NotFound}
                alt="not found"
                className="main__not-found-img"
              />
              <p className="main__not-found-title">Nothing found.</p>
              <p className="main__not-found-desc">
                Sorry, but nothing matched your search terms
              </p>
            </div>
          </div>
        )}

      {!loading && hasSearched && (searchError || newsError) && (
        <div className="main__error">
          <p className="main__error-message">
            Sorry, something went wrong during the request. Please try again
            later.
          </p>
        </div>
      )}

      <AboutAuthor />
    </main>
  );
}

export default Main;

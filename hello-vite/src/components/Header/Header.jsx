import "./Header.css";
import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import Logout from "../../assets/logout-white.svg";

function Header({
  handleLoginClick,
  handleLogout,
  isLoggedIn,
  currentUser,
  isModalOpen,
}) {
  const location = useLocation();
  const isSavedPage = location.pathname === "/saved-news";
  const theme = isSavedPage ? "dark" : "light";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header header_theme_${theme}`}>
      <div className="header__content">
        <NavLink to="/" className={`header__logo header__logo_theme_${theme}`}>
          NewsExplorer
        </NavLink>

        {/* Desktop Nav */}
        <nav className="header__nav" aria-label="Main navigation">
          <ul className="header__nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `header__link header__link_theme_${theme} ${
                    isActive ? "header__link_active" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>

            {isLoggedIn && currentUser && (
              <li>
                <NavLink
                  to="/saved-news"
                  className={({ isActive }) =>
                    `header__link header__link_theme_${theme} ${
                      isActive ? "header__link_active" : ""
                    }`
                  }
                >
                  Saved news
                </NavLink>
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <button
                  type="button"
                  className={`header__auth header__auth_theme_${theme}`}
                  onClick={handleLoginClick}
                >
                  Sign in
                </button>
              </li>
            )}
            {isLoggedIn && currentUser && (
              <li>
                <button
                  type="button"
                  className={`header__logout-btn header__logout-btn_theme_${theme}`}
                  onClick={handleLogout}
                >
                  <p
                    className={`header__username header__username_theme_${theme}`}
                  >
                    {currentUser.name}
                  </p>
                  <img
                    src={Logout}
                    alt="logout"
                    className={`header__logout-img header__logout-img_theme_${theme}`}
                  />
                </button>
              </li>
            )}
          </ul>
        </nav>

        {/* Hamburger Icon */}
        {/* Hamburger Icon */}
        <button
          className={`header__hamburger ${
            isModalOpen ? "header__hamburger_hidden" : ""
          }`}
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <span
            className={`header__hamburger-line header__hamburger-line_theme_${theme}`}
          />
          <span
            className={`header__hamburger-line header__hamburger-line_theme_${theme}`}
          />
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="header__overlay">
            <div
              className={`header__mobile-menu header__mobile-menu_theme_${theme}`}
            >
              <div className="header__mobile-top">
                <NavLink
                  to="/"
                  className={`header__logo header__logo_theme_${theme}`}
                  onClick={closeMenu}
                >
                  NewsExplorer
                </NavLink>
                <button
                  className="header__close-button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                >
                  ✕
                </button>
              </div>
              <NavLink
                to="/"
                className={`header__link header__link_theme_${theme}`}
                onClick={closeMenu}
              >
                Home
              </NavLink>
              {isLoggedIn && currentUser && (
                <NavLink
                  to="/saved-news"
                  className={`header__link header__link_theme_${theme}`}
                  onClick={closeMenu}
                >
                  Saved news
                </NavLink>
              )}
              {!isLoggedIn && (
                <button
                  type="button"
                  className={`header__auth header__auth_theme_${theme}`}
                  onClick={() => {
                    handleLoginClick();
                    closeMenu();
                  }}
                >
                  Sign in
                </button>
              )}
              {isLoggedIn && currentUser && (
                <button
                  type="button"
                  className={`header__logout-btn header__logout-btn_theme_${theme}`}
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                >
                  <p className="header__username">{currentUser.name}</p>
                  <img
                    src={Logout}
                    alt="logout"
                    className="header__logout-img"
                  />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;

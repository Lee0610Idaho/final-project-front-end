import "./Footer.css";
import Git from "../../assets/github.svg";
import LinkedIn from "../../assets/LinkedIn.svg";
import { Link, NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__content">© 2024 Supersite, Powered by News API</p>
      <nav className="footer__nav" aria-label="Footer navigation">
        <ul className="footer__nav-list">
          <li>
            <NavLink
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="footer__link"
            >
              Home
            </NavLink>
          </li>
          <li>
            <Link
              to="https://tripleten.com/"
              className="footer__link"
              rel="noopener noreferrer"
              target="_blank"
            >
              TripleTen
            </Link>
          </li>
        </ul>

        <ul className="footer__social-list">
          <li>
            <Link
              to="https://github.com/Lee0610Idaho"
              className="footer__git"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={Git} alt="GitHub" className="footer_git" />
            </Link>
          </li>
          <li>
            <Link
              to="https://www.linkedin.com/school/tripleten/home/"
              className="footer__lkin"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img src={LinkedIn} alt="LinkedIn" className="footer_lkin" />
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;

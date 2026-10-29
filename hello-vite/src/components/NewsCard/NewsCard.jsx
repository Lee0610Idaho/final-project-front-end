import "./NewsCard.css";
import { useState } from "react";
import SaveImage from "../../assets/SaveHover.svg";
import SavedImage from "../../assets/SavedImage.svg";
import Delete from "../../assets/Delete.svg";

function NewsCard({
  article,
  isLoggedIn,
  handleSaveArticle,
  handleDeleteArticle,
  keyword,
  isSavedNewsPage = false,
}) {
  if (!article) return null;
  const {
    title,
    description,
    publishedAt,
    urlToImage,
    source,
    keyword: articleKeyword,
  } = article;

  const [showTooltip, setShowTooltip] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveClick = () => {
    if (!isLoggedIn) return;
    setIsSaved((prev) => !prev);
    if (!isSaved) {
      handleSaveArticle(article, keyword);
    }
  };

  const handleMouseEnter = () => {
    if (!isLoggedIn) {
      setShowTooltip(true);
    }
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <li className="card">
      <div className="card__image-wrapper">
        <img
          src={urlToImage || "https://via.placeholder.com/150"}
          alt={title}
          className="card__image"
        />

        {isSavedNewsPage && (
          <p className="card__keyword">{keyword || articleKeyword}</p>
        )}

        {isSavedNewsPage ? (
          <button
            className="news__card-save-btn"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleDeleteArticle(article)}
          >
            <img src={Delete} alt="delete" className="news__card-save" />
          </button>
        ) : (
          <button
            className={`news__card-save-btn ${
              isLoggedIn ? "" : "news-card__save-btn_disabled"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleSaveClick}
          >
            <img
              src={isSaved ? SavedImage : SaveImage}
              alt="save"
              className="news__card-save"
            />
          </button>
        )}

        {showTooltip && (
          <div className="news-card__tooltip">
            {isSavedNewsPage ? "Remove from saved" : "Sign in to save articles"}
          </div>
        )}
      </div>
      <div className="card__content">
        <p className="card__news-date">
          {new Date(publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h3 className="card__title">{title}</h3>
        <p className="card__description">{description}</p>
        <p className="card__signature">{source?.name || "Unknown source"}</p>
      </div>
    </li>
  );
}

export default NewsCard;

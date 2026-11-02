import "./SavedNews.css";
import Header from "../Header/Header";
import NewsCard from "../NewsCard/NewsCard";

export default function SavedNews({
  handleLoginClick,
  handleRegisterClick,
  handleLogout,
  isLoggedIn,
  currentUser,
  savedArticles = [],
  handleDeleteArticle,
}) {
  const keywords = [
    ...new Set(
      savedArticles
        .map((a) => a?.keyword)
        .filter((k) => typeof k === "string" && k.trim() !== ""),
    ),
  ];

  const formattedKeywords = () => {
    if (keywords.length === 0) return null;
    if (keywords.length <= 2) return keywords.join(", ");
    const firstTwo = keywords.slice(0, 2).join(", ");
    const othersCount = keywords.length - 2;
    return `${firstTwo}, and ${othersCount} other${othersCount > 1 ? "s" : ""}`;
  };

  console.log(">> Saved Artticles:", savedArticles);
  return (
    <section className="saved-news">
      <Header
        handleLoginClick={handleLoginClick}
        handleRegisterClick={handleRegisterClick}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
      />
      <div className="saved-news__content">
        <p className="saved-news__articles">Saved articles</p>
        <h1 className="saved-news__title">
          {currentUser
            ? `${currentUser.name}, you have ${savedArticles.length} saved ${
                savedArticles.length === 1 ? "article" : "articles"
              }`
            : "You have 0 saved articles"}
        </h1>
        {keywords.length > 0 && (
          <p className="saved-news__keyword">
            By keywords: {formattedKeywords()}
          </p>
        )}
      </div>

      {savedArticles.length > 0 ? (
        <ul className="saved-news__cards">
          {savedArticles.map((article) => (
            <NewsCard
              key={article.url}
              article={article}
              keyword={article.keyword || ""}
              isSavedNewsPage={true}
              handleDeleteArticle={handleDeleteArticle}
            />
          ))}
        </ul>
      ) : (
        <p className="saved-news__no-articles">No saved articles yet.</p>
      )}
    </section>
  );
}

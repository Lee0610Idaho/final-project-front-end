import "./Navigation.css";
import SearchForm from "../SearchForm/SearchForm";

export default function Navigation({
  setArticles,
  articles,
  setLoading,
  setHasSearched,
  setSearchError,
  searchText,
  setSearchText,
}) {
  return (
    <section className="navigation">
      <h1 className="navigation__title">{"What's"} going on in the world?</h1>
      <p className="navigation__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <SearchForm
        setArticles={setArticles}
        articles={articles}
        setLoading={setLoading}
        setSearchError={setSearchError}
        setHasSearched={setHasSearched}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </section>
  );
}

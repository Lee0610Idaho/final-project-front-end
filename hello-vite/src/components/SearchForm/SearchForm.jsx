import "./SearchForm.css";
import React, { useState } from "react";
import { getNews } from "../../utils/api";

function SearchForm({
  setArticles,
  setLoading,
  setSearchError,
  setHasSearched,
  searchText,
  setSearchText,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchText.trim()) {
      setSearchError("Please enter a keyword");
      return;
    }

    setSearchError("");
    setLoading(true);
    setHasSearched(true);

    try {
      const results = await getNews(searchText);
      setArticles(results);
    } catch (err) {
      console.error("Error fetching news:", err);
      setSearchError("Error printing news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar__container">
        <input
          className="search-bar__input"
          type="text"
          placeholder="Enter topic"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="search-bar__btn">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;

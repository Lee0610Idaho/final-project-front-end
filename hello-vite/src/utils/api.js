export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const mainApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://your-production-server.com"
    : "http://localhost:3001";

const NEWS_API_KEY = "f50f323a5b934931ba0d8e1feaf82916";

//Get news from API
export async function getNews(searchText) {
  const toDate = new Date().toISOString().split("T")[0];
  const fromDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const url = `${newsApiBaseUrl}?q=${encodeURIComponent(
    searchText,
  )}&from=${fromDate}&to=${toDate}&pageSize=100&apiKey=${NEWS_API_KEY}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data.articles) {
      console.error("API Error:", data);
      return [];
    }

    return data.articles;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export function saveArticle(article) {
  // article is a search result from the NewsAPI
  return new Promise((resolve) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
      url: article,
      title: article.title,
      imageUrl: article.imagUrl,
      keyword: article.keyword,
      text: article.description,
      date: article.publishedAt,
      source: article.source.name,
      link: article.url,
      image: article.urlToImage,
    });
  });
}

export function fetchSavedArticles() {
  return new Promise((resolve, reject) =>
    resolve([
      {
        _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
        url: article,
        title: article.title,
        imageUrl: article.imagUrl,
        keyword: article.keyword,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      },
    ]),
  );
}

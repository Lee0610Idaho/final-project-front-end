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

export async function saveArticle(article, token) {
  try {
    const response = await fetch(`${mainApiBaseUrl}/saved-news`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: article.keyword,
        title: article.title,
        text: article.description,
        date: article.publishedAt,
        source: article.source.name,
        link: article.url,
        image: article.urlToImage,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error saving article: ${response.status}`);
    }

    const savedArticle = await response.json();
    return savedArticle;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

//fetch previously saved articles
export async function fetchSavedArticles(token) {
  try {
    const response = await fetch(`${mainApiBaseUrl}/saved-news`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching saved articles: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

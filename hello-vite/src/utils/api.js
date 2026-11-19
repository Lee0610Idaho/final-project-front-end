export const newsApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export const mainApiBaseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.jleenewsapi.jumpingcrab.com"
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

function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(processResponse);
}
export function register(email, password, name) {
  return request(`${mainApiBaseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });
}

export function login(email, password) {
  return request(`${mainApiBaseUrl}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function getArticles(token) {
  return request(`${mainApiBaseUrl}/articles`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
}

export function deleteArticle(_articleId, token) {
  return request(`${mainApiBaseUrl}/articles/${_articleId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
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
  return new Promise((resolve) =>
    resolve([
      {
        //made up data
        _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
        //url: article,
        //title: article.title,
        //imageUrl: article.imagUrl,
        //keyword: article.keyword,
        //text: article.description,
        //date: article.publishedAt,
        //source: article.source.name,
        //link: article.url,
        //image: article.urlToImage,
      },
    ]),
  );
}

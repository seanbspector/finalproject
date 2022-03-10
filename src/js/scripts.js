import { getWithExpiry, setWithExpiry } from "./modules/localStorageHelpers.js";
import clickHandlers from "./modules/clickHandlers.js";

document.addEventListener("click", clickHandlers);

// deal with books

const key = "ykqdlBNRjsHIBnsqgxRYJ6Jdm9pUG3T6";
const booksAPI = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${key}`;
const booksStoragePrefix = "books-nyt-autosave";

function getStories() {
  const stories = getWithExpiry(booksStoragePrefix);
  if (!stories) {
    console.warn(" stories expired - fetching again ");
    fetch(booksAPI)
      .then((response) => response.json())
      .then((data) => showBooksData(data.results));
  } else {
    console.warn(" stories not expired - no fetching ");
    document.querySelector(".bookItems").innerHTML = stories;
  }
}

function showBooksData(books) {
  const bookDate = books.bestsellers_date;
  const looped = books.books
    .map(
      (book) => `
    <div class="item">
    <img src="${book.book_image ? book.book_image : ""}" />
    <h3><a href="${book.title}">${book.title}</a></h3>
    <h4><a href="${book.author}">${book.author}</a></h4>
    <figcaption>${book.description ? book.description : ""}</figcaption>
    </div>
  `
    )
    .join("");
  document.querySelector(".bookItems").innerHTML = looped;

  setWithExpiry(booksStoragePrefix, looped, 1000 * 60 * 10);
  console.log(bookDate);
}

if (document.querySelector(".books")) {
  getStories();
}

// deal with movies
const moviesAPI = `https://api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=${key}`;
const moviesStoragePrefix = "movies-nyt-autosave";

function getMovies() {
  const films = getWithExpiry(moviesStoragePrefix);
  if (!films) {
    console.warn(" films expired - fetching again ");
    fetch(moviesAPI)
      .then((response) => response.json())
      .then((data) => showMovieData(data.results));
  } else {
    console.warn(" films not expired - no fetching ");
    document.querySelector(".movieItems").innerHTML = films;
  }
}

function showMovieData(movies) {
  const looped = movies
    .map(
      (movie) =>
        `    <div class="item">
    <img src="${movie.multimedia ? movie.multimedia.src : ""}" />
    <h3><a href="${movie.headline}">${movie.headline}</a></h3>
    <figcaption>${movie.summary_short ? movie.summary_short : ""}</figcaption>
    </div>`
    )
    .join("");
  document.querySelector(".movieItems").innerHTML = looped;
  setWithExpiry(moviesStoragePrefix, looped, 1000 * 60 * 10);
}

if (document.querySelector(".movies")) {
  getMovies();
}

// deal with news
const newsAPI = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${key}`;
const newsStoragePrefix = "news-nyt-autosave";

function getNews() {
  const articles = getWithExpiry(newsStoragePrefix);
  if (!articles) {
    console.warn(" articles expired - no fetching");
    fetch(newsAPI)
      .then((response) => response.json())
      .then((data) => showNewsData(data.results));
  } else {
    console.warn(" articles not expired - no fetching");
    document.querySelector(".newsItems").innerHTML = articles;
  }
}

function showNewsData(newsArticles) {
  console.log(newsArticles);
  const looped = newsArticles
    .map(
      (newsArticle) =>
        `    <div class="item">
  <h3><a href="${newsArticle.title}">${newsArticle.title}</a></h3>
  <figcaption>${newsArticle.abstract ? newsArticle.abstract : ""}</figcaption>
  </div>`
    )
    .join("");
  document.querySelector(".newsItems").innerHTML = looped;
  setWithExpiry(newsStoragePrefix, looped, 1000 * 60 * 10);
}

if (document.querySelector(".news")) {
  getNews();
}

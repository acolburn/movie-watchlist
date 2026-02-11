const movieList = document.querySelector(".movie-list");
const searchButton = document.getElementById("search-button");
const formInput = document.getElementById("form-input");
let icons = document.querySelectorAll(".movies i");

// Retrieve watch list from local storage
let watchlistData = localStorage.getItem("watchList");
let watchList = JSON.parse(watchlistData) || [];

// No data to show upon initial load

movieList.innerHTML = '<img id="no-data-img" src="no-data-initial.png" />';

searchButton.addEventListener("click", searchButtonClick);
movieList.addEventListener("click", movieListClick);

function searchButtonClick(event) {
  event.preventDefault();
  fetch(`https://www.omdbapi.com/?s=${formInput.value}&apikey=12def47b`)
    .then((response) => response.json())
    .then(function (data) {
      movieList.innerHTML = makeMovieList(data.Search);
    });
}

function makeMovieList(movies) {
  let result = "";
  for (let movie of movies) {
    result += `<div class="movie">
  <div class="movie-image">
    <img src=${movie.Poster} width="100px" />
  </div>
  <div class="movie-info">
    <div class="movie-title-line">
      <div class="line-item"><b>${movie.Title}</b></div>
      <div class="line-item"><i class="fa-solid fa-circle-plus" name="${movie.Title}"></i> Watchlist</div>
    </div>
    <div class="movie-title-line">
      <div class="line-item">${movie.Year}</div>
      
    </div>
  </div>
</div>`;
  }
  return result;
}

function movieListClick(event) {
  // check if the clicked item is an icon
  if (event.target.classList.contains("fa-circle-plus")) {
    // access the icon's name property, which is a movie title
    const movieTitle = event.target.getAttribute("name");
    watchList.push(movieTitle);
  }
  // store watchList in local storage, as JSON
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

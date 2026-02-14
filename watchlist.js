const movieList = document.querySelector(".movie-list");
movieList.addEventListener("click", watchListClick);

// Next code block is for watchlist.html to display watchList
// Retrieve the array from local storage
const watchlistData = localStorage.getItem("watchList");
let movies = JSON.parse(watchlistData) || []; // Convert localStorage to an array, if there's data
if (movies) {
  makeMovieList(movies);
} else {
  movieList.innerHTML = "<h2>No items in watchlist.</h2>";
}

function makeMovieList(movies) {
  // movies is an array with only titles
  // need to convert titles -> movie objects
  movieList.innerHTML = ""; //clear screen to start

  for (let _movie of movies) {
    // search database for movie, by title
    fetch(`https://www.omdbapi.com/?t=${_movie}&apikey=12def47b`)
      .then((response) => {
        return response.json();
      })
      .then(function (movie) {
        movieList.innerHTML += `
        <div class="movie">
            <div class="movie-image">
                <img src="${movie.Poster}" width="100px" onerror="this.onerror=null;this.src='no-image-icon.jpg';" />

            </div>
            <div class="movie-info">
                <div class="movie-title-line">
                    <div class="line-item"><b>${movie.Title}</b></div>
                    <div class="line-item"><img src="icon.png">${movie.Ratings[0].Value}</div>
                    <div class="line-item"><i class="fa-solid fa-circle-minus" name="${movie.Title}"></i> Remove</div>
                </div>
                <div class="movie-title-line">
                    <div class="line-item">${movie.Runtime}</div>   
                    <div class="line-item">Genre: ${movie.Genre}</div>
                </div>
                <div class="movie-title-line">
                    ${movie.Plot}
                </div>
            </div>
        </div>`;
      });
  }
}

function watchListClick(event) {
  // check if the clicked item is an icon
  if (event.target.classList.contains("fa-circle-minus")) {
    // access the icon's name property, which is a movie title
    const movieTitle = event.target.getAttribute("name");
    // remove movie from watch list
    movies = movies.filter((item) => item !== movieTitle);
    // store revised watchList in local storage, as JSON
    localStorage.setItem("watchList", JSON.stringify(movies));
    // Remove the corresponding movie element from the DOM
    const movieElement = event.target.closest(".movie"); // Find the closest movie container
    if (movieElement) {
      movieElement.remove(); // Remove it from the DOM
    }
  }

  // refresh screen
  // makeMovieList(movies);
}

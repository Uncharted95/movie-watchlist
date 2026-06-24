const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
let watchlistedFilms = document.getElementById("watch-listed-films")

let html = ""

watchlist.forEach(movie => {
        html += `
                <div class="film">
                    <img src="${movie.Poster}" class="poster">
                    <div class="text-container">
                        <div class="title-row">
                            <h3>${movie.Title}</h3>
                            <p>${movie.imdbRating}</p>
                        </div>
                        <div class="info-row">
                            <p>${movie.Runtime}</p>
                            <p>${movie.Genre}</p>
                            <div class="watchlist-btn">
                            <button class="watchlist-btn-icon" onclick="addToWatchList('${movie.imdbID}')">
                            <img class="add add2" src="images/add.png">
                            </button>
                                <p class="watchlist">Watchlist</p>
                            </div>
                        </div>
                        <p>${movie.Plot}</p>
                    </div>
                </div>
                <hr class="solid">
                `
    })


watchlistedFilms.innerHTML = html
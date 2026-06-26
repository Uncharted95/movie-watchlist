let watchlistedFilms = document.getElementById("watch-listed-films")
const watchText = document.getElementById("watch-text")


function renderWatchlist(){
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
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
                            <button class="delete-btn-icon" onclick="deleteFromWatchlist('${movie.imdbID}')">
                            <img class="delete" src="images/delete.png">
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


if(watchlist.length > 0) {
    watchlistedFilms.innerHTML = html
    watchText.style.display = "none"
} else {
    watchText.style.display = "flex"
    watchlistedFilms.innerHTML = ""
}
}


function deleteFromWatchlist(id){
    console.log("deleting", id)
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== id)
    localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist))
    renderWatchlist()
}

renderWatchlist()
const btn = document.getElementById("button")
let films = document.getElementById("films")
const filmIcon = document.querySelector('.film-icon')
const notFound = document.getElementById("not-found")
let movies = []

async function movieTitles() {
    const movieTitle = document.querySelector('input[type="search"]').value
    const res = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=864dce8a`)
    const data = await res.json()

    if (data.Response === "False") {
        notFound.style.display = "flex"
        films.innerHTML = ""
        filmIcon.style.display = "none"
        return
    }

    movies = await Promise.all(
        data.Search.map(movie =>
            fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=864dce8a`)
            .then(res => res.json())
        )
    )

    renderFilmlist()
}

function renderFilmlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    let html = ""

    movies.forEach(movie => {
        const isOnWatchlist = watchlist.some(w => w.imdbID === movie.imdbID)

        let btnIcon
        let btnLabel

        if (isOnWatchlist) {
            btnIcon = `<img class="add" src="images/check.png">`
            btnLabel = "Added"
        } else {
            btnIcon = `<img class="add" src="images/add.png">`
            btnLabel = "Watchlist"
        }

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
                                ${btnIcon}
                            </button>
                            <p class="watchlist">${btnLabel}</p>
                        </div>
                    </div>
                    <p>${movie.Plot}</p>
                </div>
            </div>
            <hr class="solid">
        `
    })

    filmIcon.style.display = "none"
    notFound.style.display = "none"
    films.innerHTML = html
}

function addToWatchList(id) {
    const movie = movies.find(movie => movie.imdbID === id)
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    watchlist.push(movie)
    localStorage.setItem("watchlist", JSON.stringify(watchlist))

    renderFilmlist()
}

btn.addEventListener("click", movieTitles)
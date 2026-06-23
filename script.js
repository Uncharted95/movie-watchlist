const btn = document.getElementById("button")
let films = document.getElementById("films")
const filmIcon = document.querySelector('.film-icon')

async function movieTitles(){
    const movieTitle = document.querySelector('input[type="search"]').value
    const res = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=864dce8a`)
    const data = await res.json()
    
const movies = await Promise.all(
    data.Search.map(movie => 
        fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=864dce8a`)
        .then(res => res.json())
    )
)

let html = ""

movies.forEach(movie => {
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
                    </div>
                    <p>${movie.Plot}</p>
                </div>
            </div>
            `
})

if(data.Response === "True") {
    filmIcon.style.display = "none"
    films.innerHTML = html
} else {
    filmIcon.style.display = "flex"
    films.innerHTML = ""
}

}

btn.addEventListener("click", movieTitles)


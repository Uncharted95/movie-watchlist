const btn = document.getElementById("button")
let films = document.getElementById("films")

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
                <h3>${movie.Title}</h3>
                <p>${movie.imdbRating}</p>
                <p>${movie.Runtime}</p>
                <p>${movie.Genre}</p>
                <p>${movie.Plot}</p>
            </div>
        </div>
    `
})

films.innerHTML = html

}

btn.addEventListener("click", movieTitles)


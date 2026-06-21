const btn = document.getElementById("button")
let films = document.getElementById("films")

async function movieTitles(){
    const movieTitle = document.querySelector('input[type="search"]').value
    const res = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=864dce8a`)
    const data = await res.json()

    films.innerHTML = `
    <img src=${data.Poster} class="film">
    `

}



btn.addEventListener("click", movieTitles)


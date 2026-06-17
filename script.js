const movieTitle = document.querySelector('input[type="search"]').value;

async function movieTitles(){
    const res = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=864dce8a`)
    const data = await res.json()
    console.log(data)
}


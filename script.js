const API_KEY  = "YOUR_APIKEY"

let page = 1;

const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`
const API_IMAGE_URL = "https://image.tmdb.org/t/p/w1280"
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`

async function getmovies(url) {
    const res = await fetch(url);
    const data = await res.json()
    showmovies(data.results)
}

function updatePage() {
    getmovies(API_URL())
    currentPage.innerHTML = page
}

function nextPage() {
    if(page >=1){
        page += 1;
        updatePage();
    }
}

function prevPage() {
    if(page > 1){
        page -= 1;
        updatePage();
    }
}

next.addEventListener("click", () =>{
    nextPage()
})

prev.addEventListener("click", () =>{
    prevPage()
})
function showmovies(movies) {
    moviesElement.innerHTML = ''
    movies.forEach(movie => {
        const { title, poster_path, overview, popularity, vote_average } = movie
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie")

        movieCard.innerHTML = `
            <img src="${API_IMAGE_URL + poster_path}" alt="Movflix Images" />
            <div class="detail">
                <h3>${title}</h3>
                <p>${overview.substring(0, 100)}...</p>
                <p>Popularity: ${popularity}%</p>
                <p>Vote Average: ${vote_average}/10</p>
            </div>
            `
        moviesElement.appendChild(movieCard)
    });
}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const searchQuery = search.value

    if (searchQuery !== '') {
        getmovies(API_SEARCH_URL + searchQuery)
        search.value = ''
    }
})

updatePage()

title.addEventListener("click", () => {
    location.reload()
})

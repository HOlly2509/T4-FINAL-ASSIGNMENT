const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


fetch(API_URL)
    .then(response => response.json())
    .then(data => displayMovies(data.results));

function displayMovies(movies) {
    const availableMovies = document.getElementById('available-movies');
    availableMovies.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="movie-description">
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <button onclick="addToWatchlist('${movie.title}', '${movie.poster_path}', '${movie.overview}')">Add to Watchlist</button>
            </div>
        `;

        availableMovies.appendChild(movieCard);
    });
}

function addToWatchlist(title, posterPath, overview) {
    const watchlist = document.getElementById('watchlist');

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${IMG_URL + posterPath}" alt="${title}">
        <div class="movie-description">
            <h1>${title}</h1>
            <p>${overview}</p>
            <button onclick="removeFromWatchlist(this.parentElement.parentElement)">Remove from Watchlist</button>
        </div>
    `;

    watchlist.appendChild(movieCard);
    showPopup(`${title} has been added to your watchlist!`);
}

function removeFromWatchlist(movieCardElement) {
    movieCardElement.remove();
}

function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3000); 
}



fetch(API_URL)
    .then(response => response.json())
    .then(data => displayMovies(data.results));

function displayMovies(movies) {
    const availableMovies = document.getElementById('available-movies');
    availableMovies.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${IMG_URL + movie.poster_path}" alt="${movie.title}">
            <div class="movie-description">
                <h1>${movie.title}</h1>
                <p>${movie.overview}</p>
                <button onclick="addToWatchlist('${movie.title}', '${movie.poster_path}', '${movie.overview}')">Add to Watchlist</button>
            </div>
        `;

        availableMovies.appendChild(movieCard);
    });
}

function addToWatchlist(title, posterPath, overview) {
    const watchlist = document.getElementById('watchlist');

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `
        <img src="${IMG_URL + posterPath}" alt="${title}">
        <div class="movie-description">
            <h1>${title}</h1>
            <p>${overview}</p>
            <button onclick="removeFromWatchlist(this.parentElement.parentElement)">Remove from Watchlist</button>
        </div>
    `;

    watchlist.appendChild(movieCard);

    document.addEventListener('DOMContentLoaded', function () {
        let watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
        const watchlistContainer = document.getElementById('watchlist-movies'); // Updated ID
    
        watchlistMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
    
            movieCard.innerHTML = `
                <img src="${IMG_URL + movie.posterPath}" alt="${movie.title}">
                <div class="movie-description">
                    <h1>${movie.title}</h1>
                    <p>${movie.overview}</p>
                    <button onclick="removeFromWatchlist(this.parentElement.parentElement)">Remove from Watchlist</button>
                </div>
            `;
    
            watchlistContainer.appendChild(movieCard);
        });
    });
    
    function removeFromWatchlist(movieCardElement) {
        movieCardElement.remove();
    
        const title = movieCardElement.querySelector('.movie-description h1').textContent;
        let watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies')) || [];
        watchlistMovies = watchlistMovies.filter(movie => movie.title !== title);
        localStorage.setItem('watchlistMovies', JSON.stringify(watchlistMovies));
    }
}    
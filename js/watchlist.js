document.addEventListener("DOMContentLoaded", function () {
    const watchlistContainer = document.getElementById('watchlist-container');
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = "<p>Your watchlist is empty.</p>";
    } else {
        watchlistContainer.innerHTML = ''; // Clears any existing content, also need to find a way how to use local storage or cache
        
        watchlist.forEach(movie => {
            const movieEl = document.createElement('div');
            movieEl.classList.add('movie-watchlist-item');
            movieEl.innerHTML = `
                <h3>${movie.title}</h3>
                <img src="${movie.poster}" alt="${movie.title}" />
            `;
            watchlistContainer.appendChild(movieEl);
        });
    }
});

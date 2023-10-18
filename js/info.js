document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1cf50e6248dc270629e802686245c2c8`) 
        .then(response => response.json())
        .then(data => {
            // Populate movie details
            document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById('movieTitle').textContent = data.title;
            document.getElementById('director').textContent = 'Director Name'; // Add code to get director name
            document.getElementById('actors').textContent = 'Actor 1, Actor 2'; // Add code to get actors
            document.getElementById('viewerRating').textContent = data.vote_average;
            document.getElementById('synopsis').textContent = data.overview;
            document.getElementById('boxOffice').textContent = 'Box Office Amount'; // Add code to get box office amount

            // Display trailer (if available)
            if (data.videos.results.length > 0) {
                const trailerElement = document.getElementById('trailer');
                const trailerKey = data.videos.results[0].key;
                trailerElement.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
                `;
            }
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function () {
    // Add an event listener for the "Add to Watchlist" button
    const addToWatchListButton = document.querySelector('.addToWatchList');
    addToWatchListButton.addEventListener('click', addToWatchList);

    function addToWatchList() {
        // Get the movie details
        const movieTitle = document.getElementById('movieTitle').textContent;
        const moviePoster = document.querySelector('.fast').src;

        // Store the movie in local storage
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist.push({ title: movieTitle, poster: moviePoster });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }
});

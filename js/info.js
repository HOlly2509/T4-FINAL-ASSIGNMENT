document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1cf50e6248dc270629e802686245c2c8`) 
        .then(response => response.json())
        .then(data => {
            //  movie details
            document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById('movieTitle').textContent = data.title;
            document.getElementById('director').textContent = 'Director Name'; 
            document.getElementById('viewerRating').textContent = data.vote_average;
            document.getElementById('synopsis').textContent = data.overview;


            
            if (data.videos.results.length > 0) {
                const trailerElement = document.getElementById('trailer');
                const trailerKey = data.videos.results[0].key;
                trailerElement.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${trailerKey}" frameborder="0" allowfullscreen></iframe>
                `;
            }

            // Fetch actors information
            const settings = {
                async: true,
                crossDomain: true,
                url: 'https://moviesdatabase.p.rapidapi.com/actors',
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5a6726da9fmsh81d0287a06b3491p101e62jsnef7b61c73c4e',
                    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
                }
            };

            $.ajax(settings).done(function (response) {
                const actors = response.actors.map(actor => actor.name).join(', ');
                document.getElementById('actors').textContent = actors;
            });
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

        // Show the notification
        showNotification('Movie added to watchlist successfully!');
    }
});

function showNotification(message) {
    const notificationElement = document.getElementById('notification');
    notificationElement.innerText = message;
    notificationElement.classList.add('show');

    setTimeout(() => {
        notificationElement.classList.remove('show');
        notificationElement.innerText = 'Movie added to watchlist successfully!';
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('.back');

    backButton.addEventListener('click', function() {
        window.location.href = 'movies.html';
    });
});

test( 'fetch movie trailer by TMDB ID', async t => {

	t.plan( 2 )

	const trailer = await movieTrailer( null, { tmdbId: '507089' } )

	t.is( trailer.indexOf( 'http' ), 0, 'returns a url' )
	t.not( trailer.indexOf( 'youtube' ), -1, 'returns a youtube url' )

} )



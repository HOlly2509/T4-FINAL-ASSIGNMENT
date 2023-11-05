const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const movieSlider = document.getElementById('movie-slider');
const dynamicImage = document.getElementById('dynamic-image');

let imageIndex = 0;
let imagesArray = [];


fetch(API_URL)
    .then(response => response.json())
    .then(data => {
        const movies = data.results;
        movies.forEach(movie => {
            const img = document.createElement('img');
            img.src = IMG_URL + movie.poster_path;
            movieSlider.appendChild(img);
            imagesArray.push(IMG_URL + movie.poster_path);
        });

        
        dynamicImage.src = imagesArray[imageIndex];
        setInterval(() => {
            imageIndex = (imageIndex + 1) % imagesArray.length; 
            dynamicImage.src = imagesArray[imageIndex];
        }, 2000);
    })
    .catch(error => console.error('Error fetching movies:', error));
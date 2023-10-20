const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY;

const genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
    
  ]

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

var currentPage = 1;
var totalPages = 2;  

var selectedGenre = [];

setGenre();

function setGenre() {
    tagsEl.innerHTML = '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tags');
        t.id = genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if (selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            } else {
                if (selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if (id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    });
                } else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection();
        });
        tagsEl.append(t);
    });
}

// ... (existing code)

const yearSlider = document.getElementById('year');
const yearValue = document.getElementById('yearValue');
const imdbSlider = document.getElementById('imdb');
const imdbValue = document.getElementById('imdbValue');

yearSlider.addEventListener('input', function() {
    yearValue.innerText = this.value;
    filterMovies();
});

imdbSlider.addEventListener('input', function() {
    imdbValue.innerText = this.value;
    filterMovies();
});

function filterMovies() {
    const selectedYear = yearSlider.value;
    const selectedImdb = imdbSlider.value;

    console.log(`Selected Year: ${selectedYear}, Selected IMDB: ${selectedImdb}`);

    // ... (rest of the filtering logic)



    const filteredMovies = data.results.filter(movie => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear == selectedYear && movie.vote_average >= selectedImdb;
    });

    showMovies(filteredMovies);
}

// ... (rest of your code)


function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    });
    clearBtn();
    if (selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        });
    }
}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight');
    } else {
        let clear = document.createElement('div');
        clear.classList.add('tag', 'highlight');
        clear.id = 'clear';
        clear.innerHTML = '<span>&#10006;</span> Clear';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();
            getMovies(API_URL);
        });
        tagsEl.append(clear);
    }
}


getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if (data.results.length !== 0) {
            showMovies(data.results);
            currentPage = data.page;
            totalPages = 2;  

            current.innerText = currentPage;

            if (currentPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            } else if (currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            } else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }

            tagsEl.scrollIntoView({ behavior: 'smooth' });

        } else {
            main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
        }

    });

}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
      const { title, poster_path, vote_average, overview, id } = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
           <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">

          <div class="movie-info">
              <h3>${title}</h3>
              <span class="${getColor(vote_average)}">${vote_average}</span>
          </div>

          <div class="overview">
              <h3>Overview</h3>
              ${overview}
              <div class="buttons">
                  <button class="addToWatchList">Add to watchlist</button>
                  <button class="viewMore" data-id="${id}">View more</button>
              </div>
          </div>
      `;

      main.appendChild(movieEl);
  });




  //INFO PAGE//


 // Add event listener for "View more" buttons
const viewMoreButtons = document.querySelectorAll('.viewMore');
viewMoreButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        const movieId = event.target.dataset.id;
        window.location.href = `info.html?id=${movieId}`;
    });
});

function getColor(vote) {
    // (Your existing getColor function code here...)
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre = [];
    setGenre();
    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm);
    } else {
        getMovies(API_URL);
    }
});

prev.addEventListener('click', () => {
    if (currentPage > 1) {
        getMovies(API_URL + '&page=' + (currentPage - 1) + '&with_genres=' + encodeURI(selectedGenre.join(',')));
    }
});

next.addEventListener('click', () => {
    if (currentPage < totalPages) {
        getMovies(API_URL + '&page=' + (currentPage + 1) + '&with_genres=' + encodeURI(selectedGenre.join(',')));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get('id');

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1cf50e6248dc270629e802686245c2c8`)
        .then(response => response.json())
        .then(data => {
            // Populate movie details
            document.getElementById('movieTitle').textContent = data.title;
            document.getElementById('director').textContent = data.director;
            document.getElementById('actors').textContent = data.actors.join(', ');
            document.getElementById('viewerRating').textContent = data.vote_average;
            document.getElementById('synopsis').textContent = data.overview;
            document.getElementById('boxOffice').textContent = data.box_office;

            // Display trailer (if available)
            if (data.trailer) {
                const trailerElement = document.getElementById('trailer');
                trailerElement.innerHTML = `
                    <iframe width="560" height="315" src="${data.trailer}" frameborder="0" allowfullscreen></iframe>
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
}

document.addEventListener('DOMContentLoaded', function () {
    const backButton = document.querySelector('.back');

    backButton.addEventListener('click', function() {
        window.location.href = 'movies.html';
    });
});








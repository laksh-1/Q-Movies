console.log('index.jss');
// http://www.omdbapi.com/?i=tt3896198&apikey=d7c10188

let searchMovie = document.getElementById('searchMovie');
let searchQuery = document.getElementById('searchQuery');
let movieResults = document.getElementById('movieResults');
searchMovie.addEventListener('click', () => {
    console.log(searchQuery.value);

    fetch(`http://www.omdbapi.com/?s=${searchQuery.value}&apikey=d7c10188`)
        .then(
            response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                return response.json();
            }
        )
        .then(
            data => {
                console.log(data.Search);
                let html = ``;
                if (data.Search == undefined) {
                    let html = `<h1 class="text-center">Sorry, no results found..!!`;
                    movieResults.innerHTML = html;
                }
                else {
                    data.Search.forEach(element => {
                        let imageLink = element.Poster;
                        if (element.Poster == "N/A") {
                            imageLink = "img/img_not_found.png";
                        }
                        html += `
                    <div class="card mb-3 w-75 mx-auto">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                        <img src="${imageLink}" class="card-img" alt="${element.Title}">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title"><a onclick="showDetails('${element.Title}')" class="stretched-link">${element.Title}</a></h5>
                          <p class="card-text">Release Year: ${element.Year}</p>
                          <p class="card-text"><small class="text-muted">IMDB Id: ${element.imdbID}</small></p>
                        </div>
                      </div>
                    </div>
                  </div>
                    `
                    });
                    movieResults.innerHTML = html;
                }
            }
        )
    event.preventDefault();
})

function showDetails(title) {
    console.log('anchor onclick', title);
    fetch(`http://www.omdbapi.com/?t=${title}&apikey=d7c10188`)
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            data => {
                console.log(data);
                let imageLink = data.Poster;
                if (data.Poster == "N/A") {
                    imageLink = "img/img_not_found.png";
                }
                let html = `
                <div class="card mb-3">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${imageLink}" class="card-img" alt="${data.Title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h2 class="card-title">${data.Title}</h2>
                            <p class="card-text"><b>Genre:</b> ${data.Genre}</p>
                            <p class="card-text"><b>Release Date:</b> ${data.Released}</p>
                            <p class="card-text"><b>Language:</b> ${data.Language}</p>
                            <p class="card-text"><b>Duration:</b> ${data.Runtime}</p>
                            <p class="card-text"><b>Director:</b> ${data.Director}</p>
                            <p class="card-text"><b>Writer:</b> ${data.Writer}</p>
                            <p class="card-text"><b>Awards:</b> ${data.Awards}</p>
                            <p class="card-text"><b>Plot:</b> ${data.Plot}</p>
                            <p class="card-text"><b>IMDB Rating:</b> ${data.imdbRating}</p>
                            <p class="card-text"><b>${data.Ratings[0].Source}:</b> ${data.Ratings[0].Value}</p>
                        </div>
                    </div>
                </div>
            </div>
            `;

                movieResults.innerHTML = html;
            }
        )
}
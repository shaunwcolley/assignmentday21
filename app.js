let cinematicBatman = document.getElementById("cinematicBatman")
let movieDetailsDiv = document.getElementById("movieDetailsDiv")

let batmenURL = "http://www.omdbapi.com/?s=Batman&page=1&apikey=42af2ed9"
let request = new XMLHttpRequest()
request.open("GET", batmenURL)
request.send()
request.onload = function() {
  let batmenMovies = JSON.parse(request.responseText).Search
  thumbnailGenerator(batmenMovies)

  let nameButton = document.getElementsByClassName("nameButton")
  for(let i = 0; i < nameButton.length; i++) {
    nameButton[i].addEventListener('click', function(){
      let movieDescription = batmenMovies.filter(function(movie) {
        if(movie.Title == batmenMovies[i].Title) {
        return movie
        }
      })
      let movieId = movieDescription[0].imdbID
      let detailsURL = `http://www.omdbapi.com/?i=${movieId}&apikey=42af2ed9`
      let oneRequest = new XMLHttpRequest()
      oneRequest.open("GET", detailsURL)
      oneRequest.send()
      oneRequest.onload = function() {
        let batmanMovie = JSON.parse(oneRequest.responseText)
        let movieDetails = `<img src="${movieDescription[0].Poster}"/>
                            <h2>Name: ${movieDescription[0].Title}</h2>
                            <p>Year: ${movieDescription[0].Year}</p>
                            <p>Rated: ${batmanMovie.Rated}</p>
                            <p>Released: ${batmanMovie.Released}</p>
                            <p>Director: ${batmanMovie.Director}</p>`
        movieDetailsDiv.innerHTML = movieDetails
      }
    })
  }
}

function thumbnailGenerator(movieArray){
  let movieButtons = movieArray.map(function(movie) {
    return `<div>
            <img class="thumbnailImage" src="${movie.Poster}/>"
            </div>
            <div>
            <button class="nameButton">${movie.Title}</button>
            </div>`
  })
  cinematicBatman.innerHTML = movieButtons.join("")
}

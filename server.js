const express = require('express');
const app = express();
const request = require('request');
const fs = require('fs');
const writeJsonFile = require('write-json-file');
const port = process.argv[2] || 8080;
const ejs = require('ejs');
const readLineSync = require('readline-sync')

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

/*Getting IPI*/

let options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=9acd257183931f2a1400fb3f205de85a',
  body: '{}' };

request(options, (error, response, body) => {
    if (error) {
        error;
    } else {
        fs.writeFile('listMovies.json', body, (err) => {
            if(err) {
            console.log(err)
            return;
        } 
    })
    }
    console.log('write something');
});

/* Getting info from JSON file*/
let jsonContent;
function setMovie () {
    

    fs.readFile('listMovies.json', 'utf8', (err, data) => { 
        if(err) {
            console.log(err)
            return
        } else {
    
     jsonContent = JSON.parse(data);
        }
    })
}
setMovie ()

/* Stablishing endpoints*/
app.get('/', (req, res) => {
    res.render('pages/index', {
        movies: jsonContent
    });   
})

app.get('/movie/:id', (req, res) => {
    let movieId = req.params.id
    console.log(req.params.id)
    res.render('pages/movie', {
        movies: jsonContent,
        movieId
    });   
});

app.get("/search", (req, res, next) => {
    let searchName = req.query.searchTerm;
    
	let resultsFilter = jsonContent.results;
        const moviesResult = resultsFilter.filter(movie => {
            return movie.original_title.toLowerCase().includes(searchName.toLowerCase());
            console.log(movies);
          });
          res.render("pages/search", {
            movies: moviesResult,
          });
    })


/*Port*/

app.listen(port, () => {
    console.log(`Server started on http://localhost: ${port}`);
    console.log('Press CTRL + C to stop server');
})

/*Sample Data*/
function getMoviesSingle() {
    return {
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',  
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong'
    }
}
function getMovies() {
    return [{
        title: 'Blade Runner',
        year: '1982',
        rated: 'R',
        released: '25 June 1982',
        runtime: '1h 57min',  
        genre: 'Sci-Fi, Thriller',
        director: 'Ridley Scott',
        writer: 'Hampton Fancher, David Peoples',
        actors: 'Harrison Ford, Rutger Hauer, Sean Young, Edward James Olmos',
        plot: 'A blade runner must pursue and try to terminate four replicants who stole a ship in space and have returned to Earth to find their creator.',
        language: 'English',
        country: 'USA, Hong Kong'
    },
    {
        title: 'Avengers: Infinity War',
        year: '2018',
        rated: 'R',
        released: '27 April 2018',
        runtime: '2h 29min',  
        genre: 'Sci-Fi, Action, Adventure, Fantasy',
        director: 'Anthony Russo, Joe Russo',
        writer: 'Christopher Markus, Stephen McFeely',
        actors: ' Karen Gillan, Elizabeth Olsen, Tom Holland',
        plot: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
        language: 'English',
        country: 'USA' 
    },
    {
        title: 'Kings',
        year: '2017',
        rated: 'R',
        released: '27 April 2018',
        runtime: '1h 32min',  
        genre: 'Crime, Drama, Romance, Thriller',
        director: 'Deniz Gamze Ergüven',
        writer: 'Deniz Gamze Ergüven',
        actors: 'Halle Berry, Daniel Craig, Lamar Johnson',
        plot: 'The life of a foster family in South Central Los Angeles, a few weeks before the city erupts in violence following the verdict of the Rodney King trial.',
        language: 'English',
        country: 'USA'
    },
    {
        title: 'Let the Sunshine In',
        year: '2017',
        rated: 'R',
        released: '27 September 2017',
        runtime: '1h 34min',  
        genre: 'Comedy, Drama, Romance',
        director: 'Claire Denis',
        writer: 'Christine Angot, Claire Denis, Roland Barthes',
        actors: 'Juliette Binoche, Xavier Beauvois, Philippe Katerine',
        plot: 'Isabelle, Parisian artist, divorced mother, is looking for love, true love at last.',
        language: 'French',
        country: 'French, Belgium'
    },
    {
        title: 'I Can Only Imagine',
        year: '2018',
        rated: 'R',
        released: '16 March 2018',
        runtime: '1h 50min',  
        genre: 'Drama, Family',
        director: 'Andrew Erwin, Jon Erwin',
        writer: 'Alex Cramer, Jon Erwin, Brent McCorkle ',
        actors: 'Dennis Quaid, J. Michael Finley, Brody Rose',
        plot: 'The inspiring and unknown true story behind MercyMe\'s beloved, chart topping song that brings ultimate hope to so many is a gripping reminder of the power of true forgiveness.',
        language: 'English',
        country: 'USA'
    }]
}
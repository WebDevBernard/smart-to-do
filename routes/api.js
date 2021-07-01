// where all the api calls are stored
const axios = require("axios");
require("dotenv").config();

// omdb api (to watch) call
const movieCat = function(queryText) {
  const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${queryText}`;
  
  return axios
    .get(url)
    .then((response) => {
      if (response.data["imdbID"]) {
        return response.data["imdbID"];
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
};

// yelp api (to eat) call

// google books api (to read) call
const getBooks = function(queryText) {
  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${queryText}&key=${process.env.BOOKS_KEY}`
    )
    .then((response) => {
      if (response.data.items[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]) {
        return response.data.items[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
      }
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

// amazon api (to buy) call

module.exports = { movieCat, getBooks };

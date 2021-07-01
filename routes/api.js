// where all the api calls are stored
const axios = require("axios");
require("dotenv").config();
// omdb api (to watch) call
const movieCat = async function(queryText) {
  const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&t=${queryText}`;
  let res = await axios
    .get(url)
    .then((response) => {
      if (response.data["imdbID"]) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(res)
    return res;
    
};
// yelp api (to eat) call
// google books api (to read) call
const getBooks = async function(queryText) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${queryText}&key=${process.env.BOOKS_KEY}`;
  let res = await axios
    .get(url)
    .then((response) => {
      if (response.data.items[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]) {
        // return response.data.items[0]["volumeInfo"]["industryIdentifiers"][0]["identifier"];
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
    return res;
};

module.exports = { movieCat, getBooks };

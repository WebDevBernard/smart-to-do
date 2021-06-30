// where all the api calls are stored
const axios = require("axios");
require('dotenv').config();

// omdb api call
const movieCat = function (queryText) {
  const oKey = process.env.OMDB_KEY;
  return axios
    .get(`http://www.omdbapi.com/?apikey=${oKey}&t=${queryText}`)
    .then((response) => {
      if (response.data["imdbID"]) {
        return true;
      }
    });
};

// yelp api call

// google books api call


module.exports = { movieCat };

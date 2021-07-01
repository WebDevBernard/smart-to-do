// where all the api calls are stored
const axios = require("axios");
require('dotenv').config();

// omdb api (to watch) call
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

// yelp api (to eat) call

// google books api (to read) call

// amazon api (to buy) call

module.exports = { movieCat };

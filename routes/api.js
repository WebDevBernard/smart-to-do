// where all the api calls are stored
const axios = require("axios");
require("dotenv").config();

// omdb api (to watch) call
const movieCat = async function (queryText) {
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
  return res;
};

// yelp api (to eat) call
const foodCat = async function(queryText) {

  let res = await axios
    .get(`https://api.yelp.com/v3/businesses/search?term=${queryText}&location=Vancouver`, {
      headers: {
        Authorization: `Bearer ${process.env.YELP_KEY}`
      },
    })
    .then(response => {
      console.log("!!!!!!!$$$$$$$$$$$$$:", response["data"]["businesses"][0]["name"]);
      if (response["data"]["businesses"][0]["name"].toLowerCase().includes(queryText)) {
        return true;
      }
      return false;
    })
    .catch(error => {
      console.log(error);
    });
  return res;
};

// google books api (to read) call
const getBooks = async function (queryText) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${queryText}&key=${process.env.BOOKS_KEY}`;
  let res = await axios
    .get(url)
    .then((response) => {
      if (
        response.data.items[0]["volumeInfo"]["industryIdentifiers"][0][
          "identifier"
        ]
      ) {
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};

// api (to buy) call

module.exports = { movieCat, getBooks, foodCat };
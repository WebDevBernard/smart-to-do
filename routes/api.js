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
        return response.data["imdbID"];
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
// yelp api (to eat) call
const foodCat = async function (queryText) {
  const yKey = process.env.YELP_KEY;
  let res = await axios
    .get(
      `https://api.yelp.com/v3/businesses/search?term=${queryText}&location=Vancouver`,
      {
        headers: {
          Authorization: `Bearer ${yKey}`,
        },
      }
    )
    .then((response) => {
      const shortResponse = response["data"]["businesses"][0]["name"];
      if (shortResponse.toLowerCase().includes(queryText)) {
        return true;
      }
      return false;
    })
    .catch((error) => {
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
// wolfram alpha
const getWolf = async function (queryText) {
  const url = `http://api.wolframalpha.com/v2/query?appid=${process.env.WOLF_KEY}&output=json&input=${queryText}`;
  let res = await axios
    .get(url)
    .then((response) => {
      // skip if book movie food television newspaper comic
      console.log(response["data"]["queryresult"]["datatypes"]);
      const newArr = [
        "book",
        "",
        "academyaward,movie",
        "financial",
        "fictionalcharacter,person",
        "televisionprogram",
        "quantity",
      ];
      if (
        newArr.includes(
          response["data"]["queryresult"]["datatypes"].toLowerCase()
        )
      ) {
        return false;
      }
      return true;
    })
    .catch((error) => {
      console.log(error);
    });
  return res;
};
module.exports = { movieCat, getBooks, foodCat, getWolf };
// where all the api calls are stored
const axios = require("axios");
require('dotenv').config();
//to-eat category: 

// const restaurantCat = function(queryText) {
// //what is queryText referencing? 
//   let serializedQuery = queryText.serialize();
//   let API_KEY =
//   "wANe0voBkG_03uib79wQzcYWQljryOD8i_AKZ4c_DgYTCK5ZxvsryuQrvnGiwqo7o9sh-MyBdX2QC32zRCW57pE-YNPzYLuHyDUceVCE9bDEXCxek59LPxP2C77cYHYx"

//   axios.get(`${'https://cors-anywhere.herokuapp.com/'}https:
// //api.yelp.com/v3/businesses/search?term=${serializedQuery}location=Vancouver`, {
//     headers: {
//       Authorization: `Bearer ${API_KEY}`
//     },
//   })
//     .then(response => {
//       console.log(response);
//       return true;
//     })
//     .catch(error => {
//       console.log(error);
//       return false;
//     });
// };
const movieCat = function(queryText) {
  const oKey = process.env.OMDB_KEY;
 
  return axios.get(`http://www.omdbapi.com/?apikey=${oKey}&t=${queryText}`)
    .then(response => {
      //console.log(response.data["imdbID"]);
      //console.log(response.data["imdbID"]);
      if(response.data["imdbID"]){
        //console.log("the imdb id exists");
        return true;
      }
    })
}

const readCat = function() {

}

const buyCat = function(){

}

const eatCat = function() {

}



module.exports = {movieCat}; 
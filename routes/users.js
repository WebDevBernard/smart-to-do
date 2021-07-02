const express = require('express');
const router = express.Router();
const userQueries = require('../db/user-queries');


module.exports = (db) => {
  // GET/ user by id
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users`)
      .then((data) => {
        const response = data.rows;
        res.json({ response });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};

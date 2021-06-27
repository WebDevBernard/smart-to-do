const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM tasks`)
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get('/:id', (req, res) => {
    db.query(`SELECT * FROM tasks WHERE user_id = $1;`, [req.params.id])
      .then(data => {
        res.json(data.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.post('/', (req, res) => {
    db.query(`INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`, [1, "watch watchmen", "to-watch", "Now()"])
      .then(data => {
        const response = {data.rows};
        res.json(response);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};

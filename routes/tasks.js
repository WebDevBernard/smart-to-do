const express = require('express');
const router = express.Router();
// const sortable = require('../scripts/sortable.js');

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM tasks`)
      .then (data => {
        const response = data.rows;
        res.json(response);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    db.query(`SELECT * FROM tasks WHERE user_id = $1;`, [userId])
      .then(data => {
        const response = data.rows;
        res.json({ response });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const name = req.body.name;
    db.query(`INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`, [1, name, "to-watch", "Now()"])
      .then(data => {
        res.json({ data });
      });

  });

  router.put('/:id', (req, res) => {
    const userTask = req.body;
    const userId = req.params.id;
    db.query(`UPDATE tasks
    SET name = 'Joe',
    user_id = 1,
    category_name = 'to-watch',
    date_created = 'NOW()'
    WHERE id = 1 AND user_id = 1
    RETURNING *;`)
      .then(data => {
        const response = data.rows;
        console.log({ response });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.delete('/', (req, res) => {
    if (sortable.removeOnSpill) {
      db.query(`DELETE FROM tasks WHERE user_id = $1 AND id = $2;`, [1, 3]);
      res.json("Your Task Has Been Deleted");
    } else {
      return;
    }
    
  });
  return router;
};





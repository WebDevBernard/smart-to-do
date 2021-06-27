const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

module.exports = (db) => {
  router.get('/:id', (req, res) => {
    db.query(`
      SELECT *,
      FROM tasks,
      WHERE user_id = $1`,
      [req.params.id])
      .then(response => {
        res.json(response.rows);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    return router;
  });
};

router.post('/tasks/create', (req, res) => {

  let { name, user_id, category_id, order, date_created } = req.body
  //INSERT
  knex('tasks').insert({
    name: name,
    user_id: req.session.id,
    category_id: category_id,
    order: order,
    date_created: date_created
  }).then(() => {
    res.redirect('/:id');
  });
});

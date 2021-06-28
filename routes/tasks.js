const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM tasks`)
      .then(data => {
        const response = data.rows;
        res.json( response );
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  router.get('/', (req, res) => {
    const userId = req.params.id;
    db.query(`SELECT * FROM tasks WHERE user_id = $1;`, [userId])
      .then(data => {
        const response = data.rows;
        res.json(response);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    const templateVars = 
    res.render('index', templateVars)
  });
<<<<<<< HEAD
  
  router.post('/', (req, res) => {
    const userTask = req.body.data;
    console.log(req)
    const userId = 2;
=======

  router.post('/', (req, res) => {
    const userTask = req.body.data;
    const userId = 1;
    console.log("usertask:", userTask)
    console.log("userid:", userId)
    // console.log(req)
    // console.log(res)
>>>>>>> 2c9e9de4f360928f74f1e4a75a73c3b39ec546c2
    db.query(`INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`, [userId, userTask, "to-watch", "Now()"])
      .then(data => {
        console.log(data)
        const response = data.rows;
        res.json(response);
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({ error: err.message });
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
    db.query(`DELETE FROM tasks WHERE user_id = $1 AND id = $2;`, [1, 3]);
    res.json("Your Task Has Been Deleted");
  });
  return router;
};





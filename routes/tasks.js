const express = require('express');
const router = express.Router();
const tasksQueries = require('../db/product-queries.js') //will need to change the name later 

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

  //GET /display tasks 
  router.get('/', (req, res) => {
    tasksQueries.getTasks() 
      .then((tasks)=> {
        res.json(tasks);
      });
  });

  //POST / new tasks
  router.post('/', (req, res) => {
    const {task_name} = req.body.data;
    tasksQueries.createTasks(task_name)
    .then(() => {
      res.json({ success: true });
    })
  });
  
  //PUT / update a task
  router.put('/:id', (req, res) => {
    const { task_name } = req.body;
    tasksQueries.updateTasks(req.params.id)
    .then(() => {
      res.json( { success: true });
    });
  })
  
  //Delete / delete a task
  router.delete('/', (req, res) => {
    tasksQueries.deleteTask(req.params.id)
    .then(() => {
      res.json( { sucess: true });
    });
    
  })
  return router;
};





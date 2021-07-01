const express = require("express");
const router = express.Router();
const { movieCat } = require("./api");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM tasks`)
      .then((data) => {
        const response = data.rows;
        res.json(response);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.get("/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    db.query(`SELECT * FROM tasks WHERE user_id = $1;`, [userId])
      .then((data) => {
        const response = data.rows;
        res.json({ response });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const name = req.body.name;
    console.log(name, "is the name of the input");

    if (name.includes(`watch`)) {
      db.query(
        `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
        [1, name, "to-watch", "Now()"]
      ).then((data) => {
        res.json({ data });
      });
    } else if (name.includes(`read`)) {
      db.query(
        `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
        [1, name, "to-read", "Now()"]
      ).then((data) => {
        res.json({ data });
      });
    } else if (name.includes(`eat`)) {
      db.query(
        `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
        [1, name, "to-eat", "Now()"]
      ).then((data) => {
        res.json({ data });
      });
    } else if (name.includes(`buy`)) {
      db.query(
        `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
        [1, name, "to-buy", "Now()"]
      ).then((data) => {
        res.json({ data });
      });
    } else {
      if (movieCat(name)) {
        console.log("this is inside the movieCat call");
        db.query(
          `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
          [1, name, "to-watch", "Now()"]
        ).then((data) => {
          res.json({ data });
        });
      }
    }
  });

  // router.put("/:id", (req, res) => {
  //   const userTask = req.body;
  //   const userId = req.params.id;
  //   db.query(
  //     `UPDATE tasks
  // SET name = 'Joe',
  // user_id = 1,
  // category_name = 'to-watch',
  // date_created = 'NOW()'
  // WHERE id = 1 AND user_id = 1
  // RETURNING *;`
  //   )
  //     .then((data) => {
  //       const response = data.rows;
  //       console.log({ response });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.delete(`/:id`, (req, res) => {
    const taskId = parseInt(req.params.id);
    db.query(`DELETE FROM tasks WHERE id = $1;`, [taskId]);
    res.json("Your Task Has Been Deleted");
  });
  return router;
};

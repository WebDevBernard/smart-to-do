const express = require("express");
const router = express.Router();
const { getMovies } = require("./api");
const { getBooks } = require("./api");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM tasks`)
      .then((data) => {
        const response = data.rows;
        res.json(response);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
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
      getMovies(name).then((isMovie) => {
        // console.log("this is the name inside getMovies promise", name);
        if (isMovie) {
          db.query(
            `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
            [1, name, "to-watch", "Now()"]
          ).then((data) => {
            res.status(200);
            res.json({ data });
          });
        } else {
          getBooks(name).then((isBook) => {
            if (isBook) {
              db.query(
                `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
                [1, name, "to-read", "Now()"]
              ).then((data) => {
                res.status(200);
                res.json({ data });
              });
            } else {
              res.status(400);
              res.json("todo: write proper error msg");
            }
          });
        }
      });
    }

    // else if (
    //   !name.includes("buy") &&
    //   !name.includes("eat") &&
    //   !name.includes("read") &&
    //   !name.includes("watch")
    // ) {
    //   db.query(
    //     `INSERT INTO tasks (user_id, name, category_name, date_created) VALUES ($1, $2, $3, $4);`,
    //     [1, name, "to-do", "Now()"]
    //   ).then((data) => {
    //     res.json({ data });
    //   });
    // }

  });

  router.delete(`/:id`, (req, res) => {
    const taskId = parseInt(req.params.id);
    db.query(`DELETE FROM tasks WHERE id = $1;`, [taskId]);
    res.json("Your Task Has Been Deleted");
  });

  return router;
};

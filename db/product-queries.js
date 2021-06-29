const db = require('./db');

// grabbing all tasks
const getTasks = () => {
  return db.query(`SELECT * FROM tasks;`).then((response) => {
    return response.rows;
  });
};

const getTasksByUser = (userId) => {
  return db
    .query(
      `SELECT * FROM tasks
    WHERE user_id = $1`,
      [userId]
    )
    .then((response) => {
      return response.rows[0];
    });
};

const updateTask = (id, taskName, categoryName) => {
  const query = `
    UPDATE tasks
    SET name = $1, category_name = $2
    WHERE id = $3;
    `;

  return db.query(query, [taskName, categoryName, id]).then(() => {
    return {
      success: true,
    };
  });
};

const createTask = (
  id,
  taskName,
  userId,
  categoryName,
  priority,
  dateCreated
) => {
  const query = `
    INSERT INTO tasks(id, name, user_id, category_name, priority, date_created) 
    VALUES ($1, $2, $3, $4, $5, $6)
    `;

  return db
    .query(query, [id, taskName, userId, categoryName, priority, dateCreated])
    .then(() => {
      return {
        success: true,
      };
    });
};

const deleteTask = (id) => {
  const query = `DELETE FROM tasks
    WHERE id = $1;`;

  return db.query(query, [id]).then(() => {
    return {
      success: true,
    };
  });
};

module.exports = {
  getTasks,
  getTasksByUser,
  updateTask,
  createTask,
  deleteTask,
};

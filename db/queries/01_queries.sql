UPDATE tasks
SET name = 'Joe', user_id = 1, category_name = 'to-watch', date_created = 'NOW()'
WHERE id = 1 AND user_id = 1
RETURNING *;





-- DROP TABLE IF EXISTS tasks CASCADE;
-- CREATE TABLE tasks (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   category_name VARCHAR(255) NOT NULL,
--   priority INTEGER,
--   date_created TIMESTAMP NOT NULL
-- );

-- SET name = 'Joe'
-- user_id = 15,
-- category_name = to-watch,
-- date_created = 'NOW()'
-- FROM tasks
-- WHERE tasks.id = 2

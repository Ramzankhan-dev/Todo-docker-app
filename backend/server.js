const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "todo_db",
  password: "postgres",
  port: 5432,
});

// GET all tasks
app.get("/tasks", async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
});

// ADD task
app.post("/tasks", async (req, res) => {
  const { title } = req.body;
  await pool.query(
    "INSERT INTO tasks (title) VALUES ($1)",
    [title]
  );
  res.send("Task added");
});

// DELETE task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.send("Task deleted");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
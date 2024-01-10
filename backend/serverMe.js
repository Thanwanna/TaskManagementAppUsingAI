const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// const tasks = [{ id: 1, title: "task 1" }];
const tasks = [];

app.get("/", (req, res) => {
  res.send(`<h1>Hello from the home page</h1>`);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks/", (req, res) => {
  const newTaskTitle = req.body.title;
  const newTask = {
    id: tasks.length + 1,
    title: newTaskTitle,
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskTitle = req.body.title;

  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], title: taskTitle };
  }
  res.json(tasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const filteredTask = tasks.filter((task) => task.id !== taskId);
  res.json(filteredTask);
});

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);

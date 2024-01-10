// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const tasks = [];

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post('/tasks', (req, res) => {
  const newTaskTitle = req.body.title.trim();

  if (newTaskTitle) {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
    };

    tasks.push(newTask);
    res.json(newTask);
  } else {
    res.status(400).json({ error: 'Task title cannot be blank' });
  }
});

// PUT (update) a task by ID
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const updatedTaskTitle = req.body.title.trim();

  if (updatedTaskTitle) {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[index].title = updatedTaskTitle;
      res.json(tasks[index]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } else {
    res.status(400).json({ error: 'Task title cannot be blank' });
  }
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);

  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1)[0];
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

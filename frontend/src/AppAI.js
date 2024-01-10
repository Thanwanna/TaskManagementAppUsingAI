// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./AppMe.css"

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [updatedTask, setUpdatedTask] = useState({ id: null, title: '' });

  useEffect(() => {
    // Fetch tasks from the backend on component mount
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = () => {
    // Send a POST request to add a new task
    if (newTask.trim()) {
      axios.post('http://localhost:5000/tasks', { title: newTask })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error('Error adding task:', error));

      setNewTask('');
    }
  };

  const updateTask = () => {
    // Send a PUT request to update a task
    if (updatedTask.title.trim()) {
      axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, { title: updatedTask.title })
        .then(response => {
          const updatedTasks = tasks.map(task =>
            task.id === updatedTask.id ? response.data : task
          );
          setTasks(updatedTasks);
          setUpdatedTask({ id: null, title: '' });
        })
        .catch(error => console.error('Error updating task:', error));
    }
  };

  const deleteTask = (taskId) => {
    // Send a DELETE request to delete a task
    axios.delete(`http://localhost:5000/tasks/${taskId}`)
      .then(response => {
        const filteredTasks = tasks.filter(task => task.id !== taskId);
        setTasks(filteredTasks);
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  return (
    <div>
      <h1>Task Management</h1>

      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.id === updatedTask.id ? (
              <>
                <input
                  type="text"
                  value={updatedTask.title}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                />
                <button onClick={updateTask}>Save</button>
              </>
            ) : (
              <>
                {task.title}
                <button onClick={() => setUpdatedTask({ id: task.id, title: task.title })}>
                  Update
                </button>
                <button onClick={() => deleteTask(task.id)}>
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import "./AppMe.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [updateTask, setUpdateTask] = useState({ id: null, title: "" });

  const API_URL = "http://localhost:5000/tasks";
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(`Error fetching data : ${error}`));
  }, []);

  const addTask = () => {
    if (newTask) {
      axios
        .post(API_URL, { title: newTask })
        .then((response) => setTasks([...tasks, response.data]))
        .catch((error) => console.log("Error Adding a post request ", error));

      setNewTask("");
    }
  };

  const deleteTask = (taskId) => {
    axios
      .delete(`${API_URL}/${taskId}`)
      .then((response) => {
        const filteredTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(filteredTasks);
      })
      .catch((error) => console.log("Error deleting task ", error));
  };

  const updatedTask = () => {
    if (updateTask.title) {
      axios
        .put(`${API_URL}/${updateTask.id}`, { title: updateTask.title })
        .then((response) => {
          const updatedTasks = tasks.map((task) =>
            task.id === updateTask.id ? response.data : task
          );
          setTasks(updatedTasks);
          setUpdateTask({ id: null, title: "" });
        })
        .catch((error) => console.log("Error updating task ! "));
      setUpdateTask({ id: null, title: "" });
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Management</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul>
        {tasks &&
          tasks.map((task) => (
            <li key={task.id} className="task-list">
              {task.id === updateTask.id ? (
                <div className="task-items">
                  <p className="task-title">{task.title}</p>
                  <div>
                    <input
                      type="text"
                      value={updateTask.title}
                      onChange={(e) =>
                        setUpdateTask({ ...updateTask, title: e.target.value })
                      }
                    />
                    <button onClick={updatedTask}>Save</button>
                  </div>
                </div>
              ) : (
                <div className="task-items">
                  <p className="task-title">{task.title}</p>
                  <div>
                    <button
                      onClick={() =>
                        setUpdateTask({ id: task.id, title: task.title })
                      }
                    >
                      Update
                    </button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default App;

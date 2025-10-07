import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Load saved tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="input-container">
      <input
  type="text"
  placeholder="Add a new task"
  value={task}
  onChange={(e) => setTask(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  }}
/>
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleComplete(index)}>{task.text}</span>
            <button onClick={() => removeTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

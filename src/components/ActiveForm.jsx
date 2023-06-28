import React, { useState } from 'react';
import '../css/ActiveForm.css';


const ActiveForm = ({ tasks, onAddTask, onCompleteTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTask.trim() !== '') {
      onAddTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={newTask} onChange={handleInputChange} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={false}
              onChange={() => onCompleteTask(index)}
            />
            <span>{task}</span>
            <button onClick={() => onDeleteTask(index, 'active')}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveForm;

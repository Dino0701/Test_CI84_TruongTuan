import React from 'react';
import '../css/CompletedForm.css';


const CompletedForm = ({ tasks, onDeleteTask, onDeleteAllTasks }) => {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={true}
              onChange={() => onDeleteTask(index, 'completed')}
            />
            <span style={{ textDecoration: 'line-through' }}>{task}</span>
            <button onClick={() => onDeleteTask(index, 'completed')}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onDeleteAllTasks}>Delete All Completed Tasks</button>
    </div>
  );
};

export default CompletedForm;

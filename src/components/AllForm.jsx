import React from 'react';
import ActiveForm from './ActiveForm';
import CompletedForm from './CompletedForm';
import '../css/AllForm.css';

const AllForm = ({ tasks, onCompleteTask, onDeleteTask }) => {
  return (
    <div>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={false}
              onChange={() => onCompleteTask(index)}
            />
            <span>{task}</span>
            <button onClick={() => onDeleteTask(index, 'all')}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllForm;


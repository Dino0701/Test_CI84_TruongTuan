import React, { useState, useEffect } from 'react';
import ActiveForm from './components/ActiveForm';
import CompletedForm from './components/CompletedForm';
import AllForm from './components/AllForm';
import './css/App.css';

const App = () => {
  const [activeTasks, setActiveTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [activeFormVisible, setActiveFormVisible] = useState(false);
  const [completedFormVisible, setCompletedFormVisible] = useState(false);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const { activeTasks, completedTasks } = JSON.parse(storedTasks);
      setActiveTasks(activeTasks);
      setCompletedTasks(completedTasks);
    }
  }, []);

  useEffect(() => {
    const tasksToStore = JSON.stringify({ activeTasks, completedTasks });
    localStorage.setItem('tasks', tasksToStore);
  }, [activeTasks, completedTasks]);

  const handleAddTask = (task) => {
    setActiveTasks([...activeTasks, task]);
  };

  const handleCompleteTask = (index) => {
    const task = activeTasks[index];
    setActiveTasks(activeTasks.filter((_, i) => i !== index));
    setCompletedTasks([...completedTasks, task]);
  };

  const handleDeleteTask = (index, form) => {
    if (form === 'active') {
      setActiveTasks(activeTasks.filter((_, i) => i !== index));
    } else if (form === 'completed') {
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    } else if (form === 'all') {
      setActiveTasks(activeTasks.filter((_, i) => i !== index));
      setCompletedTasks(completedTasks.filter((_, i) => i !== index));
    }
  };

  const handleDeleteAllCompletedTasks = () => {
    setCompletedTasks([]);
  };

  const handleActiveButtonClick = () => {
    setActiveFormVisible(true);
    setCompletedFormVisible(false);
  };

  const handleCompletedButtonClick = () => {
    setActiveFormVisible(false);
    setCompletedFormVisible(true);
  };

  const handleAllButtonClick = () => {
    setActiveFormVisible(false);
    setCompletedFormVisible(false);
  };

  return (
    <div className='todoMain'>
      <h1>#todo</h1>
      <div>
        <button onClick={handleAllButtonClick}>All</button>
        <button onClick={handleActiveButtonClick}>Active</button>
        <button onClick={handleCompletedButtonClick}>Completed</button>
      </div>
      {activeFormVisible && (
        <ActiveForm
          tasks={activeTasks}
          onAddTask={handleAddTask}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
      {completedFormVisible && (
        <CompletedForm
          tasks={completedTasks}
          onDeleteTask={handleDeleteTask}
          onDeleteAllTasks={handleDeleteAllCompletedTasks}
        />
      )}
      {!activeFormVisible && !completedFormVisible && (
        <AllForm
          tasks={[...activeTasks, ...completedTasks]}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default App;

import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = "All" | "Active" | "Completed"

function App() {

  let [tasks, setTasks] = useState([
    {id: 1, title: "HTML&CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "ReactJS", isDone: false}
  ])

  const removeTask = (taskID: number) => {
    setTasks(tasks.filter(el => el.id !== taskID))
  }

  return (
    <div className="App">
      <Todolist
        title="What to learn"
        tasks={tasks}
        removeTask={removeTask}
        // filterTask={filterTask}
      />
    </div>
  );
}

export default App;

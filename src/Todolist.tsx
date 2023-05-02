import React, {useState} from 'react';
import {filterType} from "./App";

type PropsType = {
  title: string
  tasks: TasksType[]
  removeTask: (taskID: number) => void
  // filterTask: (buttonName: filterType) => void
}

type TasksType = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: PropsType) => {

  let [filterValue, setFilterValue] = useState<filterType>("All")

  const filterTask = (buttonName: filterType) => {
    setFilterValue(buttonName)
  }

  let filteredTasks = props.tasks

  if (filterValue === "Active") {
    filteredTasks = props.tasks.filter(el => el.isDone)
  }

  if (filterValue === "Completed") {
    filteredTasks = props.tasks.filter(el => !el.isDone)
  }

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {filteredTasks.map(el => {
            return <li key={el.id}>
              <button onClick={() => props.removeTask(el.id)}>X</button>
              <input type="checkbox" checked={el.isDone}/>
              <span>{el.title}</span>
            </li>
          })}
        </ul>
        <div>
          <button onClick={() => filterTask("All")}>All</button>
          <button onClick={() => filterTask("Active")}>Active</button>
          <button onClick={() => filterTask("Completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};

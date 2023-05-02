import React from 'react';

type PropsType = {
  title: string
  body?: string
  tasks: TasksType[]
}

type TasksType = {
  id: number
  title: string
  isDone: boolean
}

export const Todolist = (props: PropsType) => {
  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <h3>{props.body}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {props.tasks.map(el => {
            return <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span></li>
          })}
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};

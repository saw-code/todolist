import React, {useState, ChangeEvent, MouseEvent} from 'react';
import {filterType} from "./App";
import styles from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {pink} from '@mui/material/colors';

type PropsType = {
  todolistID: string
  title: string
  tasks: TaskType[]
  removeTask: (taskID: string, todolistID: string) => void
  changeFilter: (todolistID: string, buttonName: filterType) => void
  addTask: (newTitle: string, todolistID: string) => void
  changeIsDone: (todolistID: string, taskID: string, isDone: boolean) => void
  filter: filterType
  removeTodolist: (todolistID: string) => void
  updateTask: (todolistID: string, taskID: string, newTitle: string) => void
  updateTodolist: (todolistID: string, newTitle: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const Todolist = (props: PropsType) => {

  const [buttonName, setButtonName] = useState<filterType>("all")

  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(el => !el.isDone)
  }

  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(el => el.isDone)
  }

  const removeTaskHandler = (taskID: string) => {
    props.removeTask(props.todolistID, taskID)
  }

  const removeTodolistHandler = () => {
    props.removeTodolist(props.todolistID)
  }

  const addTaskTransitHandler = (newTitle: string) => {
    props.addTask(props.todolistID, newTitle)
  }

  const updateTodolistTransitHandler = (newTitle: string) => {
    props.updateTodolist(props.todolistID, newTitle)
  }

  const onAllClickHandler = () => {
    props.changeFilter(props.todolistID, "all")
    setButtonName("all")
  }

  const onActiveClickHandler = () => {
    props.changeFilter(props.todolistID, "active")
    setButtonName("active")
  }

  const onCompletedClickHandler = () => {
    props.changeFilter(props.todolistID, "completed")
    setButtonName("completed")
  }

  const updateTaskTransitHandler = (taskID: string, updateTitle: string) => {
    props.updateTask(props.todolistID, taskID, updateTitle)
  }

  const changeIsDoneHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
    props.changeIsDone(props.todolistID, taskID, event.currentTarget.checked)
  }

  let tasks = tasksForTodolist.map(el => {

    return <li key={el.id}>
      <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete">
        <DeleteIcon/>
      </IconButton>

      <Checkbox
        defaultChecked
        sx={{color: pink[800], '&.Mui-checked': {color: pink[600],},}}
        onChange={(event) => changeIsDoneHandler(el.id, event)}
        checked={el.isDone}
      />

      <EditableSpan
        oldTitle={el.title}
        callBack={(updateTitle) => updateTaskTransitHandler(el.id, updateTitle)}
      />
    </li>
  })

  return (
    <div>
      <div>
        <h3>
          <EditableSpan oldTitle={props.title} callBack={updateTodolistTransitHandler}/>
          <IconButton onClick={removeTodolistHandler} aria-label="delete">
            <DeleteIcon/>
          </IconButton>
        </h3>
        <AddItemForm callBack={addTaskTransitHandler}/>
        <ul>
          {tasks}
        </ul>
        <div>
          <Button onClick={onAllClickHandler} variant={buttonName === "all" ? "contained" : "outlined"} color="success">
            All
          </Button>
          <Button onClick={onActiveClickHandler} variant={buttonName === "active" ? "contained" : "outlined"}
                  color="success">
            Active
          </Button>
          <Button onClick={onCompletedClickHandler} variant={buttonName === "completed" ? "contained" : "outlined"}
                  color="success">
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

import React, {ChangeEvent, memo, useCallback} from 'react';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {pink} from "@mui/material/colors";
import {EditableSpan} from "./EditableSpan";
import {TaskType} from "./TodolistWithRedux";
import {changeIsDoneAC, removeTaskAC, updateTaskAC} from "../state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {filterType} from "../AppWithRedux";

export type TaskPropsType = {
  filter: filterType
  todolistId: string
}

export const Task = (props: TaskPropsType) => {

  const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[props.todolistId])
  const dispatch = useDispatch()

  const removeTaskHandler = (taskID: string) => {
    dispatch(removeTaskAC(props.todolistId, taskID))
  }

  const updateTaskTransitHandler = (taskID: string, updateTitle: string) => {
    dispatch(updateTaskAC(props.todolistId, taskID, updateTitle))
  }

  const changeIsDoneHandler = (taskID: string, event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeIsDoneAC(props.todolistId, taskID, event.currentTarget.checked))
  }

  let tasksForTodolist = tasks

  if (props.filter === "active") {
    tasksForTodolist = tasks.filter(el => !el.isDone)
  }

  if (props.filter === "completed") {
    tasksForTodolist = tasks.filter(el => el.isDone)
  }

  const tasksMap = tasksForTodolist.map(el => {
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
    <>
      {tasksMap}
    </>
  )
};

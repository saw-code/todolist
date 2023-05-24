import React, {useState, ChangeEvent, MouseEvent, useCallback, memo} from 'react';
import styles from "./Todolist.module.css"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {pink} from '@mui/material/colors';
import {filterType, TodolistType} from "../AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {addTaskAC, changeIsDoneAC, removeTaskAC, updateTaskAC} from "../state/tasks-reducer";
import {changeFilterAC, removeTodolistAC, updateTodolistAC} from "../state/todolists-reducer";
import {Task} from "./Task";

type PropsType = {
  todolist: TodolistType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export const TodolistWithRedux = memo(({todolist}: PropsType) => {
  const {id, title, filter} = todolist

  const [buttonName, setButtonName] = useState<filterType>("all")

  const dispatch = useDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id))
  }

  const updateTodolistTransitHandler = (newTitle: string) => {
    dispatch(updateTodolistAC(id, newTitle))
  }

  const onAllClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "all"))
    setButtonName("all")
  }, [id])

  const onActiveClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "active"))
    setButtonName("active")
  }, [id])

  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeFilterAC(id, "completed"))
    setButtonName("completed")
  }, [id])

  const addTaskTransitHandler = (newTitle: string) => {
    dispatch(addTaskAC(id, newTitle))
  }

  // let tasksMap = tasksForTodolist.map(el => {



    // <li key={el.id}>
    //   <IconButton onClick={() => removeTaskHandler(el.id)} aria-label="delete">
    //     <DeleteIcon/>
    //   </IconButton>
    //
    //   <Checkbox
    //     defaultChecked
    //     sx={{color: pink[800], '&.Mui-checked': {color: pink[600],},}}
    //     onChange={(event) => changeIsDoneHandler(el.id, event)}
    //     checked={el.isDone}
    //   />
    //
    //   <EditableSpan
    //     oldTitle={el.title}
    //     callBack={(updateTitle) => updateTaskTransitHandler(el.id, updateTitle)}
    //   />
    // </li>
  // })

  return (
    <div>
      <div>
        <h3>
          <EditableSpan oldTitle={title} callBack={updateTodolistTransitHandler}/>
          <IconButton onClick={removeTodolistHandler} aria-label="delete">
            <DeleteIcon/>
          </IconButton>
        </h3>
        <AddItemForm callBack={addTaskTransitHandler}/>
        <ul>
          <Task todolistId={id} filter={filter}/>
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
});

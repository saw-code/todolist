import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid, Paper} from "@mui/material";
import {addTaskAC, changeIsDoneAC, removeTaskAC, updateTaskAC} from "./state/tasks-reducer";
import {addTodolistAC, changeFilterAC, removeTodolistAC, updateTodolistAC} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {tasksSelector, todolistsSelector} from "./state/selectors";


export type filterType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: filterType
}

export type TasksType = {
  [key: string]: TaskType[]
}

function AppWithRedux() {

  // для того чтобы взять данные нам нужно использовать хук useSelector. В типизации первым параметром тип
  // всего объекта состояния (определили в store.ts), а вторым параметром то, что хотим из нашего параметра возвратить.
  // useSelector - это ф-ция которая принимает коллбэк у которого есть параметр state и возвращаем наши todolists
  // и tasks во втором случае
  let todolists = useSelector(todolistsSelector)

  let tasks = useSelector(tasksSelector)

  // для того чтобы заработал функционал, нам нужен dispatch
  const dispatch = useDispatch()

  const updateTodolist = (todolistID: string, newTitle: string) => {
    dispatch(updateTodolistAC(todolistID, newTitle))
  }

  const changeFilter = (todolistID: string, value: filterType) => {
    dispatch(changeFilterAC(todolistID, value))
  }

  // dispatch во все редюсеры отправит экшен. Раньше здесь мы диспатчили отдельно в todolists и отдельно в tasks
  const removeTodolist = (todolistID: string) => {
    dispatch(removeTodolistAC(todolistID))
  }

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    dispatch(updateTaskAC(todolistID, taskID, newTitle))
  }

  const removeTask = (todolistID: string, taskID: string) => {
    dispatch(removeTaskAC(todolistID, taskID))
  }

  const addTask = (todolistID: string, newTitle: string) => {
    dispatch(addTaskAC(todolistID, newTitle))
  }

  const changeIsDone = (todolistID: string, taskID: string, isDone: boolean) => {
    dispatch(changeIsDoneAC(todolistID, taskID, isDone))
  }

  return (
    <div className="App">
      <ButtonAppBar/>
      <Container fixed>
        <Grid container style={{padding: "20px 0 20px 0"}}>
          <AddItemForm callBack={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(el => {
            return <Grid key={el.id} item>
              <Paper key={el.id} elevation={3} style={{padding: "10px"}}>
                <Todolist
                  key={el.id}
                  todolistID={el.id}
                  title={el.title}
                  tasks={tasks[el.id]}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeIsDone={changeIsDone}
                  filter={el.filter}
                  removeTodolist={removeTodolist}
                  updateTask={updateTask}
                  updateTodolist={updateTodolist}
                />
              </Paper>
            </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;

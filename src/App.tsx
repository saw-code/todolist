import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid, Paper} from "@mui/material";
import {
  addNewTasksAC,
  addTaskAC,
  changeIsDoneAC, deleteTasksAC,
  removeTaskAC,
  tasksReducer,
  updateTaskAC
} from "./reducers/tasks-reducer";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  todolistsReducer,
  updateTodolistAC
} from "./reducers/todolists-reducer";

export type filterType = "all" | "active" | "completed"

export type TodolistType = {
  id: string
  title: string
  filter: filterType
}

export type TasksType = {
  [key: string]: TaskType[]
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, tasksDispatch] = useReducer(tasksReducer, {
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},
      {id: v1(), title: 'Angular', isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'UmiJS', isDone: false},
      {id: v1(), title: 'AntDesign', isDone: false},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })

  const updateTodolist = (todolistID: string, newTitle: string) => {
    todolistsDispatch(updateTodolistAC(todolistID, newTitle))
  }

  const changeFilter = (todolistID: string, value: filterType) => {
    todolistsDispatch(changeFilterAC(todolistID, value))
  }

  const removeTodolist = (todolistID: string) => {
    todolistsDispatch(removeTodolistAC(todolistID))
    tasksDispatch(deleteTasksAC(todolistID))
    // setTodolists(todolists.filter(el => el.id !== todolistID))
    // delete tasks[todolistID]
    // setTasks({...tasks})
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1()
    todolistsDispatch(addTodolistAC(newTodolistId, title))
    tasksDispatch(addNewTasksAC(newTodolistId))
  }

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    tasksDispatch(updateTaskAC(todolistID, taskID, newTitle))
  }

  const removeTask = (todolistID: string, taskID: string) => {
    tasksDispatch(removeTaskAC(todolistID, taskID))
  }

  const addTask = (todolistID: string, newTitle: string) => {
    tasksDispatch(addTaskAC(todolistID, newTitle))
  }

  const changeIsDone = (todolistID: string, taskID: string, isDone: boolean) => {
    tasksDispatch(changeIsDoneAC(todolistID, taskID, isDone))
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

export default App;

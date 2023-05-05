import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {ButtonAppBar} from "./ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid, Paper} from "@mui/material";

export type filterType = "all" | "active" | "completed"

export type TodolistsType = {
  id: string
  title: string
  filter: filterType
}

type TasksType = {
  [key: string]: TaskType[]
}

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState<TasksType>({
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
    setTodolists(todolists.map(el => el.id === todolistID
      ? {...el, title: newTitle}
      : el))
  }

  const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
    setTasks({
      ...tasks,
      [todolistID]: tasks[todolistID].map(el => el.id === taskID
        ? {...el, title: newTitle}
        : el)
    })
  }

  const removeTask = (todolistID: string, taskID: string) => {
    setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
  }

  const changeFilter = (todolistID: string, value: filterType) => {
    setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
  }

  const addTask = (todolistID: string, newTitle: string) => {
    const newTask = {id: v1(), title: newTitle, isDone: false}
    setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
  }

  const changeIsDone = (todolistID: string, taskID: string, isDone: boolean) => {
    let task = {...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, isDone} : el)}
    setTasks(task)
  }

  const removeTodolist = (todolistID: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistID))
    delete tasks[todolistID]
    setTasks({...tasks})
  }

  const addTodolist = (title: string) => {
    const todolistID = v1()
    const newTodolist: TodolistsType = {id: todolistID, title: title, filter: 'all'}

    setTodolists([newTodolist, ...todolists])
    setTasks({
      ...tasks, [todolistID]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true}
      ]
    })
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
            return <Grid item>
              <Paper elevation={3} style={{padding: "10px"}}>
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

import React from 'react';
import './App.css';
import {TaskType} from "./components/Todolist";
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import Container from '@mui/material/Container';
import {Grid, Paper} from "@mui/material";
import {
  addTaskAC,
  changeIsDoneAC,
  removeTaskAC,
  updateTaskAC
} from "./state/tasks-reducer";
import {
  addTodolistAC,
  changeFilterAC,
  removeTodolistAC,
  updateTodolistAC
} from "./state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodolistWithRedux} from "./components/TodolistWithRedux";

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

  // let todolistID1 = v1()
  // let todolistID2 = v1()

  // [todolists, todolistsDispatch] = useReducer<Reducer<TodolistType[], TodolistsActionsType>>(todolistsReducer, [
  //   {id: todolistID1, title: 'What to learn', filter: 'all'},
  //   {id: todolistID2, title: 'What to buy', filter: 'all'},
  // ])

  // let [tasks, tasksDispatch] = useReducer<Reducer<TasksType, TasksActionsType>>(tasksReducer, {
  //   [todolistID1]: [
  //     {id: v1(), title: 'HTML&CSS', isDone: true},
  //     {id: v1(), title: 'JS', isDone: true},
  //     {id: v1(), title: 'ReactJS', isDone: false},
  //     {id: v1(), title: 'Angular', isDone: false},
  //   ],
  //   [todolistID2]: [
  //     {id: v1(), title: 'Rest API', isDone: true},
  //     {id: v1(), title: 'UmiJS', isDone: false},
  //     {id: v1(), title: 'AntDesign', isDone: false},
  //     {id: v1(), title: 'GraphQL', isDone: false},
  //   ]
  // })

  // для того чтобы взять данные нам нужно использовать хук useSelector. В типизации первым параметром тип
  // всего объекта состояния (определили в store.ts), а вторым параметром то, что хотим из нашего параметра возвратить.
  // useSelector - это ф-ция которая принимает коллбэк у которого есть параметр state и возвращаем наши todolists
  // и tasks во втором случае
  let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)

  // для того чтобы заработал функционал, нам нужен dispatch
  const dispatch = useDispatch()
  
  // dispatch во все редюсеры отправит экшен. Раньше здесь мы диспатчили отдельно в todolists и отдельно в tasks
  // const removeTodolist = (todolistID: string) => {
  //   dispatch(removeTodolistAC(todolistID))
  // }

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
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
                <TodolistWithRedux
                  todolist={el}
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

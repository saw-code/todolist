import {addTodolistAC, changeFilterAC, removeTodolistAC, todolistsReducer, updateTodolistAC} from './todolists-reducer'
import { v1 } from 'uuid'
import {filterType, TodolistType} from "../App";

let todolistId1: string
let todolistId2: string

let startState: Array<TodolistType>

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
  ]
})

test('correct todolist should be removed', () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const newTodolistId = v1()

  let newTodolistTitle = 'New Todolist'


  const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
  let newTodolistTitle = 'New Todolist'

  const action = {
    id: todolistId2,
    title: newTodolistTitle
  }

  const endState = todolistsReducer(startState, updateTodolistAC(todolistId2, newTodolistTitle))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
  let newFilter: filterType = 'completed'

  const endState = todolistsReducer(startState, changeFilterAC(todolistId2, newFilter))

  expect(endState[0].filter).toBe('all')
  expect(endState[1].filter).toBe(newFilter)
})
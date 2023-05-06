import {filterType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(t => t.id !== action.payload.todolistID)
    }

    case 'ADD-TODOLIST': {
      const newTodolist: TodolistType = {
        id: action.payload.todolistID,
        title: action.payload.newTodolistTitle,
        filter: 'all'
      }
      return [newTodolist, ...state]
    }

    case "CHANGE-TODOLIST-TITLE": {
      return state.map(t => t.id === action.payload.todolistID
        ? {...t, title: action.payload.newTodolistTitle}
        : t)
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map(t => t.id === action.payload.todolistID
        ? {...t, filter: action.payload.newFilter}
        : t)
    }

    default:
      return state
  }
}

type ActionsType =
  ReturnType<typeof removeTodolistAC> |
  ReturnType<typeof addTodolistAC> |
  ReturnType<typeof updateTodolistAC> |
  ReturnType<typeof changeFilterAC>

export const removeTodolistAC = (todolistID: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      todolistID
    }
  } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      todolistID: v1(),
      newTodolistTitle
    }
  } as const
}

export const updateTodolistAC = (todolistID: string, newTodolistTitle: string) => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      todolistID,
      newTodolistTitle
    }
  } as const
}

export const changeFilterAC = (todolistID: string, newFilter: filterType) => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      todolistID,
      newFilter
    }
  } as const
}
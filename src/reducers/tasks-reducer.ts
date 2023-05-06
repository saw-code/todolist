import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

export const tasksReducer = (state: TasksType, {type, payload}: ActionsType): TasksType => {
  switch (type) {

    case "REMOVE-TASK": {
      return {
        ...state,
        [payload.todolistID]:
          state[payload.todolistID].filter(el => el.id !== payload.taskID)
      }
    }

    case 'ADD-TODOLIST': {
      return {...state, [payload.todolistID]: []}
    }

    case 'REMOVE-TODOLIST': {
      let stateCopy = {...state}
      delete stateCopy[payload.todolistID]
      return {...stateCopy}
    }

    case "ADD-TASK": {
      const newTask = {id: v1(), title: payload.newTitle, isDone: false}
      return {...state, [payload.todolistID]: [newTask, ...state[payload.todolistID]]}
    }

    case 'UPDATE-TASK': {
      return {
        ...state, [payload.todolistID]: state[payload.todolistID]
          .map(t => t.id === payload.taskID ? {...t, title: payload.newTitle} : t)
      }
    }

    case "CHANGE-IS-DONE": {
      return {
        ...state, [payload.todolistID]: state[payload.todolistID]
          .map(t => t.id === payload.taskID ? {...t, isDone: payload.isDone} : t)
      }
    }



    default: {
      return state
    }
  }
}

type ActionsType =
  ReturnType<typeof removeTaskAC> |
  ReturnType<typeof addTaskAC> |
  ReturnType<typeof updateTaskAC> |
  ReturnType<typeof changeIsDoneAC> |
  ReturnType<typeof addTodolistAC> |
  ReturnType<typeof removeTodolistAC>

export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: {
      todolistID,
      taskID
    }
  } as const
}

export const addTaskAC = (todolistID: string, newTitle: string) => {
  return {
    type: "ADD-TASK",
    payload: {
      todolistID,
      newTitle
    }
  } as const
}

export const updateTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
  return {
    type: 'UPDATE-TASK',
    payload: {
      todolistID,
      taskID,
      newTitle
    }
  } as const
}

export const changeIsDoneAC = (todolistID: string, taskID: string, isDone: boolean) => {
  return {
    type: 'CHANGE-IS-DONE',
    payload: {
      todolistID,
      taskID,
      isDone
    }
  } as const
}

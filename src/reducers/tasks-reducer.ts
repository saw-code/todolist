import {TasksType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksType, action: ActionsType): TasksType => {
  switch (action.type) {

    case "REMOVE-TASK": {
      return {...state,
        [action.payload.todolistID]:
          state[action.payload.todolistID].filter(el => el.id !== action.payload.taskID)}
    }

    case "ADD-TASK": {
      const newTask = {id: v1(), title: action.payload.newTitle, isDone: false}
      return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
    }

    case 'UPDATE-TASK': {
      return {...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .map(t => t.id === action.payload.taskID ? {...t, title: action.payload.newTitle} : t)}
    }

    case "CHANGE-IS-DONE": {
      return {...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .map(t => t.id === action.payload.taskID ? {...t, isDone: action.payload.isDone} : t)}
    }

    case 'ADD-NEW-TASKS': {
      const newTasks = [
          {id: v1(), title: 'HTML&CSS', isDone: true},
          {id: v1(), title: 'JS', isDone: true}
        ]
      return {...state, [action.payload.todolistID]: newTasks }
    }

    case 'DELETE-ALL-TASKS': {
      delete state[action.payload.todolistID]
      return {...state}
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
  ReturnType<typeof addNewTasksAC> |
  ReturnType<typeof deleteTasksAC>

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

export const addNewTasksAC = (todolistID: string) => {
  return {
    type: 'ADD-NEW-TASKS',
    payload: {
      todolistID
    }
  } as const
}

export const deleteTasksAC = (todolistID: string) => {
  return {
    type: 'DELETE-ALL-TASKS',
    payload: {
      todolistID
    }
  } as const
}


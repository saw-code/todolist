import {AppRootStateType} from "../store";
import {TasksType} from "../../AppWithRedux";

export const tasksSelector = (state: AppRootStateType): TasksType =>state.tasks
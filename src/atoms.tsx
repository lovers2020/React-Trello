import { atom, selector } from "recoil";
import { loadToDos } from "./components/storage";

export interface ITodo {
  id: number;
  text: string;
}
export interface IToDoState {
  [key: string]: ITodo[];
}
const defaultToDos: IToDoState = {
  "To Do": [],
  Doing: [],
  Done: [],
};
export const toDoState = atom<IToDoState>({
  key: "toDo",
  default: loadToDos() ?? defaultToDos,
});

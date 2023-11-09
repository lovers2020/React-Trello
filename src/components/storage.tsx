import { IToDoState, toDoState } from "../atoms";

export const loadToDos = () => {
  const getToDos = localStorage.getItem("ToDos");
  if (getToDos) {
    return JSON.parse(getToDos);
  }
  return null;
};

export const saveToDos = (todos: IToDoState) => {
  localStorage.setItem("ToDos", JSON.stringify(todos));
};

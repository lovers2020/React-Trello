import { IToDoState } from "../atoms";

export const loadToDos = () => {
	const getToDos = localStorage.getItem("ToDos");
	if (getToDos) {
		return JSON.parse(getToDos);
	}
	return null;
};

export const saveToDos = (todos: IToDoState) => {
	const jsonObject = JSON.stringify(todos);

	localStorage.setItem("ToDos", JSON.stringify(todos));
};

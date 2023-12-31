import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useRecoilState } from "recoil";
import { saveToDos } from "./storage";

const Wrapper = styled.div`
	position: relative;
	margin: 20px;
	padding: 10px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
	min-width: 250px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;
const Title = styled.h1`
	text-align: center;
	font-size: 22px;
	font-weight: 700;
	margin-bottom: 10px;
`;
const Area = styled.div<IAreaProps>`
	width: 100%;
	background-color: ${(props) =>
		props.isDraggingOver
			? "rgba(0,0,0,0.5);"
			: props.isDraggingFromThis
			? "#b2bec3"
			: "trasnparent"};
	flex-grow: 1;
	transition: background-color 0.3s ease-in-out;
	margin-top: 20px;
	border-radius: 5px;
`;
const Form = styled.form`
	width: 100%;
	input {
		width: 100%;
		border: none;
		border-radius: 5px;
		padding: 5px 10px;
	}
`;

interface IAreaProps {
	isDraggingOver: boolean;
	isDraggingFromThis: boolean;
}

interface IBoardprops {
	toDos: ITodo[];
	boardId: string;
	index: number;
}
interface IForm {
	toDo: string;
}

export default function Board({ toDos, boardId, index }: IBoardprops) {
	//   console.log(boardId + "", index);
	const [ToDos, setToDos] = useRecoilState(toDoState);
	const { register, setValue, handleSubmit } = useForm<IForm>();
	const onVaild = ({ toDo }: IForm) => {
		const newToDo = {
			id: Date.now(),
			text: toDo,
		};
		setToDos((allBoards) => {
			return {
				...allBoards,
				[boardId]: [...allBoards[boardId], newToDo],
			};
		});
		setValue("toDo", "");
	};
	useEffect(() => {
		saveToDos(ToDos);
	}, [ToDos]);
	return (
		<div>
			<Draggable draggableId={boardId + ""} index={index}>
				{(provided, snapshot) => (
					<>
						<Wrapper
							ref={provided.innerRef}
							{...provided.draggableProps}
							{...provided.dragHandleProps}
						>
							<Title>{boardId}</Title>
							<Form onSubmit={handleSubmit(onVaild)}>
								<input
									{...register("toDo", { required: true })}
									type="text"
									placeholder={`Add task on ${boardId}`}
								></input>
							</Form>
							<Droppable droppableId={boardId}>
								{(provided, snapshot) => (
									<>
										<Area
											isDraggingOver={
												snapshot.isDraggingOver
											}
											isDraggingFromThis={Boolean(
												snapshot.draggingFromThisWith
											)}
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{toDos.map((toDo, index) => (
												<DraggableCard
													key={toDo.id}
													index={index}
													toDoId={toDo.id}
													toDoText={toDo.text}
												/>
											))}
										</Area>
										{provided.placeholder}
									</>
								)}
							</Droppable>
						</Wrapper>
					</>
				)}
			</Draggable>
		</div>
	);
}

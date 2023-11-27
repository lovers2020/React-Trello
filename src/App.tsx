import { ThemeProvider, createGlobalStyle, styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import reset from "styled-reset";
import { BoardsState, IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";
import DeleteCard from "./components/DeleteCard";
import CreateBoard from "./components/CreateBoardForm";

const Wrapper = styled.div`
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;
const InnerWrapper = styled.div`
	max-width: 1300px;
	flex-wrap: wrap;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const GlobalStyle = createGlobalStyle`
${reset}
body { 
  font-family: 'Courier New', Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 16px;
  font-family: 'Noto Sans';
  background-color: ${(props) => props.theme.bgColor};
  color: black;  
}
  * {
    box-sizing:border-box;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const [boards, setBoards] = useRecoilState(BoardsState);
	const jsonArray: any[] = [];
	const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
		if (!destination) return;
		if (source.droppableId === "boards") {
			setToDos((prev) => {
				console.log(source, destination);
				for (let i in prev) {
					jsonArray.push(prev[i]);
				}

				console.log(jsonArray);

				const copiedBoards = Object(prev);
				// copiedBoards.splice(source.index, 1);
				return copiedBoards;
			});
			return;
		} else if (destination.droppableId === "delete") {
			setToDos((allBoards) => {
				const deleteBoard = [...allBoards[source.droppableId]];
				deleteBoard.splice(source.index, 1);
				return { ...allBoards, [source.droppableId]: deleteBoard };
			});
		} else {
			setToDos((allBoards) => {
				const sourceBoard = [...allBoards[source.droppableId]];
				const destBoard = [...allBoards[destination.droppableId]];
				const item = sourceBoard.splice(source.index, 1)[0];

				if (source.droppableId === destination.droppableId) {
					destBoard.splice(source.index, 1);
				}
				destBoard.splice(destination.index, 0, item);
				return {
					...allBoards,
					[source.droppableId]: sourceBoard,
					[destination.droppableId]: destBoard,
				};
			});
		}
	};
	return (
		<>
			<GlobalStyle />
			<DragDropContext onDragEnd={onDragEnd}>
				<Wrapper>
					<CreateBoard />
					<Droppable droppableId="boards">
						{(provided) => (
							<InnerWrapper
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{Object.keys(toDos).map((boardId, idx) => (
									<Board
										boardId={boardId}
										key={boardId}
										toDos={toDos[boardId]}
										index={idx}
									/>
								))}

								{provided.placeholder}
							</InnerWrapper>
						)}
					</Droppable>
					<DeleteCard />
				</Wrapper>
			</DragDropContext>
		</>
	);
}

export default App;

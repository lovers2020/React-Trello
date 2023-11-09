import { ThemeProvider, createGlobalStyle, styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import reset from "styled-reset";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";
import deleteCard from "./components/deleteCard";
import DeleteCard from "./components/deleteCard";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const DeleteArea = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  bottom: 40px;
  right: 600px;
  text-align: center;
  transition: scale 0.3s ease-in-out;
  scale: ${(props) => (props.isDraggingOver ? 1.1 : 1.0)};
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
  const onDragEnd = ({ destination, draggableId, source }: DropResult) => {
    if (!destination) return;
    if (destination.droppableId === "delete") {
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
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
          <DeleteCard />
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

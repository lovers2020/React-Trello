import { ThemeProvider, createGlobalStyle, styled } from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import reset from "styled-reset";
import { IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";

const Boards = styled.div`
  display: grid;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;
const Wrapper = styled.div`
  background-color: white;
  display: flex;
  max-width: 980px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
  };
  return (
    <>
      <GlobalStyle />
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Wrapper>
      </DragDropContext>
    </>
  );
}

export default App;

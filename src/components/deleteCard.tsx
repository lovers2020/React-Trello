import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const DeleteArea = styled.div<{ isDraggingOver: boolean }>`
  position: absolute;
  bottom: 40px;
  right: 0;
  text-align: center;
  transition: scale 0.3s ease-in-out;
  scale: ${(props) => (props.isDraggingOver ? 1.1 : 1.0)};
`;

export default function DeleteCard() {
  return (
    <Droppable droppableId="delete">
      {(provided, snapshot) => (
        <>
          <DeleteArea
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "64px",
              }}
            >
              delete
            </span>
          </DeleteArea>
        </>
      )}
    </Droppable>
  );
}

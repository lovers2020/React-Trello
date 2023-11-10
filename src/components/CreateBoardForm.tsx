import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface IBoard {
  boardInput: string;
}
const Wrapper = styled.div``;
const Title = styled.h2`
  font-size: 48px;
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  input {
    width: 300px;
    border-radius: 5px;
    border: none;
    padding: 5px 10px;
  }
`;

export default function CreateBoard() {
  const setBoards = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IBoard>();
  const onValid = ({ boardInput }: IBoard) => {
    setBoards((allBoadrd) => {
      return {
        ...allBoadrd,
        [boardInput]: [],
      };
    });
    setValue("boardInput", "");
  };

  return (
    <Wrapper>
      <Title>Kanvan Board</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("boardInput", { required: true })}
          type="text"
          placeholder="Create your board!"
        ></input>
      </Form>
    </Wrapper>
  );
}

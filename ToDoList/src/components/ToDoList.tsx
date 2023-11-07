import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categories, categoryState, toDoSelector } from "../Atoms";

import { CreateToDo } from "./CreataeToDo";
import { ToDo } from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategoty] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategoty(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

// // }
// interface IForm {
//   email: string;
//   firstName: string;
//   password: string;
//   password1: string;
//   extraError?: string;
// }
// function ToDoList() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setError,
//   } = useForm<IForm>({
//     defaultValues: {
//       email: "@naver.com",
//     },
//   });
//   const onValid = (data: IForm) => {
//     if (data.password !== data.password1) {
//       return setError(
//         "password1",
//         { message: "password are not the same" },
//         { shouldFocus: true }
//       );
//     }
//     // setError("extraError", { message: "Server offline." });
//   };
//   console.log(errors);

//   return (
//     <div>
//       <form
//         style={{ display: "flex", flexDirection: "column" }}
//         onSubmit={handleSubmit(onValid)}
//       >
//         <input
//           {...register("email", {
//             required: "Email is required",
//             pattern: {
//               value: /^[A-Za-z0-9._%+-]+@naver.com$/,
//               message: "Please enter a valid email address",
//             },
//           })}
//           placeholder="Email"
//         />
//         <span>{errors?.email?.message as string}</span>
//         <input
//           {...register("firstName", {
//             required: "First Name",
//             validate: {
//               noSeop: (value) =>
//                 value.includes("seop") ? "no seop allowed" : true,
//               noNick: (value) =>
//                 value.includes("nick") ? "no nick allowed" : true,
//             },
//           })}
//           placeholder="First Name"
//         />
//         <span>{errors?.firstName?.message as string}</span>

//         <input
//           {...register("password", {
//             required: "write here",

//             minLength: {
//               value: 8,
//               message: "Your password is too short.",
//             },
//           })}
//           placeholder="Password"
//         />
//         <input
//           {...register("password1", {
//             required: "Password is required",
//             minLength: {
//               value: 5,
//               message: "Your password is too short.",
//             },
//           })}
//           placeholder="Password1"
//         />
//         <span>{errors?.password1?.message as string}</span>
//         <button>Add</button>
//         <span>{errors?.extraError?.message}</span>
//       </form>
//     </div>
//   );
// }

export default ToDoList;

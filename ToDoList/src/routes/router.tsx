import { createBrowserRouter } from "react-router-dom";
import ToDoList from "../components/ToDoList";

import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <ToDoList />,
      },
    ],
  },
]);

export default router;

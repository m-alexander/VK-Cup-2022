import { createBrowserRouter, Navigate } from "react-router-dom";
import { Root } from "../components/Root";
import { List } from "../components/List";
import { View } from "../components/View";
import { getLetter, getLetters } from "../api";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/inbox" />,
      },
      {
        path: "/:folder",
        element: <List />,
        loader: ({ params }) => getLetters(params.folder),
      },
      {
        path: "/:folder/:letter",
        element: <View />,
        loader: ({ params }) => getLetter(params.folder, params.letter),
      },
    ],
  },
]);

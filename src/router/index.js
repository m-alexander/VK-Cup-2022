import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import Root from "../components/Root";
import { getLetter, getLetters } from "../api";

const List = lazy(() => import("../components/List"));
const View = lazy(() => import("../components/View"));
const NewLetter = lazy(() => import("../components/NewLetter"));

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
        path: "/index.html",
        element: <Navigate replace to="/inbox" />,
      },
      {
        path: "/compose",
        element: <NewLetter />,
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

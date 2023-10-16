import { createBrowserRouter } from "react-router-dom";
import { App } from "./components/App";
import { Main } from "./components/screens/Main/Main";
import { Account } from "./components/screens/Account/Account";
import { PostDetail } from "./components/ui/PostDetail";
import { NotFound } from "./components/screens/NotFound/NotFound";

import { Authorization } from "./components/screens/Account/Authorization";
import { Registration } from "./components/screens/Account/Registration";
import { CreatePost } from "./components/screens/CreatePost/CreatePost";
import { Search } from "./components/screens/Search/Search";
export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      {
        path: "/people/:id/",
        element: <Account />,
        children: [{ path: ":postId", element: <PostDetail /> }],
      },
      {
        path: "/account",
        children: [
          {
            path: "auth",
            element: <Authorization />,
          },
          {
            path: "registration",
            element: <Registration />,
          },
        ],
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/create",
        element: <CreatePost />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

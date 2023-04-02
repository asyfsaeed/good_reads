import Login from "../pages/Login/Login";
import MyBooks from "../pages/MyBooks/MyBooks";
import { ShowBookCard } from "../pages/ShowBookCard/ShowBookCard";
import Home from "../pages/Home/Home";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/books",
    name: "My Books",
    component: MyBooks
  },
  {
    path: "/book/show/:bookId",
    name: "Book",
    component: ShowBookCard
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  }
];

export default routes;

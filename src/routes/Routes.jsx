import Login from "../pages/Login/Login";
import MyBooks from "../pages/MyBooks/MyBooks";

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
  }
];

export default routes;

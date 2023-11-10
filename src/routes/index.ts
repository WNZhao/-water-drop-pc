import Home from "../container/Home";
import Login from "../container/Login";

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/',
    element: Home,
    title: '首页'
  },
  {
    key: 'login',
    path: 'login',
    element: Login,
    title: '登录'
  }
]
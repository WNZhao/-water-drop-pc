import { HomeOutlined } from '@ant-design/icons';
import Home from '../container/Home';
// import Login from '../container/Login';
import Page404 from '@/container/Page404';

export const ROUTE_CONFIG = [
  {
    key: 'home',
    path: '/home',
    element: Home,
    name: '首页',
    icon: <HomeOutlined />,
  },
  {
    key: '*',
    path: '*',
    element: Page404,
    hideInMenu: true,
    name: '404',
  },
];

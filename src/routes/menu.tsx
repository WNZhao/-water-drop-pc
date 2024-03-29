import {
  ApartmentOutlined,
  ClusterOutlined,
  HomeOutlined,
  PicRightOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from '@ant-design/icons';

/**
 * 解决循环依赖问题
 */

interface IRoute {
  path: string;
  name: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

// 跳转都能跳转到每一个页面，那么每个页面都要定义一个类型
export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  NO_ORG: 'noOrg',
  COURSE: 'course',
  PRODUCT: 'product',
  COMPANY: 'company',
  PAGE_404: 'p404',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: 'home',
    name: '首页',
    icon: <HomeOutlined />,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: '个人信息',
    hideInMenu: true,
    icon: <UserOutlined />,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: '门店管理',
    hideInMenu: true,
    icon: <ApartmentOutlined />,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: '选择门店提示',
    hideInMenu: true,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: '课程管理',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: '商品管理',
    icon: <ShoppingCartOutlined />,
  },
  [ROUTE_KEY.COMPANY]: {
    path: 'company',
    name: '公司管理',
    icon: <ClusterOutlined />,
  },
  [ROUTE_KEY.PAGE_404]: {
    path: '*',
    name: 'p404',
    hideInMenu: true,
  },
};

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({
  ...ROUTE_CONFIG[key],
  key,
}));

// 如何通过一个key获得路由的内容
export const getRouteByKey = (key: string): IRoute => {
  return ROUTE_CONFIG[key];
};

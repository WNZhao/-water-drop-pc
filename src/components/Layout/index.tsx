import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';

import style from './index.module.less';
import { useUserContenxt } from '@/hooks/userHooks';
import { ROUTE_KEY, routes } from '@/routes/menu';
import { AUTH_TOKEN } from '@/utils/constants';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useGoto, useIsOrgRoute } from '@/hooks';
import OrgSelect from '../OrgSelect';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);

/**
 * 外层框架
 */
const Layout = () => {
  // 路由插槽
  const outlet = useOutlet();
  const { store } = useUserContenxt();
  const nav = useNavigate();
  // const { go } = useGoto();
  const { go } = useGoto();

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
    nav('/login');
  };

  const goOrg = () => {
    go(ROUTE_KEY.ORG);
  };

  const isOrg = useIsOrgRoute();

  return (
    <ProLayout
      siderWidth={160}
      className={style.container}
      avatarProps={{
        src: store.avatar,
        title: store.tel,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      // 左下角加链接
      links={[
        <Space size={20} onClick={logout}>
          <LogoutOutlined /> 退出
        </Space>,
      ]}
      logo={<img src="https://image.joyjs.cn/images/cicd.svg" />}
      onMenuHeaderClick={() => nav('/')}
      title={false}
      layout="mix"
      route={{
        path: '/home',
        routes: routes,
      }}
      menuItemRender={menuItemRender}
      actionsRender={() => [
        !isOrg ? <OrgSelect /> : undefined,
        <Tooltip title="门店管理">
          <ShopOutlined onClick={goOrg} />
        </Tooltip>,
      ]}
    >
      <div key={store.currentOrg}>{outlet}</div>
    </ProLayout>
  );
};

export default Layout;

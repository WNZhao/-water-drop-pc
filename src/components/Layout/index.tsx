import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';

import style from './index.module.less';
import { useUserContenxt } from '@/hooks/userHooks';
import { ROUTE_CONFIG } from '@/routes';
import { AUTH_TOKEN } from '@/utils/constants';

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || '/'}>{dom}</Link>
);

/**
 *
 */
const Layout = () => {
  // 路由插槽
  const outlet = useOutlet();
  const { store } = useUserContenxt();
  const nav = useNavigate();
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
    nav('/login');
  };
  return (
    <ProLayout
      siderWidth={150}
      className={style.container}
      avatarProps={{
        src: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
      logo={
        <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" />
      }
      onMenuHeaderClick={() => nav('/home')}
      title={false}
      layout="mix"
      route={{
        path: '/',
        routes: ROUTE_CONFIG,
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>{outlet}</PageContainer>
    </ProLayout>
  );
};

export default Layout;

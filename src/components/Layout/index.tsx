import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';

import style from './index.module.less';
import { useUserContenxt } from '@/hooks/userHooks';
import { routes } from '@/routes/menu';
import { AUTH_TOKEN } from '@/utils/constants';

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
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    sessionStorage.removeItem(AUTH_TOKEN);
    nav('/login');
  };
  return (
    <ProLayout
      siderWidth={160}
      className={style.container}
      avatarProps={{
        src: 'https://water-drop4zwn.oss-cn-beijing.aliyuncs.com/images/%E5%B0%8F%E9%B9%85.svg',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
      logo={
        <img src="https://water-drop4zwn.oss-cn-beijing.aliyuncs.com/images/cicd.svg" />
      }
      onMenuHeaderClick={() => nav('/')}
      title={false}
      layout="mix"
      route={{
        path: '/home',
        routes: routes,
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>{outlet}</PageContainer>
    </ProLayout>
  );
};

export default Layout;

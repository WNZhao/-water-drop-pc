import { Spin } from 'antd';
import { IPropChild } from '@/utils/types';
import { connect, useGetUser } from '@/hooks/userHooks';

/**
 * 获取用户信息组件
 */
// eslint-disable-next-line react-refresh/only-export-components
const Userinfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();
  return <Spin spinning={loading}>{children}</Spin>;
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(Userinfo);

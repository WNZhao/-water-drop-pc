import { useState, useEffect } from 'react';
import { useUserContenxt } from '@/hooks/userHooks';
import style from './index.module.less';
import { Button } from 'antd';
import { useGoto } from '@/hooks';
import { ROUTE_KEY } from '@/routes/menu';

/**
 *
 */
const Home = () => {
  const [state, setState] = useState();
  const { store } = useUserContenxt();
  console.log('store', store);
  useEffect(() => {
    state;
    setState;
  }, []);
  const { go } = useGoto();
  return (
    <div className={style.container}>
      {store.tel}home
      <Button onClick={() => go(ROUTE_KEY.MY)}>去个人中心</Button>
    </div>
  );
};

export default Home;

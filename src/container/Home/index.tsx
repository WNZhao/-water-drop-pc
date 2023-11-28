import { useState, useEffect } from 'react';
import { useUserContenxt } from '@/hooks/userHooks';
import style from './index.module.less';

/**
 *
 */
const Home = () => {
  const [state, setState] = useState();
  const { store } = useUserContenxt();
  console.log('store', store);
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return <div className={style.container}>{store.tel}home</div>;
};

export default Home;

import { useState, useEffect } from 'react';

/**
 *
 */
const My = () => {
  const [state, setState] = useState();
  useEffect(() => {
    console.log(state, setState);
  }, []);
  return <div>My page</div>;
};

export default My;

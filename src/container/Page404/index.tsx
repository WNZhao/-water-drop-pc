import { Button, Result } from 'antd';

/**
 * 404页面
 */
const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <Button type="primary" href="/home">
          返回首页
        </Button>
      }
    />
  );
};

export default Page404;

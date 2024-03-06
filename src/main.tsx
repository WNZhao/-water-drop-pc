import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import './index.less';
import { routes } from '@/routes/menu';
import UserInfo from '@/components/Userinfo';
import Layout from '@/components/Layout/index.tsx';
import Login from '@/container/Login/index.tsx';
import { ROUTE_COMPONENT } from './routes';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          {/* <ConfigProvider> */}
          <Routes>
            <Route path="/login" element={<Login />} />
            // 嵌套的路由
            <Route path="/" element={<Layout />}>
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    path={item.path}
                    key={item.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>
            {/* 兜底 */}
            {/* <Route path="*" element={<Page404 />} /> */}
          </Routes>
          {/* </ConfigProvider> */}
        </UserInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>
);

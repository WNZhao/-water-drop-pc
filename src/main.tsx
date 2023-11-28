import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import './index.less';
import { ROUTE_CONFIG } from '@/routes/index.tsx';
import UserInfo from '@/components/Userinfo';
import Layout from '@/components/Layout/index.tsx';
import Login from '@/container/Login/index.tsx';

Login;

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <UserInfo>
        <Routes>
          <Route path="/login" element={<Login />} />
          // 嵌套的路由
          <Route path="/" element={<Layout />}>
            {ROUTE_CONFIG.map((item) => (
              <Route
                path={item.path}
                element={<item.element />}
                key={item.key}
              />
            ))}
          </Route>
          {/* 兜底 */}
          {/* <Route path="*" element={<Page404 />} /> */}
        </Routes>
      </UserInfo>
    </BrowserRouter>
  </ApolloProvider>
);

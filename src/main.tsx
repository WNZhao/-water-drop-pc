import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
// import App from './App.tsx';
import './index.less';
import { ROUTE_CONFIG } from './routes/index.ts';
import Page404 from './container/Page404/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes>
        {ROUTE_CONFIG.map((item) => (
          <Route path={item.path} element={<item.element />} key={item.key} />
        ))}
        {/* 兜底 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);

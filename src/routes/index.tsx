import Home from '@/container/Home';
import { ROUTE_KEY } from './menu';
import My from '@/container/My';
import Page404 from '@/container/Page404';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.PAGE_404]: Page404,
};

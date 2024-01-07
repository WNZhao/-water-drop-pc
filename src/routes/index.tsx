import Home from '@/container/Home';
import { ROUTE_KEY } from './menu';
import My from '@/container/My';
import Page404 from '@/container/Page404';
import OrgPage from '@/container/Org';
import NoOrg from '@/container/NoOrg';
import Course from '@/container/Course/Course';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: OrgPage,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.PAGE_404]: Page404,
};

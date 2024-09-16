import { lazy } from 'react';
import LazyWrapper from '@components/LazyLoad';
const Page404 = lazy(() => import('./index'));

const RouterPage404 = {
  path: "/*",
  element: (
    <LazyWrapper>
      <Page404 />
    </LazyWrapper>
  ),
};

export default RouterPage404;

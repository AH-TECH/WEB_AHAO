import { lazy } from 'react';
import LazyWrapper from '../../compoments/LazyLoad';
const Page = lazy(() => import('./index'));

const RouterHome = {
  path: "/",
  element: (
    <LazyWrapper>
      <Page />
    </LazyWrapper>
  ),
};

export default RouterHome;

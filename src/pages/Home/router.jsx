import { lazy } from "react";
import LazyWrapper from "@components/LazyLoad";

const Page = lazy(() => import("./index"));
const Select1 = lazy(() => import("./Main/Select1"));
const Select2 = lazy(() => import("./Main/Select2"));

const RouterHome = {
  path: "/",
  element: (
    <LazyWrapper>
      <Page />
    </LazyWrapper>
  ),
  children: [
    {
      path: "select1",
      element: <Select1 />,
    },
    { path: "select2", element: <Select2 /> },
  ],
};

export default RouterHome;

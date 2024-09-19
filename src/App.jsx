import { RouterProvider  } from "react-router-dom";
import { routers } from "./pages/router";
 

export default function App() {

  return <RouterProvider router={routers} />;
}

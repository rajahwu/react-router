import { RouterProvider } from "react-router-dom";
import router from "../page-router";

export default function App() {
  return <RouterProvider router={router} />;
}

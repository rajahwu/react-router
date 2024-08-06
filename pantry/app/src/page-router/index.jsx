import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import { Root } from "../routes";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Root />} />),
);

export default router;

import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
} from "react-router-dom";
import Root from "../routes/root";
import Register, { action as registrationAction } from "../routes/register";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} >
      <Route index element={<div>main content</div>} />
      <Route 
        path="register" 
        element={<Register />} 
        action={registrationAction}
        />
  </Route>

),
);

export default router;

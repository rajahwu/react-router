// root.jsx
import { RootLayout } from "../components/layouts";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

import Navbar from "../components/Navbar";
import Mensaje from "../components/Mensaje";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Mensaje />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </>
  );
}

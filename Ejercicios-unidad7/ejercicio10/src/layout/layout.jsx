import { Outlet } from "react-router-dom";
import Navbar from "../componets/Navbar";
import Footer from "../componets/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;

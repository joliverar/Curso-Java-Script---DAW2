import { Outlet } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Layout() {
  console.log("hola2");
  return (
    <>
      <Header />

      <div className="principal">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}

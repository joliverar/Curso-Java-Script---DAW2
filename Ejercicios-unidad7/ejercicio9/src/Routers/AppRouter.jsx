import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import HomePage from "../pages/HomePage";
import ProductoPage from "../pages/ProductosPage";
import TareasPage from "../pages/TareasPage";
import NoPage from "../pages/NoPage";
import TestApi from "../pages/TestApi";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductoPage />} />
          <Route path="/tareas" element={<TareasPage />} />
          <Route path="/testapi" element={<TestApi />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

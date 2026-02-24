/**
 * AppRouter.jsx
 * Define las rutas principales de la aplicación
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductosPage from "../pages/ProductosPage";
import ProductoDetalle from "../pages/ProductoDetalle";
import ProductoForm from "../pages/ProductoForm";
import TareasPage from "../pages/TareasPage";
import NoPage from "../pages/NoPage";
import Layout from "../layout/layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/productodetalle" element={<ProductoDetalle />} />
          <Route path="/ProductoForm" element={<ProductoForm />} />
          <Route path="/tareas" element={<TareasPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// BrowserRouter gestiona las rutas
// Suspense permite la carga diferida
// lazy carga las páginas solo cuando se necesitan

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const AppLayout = lazy(() => import("../components/AppLayout"));
const HomePage = lazy(() => import("../pages/HomePage"));
const ListaPage = lazy(() => import("../pages/ListaPage"));
const DetallesPage = lazy(() => import("../pages/DetallesPage"));
const DetallesStatePage = lazy(() => import("../pages/DetallesStatePage"));
const AdministracionPage = lazy(() => import("../pages/AdministracionPage"));
const NoPage = lazy(() => import("../pages/NoPage"));

function AppEnrutador() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Cargando página...</div>}>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="lista" element={<ListaPage />} />
            <Route path="detalles/:id" element={<DetallesPage />} />
            <Route path="detallesstate" element={<DetallesStatePage />} />
            <Route path="administracion" element={<AdministracionPage />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppEnrutador;

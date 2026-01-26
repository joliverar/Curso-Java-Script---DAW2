import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CochesPage from "../pages/CochesPage";
import CocheFormPage from "../pages/CocheFormPage";
import ErrorPage from "../pages/NoPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout general */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coches" element={<CochesPage />} />
          <Route path="/coches/:id" element={<CocheFormPage />} />

          {/* Ruta error */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

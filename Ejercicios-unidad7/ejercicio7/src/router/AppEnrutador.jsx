import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/Layout";
import ProtectedRoute from "./ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CochesPage from "../pages/CochesPage";
import CocheFormPage from "../pages/CocheFormPage";
import ErrorPage from "../pages/NoPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/coches"
            element={
              <ProtectedRoute>
                <CochesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/coches/nuevo"
            element={
              <ProtectedRoute>
                <CocheFormPage />
              </ProtectedRoute>
            }
          />

          <Route path="/coches/:id" element={<CocheFormPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

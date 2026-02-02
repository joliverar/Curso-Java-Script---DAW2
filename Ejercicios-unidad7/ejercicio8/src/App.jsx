import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import RutaProtegida from "./routes/RutaProtegida";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";

import PacientesPage from "./pages/pacientes/PacientesPage";
import PacienteForm from "./pages/pacientes/PacienteForm";
import ExpedientesPage from "./pages/expedientes/ExpedientesPage";
import ExpedienteForm from "./pages/expedientes/ExpedienteForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/pacientes"
            element={
              <RutaProtegida roles={["gestion", "admin"]}>
                <PacientesPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/pacientes/nuevo"
            element={
              <RutaProtegida roles={["gestion", "admin"]}>
                <PacienteForm />
              </RutaProtegida>
            }
          />
          <Route
            path="/expedientes/:id"
            element={
              <RutaProtegida roles={["medico", "admin"]}>
                <ExpedienteForm />
              </RutaProtegida>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route
          path="/expedientes"
          element={
            <RutaProtegida roles={["medico", "admin"]}>
              <ExpedientesPage />
            </RutaProtegida>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

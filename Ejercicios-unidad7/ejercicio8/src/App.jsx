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
import UsuarioForm from "./pages/usuarios/UsuarioForm";
import UsuariosPage from "./pages/usuarios/UsuariosPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/usuarios"
            element={
              <RutaProtegida roles={["gestion", "admin"]}>
                <UsuariosPage />
              </RutaProtegida>
            }
          />

          <Route
            path="/usuarios/nuevo"
            element={
              <RutaProtegida roles={["gestion", "admin"]}>
                <UsuarioForm />
              </RutaProtegida>
            }
          />

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
          
          <Route
          path="/expedientes"
          element={
            <RutaProtegida roles={["medico", "admin"]}>
              <ExpedientesPage />
            </RutaProtegida>
          }
        />
        <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

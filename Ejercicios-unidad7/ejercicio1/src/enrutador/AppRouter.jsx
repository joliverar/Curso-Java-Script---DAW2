import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../pages/HomePage";
import TareasListado from "../pages/TareasListado";
import TareaForm from "../pages/TareaForm";
import TareaDetalle from "../pages/TareaDetalle";
import NoPage from "../pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout principal */}
        <Route path="/" element={<Layout />}>
          {/* Home */}
          <Route index element={<HomePage />} />

          {/* Tareas */}
          <Route path="tareas" element={<TareasListado />} />
          <Route path="tareas/crear" element={<TareaForm />} />
          <Route path="tareas/editar/:id" element={<TareaForm />} />
          <Route path="tareas/:id" element={<TareaDetalle />} />

          {/* Página 404 */}
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

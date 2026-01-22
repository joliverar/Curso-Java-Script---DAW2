import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import HomePage from "../pages/HomePage";
import ListaPage from "../pages/ListaPage";
//import DetallesPage from "../pages/DetallesPage";
//import DetallesStatePage from "../pages/DetallesStatePage";
//import AdministracionPage from "../pages/AdministracionPage";
import NoPage from "../pages/NoPage";
function AppEnrutador() {
    return (
        <BrowserRouter>
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
        </BrowserRouter>

    );
}
export default AppEnrutador;
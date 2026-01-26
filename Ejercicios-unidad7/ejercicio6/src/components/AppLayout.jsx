// Importamos Outlet para renderizar las páginas hijas según la ruta
import { Outlet } from "react-router-dom";
// Importamos el menú de navegación
import AppMenu from "./AppMenu";

// Componente Layout principal de la aplicación
function AppLayout() {
  return (
    <>
      {/* Menú que se muestra en todas las páginas */}
      <AppMenu />

      {/* Contenedor principal donde se cargan las páginas */}
      <main>
        {/* Outlet indica dónde se renderiza la ruta actual */}
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;

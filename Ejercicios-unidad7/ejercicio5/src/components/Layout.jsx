function Layout({ formulario, filtros, listado }) {
  return (
    <>
      <header className="header">
        Gestión de ventas
      </header>

      <main className="app">
        <section className="panel panel--form">
          {formulario}
        </section>

        <section className="panel panel--list">
          <div className="tools">
            {filtros}
          </div>

          <div className="info">
            {listado}
          </div>
        </section>
      </main>
    </>
  );
}

export default Layout;

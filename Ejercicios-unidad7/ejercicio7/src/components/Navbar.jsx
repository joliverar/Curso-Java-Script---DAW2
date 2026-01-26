import { Link } from "react-router-dom";
function Navbar(){
    return (<>
    <h1>Página de Menu</h1>
     <nav style={{ display: "flex", gap: "1rem" }}>
      <Link to="/"  >Inicio</Link>
      <Link to="/coches" >Coches</Link>
      <Link to="/login" >Login</Link>
      <Link to="/*" >Lo quqe sea</Link>
    </nav>
    </>)
}
export default Navbar;
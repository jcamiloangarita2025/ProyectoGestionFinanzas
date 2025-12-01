import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import NuevoRegistroF from "./pages/NuevoRegistroF";
import ReportesF from "./pages/ReportesF";

function App() {
  return (
    <Router>
      <Routes>

        {/* Página inicial */}
        <Route path="/" element={<Login />} />

        {/* Registro */}
        <Route path="/register" element={<Register />} />

        {/* Menú principal */}
        <Route path="/menu/:username" element={<Menu />} />

        {/* Crear movimientos */}
        <Route path="/nuevoregistroF/:username" element={<NuevoRegistroF />} />

        {/* Listar movimientos */}
        <Route path="/reportesF/:username" element={<ReportesF />} />

      </Routes>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/Menu";
import NuevoRegistroF from "./pages/NuevoRegistroF";
import ReportesF from "./pages/ReportesF";

//Definir comportamiento principal de la App, indica que componentes mostrar a partir de los url

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

        {/* Crear registros financieros */}
        <Route path="/nuevoregistroF/:username" element={<NuevoRegistroF />} />

        {/* Reporte Financiero */}
        <Route path="/reportesF/:username" element={<ReportesF />} />

      </Routes>
    </Router>
  );
}

export default App;
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/menu.css';

export default function Menu() {
  const { username } = useParams();
  const nav = useNavigate();
  if (!username) return <div className="no-access">No tienes acceso</div>;

  return (
  <div className="menu-page">

    {/* HEADER SUPERIOR */}
    <header className="menu-header">
      <div className="menu-left">
        <span className="menu-icon">☰</span>
        <span className="menu-title"> Finanzas personales de {username} </span>
      </div>
      <button className="menu-close-btn" onClick={() => nav('/')}>✕</button>
    </header>

    {/* CONTENIDO CENTRAL */}
    <div className="menu-container">

      <div className="menu-grid">

        <Link to={`/nuevoregistroF/${encodeURIComponent(username)}`} className="menu-card">
          Crear <br /> Registro Financiero
        </Link>

        <Link to={`/reportesF/${encodeURIComponent(username)}`} className="menu-card">
          Reportes <br /> Financieros
        </Link>

        <div className="menu-card">
          Calendario <br /> Financiero
        </div>

        <div className="menu-card single">
          Bolsillo <br /> Financiero
        </div>

      </div>
    </div>

    {/* FOOTER */}
    <footer className="menu-footer">
      DigitalWave Solutions - 2024
    </footer>
  </div>
);
}
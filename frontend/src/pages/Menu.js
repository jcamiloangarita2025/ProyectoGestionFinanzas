import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/menu.css';
import '../styles/header1.css';
import '../styles/footer1.css';

//Frontend del menu (despues de hacer login)

export default function Menu() {
    const { username } = useParams();
    const nav = useNavigate();
    if (!username) return <div className="no-access">No tienes acceso</div>;

    return (
    <div className="menu-page">

      <header className="app-header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <h1>Finanzas personales de {username}</h1>
      </div>
      <button className="btn-cerrar" onClick={() => nav(`/`)}>✕</button>
    </header>

      <div className="menu-container">
        <div className="menu-grid">

          <Link to={`/nuevoregistroF/${encodeURIComponent(username)}`} className="menu-card">
            Crear <br /> Registro Financiero
          </Link>

          <Link to={`/reportesF/${encodeURIComponent(username)}`} className="menu-card">
            Reportes <br /> Financieros
          </Link>

          <Link to={`/calendario/${encodeURIComponent(username)}`} className="menu-card">
            Calendario <br /> Financiero
          </Link>

          <div className="menu-card single">
            Bolsillo <br /> Financiero
          </div>

        </div>
      </div>
      {/* FOOTER */}
        <footer className="menu-footer">
          DigitalWave Solutions - 2025
        </footer>
    </div>
  );
}
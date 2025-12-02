import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/nuevoregistroF.css';

// Frontend para hacer registro financiero
export default function NuevoRegistroF() {
  const { username } = useParams();
  const nav = useNavigate();
  const [descripcion, setDescripcion] = useState('');
  const [monto, setMonto] = useState('');
  const [tipo, setTipo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [responsable, setResponsable] = useState('');
  const [fechaMovimiento, setFechaMovimiento] = useState('');

  if (!username) return <div className="no-access">No tienes acceso</div>;

   //Enviar al backend informacion del formulario (POST)
  const submit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:4000/api/registrosF', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: username, descripcion, monto: Number(monto),tipo,categoria,responsable,fechaMovimiento })
    });
    alert("Registro financiero guardado correctamente");
    nav(`/menu/${encodeURIComponent(username)}`);
  };

  return (
  <div className="crear-page">
    <header className="crear-header-bar">
      <div className="crear-header-left">
        <span className="crear-menu-icon">☰</span>
        <span className="crear-title-bar">
          Finanzas personales de {username}
        </span>
      </div>
      <button className="crear-close-btn" onClick={() => nav(`/menu/${encodeURIComponent(username)}`)}> ✕ </button>
    </header>

    <main className="crear-content">
      <div className="crear-card">

        <h2 className="crear-title">Crear nuevo registro</h2>

        <form onSubmit={submit} className="crear-form">

          <input type="date" placeholder="Fecha realización" value={fechaMovimiento} onChange={e => setFechaMovimiento(e.target.value)}
            required
          />
          <input placeholder="Nombre registro" value={descripcion} onChange={e => setDescripcion(e.target.value)} required
          />
          <input  placeholder="Cantidad Monetaria" type="number" value={monto} onChange={e => setMonto(e.target.value)} required
          />
          <select value={tipo} onChange={e => setTipo(e.target.value)}required>
            <option value="">Seleccione tipo</option>
            <option value="Gasto">Gasto</option>
            <option value="Ingreso">Ingreso</option>
          </select>

          <input placeholder="Categoría" value={categoria} onChange={e => setCategoria(e.target.value)} required/>
          <input placeholder="Responsable" value={responsable} onChange={e => setResponsable(e.target.value)} required/>

          <button type="submit" className="crear-btn">
            Crear registro Financiero
          </button>
        </form>

      </div>
    </main>

    {/*FOOTER */}
    <footer className="crear-footer">
      DigitalWave Solutions - 2024
    </footer>

  </div>
);
}
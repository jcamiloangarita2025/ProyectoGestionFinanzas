import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/nuevoEvento.css";

export default function NuevoEvento() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: username,
    titulo: "",
    monto: "",
    tipo: "",
    categoria: "",
    responsable: "",
    fechaEvento: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardar = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:4000/api/eventos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    alert("Evento creado con exito");
    navigate(`/calendario/${username}`);
  };

  return (
  <div className="nuevo-evento-page">

    <header className="app-header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <h1>Finanzas personales de {username}</h1>
      </div>

      <button className="btn-cerrar" onClick={() => navigate(`/menu/${encodeURIComponent(username)}`)}>✕</button>
    </header>

    {/* CONTENIDO */}
    <main className="contenido-evento">
      <form onSubmit={guardar} className="form-evento">

        <h2>Crear nuevo evento</h2>

        <input name="titulo" placeholder="Título del evento" onChange={handleChange} required/>

        <input name="monto" type="number" placeholder="Monto" onChange={handleChange} required/>

        <select name="tipo" onChange={handleChange} required>
          <option value="">Seleccione tipo</option>
          <option value="Gasto">Gasto</option>
          <option value="Ingreso">Ingreso</option>
        </select>

        <input name="categoria" placeholder="Categoría" onChange={handleChange} required/>
        <input name="responsable" placeholder="Responsable" onChange={handleChange} required/>
        <input name="fechaEvento" type="date" onChange={handleChange} required/>
        <button>Guardar evento</button>

      </form>
    </main>

    {/* FOOTER */}
    <footer className="footer-evento">
      DigitalWave Solutions - 2025
    </footer>

  </div>
);

}

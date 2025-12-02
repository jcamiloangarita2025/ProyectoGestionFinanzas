import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

    navigate(`/calendario/${username}`);
  };

  return (
    <div className="nuevo-evento-page">

      <h2>Crear nuevo evento</h2>

      <form onSubmit={guardar} className="form-evento">

        <input
          name="titulo"
          placeholder="Título del evento"
          onChange={handleChange}
          required
        />

        <input
          name="monto"
          type="number"
          placeholder="Monto"
          onChange={handleChange}
          required
        />

        <select name="tipo" onChange={handleChange} required>
          <option value="">Seleccione tipo</option>
          <option value="Gasto">Gasto</option>
          <option value="Ingreso">Ingreso</option>
        </select>

        <input
          name="categoria"
          placeholder="Categoría"
          onChange={handleChange}
          required
        />

        <input
          name="responsable"
          placeholder="Responsable"
          onChange={handleChange}
          required
        />

        <input
          name="fechaEvento"
          type="date"
          onChange={handleChange}
          required
        />

        <button>Guardar evento</button>

      </form>
    </div>
  );
}

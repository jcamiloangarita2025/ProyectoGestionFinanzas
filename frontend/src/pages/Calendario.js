import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/calendario.css";

export default function Calendario() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [eventos, setEventos] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({});

  //  Cargar eventos del usuario
  useEffect(() => {
    if (!username) return;

    fetch(`http://localhost:4000/api/eventos?user=${encodeURIComponent(username)}`)
    .then(res => res.json())
    .then(data => organizarPorMes(data));

    const revisarEventosVencidos = async () => {
        const r = await fetch(
            `http://localhost:4000/api/eventos/vencidos?user=${encodeURIComponent(username)}`
        );

        const data = await r.json();

        if (Array.isArray(data) && data.length > 0) {
            const titulos = data.map(ev => `• ${ev.titulo}`).join("\n");

            alert(
            `⚠️ Los siguientes eventos ya pasaron:\n\n${titulos}`
            );
        }
    };


    revisarEventosVencidos();
  }, [username]);

  // Agrupar por mes y año automáticamente
  const organizarPorMes = (lista) => {
    const agrupados = {};

    lista.forEach(ev => {
      const fecha = new Date(ev.fechaEvento);
      const mes = fecha.toLocaleString("es-ES", { month: "long" });
      const anio = fecha.getFullYear();
      const clave = `${mes} ${anio}`;

      if (!agrupados[clave]) agrupados[clave] = [];
      agrupados[clave].push(ev);
    });

    setEventos(agrupados);
  };

  //  Iniciar edición en línea
  const editarEvento = (evento) => {
    setEditandoId(evento._id);
    setFormEdit({
      ...evento,
      fechaEvento: evento.fechaEvento?.split("T")[0]
    });
  };

  //  Cambios en inputs
  const handleChangeEdit = (e) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    });
  };

  //  Guardar edición
  const guardarEdicion = async () => {
    await fetch(`http://localhost:4000/api/eventos/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formEdit)
    });

    setEditandoId(null);
    window.location.reload();
  };

  //  Eliminar evento
  const borrarEvento = async (id) => {
    if (!window.confirm("¿Eliminar este evento?")) return;

    await fetch(`http://localhost:4000/api/eventos/${id}`, {
      method: "DELETE"
    });

    window.location.reload();
  };


  const registrarEvento = async (evento) => {

        const confirmar = window.confirm(
            `¿Desea registrar este evento como movimiento financiero?\n\n${evento.titulo}`
        );

        if (!confirmar) return;

        const r = await fetch(
            `http://localhost:4000/api/eventos/registrar/${evento._id}`,
            {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                usuario: username   // VIENE DIRECTO DE LA URL
            })
            }
        );

        const data = await r.json();

        if (data.ok) {
            alert("Evento registrado correctamente");
            window.location.reload();
        } else {
            alert("Error al registrar evento");
        }
  };


  return (
  <div className="calendario-container">

    <header className="app-header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <h1>Finanzas personales de {username}</h1>
      </div>

      <button className="btn-cerrar" onClick={() => navigate(`/menu/${encodeURIComponent(username)}`)}>✕</button>
    </header>

    <main className="calendario-page">

      <h2 className="titulo-seccion">
        Calendario Financiero de {username}
      </h2>
      <div className="tabla-head">
        <span>Fecha Evento</span>
        <span>Título</span>
        <span>Categoría</span>
        <span>Monto</span>
        <span>Tipo</span>
        <span>Responsable</span>
        <span>Acciones</span>
      </div>

      {Object.keys(eventos).map(mes => (
        <div key={mes} className="bloque-mes">

          <h3 className="titulo-mes">{mes.toUpperCase()}</h3>

          {eventos[mes].map(ev => (
            <div key={ev._id} className="fila-evento">

              {editandoId === ev._id ? (
                <>
                  <input name="fechaEvento" type="date" value={formEdit.fechaEvento} onChange={handleChangeEdit} />
                  <input name="titulo" value={formEdit.titulo} onChange={handleChangeEdit} />
                  <input name="categoria" value={formEdit.categoria} onChange={handleChangeEdit} />
                  <input name="monto" type="number" value={formEdit.monto} onChange={handleChangeEdit} />

                  <select name="tipo" value={formEdit.tipo} onChange={handleChangeEdit}>
                    <option value="Gasto">Gasto</option>
                    <option value="Ingreso">Ingreso</option>
                  </select>

                  <input name="responsable" value={formEdit.responsable} onChange={handleChangeEdit} />

                  <div className="acciones">
                    <button onClick={guardarEdicion}>✅</button>
                    <button onClick={() => setEditandoId(null)}>❌</button>
                  </div>
                </>
              ) : (
                <>
                  <span>{ev.fechaEvento.split("T")[0]}</span>
                  <span>{ev.titulo}</span>
                  <span>{ev.categoria}</span>
                  <span>${ev.monto}</span>
                  <span className={ev.tipo === "Gasto" ? "tipo-gasto" : "tipo-ingreso"}>
                    {ev.tipo}
                  </span>
                  <span>{ev.responsable}</span>

                  <div className="acciones">
                    <button onClick={() => editarEvento(ev)}>✏️</button>
                    <button onClick={() => borrarEvento(ev._id)}>🗑️</button>
                    <button onClick={() => registrarEvento(ev)}>📥</button>
                  </div>
                </>
              )}

            </div>
          ))}
        </div>
      ))}

      <button
        className="btn-crear"
        onClick={() => navigate(`/nuevoEvento/${username}`)}
      >
        +
        <span>Crear nuevo Evento</span>
      </button>

    </main>

    <footer className="app-footer">
      <p>DigitalWave Solutions - 2025</p>
    </footer>

  </div>
);
}

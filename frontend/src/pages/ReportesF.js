import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/reportes.css';
import '../styles/header1.css';
import '../styles/footer1.css';

// Frontend de reportes financieros (Lista de registros)
export default function ReportesF() {
  const { username } = useParams();
  const nav = useNavigate();
  const [lista, setLista] = useState([]);
  const [editId, setEditId] = useState(null);

  // Estados para la edicion
  const [editDesc, setEditDesc] = useState('');
  const [editMonto, setEditMonto] = useState('');
  const [editTipo, setEditTipo] = useState('');
  const [editCategoria, setEditCategoria] = useState('');
  const [editResponsable, setEditResponsable] = useState('');
  const [editFechaMovimiento, setEditFechaMovimiento] = useState('');

  //Obtener registros con username
  const cargar = useCallback(async () => {
    if (!username) return;

    const r = await fetch(
      `http://localhost:4000/api/registrosF?user=${encodeURIComponent(username)}`
    );

    const data = await r.json();

    // Si no encuentra registros devuelve lista vacía
    if (!Array.isArray(data)) {
      setLista([]);
      return;
    }

    setLista(data);

  }, [username]); 

  useEffect(() => {
    cargar();
  }, [cargar]);

  //Envia al backend peticion de borrar registro con id registro
  const borrar = async (id) => {
    if (!window.confirm("¿Eliminar este registro?")) return;

    await fetch(`http://localhost:4000/api/registrosF/${id}`, {
      method: 'DELETE'
    });
    cargar();
  };


  //Variables para editar informacion
  const iniciarEdicion = (m) => {
    setEditId(m._id);
    setEditDesc(m.descripcion);
    setEditMonto(m.monto);
    setEditTipo(m.tipo);
    setEditCategoria(m.categoria);
    setEditResponsable(m.responsable);

    // Convertir a tipo de dato DATE
    setEditFechaMovimiento(
      new Date(m.fechaMovimiento).toISOString().split('T')[0]
    );
  };

  //Enviar al backend peticion para actualizar registro con id y nueva informacion
  const guardarEdicion = async () => {
    await fetch(`http://localhost:4000/api/registrosF/${editId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: editDesc,
        monto: Number(editMonto),
        tipo: editTipo,
        categoria: editCategoria,
        responsable: editResponsable,
        fechaMovimiento: editFechaMovimiento
      })
    });

    setEditId(null);
    cargar();
  };

  if (!username) return <div className="no-data">No tienes acceso</div>;

  //Frontend HTML
  return (
    <div className="reportes-page">

     <header className="app-header">
      <div className="header-left">
        <span className="menu-icon">☰</span>
        <h1>Finanzas personales de {username}</h1>
      </div>

      <button className="btn-cerrar" onClick={() => nav(`/menu/${encodeURIComponent(username)}`)}>✕</button>
    </header>

      {/* CONTENIDO */}
    <main className="reportes-content">

      <h2 className="reportes-title">Registros Financieros de {username}</h2>
      {lista.length === 0 && (
        <p className="no-data">No hay movimientos registrados</p>
      )}

      <div className="tabla-container">

        {/* CABECERA DE TABLA */}
        <div className="tabla-header">
          <span>Fecha</span>
          <span>Título</span>
          <span>Categoría</span>
          <span>Monto</span>
          <span>Tipo</span>
          <span>Responsable</span>
          <span>Creado</span>
          <span>Editado</span>
          <span>Acciones</span>
        </div>

        {/* FILAS */}
        {lista.map((m) => (
          <div className="tabla-row-card" key={m._id}>

            {editId === m._id ? (
              <div className="edit-box-grid">
                <input type="date" value={editFechaMovimiento} onChange={(e) => setEditFechaMovimiento(e.target.value)} />
                <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                <input type="number" value={editMonto} onChange={(e) => setEditMonto(e.target.value)} />
                <select value={editTipo}
                  onChange={(e) => setEditTipo(e.target.value)}>
                  <option value="Gasto">Gasto</option>
                  <option value="Ingreso">Ingreso</option>
                </select>
                <input value={editCategoria} onChange={(e) => setEditCategoria(e.target.value)} />

                <input value={editResponsable} onChange={(e) => setEditResponsable(e.target.value)} />

                <div className="acciones">
                  <button onClick={guardarEdicion} className="btn-save">✓</button>
                  <button onClick={() => setEditId(null)} className="btn-cancel">×</button>
                </div>

              </div>
            ) : (
              <>
                <span>{m.fechaMovimiento.split("T")[0]}</span>
                <span className="titulo">{m.descripcion}</span>
                <span>{m.categoria}</span>
                <span className="monto">${m.monto}</span>

                <span className={m.tipo === 'Gasto' ? 'tipo-gasto' : 'tipo-ingreso'}>
                  {m.tipo}
                </span>

                <span>{m.responsable}</span>
                <span>{new Date(m.createdAt).toLocaleDateString("es-CO")}</span>
                <span>{new Date(m.updatedAt).toLocaleDateString("es-CO")}</span>

                <div className="acciones">
                  <button onClick={() => iniciarEdicion(m)} className="btn-edit">✎</button>
                  <button onClick={() => borrar(m._id)} className="btn-delete">🗑</button>
                </div>
              </>
            )}

          </div>
        ))}
      </div>

      <button className="btn-add" onClick={() => nav(`/nuevoregistroF/${username}`)}>
        + <span>Crear nuevo Registro</span> </button>

    </main>
      <footer className="app-footer">
      <p>DigitalWave Solutions - 2025</p>
    </footer>
    </div>
  );
}

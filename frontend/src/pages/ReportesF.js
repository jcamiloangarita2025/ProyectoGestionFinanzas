import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/reportes.css';

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
  const cargar = async () => {
    if (!username) return;
    const r = await fetch(
      `http://localhost:4000/api/registrosF?user=${encodeURIComponent(username)}`
    );
    const data = await r.json();
    
    //Si no encuentra registros devuelve lista vacia
    if (!Array.isArray(data)) { 
      setLista([]); 
      return;
  }
    setLista(data);
  };

  useEffect(() => {
    cargar();
  }, [username]);

  //Envia al backend peticion de borrar registro con id registro
  const borrar = async (id) => {
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

  if (!username) return <div className="no-access">No tienes acceso</div>;

  //Frontend HTML
  return (
    <div className="reportes-page">

      <header className="reportes-header-bar">
        <div className="reportes-header-left">
          <span className="reportes-menu-icon">☰</span>
          <span className="reportes-title-bar">
            Finanzas personales de {username}
          </span>
        </div>

        <button className="reportes-close-btn" onClick={() => nav(`/menu/${encodeURIComponent(username)}`)}>
          ✕
        </button>
      </header>

      <main className="reportes-content">

        <h2 className="reportes-title">
          Registros Financieros de {username}
        </h2>

        {lista.length === 0 && (
          <p className="no-data">No hay movimientos registrados</p>
        )}

        <div className="reportes-table">

          <div className="reportes-header">
            <span>Fecha Realizacion</span>
            <span>Título</span>
            <span>Categoria</span>
            <span>Monto</span>
            <span>Tipo</span>
            <span>Fecha Registro</span>
            <span>Responsable</span>
            
            
          </div>


          {lista.map((m) => (
            <div className="reportes-row" key={m._id}>

              {editId === m._id ? (
                <div className="edit-box-full">

                  <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
                  <input type="number" value={editMonto} onChange={(e) => setEditMonto(e.target.value)} />

                  <select value={editTipo} onChange={(e) => setEditTipo(e.target.value)}>
                    <option value="Gasto">Gasto</option>
                    <option value="Ingreso">Ingreso</option>
                  </select>

                  <input value={editCategoria} onChange={(e) => setEditCategoria(e.target.value)} />
                  <input value={editResponsable} onChange={(e) => setEditResponsable(e.target.value)} />

                  <input
                    type="date"
                    value={editFechaMovimiento}
                    onChange={(e) => setEditFechaMovimiento(e.target.value)}
                  />

                  <div className="edit-actions">
                    <button onClick={guardarEdicion}>Guardar</button>
                    <button onClick={() => setEditId(null)}>Cancelar</button>
                  </div>

                </div>
              ) : (
                <>
                  <span>{new Date(m.fechaMovimiento).toLocaleDateString()}</span>
                  <span>{m.descripcion}</span>
                  <span>{m.categoria}</span>
                  <span>${m.monto}</span>

                  <span
                    className={m.tipo === 'Gasto' ? 'tipo-gasto' : 'tipo-ingreso'}
                  >
                    {m.tipo}
                  </span>

                  <span>{new Date(m.createdAt).toLocaleDateString()}</span>
                  <span>{m.responsable}</span>

                  <div className="acciones">
                    <button onClick={() => iniciarEdicion(m)}>✎</button>
                    <button onClick={() => borrar(m._id)} className="btn-delete">
                      🗑
                    </button>
                  </div>
                </>
              )}

            </div>
          ))}

        </div>

        <div className="nuevo-registro">
          
          <Link to={`/nuevoregistroF/${encodeURIComponent(username)}`}>
          <span>+</span>
          </Link>
          <p>Crear nuevo Registro</p>
        </div>

      </main>
      <footer className="reportes-footer">
        DigitalWave Solutions - 2024
      </footer>

    </div>
  );
}

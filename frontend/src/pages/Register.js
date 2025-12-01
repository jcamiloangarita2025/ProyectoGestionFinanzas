import { useState } from 'react';
import { useNavigate, Link} from 'react-router-dom';
import '../styles/register.css';

// Frontend para registrar usuario
export default function Register() {
  
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  //Enviar al backend informacion del formulario (POST)
  const submit = async (e) => {
    e.preventDefault();
    const r = await fetch('http://localhost:4000/api/auth/register', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, correo, username, password })
    });
    const data = await r.json();
    if (data.ok) {
      alert('Usuario creado');
      nav('/');
    } else {
      alert(data.message || 'Error');
    }
  };

  return (
    <div className="register-page">

      <header className="top-bar">
        
        <Link to="/">
          <button className="close-btn">✕</button>
        </Link>
      </header>

      <div className="register-card">
        <h1 className="app-title">Gestión Finanzas Personales</h1>
        
        <div className="login-image">
          <img src="/media/applogo.png" alt="Logo" />
        </div>

        <h2>Registrar usuario</h2>
        <p className="subtitle">Completa tus datos</p>

        <form onSubmit={submit}>

          <input placeholder="Nombre" value={nombre}  onChange={e => setNombre(e.target.value)} required />
          <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required/>
          <input placeholder="Correo" value={correo} onChange={e => setCorreo(e.target.value)}required/>
          <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} required/>
          <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit">REGISTRAR</button>
        </form>

        <Link className="register-link" to="/register">Crear cuenta</Link>

        <footer className="register-footer">
          DigitalWave Solutions - 2024
        </footer>
      </div>
    </div>
  );
}
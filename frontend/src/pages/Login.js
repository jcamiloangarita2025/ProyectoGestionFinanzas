import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

//Frontend del login 

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    //Enviar al backend informacion del formulario (POST)
    try{
      const r = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
      });
      const data = await r.json();
      if (data.ok) {
        nav(`/menu/${encodeURIComponent(username)}`);
      } else {
        alert(data.message || 'Credenciales incorrectas');
      }
    } catch(err){
      console.error(err);
      alert('Error de conexión con el servidor');
    }
  };

  //Interfaz virtual del frontend en HTML
  return (
    <div className="login-page">
      
      <header className="top-bar">
      </header>

      <div className="login-card">
        <h1 className="app-title">Gestión Finanzas Personales</h1>

      
        <div className="login-image">
          { <img src="/media/applogo.png" alt="Logo" /> }
        </div>

        <h2>Ingresar a cuenta</h2>
        <p className="subtitle">Rellena la información</p>

        <form onSubmit={submit}>
          <input placeholder="Usuario"   value={username}  onChange={e => setUsername(e.target.value)}required/>
          <input  placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit">INGRESAR</button>
        </form>

        <Link className="register-link" to="/register">Crear cuenta</Link>

        <footer className="login-footer">
          DigitalWave Solutions - 2024
        </footer>
      </div>
    </div>
  );
}
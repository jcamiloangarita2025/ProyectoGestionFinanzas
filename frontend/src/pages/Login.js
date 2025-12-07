import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';
import '../styles/header1.css';
import '../styles/footer1.css';

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
      
      <header className="app-header">
      <div className="header-left">
        <span className="menu-icon"></span>
       
      </div>
      </header>

      <div className="login-card">
          <form onSubmit={submit} className="form-login">
            <h1 className="app-title">Gestión Finanzas Personales</h1>

        
          <div className="login-image">
            { <img src="/media/applogo.png" alt="Logo" /> }
          </div>

          <h2>Ingresar a cuenta</h2>
          <p className="subtitle">Rellena la información</p>
          <input placeholder="Usuario"   value={username}  onChange={e => setUsername(e.target.value)}required/>
          <input  placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <button type="submit">INGRESAR</button>
          <Link className="register-link" to="/register">CREAR CUENTA</Link>
        </form>
      </div>
       {/* FOOTER */}
        <footer className="footer-evento">
          DigitalWave Solutions - 2025
        </footer>
    </div>
  );
}
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  // Establecer el tiempo de inactividad en 10 minutos (600000 milisegundos)
  const inactivityTimeout = 600000;
  let inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, inactivityTimeout);
  }

  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        console.log(JSON.stringify(userInfo) +  'aca deberia aparecer los datos SUPUESTAMENTE AL LLAMARLO ES POR QUE ES EL');
      });
    });

    // Reiniciar el temporizador de inactividad cuando hay interacción del usuario
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("mousedown", resetInactivityTimer);
    document.addEventListener("keypress", resetInactivityTimer);
    document.addEventListener("touchmove", resetInactivityTimer);
    document.addEventListener("touchstart", resetInactivityTimer);
  }, []);

 
  function logout() {
    // Limpiar las cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Limpiar la información del usuario en el contexto
    setUserInfo(null);

    // Recargar la página para redirigir a la raíz
    window.location.reload();
  }

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;
  
  return (
    <header>
      <Link to="/" className="logo">Inicio</Link>
      <nav>
        {username && (
          <>
            <img className="author-avatar-img" src={`https://backend-blog-psi.vercel.app/` + profilePicture} alt="Profile picture" />
            <Link to="/create" className="login">Create new post</Link>
            <a onClick={logout} className="register">Logout ({username})</a>
          </>
        )}
        {!username && (
          <>
            <img className="img-sentidos" src={sentidos} alt="Sentidos" />
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="login">register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

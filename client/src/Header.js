import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    })
  }, []);

  // Definir el tiempo de inactividad en 5 minutos (300000 milisegundos)
  const inactivityTimeout = 300000;
  let inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, inactivityTimeout);
  }

  useEffect(() => {
    // Reiniciar el temporizador de inactividad cuando hay interacción del usuario
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('mousedown', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('touchmove', resetInactivityTimer);
    document.addEventListener('touchstart', resetInactivityTimer);

    // Llamar a la función logout después de 5 minutos de inactividad
    resetInactivityTimer();

    return () => {
      // Limpiar los event listeners al desmontar el componente
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('mousedown', resetInactivityTimer);
      document.removeEventListener('keypress', resetInactivityTimer);
      document.removeEventListener('touchmove', resetInactivityTimer);
      document.removeEventListener('touchstart', resetInactivityTimer);
    };
  }, []);

  function logout() {
    fetch('https://backend-blog-psi.vercel.app/logout', {
      credentials: 'include',
      method: 'POST',
    });

    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    setUserInfo(null);
    setRedirect(true);
    window.location.reload();
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;
  console.log(profilePicture + 'fotos de perfil en login')
  console.log(JSON.stringify(profilePicture )+ 'fotos de perfil desde login')

  return (
    <header>
      <Link to="/" className="logo">Inicio</Link>
      <nav>
        {username && (
          <>
            <img className="author-avatar-img" src={ profilePicture} alt="Profile picture" />
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

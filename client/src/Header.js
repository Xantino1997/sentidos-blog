
import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';
import { Link, Redirect } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    fetch(`https://backend-blog-psi.vercel.app/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        console.log(JSON.stringify(userInfo) +  'aca deberia aparecer los datos SUPUESTAMENTE AL LLAMARLO ES POR QUE ES EL');
      });
    });
  }, []);

 
  // Definir el tiempo de inactividad en 2 minutos (120000 milisegundos)
const inactivityTimeout = 600000;
let inactivityTimer;

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(logout, inactivityTimeout);
}

// Reiniciar el temporizador de inactividad cuando hay interacción del usuario
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('mousedown', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('touchmove', resetInactivityTimer);
document.addEventListener('touchstart', resetInactivityTimer);

function logout() {
  fetch('https://backend-blog-psi.vercel.app/logout', {
    credentials: 'include',
    method: 'POST',
  });

  setUserInfo(null);
  setRedirect(true);
}


if (redirect) {
  return <Redirect to="/" />;
}

// Llamar a la función logout después de 2 minutos de inactividad
resetInactivityTimer();


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



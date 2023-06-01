
import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
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

 
  function logout() {
    fetch('https://backend-blog-psi.vercel.app/logout', {
      credentials: 'include',
      method: 'POST',
    });
  
    // Obtener la fecha actual
    const currentDate = new Date();
  
    // Calcular la fecha de expiración del cookie (10 minutos en el futuro)
    const expirationDate = new Date(currentDate.getTime() + 10 * 60 * 1000); // 10 minutos en milisegundos
  
    // Convertir la fecha de expiración a formato UTC
    const expirationUTCString = expirationDate.toUTCString();
  
    // Limpiar las cookies estableciendo la fecha de expiración en 10 minutos en el futuro
    document.cookie = `token=; expires=${expirationUTCString}; path=/;`;
  
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



import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/profile`, {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const inactivityTimeout = 300000;
  let inactivityTimer;

  function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logout, inactivityTimeout);
  }

  useEffect(() => {
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('mousedown', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('touchmove', resetInactivityTimer);
    document.addEventListener('touchstart', resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('mousedown', resetInactivityTimer);
      document.removeEventListener('keypress', resetInactivityTimer);
      document.removeEventListener('touchmove', resetInactivityTimer);
      document.removeEventListener('touchstart', resetInactivityTimer);
    };
  }, []);

  function logout() {
    fetch('http://localhost:4000/logout', {
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

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="header-container">


      {username ? (

        <>
          <div className={`conteiner-creating`} >
            <Link to="/create" className={`nav-link-creating `}>
              Create new post
            </Link>
            {username && (
              <Link to="/noticia-rapida" className={`nav-link-creating`}>
                Noticia rápida
              </Link>
            )}
            <Link to="/" onClick={logout} className={`nav-link-creating `}>
              Logout ({username})
            </Link>
          </div>

          <img
            className={`author-avatar-img `}
            src={profilePicture}
            alt="Profile picture"
          />
        </>
      ) : (
        <>

          <img
            className={`img-sentidos`}
            src={sentidos}
            alt="Sentidos"
          />
          <Link to="/login" className={`login `}>
            Login
          </Link>
        </>
      )}


      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>

        {isMenuOpen && (

          <ul className={`nav-links`}>

            <li>
              <Link to="/nosotros" className={`nav-link-inside`}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/conocenos" className={`nav-link-inside`}>
                Conócenos
              </Link>
            </li>
            <li>
              <Link to="/eventos" className={`nav-link-inside`}>
                Eventos
              </Link>
            </li>

          </ul>
        )}

      </nav>

      <>
        <Link to="/" className={`inicio `}>
          Inicio
        </Link>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <div className="close-icon" onClick={closeMenu}>
              X
            </div>
          ) : (
            <>&#9776;</>
          )}
        </div>
      </>
    </header>
  );
}

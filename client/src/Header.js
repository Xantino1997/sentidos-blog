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
    fetch(`https://backend-blog-psi.vercel.app/profile`, {
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
    return <Navigate to="/#" />;
  }

  const username = userInfo?.username;
  const profilePicture = userInfo?.profilePicture || user;

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  function closeMenu() {
    setIsMenuOpen(true);
  }

  const navLinks = document.querySelectorAll('.nav-link');

  function handleMouseMovement() {
    if (navLinks) {
      navLinks.forEach((link) => {
        link.classList.add('active');
        alert('Click')
      });
      document.removeEventListener('mousemove', handleMouseMovement);
    }
  }


  // Agregar el evento para el movimiento del mouse
  document.addEventListener('click', handleMouseMovement);


  return (
    <header className="header-container">

      {username ? (

        <>
          <div className={`conteiner-creating`} >
            <Link to="/create" className={`nav-link-creating `}>
              Create new post
            </Link>
            
            <Link to="/createadvice" className={`nav-link-creating`}>
              Crear Evento
            </Link>

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
        </>
      )}


      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>

        {!isMenuOpen && (

          <ul className={`nav-links`}>


            <li>
              <Link to="/" className={`nav-link-inside `}>
                Inicio
              </Link>
            </li>


            <li>
              <Link to="/about" className={`nav-link-inside`}>
                Nosotros
              </Link>
            </li>
            <li>
              <Link to="/donar" className={`nav-link-inside`}>
                Donar
              </Link>
            </li>
            <li>
              <Link to="/events" className={`nav-link-inside`}>
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/login" className={`nav-link-inside`}>
                Login
              </Link>
            </li>
          </ul>
        )}

      </nav>

      <>

        <div className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? (
            <>&#9776;</>

          ) : (
            <div className="close-icon" onClick={closeMenu}>
              X
            </div>
          )}
        </div>
      </>
    </header>


  );
}

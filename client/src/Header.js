import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';
import { Link, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState(false);
  const [activeButton, setActiveButton] = useState('');

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

  return (
    <header className="header-container">

      {username ? (
        <>
          <div className="conteiner-creating">
            <Link
              to="/create"
              className={`nav-link-creating ${activeButton === 'create' ? 'active' : ''}`}
              onClick={() => setActiveButton('create')}
            >
              Create new post
            </Link>

            <Link
              to="/createadvice"
              className={`nav-link-creating ${activeButton === 'createadvice' ? 'active' : ''}`}
              onClick={() => setActiveButton('createadvice')}
            >
              Crear Evento
            </Link>

            <Link
              to="/"
              onClick={() => {
                logout();
                setActiveButton('logout');
              }}
              className={`nav-link-creating ${activeButton === 'logout' ? 'active' : ''}`}
            >
              Logout ({username})
            </Link>
          </div>

          <img
            className="author-avatar-img"
            src={profilePicture}
            alt="Profile picture"
          />
        </>
      ) : (
        <>
          <img
            className="img-sentidos"
            src={sentidos}
            alt="Sentidos"
          />
        </>
      )}

      <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>

        {!isMenuOpen && (
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link-inside">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link-inside">
                Conócenos
              </Link>
            </li>
            <li>
              <Link to="/donar" className="nav-link-inside">
                Donar
              </Link>
            </li>
            <li>
              <Link to="/events" className="nav-link-inside">
                Eventos
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link-inside">
                Login
              </Link>
            </li>
            <li>
              <button
                className={`nav-link-inside-btn ${activeButton === 'categories' ? 'active' : ''}`}
                onClick={() => {
                  setCategories(!categories);
                  setActiveButton('categories');
                }}
              >
                Categoría
              </button>
            </li>
          </ul>
        )}

        {categories && (
          <ul className={`sub-categories ${categories ? 'open' : ''}`}>
            <li>
              <Link to="/category/medicina" className="nav-link-inside-sub">
                Medicina
              </Link>
            </li>
            <li>
              <Link to="/category/psicologia" className="nav-link-inside-sub">
                Psicología
              </Link>
            </li>
            <li>
              <Link to="/category/bullying" className="nav-link-inside-sub">
                Bullying
              </Link>
            </li>
            <li>
              <Link to="/category/life" className="nav-link-inside-sub">
                Vida Cotidiana
              </Link>
            </li>
            <li>
              <Link to="/category/asesoramiento" className="nav-link-inside-sub">
                Asesoramiento
              </Link>
            </li>
          </ul>
        )}
      </nav>

      <div className="menu-toggle" onClick={toggleMenu}>
        {isMenuOpen ? (
          <>&#9776;</>
        ) : (
          <div className="close-icon" onClick={closeMenu}>
            X
          </div>
        )}
      </div>
    </header>
  );
}

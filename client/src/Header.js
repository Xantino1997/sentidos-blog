import { Link } from "react-router-dom";
import { useContext, useEffect,useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "./UserContext";
import sentidos from './assets/sentidos.png';
import user from './assets/user.png';


export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
<<<<<<< HEAD
    fetch(`https://sentidos-back-blog.vercel.app/profile`, {
=======
    fetch(`http://localhost:4000/profile`, {
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        console.log(JSON.stringify(userInfo) +  'aca deberia aparecer los datos SUPUESTAMENTE AL LLAMARLO ES POR QUE ES EL');
      });
    });
  }, []);

 
  function logout() {
<<<<<<< HEAD
    fetch('https://sentidos-back-blog.vercel.app/logout', {
=======
    fetch('http://localhost:4000/logout', {
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
      credentials: 'include',
      method: 'POST',
    });
    setUserInfo(null);
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
<<<<<<< HEAD
            <img className="author-avatar-img" src={`https://sentidos-back-blog.vercel.app/` + profilePicture} alt="Profile picture" />
=======
            <img className="author-avatar-img" src={`http://localhost:4000/` + profilePicture} alt="Profile picture" />
>>>>>>> 3c0a41cfdbc64b613d8aa6c5d915079a96fb3747
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
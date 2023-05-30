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







// import { Link } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import { UserContext } from "./UserContext";
// import sentidos from './assets/sentidos.png';
// import user from './assets/user.png';
// import Cookies from "js-cookie";

// export default function Header() {
//   const { setUserInfo, userInfo, setJWT } = useContext(UserContext);
//   useEffect(() => {
//     fetch(`https://backend-blog-psi.vercel.app/profile`, {
//       credentials: 'include',
//     })
//     .then(response => {
//       if (response.ok) {
//         const token = response.headers.get("Authorization");
//         setJWT(token);
//         Cookies.set("token", token, { expires: 7 });
//         return response.json();
//       } else {
//         throw new Error("Profile request failed");
//       }
//     })
//     .then(data => {
//       setUserInfo(data);
//     })
//     .catch(error => {
//       console.error(error);
//     });
//   }, []);

//   function logout() {
//     fetch('https://backend-blog-psi.vercel.app/logout', {
//       credentials: 'include',
//       method: 'POST',
//     });
//     setUserInfo(null);
//     window.location.reload();
//   }

//   const username = userInfo?.username;
//   const profilePicture = userInfo?.profilePicture || user;
  
//   return (
//     <header>
//       <Link to="/" className="logo">Inicio</Link>
//       <nav>
//         {username && (
//           <>
//             <img className="author-avatar-img" src={`https://backend-blog-psi.vercel.app/` + profilePicture} alt="Profile picture" />
//             <Link to="/create" className="login">Create new post</Link>
//             <a onClick={logout} className="register">Logout ({username})</a>
//           </>
//         )}
//         {!username && (
//           <>
//             <img className="img-sentidos" src={sentidos} alt="Sentidos" />
//             <Link to="/login" className="login">Login</Link>
//             {/* <Link to="/register" className="login">register</Link> */}
//           </>
//         )}
//       </nav>
//     </header>   
//   );
// }

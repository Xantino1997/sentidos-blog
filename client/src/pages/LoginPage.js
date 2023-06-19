import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  // const { setToken } = useContext(TokenContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch(`https://backend-blog-psi.vercel.app/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      response.json().then((data) => {
        setUserInfo(data);
        const token = data.token;
        document.cookie = `token=${token}; path=/`; // Guardar el token en la cookie
        setRedirect(true);
      });
    } else {
      alert("Wrong credentials");
    }
  }

  useEffect(() => {
    const storedToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (storedToken) {
      setRedirect(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button>Login</button>
      </form>

      <br /> {/* Etiqueta <br> para salto de línea */}
      <br />
      <br />
      <hr /> {/* Etiqueta <hr> para una línea horizontal */}

      <div className="additional-content">
        <img src="data:image/jpeg;base64,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" alt="Logo importante" className="centered-image" />
        <p className="additional-text">
          Señor usuario, si no puede iniciar sesión, recuerde comunicarse con el administrador del sitio web.
        </p>
      </div>
      <br />
      <br />
      <br />

      <hr /> {/* Etiqueta <hr> para una línea horizontal */}
    </>
  );

}

import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo, setJWT } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("https://backend-blog-psi.vercel.app/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (response.ok) {
        const { token, userInfo } = await response.json();
        setUserInfo(userInfo);
        setJWT(token);
        Cookies.set("token", token, { expires: 7, secure: true, sameSite: "none" });
        setRedirect(true);
        alert("Inicio de sesión exitoso, al colocar las cookies");
      }else {
          alert("Credenciales incorrectas en el método de inicio de sesión");
        }
    } catch (error) {
      console.log("Error de conexión:", error);
      // Manejar el error de conexión
      // ...
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
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

      <button type="submit">Login</button>
      <br />
      <br />
      <br />
    </form>
  );
}

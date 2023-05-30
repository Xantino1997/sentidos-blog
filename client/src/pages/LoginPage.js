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

    const response = await fetch(`https://backend-blog-psi.vercel.app/login`, {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      const { token, userInfo } = await response.json();
      setUserInfo(userInfo); // Actualizar la información del usuario en el contexto
      setJWT(token); // Actualizar el estado jwt en el contexto
      Cookies.set("token", token, { expires: 7 }); // Guardar el token en una cookie con una duración de 7 días
      setRedirect(true);
      alert(" Login method ok");

      console.log(token, userInfo, JSON.stringify(userInfo), JSON.stringify(token));

    } else {
      alert("Wrong credentials in the Login method");
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

      <button>Login</button>
      <br />
      <br />
      <br />
    </form>
  );
}

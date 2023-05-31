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
      setUserInfo(userInfo);
      setJWT(token);
      Cookies.set("token", token, { expires: 7 });
      console.log(userInfo + 'USERInfo login');
      console.log(setJWT(token)+ 'tokensetJWT login' );
      console.log(token + 'TOKEN login');
      console.log(JSON.stringify(token) + 'TOKEN JSON login');

      setRedirect(true);
      alert("Login method ok");
    } else {
      const storedToken = Cookies.get("token");
      if (storedToken) {
        setJWT(storedToken);
        setRedirect(true);
        alert("Using token from cookie");
      } else {
        alert("Wrong credentials in the Login method");
      }
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

import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { TokenContext } from "../TokenProvider";

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
    // setToken(response)
    console.log(JSON.stringify(response.token) + 'HER IS THE OTHER TOKEN'); 

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

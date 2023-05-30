import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [jwt, setJWT] = useState(() => Cookies.get('token') || '');

  const updateJWT = (token) => {
    setJWT(token);
    Cookies.set("token", token, { expires: 7 });
  };

  return (
    <UserContext.Provider value={{
      userInfo,
      setUserInfo,
      jwt,
      setJWT: updateJWT
    }}>
      {children}
    </UserContext.Provider>
  );
}

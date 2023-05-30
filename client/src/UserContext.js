import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  const [jwt, setJWT] = useState(
    () => window.sessionStorage.getItem('jwt')
  )


  return (
    <UserContext.Provider value={{
      userInfo, 
      setUserInfo,
      jwt,
      setJWT
    }}>
      {children}
    </UserContext.Provider>
  );
}


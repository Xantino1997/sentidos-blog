import { useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({});
  return (
    <UserContext.Provider value={{
      userInfo,
      setUserInfo,
    }}>
      {children}
    </UserContext.Provider>
  );
}

import { createContext, useState, useEffect } from "react";

export const TokenContext = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("token="));

    if (storedToken) {
      const [, tokenValue] = storedToken.split("=");
      setToken(tokenValue);
      console.log("Valor del token:", tokenValue);
    }
  }, []);

  return (
    <TokenContext.Provider value={token}>
      {children}
    </TokenContext.Provider>
  );
};

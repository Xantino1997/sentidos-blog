// JwtContext.js
import { createContext, useState } from 'react';

export const JwtContext = createContext();

export const JwtProvider = ({ children }) => {
  const [jwt, setJwt] = useState(null);

  return (
    <JwtContext.Provider value={{ jwt, setJwt }}>
      {children}
    </JwtContext.Provider>
  );
};

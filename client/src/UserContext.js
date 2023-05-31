// UserContextProvider.js
import { createContext, useState } from 'react';

export const UserContextProvider = createContext();

export const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContextProvider.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContextProvider.Provider>
  );
};

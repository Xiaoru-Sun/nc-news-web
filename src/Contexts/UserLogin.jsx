import { createContext, useState } from "react";

export const UserLoginContext = createContext();
export const UserLoginProvider = ({ children }) => {
  const [userLoggedin, setUserLoggedin] = useState(false);
  const [account, setAccount] = useState({});
  return (
    <UserLoginContext.Provider
      value={{ userLoggedin, setUserLoggedin, account, setAccount }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};

import { createContext, useState } from "react";

export const UserLoginContext = createContext();
export const UserLoginProvider = ({ children }) => {
  const [userLoggedin, setUserLoggedin] = useState(false);
  const [accountName, setAccountName] = useState("");
  return (
    <UserLoginContext.Provider
      value={{ userLoggedin, setUserLoggedin, accountName, setAccountName }}
    >
      {children}
    </UserLoginContext.Provider>
  );
};

// context/UserDetailsContext.js
import { createContext, useState, useEffect } from "react";

export const UserDetailsContainer = createContext();

export function UserDetailsContextProvider({ children }) {
  const [searchValue,setSearchValue] = useState("")
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("userName") || "";
  });

  const [password, setPassword] = useState(() => {
    return localStorage.getItem("password") || "";
  });

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("password", password);
  }, [password]);

  return (
    <UserDetailsContainer.Provider value={{ userName, password, setUserName, setPassword, searchValue, setSearchValue  }}>
      {children}
    </UserDetailsContainer.Provider>
  );
}

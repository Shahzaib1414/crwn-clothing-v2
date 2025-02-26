import { createContext, useEffect, useState } from "react";
import {
  AuthStateChangeListener,
  createUserDocFromAuth,
} from "../utils/firebase/firebase.utils";

//actual value we want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const listener = AuthStateChangeListener((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    });
    return listener;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

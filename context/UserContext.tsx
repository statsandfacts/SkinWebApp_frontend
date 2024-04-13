import { createContext, useContext, useEffect, useState } from 'react';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@/utils/localStore';

const UserContext = createContext<{
  user: null;
  setLogin: (userData: any) => void;
  setLogout: () => void;
  setSession: (session: any) => void;
  userSession: null;
  isLoggedIn: boolean;
  userDetails: any;
  userDetailsSet: (user: any) => void;
}>({
  user: null,
  setLogin: () => {},
  setLogout: () => {},
  setSession: () => {},
  userSession: null,
  isLoggedIn: false,
  userDetails: null,
  userDetailsSet: () => {},
});

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [userSession, setUserSession] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const setLogin = (userData: any) => {
    setUser(userData);
    setLocalStorage('user', JSON.stringify(userData)); // Redundant check removed
    setLocalStorage('isLoggedIn', true);
    setIsLoggedIn(true);
  };

  const userDetailsSet = (user: any) => {
    setUserDetails(user);
  };

  const setSession = (session: any) => {
    setUserSession(session);
    setLocalStorage('session', JSON.stringify(session)); // Redundant check removed
  };

  const setLogout = () => {
    removeLocalStorage('user');
    setUser(null);

    removeLocalStorage('session');
    setUserSession(null);

    removeLocalStorage('isLoggedIn');
    setIsLoggedIn(false);
    setUserDetails(null);
  };

  useEffect(() => {
    const storedUser = getLocalStorage('user');
    const localSession = getLocalStorage('session');
    const loggedIn = getLocalStorage('isLoggedIn');

    if (loggedIn) {
      setIsLoggedIn(true);
    }
    // Use a stricter check (storedUser?.length > 0)
    if (storedUser && storedUser.length > 0) {
      const user = JSON.parse(storedUser);
      setUser(user);
    }

    // Use a stricter check (localSession?.length > 0)
    if (localSession && localSession.length > 0) {
      const session = JSON.parse(localSession);
      setSession(session);
    }
  }, [isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        setLogin,
        setLogout,
        setSession,
        userSession,
        isLoggedIn,
        userDetails,
        userDetailsSet,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

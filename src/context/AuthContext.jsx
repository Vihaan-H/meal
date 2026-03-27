import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onLogin = (e) => setUser(e.detail ?? null);
    const onLogout = () => setUser(null);

    document.addEventListener("login", onLogin);
    document.addEventListener("logout", onLogout);

    return () => {
      document.removeEventListener("login", onLogin);
      document.removeEventListener("logout", onLogout);
    };
  }, []);

  const login = (newUser) => {
    setUser(newUser);
    const loginEvent = new CustomEvent("login", { detail: newUser });
    document.dispatchEvent(loginEvent);
  };

  const logout = () => {
    setUser(null);
    document.dispatchEvent(new Event("logout"));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);

import nookies from "nookies";
import React, { createContext, useContext, useState } from "react";
import api from "../../services/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function login({ email, password }) {
    const data = await api.post("/signin", {
      email,
      password,
    });

    const { access_token } = data.data;

    console.log(access_token);

    nookies.set(undefined, "token", access_token, {
     // maxAge: 60 * 60 ,
      path: "/"
    });

    api.defaults.headers["x-auth-token"] = `${access_token}`;

    setIsAuthenticated(true);
  }

  async function signup({ name, email, password, role }) {
    return await api.post("/signup", {
      name,
      email,
      password,
      password_confirmation: passwordConfirm,
      role,
    });
  }

  async function logout() {

    nookies.destroy(undefined, 'token');

    setUser({});

  }

  return (
    <AuthContext.Provider
      value={{
        login,
        signup,
        logout,
        isAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default AuthContext;

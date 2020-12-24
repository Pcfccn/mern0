import React from "react";
import "materialize-css";
import { useRoutes } from "./router";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";


function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  return (
    <AuthContext.Provider value={{login, logout, token, userId, isAuth}}>
      <BrowserRouter>
        <div className="container">{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

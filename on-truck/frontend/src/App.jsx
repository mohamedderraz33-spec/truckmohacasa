import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Seccion from "./components/Seccion.jsx";
import AuthPage from "./components/AuthPage.jsx";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <div className="app">
      {user ? (
        <>
          <Navbar user={user} />
          <main className="app__content">
            <Seccion titulo="Vehículos" />
            <Seccion titulo="Rutas" />
            <Seccion titulo="Estadísticas" />
          </main>
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </div>
  );
}

export default App;

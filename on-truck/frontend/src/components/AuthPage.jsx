import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import "./AuthPage.css";

import logo from "../assets/on-truck_logo_black.png"; // ⬅️ tu logo

function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">

      {/* COLUMNA IZQUIERDA */}
      <div className="auth-left">

        <div className="auth-box">

          {/* LOGO + NOMBRE */}
          <div className="auth-header">
            <img src={logo} alt="On Truck Logo" className="auth-logo" />
            <h1 className="auth-title">On Truck</h1>
          </div>

          {/* BOTONES LOGIN / REGISTER */}
          <div className="auth-toggle">
            <button
              className={isLogin ? "active" : ""}
              onClick={() => setIsLogin(true)}
            >
              Iniciar sesión
            </button>

            <button
              className={!isLogin ? "active" : ""}
              onClick={() => setIsLogin(false)}
            >
              Registrarse
            </button>
          </div>

          {/* FORMULARIOS */}
          <div className="auth-form">
            {isLogin ? (
              <Login setUser={setUser} />
            ) : (
              <Register setUser={setUser} />
            )}
          </div>

        </div>
      </div>

      {/* COLUMNA DERECHA - VIDEO */}
      <div className="auth-right">
        <video autoPlay muted loop className="auth-video">
          <source src="/camion-video.mp4" type="video/mp4" />
        </video>
      </div>

    </div>
  );
}

export default AuthPage;

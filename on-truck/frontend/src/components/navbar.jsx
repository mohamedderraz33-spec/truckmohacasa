import { useEffect, useRef, useState } from "react";
import logoImage from "../assets/on-truck_logo_black.png";
import avatarImage from "../assets/navbar_login_icon.png";
import "./Navbar.css";

const navItems = [
  { label: "Vehículos", href: "#vehiculos" },
  { label: "Rutas", href: "#rutas" },
  { label: "Estadísticas", href: "#estadisticas" },
];

function Navbar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() =>
    typeof document !== "undefined" ? document.body.classList.contains("theme-dark") : false
  );
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("theme-dark", isDarkMode);
    }
  }, [isDarkMode]);

  return (
    <header className="navbar">
      <a href="/" className="navbar__brand" aria-label="Volver al inicio" onClick={() => setActivePath(null)}>
        <img src={logoImage} alt="Logo On Truck" className="navbar__logo" />
      </a>

      <nav className="navbar__links">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`navbar__link ${activePath === item.href ? "navbar__link--active" : ""}`}
            onClick={() => setActivePath(item.href)}
          >
            {item.label}
          </a>
        ))}
      </nav>

         <div className="navbar__user" ref={menuRef}>
         {!user && (
         <a href="/login" className="navbar__login-link">Login</a>
         )}


        <button
          type="button"
          className="navbar__avatar-button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-haspopup="true"
          aria-expanded={isMenuOpen}
        >
          <img src={avatarImage} alt="Perfil" className="navbar__avatar" />
        </button>

        {isMenuOpen && (
          <div className="navbar__dropdown" role="menu">
            <button
              type="button"
              className="navbar__dropdown-item"
              onClick={() => {
                setIsDarkMode((prev) => !prev);
                setIsMenuOpen(false);
              }}
            >
              {isDarkMode ? "Modo claro" : "Modo oscuro"}
            </button>
            {user && (
              <button
                type="button"
                className="navbar__dropdown-item"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

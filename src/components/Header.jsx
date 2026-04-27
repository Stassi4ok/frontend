import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./header.css"

export default function Header() {
  const { isAuth, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getLinkClass = ({ isActive }) =>
    isActive
      ? "header__link header__link--active"
      : "header__link";

  return (
    <header className="header">

      <div className="header__logo">
        Облік студентів
      </div>

      <nav className="header__nav">

        <NavLink to="/students" className={getLinkClass}>
          Студенти
        </NavLink>

        <NavLink to="/journal" className={getLinkClass}>
          Журнали
        </NavLink>

        {user?.role === "admin" && (
          <NavLink to="/admin" className={getLinkClass}>
            Користувачі
          </NavLink>
        )}

        {!isAuth ? (
          <NavLink to="/login" className={getLinkClass}>
            Увійти
          </NavLink>
        ) : (
          <button className="header__button" onClick={handleLogout}>
            Вийти
          </button>
        )}

      </nav>

    </header>
  );
}
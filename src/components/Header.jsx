import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { isAuth, logout , user} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <div style={styles.logo}>University System</div>

      <nav style={styles.nav}>

      
        <Link to="/students" style={styles.link}>
          Students
        </Link>

        <Link to="/journal" style={styles.link}>
          Journal
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin" style={styles.link}>Users</Link>
        )}

        {!isAuth ? (
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} style={styles.button}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 20px",
    background: "#1f2937",
    color: "white",
    alignItems: "center",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
  button: {
    background: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};
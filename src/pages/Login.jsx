import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handle = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
      nav("/students");
    } catch (err) {
      // універсальна обробка помилок
      if (err.response?.status === 401) {
        setError("Невірний email або пароль");
      } else if (err.response?.status === 404) {
        setError("Користувача не знайдено");
      } else {
        setError("Помилка сервера. Спробуйте пізніше");
      }
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handle}>
        <h2 className="auth-title">Вхід в систему</h2>

        {/* ПОМИЛКА */}
        {error && <div className="auth-error">{error}</div>}

        <input
          className="auth-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-button" type="submit">
          Увійти
        </button>
      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser
} from "../api/user";
import { registerRequest } from "../api/auth";
import "./pageStyle/admin.css"
export default function Admin() {
  const [users, setUsers] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  });

  const loadUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    await updateUserRole(id, role);
    loadUsers();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      await registerRequest(form);
      setForm({ name: "", email: "", password: "", role: "user" });
      loadUsers();
    } catch (e) {
      console.error(e);
      alert("Помилка створення користувача");
    }
  };

  return (
    <div className="page">

      <h2 className="title">Адміністрація користувачів</h2>

      {/* Форма */}
      <div className="card">
        <h3>Створити користувача</h3>

        <form className="admin-form" onSubmit={handleCreateUser}>
          <input
            className="input"
            placeholder="Ім’я"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="input"
            type="password"
            placeholder="Пароль"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <select
            className="input"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <button className="btn-add">Створити</button>
        </form>
      </div>

      {/* Таблиця */}
      <div className="card">

        <table className="table">
          <thead>
            <tr>
              <th>Ім’я</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>

                <td>
                  <select
                    className="input"
                    value={u.role}
                    onChange={(e) =>
                      handleRoleChange(u._id, e.target.value)
                    }
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </td>

                <td>
                  <button
                    className="btn-small danger"
                    onClick={() => handleDelete(u._id)}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}
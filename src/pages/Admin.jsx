import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  deleteUser
} from "../api/user";

export default function Admin() {
  const [users, setUsers] = useState([]);

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

  return (
    <div style={{ padding: 20 }}>
      <h2>Users (Admin Panel)</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>

              <td>
                <select
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
                <button onClick={() => handleDelete(u._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { http } from "./http";

export const getProfile = async () => {
  const res = await http.get("/user/profile");
  return res.data;
};

export const getUsers = () => http.get("/users");

export const updateUserRole = (id, role) =>
  http.put(`/users/${id}`, { role });

export const deleteUser = (id) =>
  http.delete(`/users/${id}`);
import { http } from "./http";

export const loginRequest = async (data) => {
  const res = await http.post("/auth/login", data);
  return res.data;
};
import { http } from "./http";

export const getGroups = () => http.get("/groups");
export const createGroup = (data) => http.post("/groups", data);
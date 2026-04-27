import { http } from "./http";

export const getGrades = (group) =>
  http.get(`/grades/${group}`);

export const setGrade = (data) =>
  http.post("/grades", data);
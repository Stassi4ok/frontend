// api/subjects.js
import { http } from "./http";

export const getSubjects = (group) =>
  http.get(`/subjects?group=${group}`);

export const createSubject = (data) =>
  http.post("/subjects", data);

export const deleteSubject = (id) =>
  http.delete(`/subjects/${id}`);
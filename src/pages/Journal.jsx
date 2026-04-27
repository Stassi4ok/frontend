import { useEffect, useState } from "react";
import { getStudents } from "../api/students";
import { getGrades, setGrade } from "../api/grades";
import {
  getSubjects,
  createSubject,
  deleteSubject
} from "../api/subjects";
import GroupSelect from "../components/GroupSelect"
import "./pageStyle/Journal.css"

export default function Journal() {
  const [group, setGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [subjects, setSubjects] = useState([]);


  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    if (!group) return;

    const load = async () => {
      const studentsRes = await getStudents();
      const gradesRes = await getGrades(group);
      const subjectsRes = await getSubjects(group);

      setStudents(studentsRes.data.filter((s) => s.group === group));
      setGrades(gradesRes.data);
      setSubjects(subjectsRes.data);
    };

    load();
  }, [group]);

  const handleAddSubject = async () => {
    if (!newSubject) return;

    await createSubject({ name: newSubject, group });
    setNewSubject("");

    const res = await getSubjects(group);
    setSubjects(res.data);
  };

  const handleDeleteSubject = async (id) => {
    await deleteSubject(id);

    const res = await getSubjects(group);
    setSubjects(res.data);
  };

  const getGrade = (studentId, subject) => {
    const g = grades.find(
      (x) =>
        x.studentId?.toString() === studentId &&
        x.subject === subject
    );
    return g?.value || "";
  };

  const handleChange = (studentId, subject, value) => {
    setGrades((prev) => {
      const filtered = prev.filter(
        (g) =>
          !(
            g.studentId?.toString() === studentId &&
            g.subject === subject
          )
      );

      return [...filtered, { studentId, subject, value, group }];
    });

    clearTimeout(window.gradeTimer);

    window.gradeTimer = setTimeout(async () => {
      await setGrade({ studentId, subject, value, group });
    }, 400);
  };

  return (
    <div className="page">

      <h2 className="title center-item">Журнал оцінок</h2>

      {/* GROUP */}
      <div className="card">
        <GroupSelect group={group} setGroup={setGroup} />
      </div>

      {/* SUBJECT CONTROL */}
      {group && (
        <div className="card">
          <h3>Предмети</h3>

          <div style={{ display: "flex", gap: "10px" }}>
            <input
              className="input"
              placeholder="Новий предмет"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button className="btn-add" onClick={handleAddSubject}>
              Додати
            </button>
          </div>

          <div  className="flex-column">
            {subjects.map((s) => (
              <div key={s._id} className="around-container">
                {s.name}
                <button
                  className="btn-small danger"
                  onClick={() => handleDeleteSubject(s._id)}
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TABLE */}
      {group && (
        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Студент</th>
                {subjects.map((s) => (
                  <th key={s._id}>{s.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>

                  {subjects.map((s) => (
                    <td key={s._id}>
                      <input
                        className="grade-input"
                        value={getGrade(student._id, s.name)}
                        onChange={(e) =>
                          handleChange(
                            student._id,
                            s.name,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}
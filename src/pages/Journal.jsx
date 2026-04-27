import { useEffect, useState } from "react";
import { getStudents } from "../api/students";
import { getGrades, setGrade } from "../api/grades";

export default function Journal() {
  const [group, setGroup] = useState("");
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);

  const subjects = ["Math", "Programming", "DB", "English"];

  // LOAD DATA
  useEffect(() => {
    if (!group) return;

    const load = async () => {
      const studentsRes = await getStudents();
      const gradesRes = await getGrades(group);

      setStudents(
        studentsRes.data.filter((s) => s.group === group)
      );

      setGrades(gradesRes.data);
    };

    load();
  }, [group]);

  // GET GRADE
  const getGrade = (studentId, subject) => {
    const g = grades.find(
      (x) =>
        x.studentId?.toString() === studentId &&
        x.subject === subject
    );

    return g?.value || "";
  };

  // UPDATE GRADE (локально + API)
  const handleChange = (studentId, subject, value) => {
    // локальне оновлення (UI без лагів)
    setGrades((prev) => {
      const filtered = prev.filter(
        (g) =>
          !(
            g.studentId?.toString() === studentId &&
            g.subject === subject
          )
      );

      return [
        ...filtered,
        { studentId, subject, value, group }
      ];
    });

    // збереження в backend (debounce)
    clearTimeout(window.gradeTimer);

    window.gradeTimer = setTimeout(async () => {
      await setGrade({
        studentId,
        subject,
        value,
        group
      });
    }, 400);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Journal</h2>

      {/* GROUP SELECT */}
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
      >
        <option value="">Select group</option>
        <option value="CS-21">CS-21</option>
        <option value="CS-22">CS-22</option>
        <option value="CS-23">CS-23</option>
      </select>

      {/* TABLE */}
      {group && (
        <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Student</th>
              {subjects.map((s) => (
                <th key={s}>{s}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>

                {subjects.map((subject) => (
                  <td key={subject}>
                    <input
                      style={{ width: 50 }}
                      value={getGrade(student._id, subject)}
                      onChange={(e) =>
                        handleChange(
                          student._id,
                          subject,
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
      )}
    </div>
  );
}
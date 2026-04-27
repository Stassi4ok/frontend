import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../api/students";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    group: "",
    course: "",
    specialty: "",
    program: "",
    studyTerm: ""
  });

  const [editId, setEditId] = useState(null);
  const [filterField, setFilterField] = useState("name");
  const [filterValue, setFilterValue] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (editId) {
      await updateStudent(editId, form);
      setEditId(null);
    } else {
      await createStudent(form);
    }

    setForm({
      name: "",
      email: "",
      group: "",
      course: "",
      specialty: "",
      program: "",
      studyTerm: ""
    });

    loadStudents();
  };

  const handleEdit = (student) => {
    setForm(student);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  const filteredStudents = students
    .filter((s) => {
      if (!filterValue) return true;
      return String(s[filterField])
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    })
    .sort((a, b) => {
      const aVal = a[filterField];
      const bVal = b[filterField];
      return sortOrder === "asc" ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });

  return (
    <div className="page">

      <h2 className="title">Студенти</h2>

      {/* FORM */}
      <div className="card">
        <div className="grid">

          <input className="input" name="name" placeholder="ПІБ" value={form.name} onChange={handleChange} />
          <input className="input" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input className="input" name="group" placeholder="Група" value={form.group} onChange={handleChange} />
          <input className="input" name="course" placeholder="Курс" value={form.course} onChange={handleChange} />
          <input className="input" name="specialty" placeholder="Спеціальність" value={form.specialty} onChange={handleChange} />
          <input className="input" name="program" placeholder="Програма" value={form.program} onChange={handleChange} />
          <input className="input" name="studyTerm" placeholder="Термін  навчання" value={form.studyTerm} onChange={handleChange} />

        </div>

        <button className="btn" onClick={handleSubmit}>
          {editId ? "Оновити" : "Додати"}
        </button>
      </div>

      {/* FILTER */}
      <div className="card row">

        <select className="input" value={filterField} onChange={(e) => setFilterField(e.target.value)}>
          <option value="name">ПІБ</option>
          <option value="course">Курс</option>
          <option value="specialty">Спеціальність</option>
          <option value="program">Програма</option>
        </select>

        <input
          className="input"
          placeholder="Фільтр"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />

        <select className="input" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Зростання</option>
          <option value="desc">Спадання</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="card">
        <table className="table">
          <thead>
            <tr >
              <th >ПІБ</th>
              <th>Email</th>
              <th>Група</th>
              <th>Курс</th>
              <th>Спеціальність</th>
              <th>Освітня програма</th>
              <th>Термін навчання</th>
              <th>Дії</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.group}</td>
                <td>{s.course}</td>
                <td>{s.specialty}</td>
                <td>{s.program}</td>
                <td>{s.studyTerm}</td>
                <td className="actions">
                  <button className="btn-small" onClick={() => handleEdit(s)}>Редагувати</button>
                  <button className="btn-small danger" onClick={() => handleDelete(s._id)}>Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}
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

  // LOAD
  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // SUBMIT (CREATE / UPDATE)
  const handleSubmit = async () => {
    if (editId) {
      await updateStudent(editId, form);
      setEditId(null);
    } else {
      await createStudent(form);
    }

    setForm({ name: "", email: "", group: "" });
    loadStudents();
  };

  // EDIT
  const handleEdit = (student) => {
    setForm({
      name: student.name,
      email: student.email,
      group: student.group,
    });
    setEditId(student._id);
  };

  // DELETE
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

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  return (
    <div style={{ padding: 20 }}>
      <h2>Студенти CRUD</h2>

      {/* FORM */}
      <div style={{ marginBottom: 20 }}>
        <input name="name" placeholder="ПІБ" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Електронна пошта" value={form.email} onChange={handleChange} />
        <input name="group" placeholder="Група" onChange={handleChange} />
        <input name="course" placeholder="Курс (1-6)" value={form.course} onChange={handleChange} />

        <input name="specialty" placeholder="Спеціальність" value={form.specialty} onChange={handleChange} />

        <input name="program" placeholder="Освітня програма" value={form.program} onChange={handleChange} />

        <input name="studyTerm" placeholder="Термін навчання (наприклад 4 роки)" value={form.studyTerm} onChange={handleChange} />

        <button onClick={handleSubmit}>
          {editId ? "Оновити" : "Додати"}
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>

        {/* SELECT FIELD */}
        <select
          value={filterField}
          onChange={(e) => setFilterField(e.target.value)}
        >
          <option value="name">Ім'я</option>
          <option value="course">Курс</option>
          <option value="specialty">Спеціальність</option>
          <option value="program">Програма</option>
        </select>

        {/* VALUE INPUT */}
        <input
          placeholder="Значення фільтра"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />

        {/* SORT */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Зростання</option>
          <option value="desc">Спадання</option>
        </select>

      </div>

      {/* TABLE */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ПІБ</th>
            <th>Електронна пошта</th>
            <th>Група</th>
            <th>Курс</th>
            <th>Спеціальність</th>
            <th>Програма</th>
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

              <td>
                <button onClick={() => handleEdit(s)}>Редагувати</button>
                <button onClick={() => handleDelete(s._id)}>Видалити</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
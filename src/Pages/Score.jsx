//React Tools
import React, { useEffect, useState } from "react";

//Stylesheet
import '../assets/css/Addition.css'
import Header from "../components/Header";

const studentList = [
  { id: 1, name: "Chhon chanliza" },
  { id: 2, name: "Em Sotheara" },
  { id: 3, name: "Eng Sonyta" },
  { id: 4, name: "Loch Liza" },
  { id: 5, name: "Ouk Liza" },
];

const monthOptions = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];

export default function Score() {
  const [records, setRecords] = useState(() => {
    try {
      const saveRecord = localStorage.getItem("record")
      return saveRecord ? JSON.parse(saveRecord) : [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({ studentId: studentList[0].id, month: monthOptions[0], score: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(records))
  }, [records])

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function addRecord(e) {
    e.preventDefault();
    if (!form.score) return;

    const exists = records.find(r => r.studentId === parseInt(form.studentId, 10) && r.month === form.month);
    if (exists) {
      alert(`Score for ${studentList.find(s => s.id === parseInt(form.studentId, 10)).name} in ${form.month} already exists.`);
      return;
    }
    const newRec = { id: Date.now(), studentId: parseInt(form.studentId, 10), month: form.month, score: form.score };
    setRecords(prev => [...prev, newRec]);
    setForm({ studentId: studentList[0].id, month: monthOptions[0], score: "" });
  }

  function editRecord(rec) {
    setEditingId(rec.id);
    setForm({ studentId: rec.studentId, month: rec.month, score: rec.score });
  }

  function deleteRecord(id) {
    setRecords(records.filter(r => r.id !== id));
  }

  function updateRecord(e) {
    e.preventDefault();
    setRecords(prev =>
      prev.map(r => (r.id === editingId ? { ...r, score: form.score } : r))
    );
    cancelEdit();
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ studentId: studentList[0].id, month: monthOptions[0], score: "" });
  }

  function getGrade(score) {
    const grade = parseFloat(score);
    if (grade < 37) {
      return "F"
    } else if (grade <= 37) {
      return "E"
    } else if (grade <= 45) {
      return "D"
    } else if (grade <= 52) {
      return "C"
    } else if (grade <= 60) {
      return "B"
    } else if (grade <= 67) {
      return "A"
    } else {
      alert("Score must be between 0 and 75");
      return "";
    }
  }

  function getMonthlyTopScores() {
    return monthOptions.map(month => {
      const monthRecs = records
        .filter(r => r.month === month)
        .sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      const top3 = monthRecs.slice(0, 3).map(r => {
        const student = studentList.find(s => s.id === r.studentId);
        return { student: student ? student.name : "", score: r.score };
      });
      return { month, top3 };
    });
  }


  return (
    <>
      <Header />
      <div className="p-4">
        <h2>Student Scores</h2>
        <form onSubmit={editingId ? updateRecord : addRecord} className="row g-3 mb-4">
          <div className="col-md-3">
            <label className="form-label">Student</label>
            <select
              name="studentId"
              value={form.studentId}
              onChange={handleChange}
              className="form-select"
              disabled={editingId !== null}
            >
              {studentList.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Month</label>
            <select
              name="month"
              value={form.month}
              onChange={handleChange}
              className="form-select"
              disabled={editingId !== null}
            >
              {monthOptions.map(m => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Score</label>
            <input
              type="number"
              name="score"
              value={form.score}
              onChange={handleChange}
              className="form-control"
              min="0"
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-success me-2">
              {editingId ? "Save" : "Add"}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              {monthOptions.map(m => (
                <th key={m}>{m}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {studentList.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                {monthOptions.map(month => {
                  const rec = records.find(r => r.studentId === student.id && r.month === month);
                  return (
                    <td key={month} className="align-middle">
                      {rec ? (
                        <div className="d-flex align-items-center">
                          <span className="me-2">{rec.score}</span>
                          <button
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => editRecord(rec)}
                          >
                            ✏️
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger me-1"
                            onClick={() => deleteRecord(rec.id)}
                          >
                            🗑️
                          </button>
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* monthly top scores */}
        <div className="mt-5">
          <h3>Monthly Top 3 Scores</h3>
          <table className="table table-bordered">
            <thead className="table-strip table-dark">
              <tr>
                <th>Month</th>
                <th>Rank</th>
                <th>Student</th>
                <th>Score</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {getMonthlyTopScores().map(ts => (
                ts.top3.length > 0 ? (
                  ts.top3.map((entry, idx) => {
                    const medal =
                      idx === 0 ? "bg-gold" :
                        idx === 1 ? "bg-silver" :
                          idx === 2 ? "bg-bronze" : "";
                    return (
                      <tr key={ts.month + idx}>
                        {idx === 0 && <td rowSpan={ts.top3.length}>{ts.month}</td>}
                        <td className={medal}>{idx + 1}</td>
                        <td className="table-secondary">{entry.student || "-"}</td>
                        <td className="table-secondary">{entry.score}</td>
                        <td className="table-secondary">{getGrade(entry.score)}</td>
                      </tr>)
                  })
                ) : (
                  <tr key={ts.month}>
                    <td>{ts.month}</td>
                    <td colSpan="4" className="text-center text-muted">
                      No scores
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

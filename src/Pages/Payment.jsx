//React Tools
import React, { useEffect, useState } from 'react';

//Import files
import Header from '../components/Header';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export default function Payment() {
  const [students, setStudents] = useState(() =>  {
    try{
      const saveStudent = localStorage.getItem("student")
      return saveStudent ? JSON.parse(saveStudent) : [
        {
      id: 1,
      name: 'Chhon chanliza',
      payment: {
        'February': false,
        'March': false,
        'April': false,
        'May': false,
        'June': false,
        'July': false
      }
    },
    { id: 2, 
      name: 'Em Sotheara', 
      payment: { 
        'February': false, 
        'March': false, 
        'April': false, 
        'May': false, 
        'June': false, 
        'July': false } },
    { id: 3, 
      name: 'Eng Sonyta', 
      payment: { 
        'February': false, 
        'March': false, 
        'April': false, 
        'May': false, 
        'June': false, 
        'July': false } },
    { id: 4, 
      name: 'Loch Liza', 
      payment: { 
        'February': false, 
        'March': false, 
        'April': false, 
        'May': false, 
        'June': false, 
        'July': false } },
    { id: 5, 
      name: 'Ouk Liza', 
      payment: { 
        'February': false, 
        'March': false, 
        'April': false, 
        'May': false, 
        'June': false, 
        'July': false } }
      ];
    } catch {
      return [];
    }
  });

  const monthsShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const [form, setForm] = useState({ studentId: students[0]?.id || '', month: months[0], status: false });
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(students));
  }, [students]);

  const getPaymentStatus = (student, monthName) => {
    if (monthName === 'January') return 'free';
    return student.payment?.[monthName] || 'not yet';
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case true:
        return <span className="badge bg-success">Paid</span>;
      case false:
        return <span className="badge bg-danger">Not yet</span>;
      case 'free':
        return <span className="badge bg-secondary">Free</span>;
      default:
        return <span className="badge bg-danger">Not yet</span>;
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'status') {
      if (value === 'true') newValue = true;
      else if (value === 'false') newValue = false;
      // 'free' remains a string
    }
    setForm(prev => ({ ...prev, [name]: newValue }));
  }

  function setPaymentStatus(studentId, month, status) {
    setStudents(prev => prev.map(s => {
      if (s.id === studentId) {
        return {
          ...s,
          payment: {
            ...s.payment,
            [month]: status
          }
        };
      }

      return s;
    }));
  }

  // keep togglePayment for backwards compatibility if other code relies on it
  function togglePayment(studentId, month) {
    const student = students.find(s => s.id === studentId);
    const current = student?.payment?.[month];
    setPaymentStatus(studentId, month, current === true ? false : true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.studentId || !form.month) return;
    // set status from form
    setPaymentStatus(parseInt(form.studentId, 10), form.month, form.status);
    setForm({ studentId: students[0]?.id || '', month: months[0], status: false });
  }

  function editPayment(studentId, month) {
    setEdit({ studentId, month });
    const student = students.find(s => s.id === studentId);
    setForm({ studentId, month, status: student.payment?.[month] || false });
  }

  function updatePayment(e) {
    e.preventDefault();
    setPaymentStatus(edit.studentId, edit.month, form.status);
    setEdit(null);
    setForm({ studentId: students[0]?.id || '', month: months[0], status: false });
  }

  return (
    <>
      <Header />
      <div className="container-fluid p-4">
        <div className="row mb-4">
          <div className="col-12">
            <h1 className="h3 fw-bold mb-1">Monthly Fee</h1>
            <form onSubmit={edit ? updatePayment : handleSubmit} className='row g-3 mb-4'>
              <div className="col-md-3">
                <label className="form-label">Student</label>
                <select
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  className="form-select"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
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
                > 
                  {months.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <label className="form-label">Payment</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value={true}>Paid</option>
                  <option value={false}>Not yet</option>
                  <option value="free">Free</option>
                </select>
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <button type="submit" className="btn btn-primary">
                  {edit ? 'Update Status' : 'Set Status'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">Monthly Fee List</h5>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="text-start">ID</th>
                        <th className="text-center">Student Name</th>
                        {monthsShort.map((month, index) => (
                          <th key={index} className="text-center text-nowrap">
                            {month}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => {
                        return (
                          <tr key={student.id}>
                            <td className="text-start">{student.id}</td>
                            <td className="text-center fw-500">{student.name}</td>
                            {months.map((month, monthIndex) => {
                              const status = getPaymentStatus(student, month);
                              return (
                                <td
                                  key={monthIndex}
                                  className="text-center cursor-pointer"
                                  onClick={() => editPayment(student.id, month)}
                                >
                                  {getStatusBadge(status)}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
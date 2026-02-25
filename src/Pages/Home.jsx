//React Tools
import { useEffect, useState } from 'react';

//Stylesheet
import '../assets/css/App.css';

//Components
import Header from '../components/Header'


export default function Home() {
  const [classes, setClasses] = useState(() => {
    try {
      const saveStudent = localStorage.getItem("student")
      return saveStudent ? JSON.parse(saveStudent) : [];
    } catch {
      return [];
    }
  }
  );

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: ''});
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(classes))
  }, [classes])

  const handleAddClass = () => {
    setShowModal(true);
    setEditId(null);
    setFormData({ name: ''});
  };

  const handleEditClass = (students) => {
    setEditId(students.id);
    setFormData({ name: students.name});
    setShowModal(true);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setClasses(classes.map(c => c.id === editId ? { ...formData, id: editId } : c));
    } else {
      const stuId = classes.length > 0 ? Math.max(...classes.map(c => c.id)) : 0;
      const newClass = { ...formData, id: stuId + 1, students: parseInt(formData.students) };
      setClasses([...classes, newClass]);
    }
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Header />
      <main className="py-5 flex-grow-1">
        <div className="container-fluid">
          {/* Page Title */}
          <div className="row mb-4">
            <div className="col-12">
              <h1 className="mb-2">Student List</h1>
            </div>
          </div>

          {/* Add Class Button */}
          <div className="row mb-4">
            <div className="col-md-4 text-md-end">
              <button
                className="btn btn-outline-primary w-100"
                onClick={handleAddClass}
              >
                ➕ Add Student
              </button>
            </div>
          </div>

          {/* Classes Table */}
          <div className="row">
            <div className="col-12">
              <div className="card border-0 shadow-sm">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead className="table-light">
                        <tr className='table-dark'>
                          <th className="ps-4">ID</th>
                          <th>Name</th>
                          <th>Start at</th>
                          <th>End at</th>
                          <th className="text-end pe-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {classes.length > 0 ? (
                          classes.map(students => (
                            <tr key={students.id}>
                              <td className="ps-4 fw-bold">{students.id}</td>
                              <td>{students.name}</td>
                              <td>02 Feb 2026</td>
                              <td>01 Aug 2026</td>
                              <td className="text-end pe-4">
                                <button
                                  className="btn btn-sm btn-outline-primary me-2"
                                  onClick={() => handleEditClass(students)}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteClass(students.id)}
                                >
                                  🗑️ Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="text-center py-4 text-muted">
                              No students found. Click "Add student" to create one.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <div className={`modal ${showModal ? 'd-block' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            <div className="modal-header bg-primary text-white border-0">
              <h5 className="modal-title">{editId ? '✏️ Edit Class' : '➕ Add New Class'}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter student name..."
                    required
                  />
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editId ? 'Update Class' : 'Add Class'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        ></div>
      )}
    </>
  );
}

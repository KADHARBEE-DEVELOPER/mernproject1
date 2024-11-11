import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateEmployee from './CreateEmployee';  // Import the modal form

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility
  const [employeeData, setEmployeeData] = useState(null);  // Store employee data for editing

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const response = await axios.get("http://localhost:8080/");
    setEmployees(response.data.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/delete/${id}`);
    fetchEmployees();
  };

  const editEmployee = (emp) => {
    setEmployeeData(emp);  // Pass the employee data to edit
    setShowModal(true);  // Show the modal
  };

  const closeModal = () => {
    setShowModal(false);  // Hide the modal
    setEmployeeData(null);  // Reset the employee data
  };

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>

      {/* Create Employee button */}
      <button
        className="btn btn-success mb-4"
        onClick={() => {
          setEmployeeData(null); // Reset formData to null for creating new employee
          setShowModal(true); // Show the modal
        }}
      >
        Add New Employee
      </button>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees
            .filter(emp => emp.f_email && emp.f_email.includes(search)) 
            .map(emp => (
              <tr key={emp._id}>
                <td>{emp.f_id}</td>
                <td>{emp.f_name}</td>
                <td><img src={emp.f_image} alt="employee" width="50" /></td>
                <td>{emp.f_email}</td>
                <td>{emp.f_mobile}</td>
                <td>{emp.f_designation}</td>
                <td>{emp.f_gender}</td>
                <td>{emp.f_course}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editEmployee(emp)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp._id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal for editing/creating employee */}
      {showModal && (
        <div className="modal show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{employeeData ? 'Edit Employee' : 'Create Employee'}</h5>
                <button type="button" className="close" onClick={closeModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <CreateEmployee
                  employeeData={employeeData}
                  setEmployeeData={setEmployeeData}
                  closeModal={closeModal}  // Pass function to close modal
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;

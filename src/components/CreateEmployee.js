import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateEmployee = ({ employeeData, setEmployeeData, closeModal }) => {
  const [formData, setFormData] = useState({
    f_id: '',
    f_name: '',
    f_email: '',
    f_mobile: '',
    f_designation: '',
    f_gender: '',
    f_course: [],
    f_image: null // For file upload
  });

  useEffect(() => {
    if (employeeData) {
      setFormData({
        f_id: employeeData.f_id,
        f_name: employeeData.f_name,
        f_email: employeeData.f_email,
        f_mobile: employeeData.f_mobile,
        f_designation: employeeData.f_designation,
        f_gender: employeeData.f_gender,
        f_course: employeeData.f_course,
        f_image: null // Reset image on edit
      });
    }
  }, [employeeData]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      // Handle multiple checkbox values
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...formData[name], value],
        });
      } else {
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      if (employeeData) {
        // Update existing employee
        await axios.put('http://localhost:8080/update', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Employee updated successfully!');
      } else {
        // Create new employee
        await axios.post('http://localhost:8080/create', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Employee created successfully!');
      }
      closeModal();  // Close the modal after submission
    } catch (error) {
      console.error(error);
      alert('Failed to create/update employee.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-3">
        <label htmlFor="f_id" className="form-label">Employee ID:</label>
        <input
          type="text"
          id="f_id"
          name="f_id"
          className="form-control"
          value={formData.f_id}
          onChange={handleChange}
          disabled={employeeData ? true : false}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="f_name" className="form-label">Employee Name:</label>
        <input
          type="text"
          id="f_name"
          name="f_name"
          className="form-control"
          value={formData.f_name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="f_email" className="form-label">Email:</label>
        <input
          type="text"
          id="f_email"
          name="f_email"
          className="form-control"
          value={formData.f_email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="f_mobile" className="form-label">Mobile:</label>
        <input
          type="text"
          id="f_mobile"
          name="f_mobile"
          className="form-control"
          value={formData.f_mobile}
          onChange={handleChange}
        />
      </div>

      {/* Designation Dropdown */}
      <div className="mb-3">
        <label htmlFor="f_designation" className="form-label">Designation:</label>
        <select
          id="f_designation"
          name="f_designation"
          className="form-control"
          value={formData.f_designation}
          onChange={handleChange}
        >
          <option value="">Select Designation</option>
          <option value="HR">HR</option>
          <option value="Manager">Manager</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Gender Radio Buttons */}
      <div className="mb-3">
        <label className="form-label">Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Male"
              checked={formData.f_gender === 'Male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="f_gender"
              value="Female"
              checked={formData.f_gender === 'Female'}
              onChange={handleChange}
            />
            Female
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="f_gender"
              value="Other"
              checked={formData.f_gender === 'Other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
      </div>

      {/* Course Checkboxes */}
      <div className="mb-3">
        <label className="form-label">Course:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="f_course"
              value="MCA"
              checked={formData.f_course.includes('MCA')}
              onChange={handleChange}
            />
            MCA
          </label>
          <label className="ms-3">
            <input
              type="checkbox"
              name="f_course"
              value="BCA"
              checked={formData.f_course.includes('BCA')}
              onChange={handleChange}
            />
            BCA
          </label>
          <label className="ms-3">
            <input
              type="checkbox"
              name="f_course"
              value="BSC"
              checked={formData.f_course.includes('BSC')}
              onChange={handleChange}
            />
            BSC
          </label>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-3">
        <label htmlFor="f_image" className="form-label">Upload Image:</label>
        <input
          type="file"
          id="f_image"
          name="f_image"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {employeeData ? 'Update Employee' : 'Create Employee'}
      </button>
    </form>
  );
};

export default CreateEmployee;

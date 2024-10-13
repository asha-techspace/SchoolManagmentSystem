// src/components/StudentForm.jsx
import React, { useState } from "react";

const StudentRegistrationForm = () => {
  // Form data and error states
  const [formData, setFormData] = useState({
    id: "",
    fullName: "",
    age: "",
    class: "",
  });

  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form validation
  const validate = () => {
    let validationErrors = {};
    if (!formData.id.trim()) {
        validationErrors.id = "Student ID is required";
      }
    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
    }

    if (!formData.age) {
      validationErrors.age = "Age is required";
    } else if (formData.age < 5 || formData.age > 100) {
      validationErrors.age = "Age must be between 5 and 100";
    }

    if (!formData.class.trim()) {
      validationErrors.class = "Class is required";
    }

    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Student data: ", formData);
      alert("Form Submitted Successfully!");
      setFormData({ id: "", fullName: "", age: "", class: "" }); // Reset form after successful submission
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            {/* student Id */}
            <label className="block text-sm font-medium text-gray-700">Student ID</label>
            <input
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.id ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.id && <p className="text-red-500 text-sm mt-1">{errors.id}</p>}
          </div>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>

          {/* Class */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              className={`mt-1 block w-full p-2 border ${
                errors.class ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.class && <p className="text-red-500 text-sm mt-1">{errors.class}</p>}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
            >
              Register Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;

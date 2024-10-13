import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const StudentUpdateForm = ({ updateStudent }) => {
  const { id } = useParams(); // Get student ID from URL
  const [student, setStudent] = useState({
    id: '',
    fullname: '',
    age: '',
    class: '',
  });

  // Mock student data (in a real app, this would come from an API)
  const mockStudentData = [
    { id: 1, fullname: 'John Doe', age: 18, class: '12A' },
    { id: 2, fullname: 'Jane Smith', age: 17, class: '11B' },
    { id: 3, fullname: 'Samuel Green', age: 19, class: '12C' },
    { id: 4, fullname: 'Asha Baburaj', age: 18, class:'12G'},
    { id: 5, fullname: 'Arjun B S', age: 18, class:'12G'},
  ];

  useEffect(() => {
    // Simulate fetching student data based on the ID
    const fetchStudent = () => {
      const foundStudent = mockStudentData.find((s) => s.id === parseInt(id));
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        alert('Student not found');
      }
    };
    fetchStudent();
  }, [id]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    updateStudent(student); // Call the function to update the student data
    alert('Student data updated successfully!');
  };

  return (
     <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Student Data</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Student ID (Read-Only) */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Student ID</label>
          <input
            type="text"
            name="id"
            value={student.id}
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={student.fullname}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Class */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Class</label>
          <input
            type="text"
            name="class"
            value={student.class}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
        <button
          type="submit"
          className="bg-[#0a4275] text-white px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
        >
          Update Student
        </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default StudentUpdateForm;

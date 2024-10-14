import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {
  const navigate = useNavigate();

  // Mock data for students (In a real app, this would come from an API)
  const [students, setStudents] = useState([
    { id: 1, fullname: 'John Doe', age: 18, class: '12A' },
    { id: 2, fullname: 'Jane Smith', age: 17, class: '11B' },
    { id: 3, fullname: 'Samuel Green', age: 19, class: '12C' },
    { id: 4, fullname: 'Asha Baburaj', age: 18, class: '12G' },
    { id: 5, fullname: 'Arjun B S', age: 18, class: '12G' },
  ]);

  // Handle the view action
  const handleView = (id) => {
    navigate(`/studentDetails/${id}`);
  };

  // Handle the edit action
  const handleEdit = (id) => {
    navigate(`/studentUpdateForm/${id}`); // Redirect to the edit form page with the student's ID
  };

  // Handle the delete action
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((student) => student.id !== id));
      alert('Student deleted successfully!');
    }
  };

  // Handle the Create action
  const handleCreate = () => {
    navigate('/studentRegForm'); // Redirect to the create form page
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-4 text-center mt-6 sm:mt-10">Student List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">ID</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Full Name</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Age</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Class</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.id}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.fullname}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.age}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.class}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">
                    <div className="flex flex-col sm:flex-row sm:justify-center gap-2 sm:gap-3">
                      <button
                        onClick={() => handleView(student.id)}
                        className="bg-deep-red text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-red-700"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleEdit(student.id)}
                        className="bg-deep-blue text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student.id)}
                        className="bg-deep-red text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={handleCreate}
                        className="bg-deep-blue text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-blue-700"
                      >
                        Create
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;

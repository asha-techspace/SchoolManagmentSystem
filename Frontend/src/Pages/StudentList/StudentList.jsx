import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentList = () => {

    const navigate = useNavigate();
  // Mock data for students (In a real app, this would come from an API)
  const [students, setStudents] = useState([
    { id: 1, fullname: 'John Doe', age: 18, class: '12A' },
    { id: 2, fullname: 'Jane Smith', age: 17, class: '11B' },
    { id: 3, fullname: 'Samuel Green', age: 19, class: '12C' },
    { id: 4, fullname: 'Asha Baburaj', age: 18, class:'12G'},
    { id: 5, fullname: 'Arjun B S', age: 18, class:'12G'},

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
   const handleCreate = (id) =>{
    navigate('/studentRegForm'); // Redirect to the create form page
   }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center mt-10">Student List</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Full Name</th>
            <th className="py-2 px-4 border">Age</th>
            <th className="py-2 px-4 border">Class</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id} className="border-t">
                <td className="py-2 px-4 border">{student.id}</td>
                <td className="py-2 px-4 border">{student.fullname}</td>
                <td className="py-2 px-4 border">{student.age}</td>
                <td className="py-2 px-4 border">{student.class}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleView(student.id)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(student.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleCreate(student.id)}
                    className="bg-yellow-500 text-white px-2 py-1 m-2 rounded hover:bg-yellow-600"
                  >
                    Create
                  </button>
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
  );
};

export default StudentList;

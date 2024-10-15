import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal '

const StudentList = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'
  const [students, setStudents] = useState([
    { id: 1, fullname: 'John Doe', age: 18, class: '12A', division: 'A' },
    { id: 2, fullname: 'Jane Smith', age: 17, class: '11B', division: 'B' },
    { id: 3, fullname: 'Samuel Green', age: 19, class: '12C', division: 'C' },
    { id: 4, fullname: 'Asha Baburaj', age: 18, class: '12G', division: 'G' },
    { id: 5, fullname: 'Arjun B S', age: 18, class: '12G', division: 'G' },
    // More mock data here...
  ]);
  const openDeleteModal = (id) => {
    setCurrentRecord(id);
    setActionType("Delete");
    setModalOpen(true);
    setStudents(students.filter((student) => student.id !== id));
  };

  const handleConfirm = () => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.id);
    } else if (actionType === "Edit") {
      // Call your edit function, e.g., editLibraryHistory(currentRecord.id);
    }
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecord(null);
  };
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const studentsPerPage = 10; // Students to show per page

  // Filter students based on the search term
  const filteredStudents = students.filter((student) =>
    student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toString().includes(searchTerm) ||
    student.division.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleView = (id) => {
    navigate(`/studentDetails/${id}`);
  };

  const handleEdit = (id) => {
    navigate(`/studentUpdateForm/${id}`);
  };

  // const handleDelete = (id) => {
  //   if (window.confirm('Are you sure you want to delete this student?')) {
  //     setStudents(students.filter((student) => student.id !== id));
  //     alert('Student deleted successfully!');
  //   }
  // };

  const handleCreate = () => {
    navigate('/studentRegForm');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-4 text-center mt-6 sm:mt-10">Student List</h2>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Name, Class, ID or Division"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3 mx-auto"
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">ID</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Full Name</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Age</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Class</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Division</th>
              <th className="py-2 px-2 sm:px-4 lg:px-6 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.length > 0 ? (
              currentStudents.map((student) => (
                <tr key={student.id} className="border-t">
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.id}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.fullname}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.age}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.class}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.division}</td>
                  <td className="py-2 px-2 sm:px-4 lg:px-6 border">
                    <ConfirmationModal
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      onConfirm={handleConfirm}
                      actionType={actionType}
                    />
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
                        onClick={() => openDeleteModal(student.id)}
                        className="bg-deep-red text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {[...Array(Math.ceil(filteredStudents.length / studentsPerPage)).keys()].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'}`}
            >
              {number + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentList;

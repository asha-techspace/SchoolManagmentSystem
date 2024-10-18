import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal '
import {
  fetchStudentsRequest,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudent,
  addStudents,
  updateStudent,
  deleteStudent,
} from '../../redux/studentSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Plus } from 'lucide-react';

const StudentList = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector(state => state.student);

  const [isModalOpen, setModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'

  const fetchStudents = async () => {
    dispatch(fetchStudentsRequest());
    try {
      const response = await axios.get('http://localhost:5000/api/students', { withCredentials: true });
      const data = response.data.student;
      dispatch(fetchStudentsSuccess(data));
    } catch (err) {
      dispatch(fetchStudentsFailure(err.message));
      console.log(err)
    }
  };


  useEffect(() => { 
    fetchStudents();
  }, [dispatch]);


  const openDeleteModal = (studentId) => {
    setCurrentRecord(studentId);
    setActionType("Delete");
    setModalOpen(true);
  };

  const handleConfirm = async() => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.studentId);
      dispatch(addStudents(students.filter((student) => student.studentId !== currentRecord)));
      try {
        const response = await axios.delete(`http://localhost:5000/api/students/${currentRecord}`, { withCredentials: true });
      } catch (err) {
        dispatch(fetchStudentsFailure(err.message));
        console.log(err)
      }
    } else if (actionType === "Edit") {
      // Call your edit function, e.g., editLibraryHistory(currentRecord.studentId);
    }
    setModalOpen(false);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentRecord(null);
  };
  // const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const studentsPerPage = 5; // Students to show per page

  // Calculate pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page after search
  };

  const handleView = (student) => {
    navigate(`/studentDetails/${student.studentId}`,{state:{student:student}});
  };

  const handleEdit = (student) => {
    navigate(`/studentUpdateForm/${student.studentId}`,{state:{student:student}});
  };

  const handleCreate = () => {
    navigate('/studentRegForm');
  };

  const handleSearchKeyPress = async(event) => {

     if(event.key === 'Enter' && event.target.value.trim() === ''){
      fetchStudents()
     }

    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      // Directly access the input value from e.target.value
      console.log('Searching for:', event.target.value);
      // You can call your search API or function here
      try {
        const response = await axios.get(`http://localhost:5000/api/students/${event.target.value}`, { withCredentials: true });
        console.log(`Responseee:: ${JSON.stringify(response)}`)
        if(response.status == 200){
          dispatch(fetchStudentsSuccess([response.data]))
        }
        else{
          dispatch(fetchStudentsFailure(response))
        }
      } catch (err) {
        dispatch(fetchStudentsFailure(err.message));
        console.log(err)
      }
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6">
    <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold mb-4 text-center mt-6 sm:mt-10">Student List</h2>
  
    {/* Search bar and Create button in the same row */}
    <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Search by studentId"
        onKeyDown={handleSearchKeyPress}
        className="p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
      />
      <button
      onClick={handleCreate}
      className="ml-4 bg-deep-blue text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
    >
      <Plus className="w-5 h-5 mr-2" /> {/* Icon */}
       Create Student
    </button>
    </div>
  
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-2 sm:px-4 lg:px-6 border">studentId</th>
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
              <tr key={student.studentId} className="border-t">
                <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.studentId}</td>
                <td className="py-2 px-2 sm:px-4 lg:px-6 border">{student.name}</td>
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
                      onClick={() => handleView(student)}
                      className="bg-deep-red text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-red-700"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(student)}
                      className="bg-deep-blue text-white text-xs sm:text-sm lg:text-base px-2 py-1 sm:px-3 sm:py-2 lg:px-4 lg:py-2 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(student.studentId)}
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
        {[...Array(Math.ceil(students.length / studentsPerPage)).keys()].map((number) => (
          <button
            key={number}
            onClick={() => paginate(number + 1)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800'
            }`}
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

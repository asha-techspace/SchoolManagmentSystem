import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal '
import { Plus } from 'lucide-react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStaffsRequest,
  fetchStaffsSuccess,
  fetchStaffsFailure,
  addStaff,
  addStaffs,
  updateStaff,
  deleteStaff,
} from '../../redux/staffSlice';

const StaffList = () => {

const dispatch = useDispatch();
const [isModalOpen, setModalOpen] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'

const { staffs, loading, error } = useSelector(state => state.staff);

const fetchStaff = async () => {
  dispatch(fetchStaffsRequest());
  try {
    const response = await axios.get('http://localhost:5000/api/users/', { withCredentials: true });
    const data = response.data.users;
    console.log("fetched user::",data)
    dispatch(fetchStaffsSuccess(data));
  } catch (err) {
    dispatch(fetchStaffsFailure(err.message));
    console.log(err)
  }
};


useEffect(() => { 
  fetchStaff();
}, [dispatch]);


  const openDeleteModal = (staffId) => {
    setCurrentRecord(staffId);
    setActionType("Delete");
    setModalOpen(true);
    //setStaff(staff.filter((member) => member.staffId !== staffId))
  };
  
  const handleConfirm = async() => {
    if (actionType === "Delete") {
      // Call your delete function, e.g., deleteLibraryHistory(currentRecord.studentId);
      dispatch(addStaffs(staffs.filter((staff) => staff.id !== currentRecord)));
      try {
        const response = await axios.delete(`http://localhost:5000/api/users/${currentRecord}`, { withCredentials: true });
      } catch (err) {
        dispatch(fetchStaffsFailure(err.message));
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
  const navigate = useNavigate();
  
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const staffPerPage = 10; // Staff members to show per page

  // Pagination logic
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = staffs.slice(indexOfFirstStaff, indexOfLastStaff);

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  //   setCurrentPage(1); // Reset to the first page after search
  // };

  // Handle the view action
  const handleView = (staff) => {
    navigate(`/staffDetails/${staff.id}`,{state:{staff:staff}});
  };

  // Handle the edit action
  const handleEdit = (staff) => {
    navigate(`/staffUpdateForm/${staff.id}`,{state:{staff:staff}});
  };

  // Handle the delete action
  // const handleDelete = (staffId) => {
  //   if (window.confirm('Are you sure you want to delete this staff member?')) {
  //     setStaff(staff.filter((member) => member.staffId !== staffId));
  //     alert('Staff deleted successfully!');
  //   }
  // };

  // Handle the create action
  const handleCreate = () => {
    navigate('/staffRegForm');
  };

  // Pagination change handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
  <h2 className="text-2xl font-semibold mb-6 text-center mt-10">Staff List</h2>

  {/* Search bar and Create button in the same row */}
  <div className="flex justify-between items-center mb-4">
    {/* <input
      type="text"
      placeholder="Search by Staff ID, Name, or Role"
      value={searchTerm}
      onChange={handleSearchChange}
      className="p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
    /> */}
    <button
      onClick={handleCreate}
      className="ml-4 bg-deep-blue text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
    >
        <Plus className="w-5 h-5 mr-2" /> {/* Icon */}
      Create Staff
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
      <thead>
        <tr className="bg-gray-100">
          <th className="py-2 px-4 border">Staff ID</th>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border">Role</th>
          <th className="py-2 px-4 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {currentStaff.length > 0 ? (
          currentStaff.map((member) => (
            <tr key={member.id} className="border-t">
              <td className="py-2 px-4 border">{member.id}</td>
              <td className="py-2 px-4 border">{member.name}</td>
              <td className="py-2 px-4 border">{member.role}</td>
              <td className="py-2 px-4 border flex flex-col md:flex-row">
                <ConfirmationModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  onConfirm={handleConfirm}
                  actionType={actionType}
                />
                <button
                  onClick={() => handleView(member)}
                  className="bg-deep-red text-white px-2 py-1 rounded mr-2 mb-2 md:mb-0 hover:bg-red-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(member)}
                  className="bg-deep-blue text-white px-2 py-1 rounded mr-2 mb-2 md:mb-0 hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(member.id)}
                  className="bg-deep-red text-white px-2 py-1 rounded mb-2 md:mb-0 hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center py-4">
              No staff members found.
            </td>
          </tr>
        )}
      </tbody>
    </table>

    {/* Pagination */}
    <div className="flex justify-center mt-4">
      {[...Array(Math.ceil(staffs.length / staffPerPage)).keys()].map((number) => (
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

export default StaffList;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal '
import { Plus } from 'lucide-react';

const StaffList = () => {

const [isModalOpen, setModalOpen] = useState(false);
const [currentRecord, setCurrentRecord] = useState(null);
const [actionType, setActionType] = useState(""); // 'Edit' or 'Delete'

  const openDeleteModal = (staffId) => {
    setCurrentRecord(staffId);
    setActionType("Delete");
    setModalOpen(true);
     setStaff(staff.filter((member) => member.staffId !== staffId))
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
  const navigate = useNavigate();
  
  // Mock data for staff members
  const [staff, setStaff] = useState([
    { staffId: 1, name: 'Alice Johnson', role: 'Office Staff' },
    { staffId: 2, name: 'Bob Smith', role: 'Librarian' },
    { staffId: 3, name: 'Catherine Williams', role: 'Office Staff' },
    { staffId: 4, name: 'David Brown', role: 'Librarian' },
    // Add more mock staff data as needed...
  ]);

  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const staffPerPage = 10; // Staff members to show per page

  // Filter staff based on the search term (search by staffId, name, or role)
  const filteredStaff = staff.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.staffId.toString().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;
  const currentStaff = filteredStaff.slice(indexOfFirstStaff, indexOfLastStaff);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page after search
  };

  // Handle the view action
  const handleView = (staffId) => {
    navigate(`/staffDetails/${staffId}`);
  };

  // Handle the edit action
  const handleEdit = (staffId) => {
    navigate(`/staffUpdateForm/${staffId}`);
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

  return (
    <div className="container mx-auto p-6">
  <h2 className="text-2xl font-semibold mb-6 text-center mt-10">Staff List</h2>

  {/* Search bar and Create button in the same row */}
  <div className="flex justify-between items-center mb-4">
    <input
      type="text"
      placeholder="Search by Staff ID, Name, or Role"
      value={searchTerm}
      onChange={handleSearchChange}
      className="p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
    />
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
            <tr key={member.staffId} className="border-t">
              <td className="py-2 px-4 border">{member.staffId}</td>
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
                  onClick={() => handleView(member.staffId)}
                  className="bg-deep-red text-white px-2 py-1 rounded mr-2 mb-2 md:mb-0 hover:bg-red-700"
                >
                  View
                </button>
                <button
                  onClick={() => handleEdit(member.staffId)}
                  className="bg-deep-blue text-white px-2 py-1 rounded mr-2 mb-2 md:mb-0 hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => openDeleteModal(member.staffId)}
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
      {[...Array(Math.ceil(filteredStaff.length / staffPerPage)).keys()].map((number) => (
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

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StaffList = () => {
  const navigate = useNavigate();

  // Mock data for staff members
  const [staff, setStaff] = useState([
    { staffId: 1, name: 'Alice Johnson', role: 'Office Staff' },
    { staffId: 2, name: 'Bob Smith', role: 'Librarian' },
    { staffId: 3, name: 'Catherine Williams', role: 'Office Staff' },
  ]);

  // Handle the view action
  const handleView = (staffId) => {
    navigate(`/staffDetails/${staffId}`); // Redirect to staff detail page
  };

  // Handle the edit action
  const handleEdit = (staffId) => {
    navigate(`/staffUpdateForm/${staffId}`); // Redirect to staffDataUpdationForm
  };

  // Handle the delete action
  const handleDelete = (staffId) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      setStaff(staff.filter((member) => member.staffId !== staffId));
      alert('Staff deleted successfully!');
    }
  };

  // Handle the create action
  const handleCreate = () => {
    navigate('/staffRegForm'); // Redirect to staff create page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center mt-10">Staff List</h2>
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
            {staff.length > 0 ? (
              staff.map((member) => (
                <tr key={member.staffId} className="border-t">
                  <td className="py-2 px-4 border">{member.staffId}</td>
                  <td className="py-2 px-4 border">{member.name}</td>
                  <td className="py-2 px-4 border">{member.role}</td>
                  <td className="py-2 px-4 border flex flex-col md:flex-row">
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
                      onClick={() => handleDelete(member.staffId)}
                      className="bg-deep-red text-white px-2 py-1 rounded mb-2 md:mb-0 hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                  onClick={handleCreate} // Navigate to staff creation form
                  className="bg-deep-blue text-white px-4 py-2 rounded mb-2 md:mb-0 ml-2  hover:bg-blue-700"
                >
                  Create Staff
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
      </div>
    </div>
  );
};

export default StaffList;

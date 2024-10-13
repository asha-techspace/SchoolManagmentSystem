import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StaffDetails = () => {
  const { staffId } = useParams(); // Get the staff ID from the URL

  // Mock staff data (replace with actual API call in a real app)
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const mockStaffData = [
      {
        staffId: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        role: "Office Staff",
        gender: "Female",
        dob: "1985-07-20",
        experience: "10 years",
        qualification: "MBA",
        joiningDate: "2022-05-15",
        address: { street: "123 Main St", city: "Cityville", state: "Stateland", postalCode: "12345" },
      },
      {
        staffId: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        role: "Librarian",
        gender: "Male",
        dob: "1990-05-25",
        experience: "5 years",
        qualification: "MLIS",
        joiningDate: "2021-03-10",
        address: { street: "456 Elm St", city: "Townsville", state: "Stateville", postalCode: "23456" },
      },
      {
        staffId: 3,
        name: "Catherine Williams",
        email: "catherine@example.com",
        role: "Office Staff",
        gender: "Female",
        dob: "1988-12-15",
        experience: "8 years",
        qualification: "B.Com",
        joiningDate: "2019-08-12",
        address: { street: "789 Maple Ave", city: "Metropolis", state: "Provinceland", postalCode: "34567" },
      },
    ];

    const selectedStaff = mockStaffData.find((member) => member.staffId === parseInt(staffId));
    if (selectedStaff) {
      setStaff(selectedStaff);
    }
  }, [staffId]);

  if (!staff) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Staff Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Staff ID:</span>
            <span>{staff.staffId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Name:</span>
            <span>{staff.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email:</span>
            <span>{staff.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Role:</span>
            <span>{staff.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{staff.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date of Birth:</span>
            <span>{staff.dob}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Experience:</span>
            <span>{staff.experience}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Qualification:</span>
            <span>{staff.qualification}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Joining Date:</span>
            <span>{staff.joiningDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>
              {staff.address.street}, {staff.address.city}, {staff.address.state}, {staff.address.postalCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const StaffDetail = () => {
  const { staffId } = useParams(); // Get the staff ID from the URL

  // Mock staff data (replace with actual API call in a real app)
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    const mockStaffData = [
      { staffId: 1, name: "Alice Johnson", role: "Office Staff", address: "123 Main St", joiningDate: "2022-05-15", dateOfBirth: "1985-07-20", qualification: "MBA", yearOfJoining: 2022 },
      { staffId: 2, name: "Bob Smith", role: "Librarian", address: "456 Elm St", joiningDate: "2021-03-10", dateOfBirth: "1990-05-25", qualification: "MLIS", yearOfJoining: 2021 },
      { staffId: 3, name: "Catherine Williams", role: "Office Staff", address: "789 Maple Ave", joiningDate: "2019-08-12", dateOfBirth: "1988-12-15", qualification: "B.Com", yearOfJoining: 2019 },
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
            <span className="font-medium">Role:</span>
            <span>{staff.role}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{staff.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Joining Date:</span>
            <span>{staff.joiningDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date of Birth:</span>
            <span>{staff.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Qualification:</span>
            <span>{staff.qualification}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Year of Joining:</span>
            <span>{staff.yearOfJoining}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmationModal from '../../Components/ConfirmationModal/ConfirmationModal ';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {addStudent} from '../../redux/studentSlice';
import axios from 'axios';

const StaffDetails = () => {
  const { id } = useParams(); // Get the staff ID from the URL
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Mock student data (In a real app, this data would come from an API)
  const [staff, setStaff] = useState(location.state.staff || {});
  console.log("Staff for detail view", JSON.stringify(staff));


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
            <span>{staff.id}</span>
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

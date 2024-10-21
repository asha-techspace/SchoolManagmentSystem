import React from 'react';
import { AcademicCapIcon, UserGroupIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {useEffect, useState} from 'react'

const StatsCards = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo.role;

  const[studentCount, setStudentCount] = useState(0);
  const[staffCount, setStaffCount] = useState(0);

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {   
    fetchStat() 
  }, []);

  const fetchStat = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/stats`, { withCredentials: true });
      setStudentCount(response.data.data.totalStudents);
      setStaffCount(response.data.data.totalStaff);
      console.log(`Stats returned:: ${JSON.stringify(response)}`)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
    {/* Admin-specific section */}
    {role.toLowerCase() === 'admin' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Students */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
          <div className="bg-deep-blue text-white p-2 sm:p-3 rounded-full">
            <AcademicCapIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Total Students</h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{studentCount}</p>
          </div>
        </div>
  
        {/* Total Teachers */}
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
          <div className="bg-deep-blue text-white p-2 sm:p-3 rounded-full">
            <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Total Staffs</h2>
            <p className="text-xl sm:text-2xl font-bold text-gray-900">{staffCount}</p>
          </div>
        </div>
      </div>
    ) : null}
  
    {/* General buttons for different roles */}
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Fees Section: Admin & Office Staff */}
  {(role.toLowerCase() === 'admin' || role.toLowerCase() === 'officestaff') ? (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('/feesDetailsForm')}
          className="flex items-center bg-deep-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded hover:bg-red-600 w-full justify-center"
        >
          Add Fee Details
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </button>
      </div>
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('/feesEntryForm')}
          className="flex items-center bg-deep-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded hover:bg-red-600 w-full justify-center"
        >
          Fees Remittance
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </button>
      </div>
    </div>
  ) : null}

  {/* Library Section: Admin & Librarian */}
  {(role.toLowerCase() === 'admin' || role.toLowerCase() === 'librarian') ? (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('/libraryHistoryForm')}
          className="flex items-center bg-deep-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded hover:bg-red-600 w-full justify-center"
        >
          Issue Library Book
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </button>
      </div>
    </div>
  ) : null}
</div>

  </>
  
  );
};

export default StatsCards;

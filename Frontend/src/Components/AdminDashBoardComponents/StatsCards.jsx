import React from 'react';
import { AcademicCapIcon, UserGroupIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/solid';

const StatsCards = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {/* Total Students */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <div className="bg-deep-blue text-white p-2 sm:p-3 rounded-full">
          <AcademicCapIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div>
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Total Students</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">2500</p>
        </div>
      </div>

      {/* Total Teachers */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <div className="bg-deep-blue text-white p-2 sm:p-3 rounded-full">
          <UserGroupIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>
        <div>
          <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Total Teachers</h2>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">150</p>
        </div>
      </div>

      {/* Library button */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('/libraryHistoryForm')}
          className="flex items-center bg-deep-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded hover:bg-red-600 w-full justify-center"
        >
          Library Record Create
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </button>
      </div>

      {/* Fees button */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg flex items-center space-x-4">
        <button
          onClick={() => handleNavigate('/feesRemarksForm')}
          className="flex items-center bg-deep-red text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded hover:bg-red-600 w-full justify-center"
        >
          Fees Record Create
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default StatsCards;

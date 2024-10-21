import React, { useState } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const AdminChangePassword = () => {
  const [empId, setEmpId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload={"id":empId,"password":password};
    updateCredentials(payload);
    console.log(`Admin Change Password for Emp ID: ${empId}`);
    alert("Password Updated Successfully")
    setEmpId("");
    setPassword("");
  };

  const updateCredentials = async (payload) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/creds`, payload, { withCredentials: true });
      console.log(`Password Updated:: ${JSON.stringify(response)}`)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="max-w-lg w-full bg-white p-6 rounded-md shadow-md h-100">
      <h2 className="text-md font-semibold mb-4">Admin Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="empId" className="block text-gray-700">Employee ID</label>
          <input
            id="empId"
            type="text"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">New Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-deep-blue text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminChangePassword;

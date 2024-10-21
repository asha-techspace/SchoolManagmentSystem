import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserChangePassword = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload={"id":userInfo.id,"password":password};
    updateCredentials(payload);
    console.log(`Admin Change Password for Emp ID: ${empId}`);
  };

  const updateCredentials = async (payload) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/users/user/creds`, payload, { withCredentials: true });
      console.log(`Password Updated:: ${JSON.stringify(response)}`)
    } catch (err) {
      console.log(err)
    }
  };


  return (
    <div className="max-w-lg w-full bg-white p-6 rounded-md shadow-md ">
      <h2 className="text-md font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="empId" className="block text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Confirm Password</label>
          <input
            id="password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default UserChangePassword;

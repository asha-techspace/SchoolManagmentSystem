// src/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/authSlice'; // Import logout action
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = formData.email ? "" : "Email is required.";
    tempErrors.email = /\S+@\S+\.\S+/.test(formData.email) ? "" : "Email is not valid.";
    tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', formData, { withCredentials: true });

        console.log(res)
        setLoading(false);
        toast.success(res.data.message, {duration: 1000});

        const userCookie = Cookies.get('user');
        const token = Cookies.get('token');
        console.log(`token::${token}`)

        if (userCookie && token) {

          const decodedUserCookie = decodeURIComponent(userCookie);
          const cleanedUserJson = decodedUserCookie.startsWith('j:') ? decodedUserCookie.slice(2) : decodedUserCookie;
          const user = JSON.parse(cleanedUserJson);
          console.log(user);

          const payload = {
            userInfo: user._doc,
            isAuthenticated: true,
            token
          };
          console.log(payload);
          dispatch(login((payload)));
          
          console.log(`User: ${user._doc.role}`);

          // (user._doc.role == 'Admin')?navigate('/adminDashboard'):
          // (user._doc.role == 'OfficeStaff')?navigate('/officeStaffDashboard'):
          // (user._doc.role == 'Librarian')?navigate('/librarianDashboard'):navigate('/');

          navigate('/adminDashboard')
          
        }
      } catch (err) {
        setLoading(false);
        toast.error(err.response?.data?.message || 'An error occurred');
        console.log(err)
      }
      console.log("Form is valid");
    } else {
      console.log("Form has errors");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
          </div>
          <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-[#0a4275] rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

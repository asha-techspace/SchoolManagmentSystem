import React, { useState } from 'react';
import { HomeIcon, UsersIcon, CalendarIcon, BellIcon, CogIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/authSlice'
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux'

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo.role;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/logout', null, { withCredentials: true });
      console.log(res.data.message);
      dispatch(logout())
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="lg:flex">
        {/* Sidebar Toggle Button for small screens */}
        <div className="lg:hidden p-4 flex justify-between items-center bg-white mt-5">
          <button onClick={toggleSidebar} className="text-deep-blue">
            {isOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>

        </div>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static z-20 lg:z-auto top-0 left-0 h-full w-64 mt-5 bg-white text-deep-blue p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0`}
        >
          {/* Close Button (Visible only on small screens) */}
          <div className="lg:hidden flex justify-end mb-4">
            <button onClick={toggleSidebar} className="text-deep-blue">
              <XIcon className="w-6 h-6" />
            </button>
          </div>



          <nav className="space-y-4">
            <Link to="/adminDashboard" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <HomeIcon className="w-6 h-6" />
              <span className="font-bold">Dashboard</span>
            </Link>
            <Link to="/studentsList" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <UsersIcon className="w-6 h-6" />
              <span className="font-bold">Students</span>
            </Link>
            {(role.toLowerCase()==='admin')?(
            <Link to="/staffList" className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100">
              <CalendarIcon className="w-6 h-6" />
              <span className="font-bold">Staffs</span>
            </Link>):null}
            <button className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100" onClick={handleLogout}>
              <CogIcon className="w-6 h-6" />
              <span className="font-bold">Logout</span>
            </button>
          </nav>
        </aside>

        <div className="flex-1 p-6">
        <Outlet />
        </div>
      </div>
      
    </>
  );
};

export default SideBar;

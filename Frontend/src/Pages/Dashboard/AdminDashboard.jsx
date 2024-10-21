import React from 'react';
import HeadSection from '../../Components/AdminDashBoardComponents/HeadSection';
import StatsCards from '../../Components/AdminDashBoardComponents/StatsCards';
import AdminChangePassword from '../../Components/AdminDashBoardComponents/AdminChangePassword';
import UserChangePassword from '../../Components/AdminDashBoardComponents/UserChangePassword';
import { useSelector } from 'react-redux';


const AdminDashboard = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="flex-1">
                <HeadSection />
                <div className="p-6 grid grid-cols-1  gap-6">
                    <StatsCards />
                    <div className='flex-1'>
                        <div className='grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 '>
                            {(userInfo.role.toLowerCase() === 'admin')?
                            <AdminChangePassword />:null}
                            <UserChangePassword />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
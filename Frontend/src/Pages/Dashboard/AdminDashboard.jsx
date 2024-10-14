import React from 'react';
import SideBar from '../../Components/AdminDashBoardComponents/SideBar';
import HeadSection from '../../Components/AdminDashBoardComponents/HeadSection';
import StatsCards from '../../Components/AdminDashBoardComponents/StatsCards';
import AttendanceChart from '../../Components/AdminDashBoardComponents/AttendanceChart';
import NoticeBoard from '../../Components/AdminDashBoardComponents/NoticeBoard';
import GenderChart from '../../Components/AdminDashBoardComponents/GenderChart';


const AdminDashboard = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <SideBar />
            <div className="flex-1">
                <HeadSection />
                <div className="p-6 grid grid-cols-1  gap-6">
                    <StatsCards />
                    
                </div>
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    <GenderChart />
                    <AttendanceChart />
                    <NoticeBoard />
                    
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

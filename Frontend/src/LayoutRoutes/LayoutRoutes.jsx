import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import LoginPage from '../Pages/Login/LoginPage'
import StudentRegistrationForm from '../Pages/StudentForm/StudentRegistrationForm'
import FeesRemarksForm from '../Pages/FeesRemarksForm/FeesRemarksCreateForm'
import LibraryHistoryForm from '../Pages/LibraryHistoryForm/LibraryHistoryCreateForm'
import StudentList from '../Pages/StudentList/StudentList'
import StudentDetails from '../Pages/StudentDetails/StudentDetails'
import StaffRegistrationForm from '../Pages/StaffForm/StaffRegistrationForm'
import StaffList from '../Pages/StaffList/StaffList'
import StaffDataUpdationForm from '../Pages/StaffForm/StaffDataUpdationForm'
import StaffDetails from '../Pages/StaffDetails/StaffDetails'
import StudentDataUpdationForm from '../Pages/StudentForm/StudentDataUpdationForm'
import AdminDashBoard from '../Pages/Dashboard/AdminDashboard'
import NoticeBoard from '../Components/AdminDashBoardComponents/NoticeBoard';
import OfficeStaffDashboard from '../Pages/Dashboard/OfficeStaffDashboard'
import LibrarianDashBoard from '../Pages/Dashboard/LibrarianDashBoard'
import Unauthorized from '../Pages/Error/Unauthorised'
import RoleProtectedRoute from './RoleProtectedRoutes'

const LayoutRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mt-16 mb-16 ">
          <Routes>

            import RoleProtectedRoute from './RoleProtectedRoute';  // Assuming the file is named RoleProtectedRoute.js

            <Route path='/' element={<LoginPage />} />

            {/* Student Registration Form (Admin, OfficeStaff) */}
            <Route path='/studentRegForm'
              element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element= <StudentRegistrationForm /> />}
            />

            {/* Fees Remarks Form (Admin, OfficeStaff) */}
            <Route path='/feesRemarksForm'
              element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element= <FeesRemarksForm /> />}
            />

            {/* Library History Form (Admin, Librarian) */}
            <Route path='/libraryHistoryForm'
              element={<RoleProtectedRoute roles={['Admin', 'Librarian']} element= <LibraryHistoryForm /> />}
            />

            {/* Student List (Admin, OfficeStaff) */}
            <Route path='/studentsList'
              element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff', 'Librarian']} element= <StudentList /> />}
            />

            {/* Student Update Form (Admin, OfficeStaff) */}
            <Route path='/studentUpdateForm/:id'
              element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element= <StudentDataUpdationForm /> />}
            />

            {/* Student Details (Admin, OfficeStaff) */}
            <Route path='/studentDetails/:id'
              element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff', 'Librarian']} element= <StudentDetails /> />}
            />

            {/* Staff Registration Form (Admin) */}
            <Route path='/staffRegForm'
              element={<RoleProtectedRoute roles={['Admin']} element= <StaffRegistrationForm /> />}
            />

            {/* Staff Update Form (Admin) */}
            <Route path='/staffUpdateForm/:staffId'
              element={<RoleProtectedRoute roles={['Admin']} element= <StaffDataUpdationForm /> />}
            />

            {/* Staff List (Admin) */}
            <Route path='/staffList'
              element={<RoleProtectedRoute roles={['Admin']} element= <StaffList /> />}
            />

            {/* Staff Details (Admin) */}
            <Route path='/staffDetails/:staffId'
              element={<RoleProtectedRoute roles={['Admin']} element= <StaffDetails /> />}
            />

            {/* Admin Dashboard (Admin) */}
            <Route path='/adminDashboard'
              element={<RoleProtectedRoute roles={['Admin']} element= <AdminDashBoard /> />}
            />

            {/* Events / Notice Board (Admin, OfficeStaff, Librarian) */}
            <Route path='/events'
              element={<RoleProtectedRoute roles={['Admin']} element= <NoticeBoard /> />}
            />

            {/* Office Staff Dashboard (OfficeStaff) */}
            <Route path='/officeStaffDashboard'
              element={<RoleProtectedRoute roles={['OfficeStaff']} element= <OfficeStaffDashboard /> />}
            />

            {/* Librarian Dashboard (Librarian) */}
            <Route path='/librarianDashboard'
              element={<RoleProtectedRoute roles={['Librarian']} element= <LibrarianDashBoard /> />}
            />

            {/* Unauthorized Access */}
            <Route path='/unauthorized' element={<Unauthorized />} />


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default LayoutRoutes


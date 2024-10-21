import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../Components/Header/Header'
import Footer from '../Components/Footer/Footer'
import LoginPage from '../Pages/Login/LoginPage'
import StudentRegistrationForm from '../Pages/StudentForm/StudentRegistrationForm'
import FeesEntryForm from '../Pages/FeesRemarksForm/FeesHistoryForm'
import FeesDetailsForm from '../Pages/FeesRemarksForm/FeesMasterForm'
import LibraryHistoryForm from '../Pages/LibraryHistoryForm/LibraryHistoryCreateForm'
import StudentList from '../Pages/StudentList/StudentList'
import StudentDetails from '../Pages/StudentDetails/StudentDetails'
import StaffRegistrationForm from '../Pages/StaffForm/StaffRegistrationForm'
import StaffList from '../Pages/StaffList/StaffList'
import StaffDataUpdationForm from '../Pages/StaffForm/StaffDataUpdationForm'
import StaffDetails from '../Pages/StaffDetails/StaffDetails'
import StudentDataUpdationForm from '../Pages/StudentForm/StudentDataUpdationForm'
import AdminDashBoard from '../Pages/Dashboard/AdminDashboard'
import Unauthorized from '../Pages/Error/Unauthorised'
import RoleProtectedRoute from './RoleProtectedRoutes'
import SideBar from '../Components/AdminDashBoardComponents/SideBar'


const LayoutRoutes = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mt-16 mb-16 ">
          <Routes>

            <Route path='/' element={<LoginPage />} />

            <Route element={<SideBar />}>

              {/* Student Registration Form (Admin, OfficeStaff) */}
              <Route path='/studentRegForm'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element=<StudentRegistrationForm /> />}
              />

              {/* Fees Remarks Form (Admin, OfficeStaff) */}
              <Route path='/feesDetailsForm'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element=<FeesDetailsForm /> />}
              />

              <Route path='/feesEntryForm'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element=<FeesEntryForm /> />}
              />


              {/* Library History Form (Admin, Librarian) */}
              <Route path='/libraryHistoryForm'
                element={<RoleProtectedRoute roles={['Admin', 'Librarian']} element=<LibraryHistoryForm /> />}
              />

              {/* Student List (Admin, OfficeStaff) */}
              <Route path='/studentsList'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff', 'Librarian']} element=<StudentList /> />}
              />

              {/* Student Update Form (Admin, OfficeStaff) */}
              <Route path='/studentUpdateForm/:id'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff']} element=<StudentDataUpdationForm /> />}
              />

              {/* Student Details (Admin, OfficeStaff) */}
              <Route path='/studentDetails/:id'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff', 'Librarian']} element=<StudentDetails /> />}
              />

              {/* Staff Registration Form (Admin) */}
              <Route path='/staffRegForm'
                element={<RoleProtectedRoute roles={['Admin']} element=<StaffRegistrationForm /> />}
              />

              {/* Staff Update Form (Admin) */}
              <Route path='/staffUpdateForm/:staffId'
                element={<RoleProtectedRoute roles={['Admin']} element=<StaffDataUpdationForm /> />}
              />

              {/* Staff List (Admin) */}
              <Route path='/staffList'
                element={<RoleProtectedRoute roles={['Admin']} element=<StaffList /> />}
              />

              {/* Staff Details (Admin) */}
              <Route path='/staffDetails/:staffId'
                element={<RoleProtectedRoute roles={['Admin']} element=<StaffDetails /> />}
              />

              {/* Admin Dashboard (Admin) */}
              <Route path='/adminDashboard'
                element={<RoleProtectedRoute roles={['Admin', 'OfficeStaff', 'Librarian']} element=<AdminDashBoard /> />}
              />
             {/* Unauthorized Access */}
            <Route path='/unauthorized' element={<Unauthorized />} />
            </Route>


          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default LayoutRoutes


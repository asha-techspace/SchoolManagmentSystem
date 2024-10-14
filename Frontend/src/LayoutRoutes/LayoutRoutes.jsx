import React from 'react'
import { BrowserRouter as Router,Route,Routes } from  'react-router-dom'
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
import AdminDashBoard from '../Pages/Dashboard/AdminDashBoard'
import NoticeBoard from '../Components/AdminDashBoardComponents/NoticeBoard';

const LayoutRoutes = () => {
  return (
    <Router>
        <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 mt-16 mb-16 ">
        <Routes>
            <Route path='/' element={<LoginPage />}/>
            <Route path='/studentRegForm' element={<StudentRegistrationForm />}/>
            <Route path='/feesRemarksForm' element={<FeesRemarksForm />}/>
            <Route path='/libraryHistoryForm' element={<LibraryHistoryForm />}/>
            <Route path='/studentsList' element= {<StudentList />}/>
            <Route path='/studentUpdateForm/:id' element= {<StudentDataUpdationForm />} />
            <Route path='/studentDetails/:id' element= {<StudentDetails />} />
            <Route path='/staffRegForm' element= {<StaffRegistrationForm />} />
            <Route path='/staffUpdateForm/:staffId' element= {<StaffDataUpdationForm />} />
            <Route path='/staffList' element= {<StaffList />} />
            <Route path='/staffDetails/:staffId' element={<StaffDetails />}/>
            <Route path='/adminDashboard' element={<AdminDashBoard />} />
            <Route path='/events' element={<NoticeBoard />} />
        </Routes>
        </main>
        <Footer />
        </div>
    </Router>
  )
}

export default LayoutRoutes


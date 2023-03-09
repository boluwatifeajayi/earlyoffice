import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home  from './pages/Home';
import StudentRegister from './pages/student/auth/StudentRegister';
import StudentLogin from './pages/student/auth/StudentLogin';
import EmployerRegister from './pages/employer/auth/EmployerRegister';
import EmployerLogin from './pages/employer/auth/EmployerLogin';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CreateJob from './pages/employer/job/CreateJob';
import Jobs from './pages/student/job/Jobs';
import Job from './pages/student/job/Job';
import Apply from './pages/student/job/Apply';
import JobDashboard from './pages/employer/job/JobDashboard';
import EmployerJob from './pages/employer/job/EmployerJob';
import StudentDashboard from './pages/student/job/StudentDashboard';
import CreateProfile from './pages/student/auth/CreateProfile';
import UpdateProfile from './pages/student/auth/UpdateProfile';
import CreateEmployerProfile from './pages/employer/auth/CreateEmployerProfile';
import UpdateEmployerProfile from './pages/employer/auth/UpdateEmployerProfile';
import ViewStudent from './pages/employer/job/ViewStudent';
import Privacy from './pages/stateless/Privacy';
import About from './pages/stateless/About';
import Contact from './pages/stateless/Contact';
import JobCategory from './pages/student/job/JobCategory';
import JobLocation from './pages/student/job/JobLocation';
import JobCompany from './pages/student/job/JobCompany';
import AllCompanies from './pages/employer/auth/AllCompanies';
import Company from './pages/employer/auth/Company';



function App() {
  return (
    <>
    <Router>
      <Header/>
      <div>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/student/register' element={<StudentRegister/>}/>
        <Route path='/student/login' element={<StudentLogin/>}/>
        <Route path='/employer/login' element={<EmployerLogin/>}/>
        <Route path='/employer/register' element={<EmployerRegister/>}/>
        <Route path='/employer/createinternship' element={<CreateJob/>}/>
        <Route path='/internships' element={<Jobs/>}/>
        <Route path='/internship/:id/:companyname/:companylocation' element={<Job/>}/>
        <Route path='/internship/apply' element={<Apply/>}/>
        <Route path='/employer/internships' element={<JobDashboard/>}/>
        <Route path='/employer/internship/:id' element={<EmployerJob/>}/>
        <Route path='/employer/application/:studentId' element={<ViewStudent/>}/>
        <Route path='/student/dashboard' element={<StudentDashboard/>}/>
        <Route path='/student/create' element={<CreateProfile/>}/>
        <Route path='/student/profile/update' element={<UpdateProfile/>}/>
        <Route path='/employer/create' element={<CreateEmployerProfile/>}/>
        <Route path='/employer/profile/update' element={<UpdateEmployerProfile/>}/>
        <Route path='/internships/:cat' element={<JobCategory/>}/>
        <Route path='/internships/locations/:theplace' element={<JobLocation/>}/>
        <Route path='/internships/companies/:organisation' element={<JobCompany/>}/>
        <Route path='/companies/all' element={<AllCompanies/>}/>
        <Route path='/company/:id' element={<Company/>}/>

        {/* stateless */}
        <Route path='/privacy-policy' element={<Privacy/>}/>
        <Route path='/about-us' element={<About/>}/>
        <Route path='/contact-us' element={<Contact/>}/>
        
       </Routes>
      </div>
      <Footer/>
    </Router>
    <ToastContainer/> 
    </>
  );
}

export default App;

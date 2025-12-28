import React from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify';
import AuthGuard from './components/AuthGuard'
import AdminDashboard from './pages/AdminDashboard'
import PreventLoginAccess from './components/PreventLoginAccess';
import AdminTask from './pages/AdminTask.jsx'
import AdminTeam from './pages/AdminTeam.jsx'
import AllJobs from './pages/AllJobs.jsx';
import About from './pages/About.jsx';
import { ShopProvider } from './context/ShopContext.jsx';
import AllJobsUser from './pages/AllJobsUser.jsx';
const App = () => {
  return (
    <ShopProvider>
 <BrowserRouter>
      <Routes>
       <Route path="/login" element={ <PreventLoginAccess>  <Login /> </PreventLoginAccess> } />
           <Route path="/admin-dashboard" element={ <AuthGuard> <AdminDashboard /> </AuthGuard>}/>
          <Route path="/all-jobs" element={ <AuthGuard> <AllJobs /></AuthGuard> } />
          <Route path="/all-jobs" element={ <AuthGuard> <AllJobs /></AuthGuard> } />
          <Route path='/admin-team' element={ <AuthGuard> <AdminTeam /></AuthGuard> } />
          <Route path='/admin-task' element={ <AuthGuard> <AdminTask /></AuthGuard> } />


    {/* free access */}
        <Route path="/" element={<HomePage />} />
        <Route path='/all-jobs-user' element={<AllJobsUser />} />
        <Route path='/about' element={<About />} />
      </Routes>
              <ToastContainer />
    </BrowserRouter>
    </ShopProvider>
   
  )
}

export default App

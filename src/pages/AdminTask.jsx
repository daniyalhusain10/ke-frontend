import React from 'react'
import Sidebar from '../components/Sidebar'
import TopBar from '../components/TopBar'
import AddTaskButton from '../components/AddTaskButton'
import JobTable from '../components/JobTable'
const AdminTask = () => {
  return (
     <div className='flex hide-scrollbar-chrome'>
      <Sidebar />
      <div className='flex-1'>
        <TopBar />
        <div className='mt-10 ml-3'>
         <AddTaskButton />
        <JobTable />
        </div>
      </div>
    </div>
  )
}

export default AdminTask
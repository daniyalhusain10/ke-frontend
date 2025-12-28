import React from 'react'
import JobCard from '../components/JobTable.jsx'
import TopBar from '../components/TopBar'
import Sidebar from '../components/Sidebar'
const AllJobs = () => {
  return (
    <div className='flex'>
      <div><Sidebar /></div>
      <div className='flex flex-col w-full'>
          <div>
        <TopBar />
          </div>
      <JobCard />
      </div>
      
    </div>
  )
}

export default AllJobs
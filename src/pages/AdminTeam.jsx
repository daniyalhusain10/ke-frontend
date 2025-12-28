import React from 'react'
import Sidebar from '../components/Sidebar'
import OverlayMenu from '../components/HamburgerMenu'
import TopBar from '../components/TopBar'

const AdminTeam = () => {
  return (
    <div className='hide-scrollbar-chrome max-h-screen  flex'>
      <Sidebar />
      <div className='flex-1'>

        <TopBar />

      </div>
    </div>
  )
}

export default AdminTeam
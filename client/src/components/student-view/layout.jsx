import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
//import AdminSideBar from './sidebar'
import StudentHeader from './header'

const StudentLayout = () => {
    const [openSidebar, setOpenSidebar]= useState(false);


  return (
    <div className='flex min-h-screen w-full'>
        {/* Sidebar */}
        {/* <AdminSideBar open={openSidebar} setOpen={setOpenSidebar}/> */}
       
            {/* Header */}
            <StudentHeader setOpen={setOpenSidebar}/>

            <main className='flex-1 flex-col flex bg-muted/40 p-4 md:p-6'>
                <Outlet/>
            </main>

       
      
    </div>
  )
}

export default StudentLayout

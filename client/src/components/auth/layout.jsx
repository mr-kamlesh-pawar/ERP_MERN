import React from 'react'
import { Outlet } from 'react-router-dom'
import clg from '../../assets/clg.jpg'

const AuthLayout = () => {
  
  return (
    <div className='flex min-h-screen w-full'>
        <div className='hidden lg:flex items-center justify-center  w-1/2 px-12 bg-slate-100'>
        <div className='max-w-md space-y-6 text-center text-black text-primary-foreground'>
          
          <img  className="" 
          src={clg} alt="" />
            <h1 className='text-xl font-extrabold tracking-tight text-black'>Welcome to Rasiklal M. Dhariwal Institute of Technology, Chinchwad</h1>

        </div>

        </div>

        <div className='flex flex-1 items-center justify-center bg-background px-4 py-12  sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default AuthLayout

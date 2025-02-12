import CommonForm from '@/components/common/form';
import { loginFormControls, registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const AuthLogin = () => {
 const initialState = {
  email : '',
  password : '',
 }

      const [formData, setFormData]= useState(initialState);
      const dispatch = useDispatch();
      const {toast}= useToast();
     

      function onSubmit(event){
        event.preventDefault();

        dispatch(loginUser(formData)).then((data) => {
          console.log(data)
          if(data.payload?.success==true){
            toast({
              title: data.payload?.message || 'Login Successful..!',
              variant: 'success'
          })
            
          }

          else{
            toast({
              title: data.payload?.message || 'Login Failed!, Please try again...',
              variant: 'destructive'
          })


         


          }
        
      });
        

      }

  return (
    <div className=' mx-auto w-full max-w-md space-y-6'>
      <div className='text-center flex flex-col justify-center items-center'>
      <img
      src='http://rmdiot.in/images/estdImg.jpg'
      />

        <h1 className='text-3xl font-bold tracking-tight text-foreground'>SignIn You Account</h1>
        <p className='mt-2'>Rasiklal M. Dhariwal Institute of Technology, Chinchwad</p>
        <Link to='/'  className='font-medium  text-primary hover:underline ml-2'>🚀College ERP 🔑  </Link>

      </div>
      

      <CommonForm
        formControls={loginFormControls}
        buttonText={'SignIn'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}

      />
<div className='w-[95%] flex justify-end  text-xs text-blue-800 font-bold'>
<Link to="/">
      <h1 className=''>Forgot Password ?</h1>
</Link>
</div>
    </div>
  )
}

export default AuthLogin

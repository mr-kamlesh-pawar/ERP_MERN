import CommonForm from '@/components/common/form';
import { loginFormControls, registerFormControls } from '@/config';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

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
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>SignIn You Account</h1>
        <p className='mt-2'>Don't have an account</p>
        <Link to='/auth/register'  className='font-medium  text-primary hover:underline ml-2'>Create Account</Link>

      </div>
      

      <CommonForm
        formControls={loginFormControls}
        buttonText={'SignIn'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}

      />
    </div>
  )
}

export default AuthLogin

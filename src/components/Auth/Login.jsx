import React, { useState} from 'react'
import {Link, Navigate} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form"
import { checkUserAsync, selectError, selectLoggedInUser } from '../../features/Auth/authSlice'
import ConditionalRedirect from './ConditionalRedirect'

// import {increment,decrement,incrementByAmount} from '../../features/Auth/authSlice';

export default function Login(){
  const dispatch=useDispatch()
  const error=useSelector(selectError)
  const user=useSelector(selectLoggedInUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  
    return(
        <>
        <ConditionalRedirect user={user} />
        <div className="flex flex-col md:flex-row min-h-screen">
        <div className="md:w-1/2 w-full bg-gradient-to-r from-purple-500 to-pink-500 flex flex-col justify-center items-center p-8">
        <img
          className="h-100 w-100"
          src="/logo2.png"
          alt="Your Company"
        />
         <h1 className="mt-8 text-white text-4xl font-bold text-center md:text-left">Welcome to Our Site!</h1>
         <p className="mt-4 text-white text-lg text-center md:text-left">Sign in to your account to continue.</p>
          </div>
  
          <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-8 md:py-16 lg:px-24  bg-cover" style={{ backgroundImage: `url("/back2.png")`,backgroundSize:'cover' }}>
          <div className="relative inset-0 bg-black opacity-10"></div>

          <div className="max-w-sm  md:ml-24 pb-44">
            <h2 className="text-center md:text-left text-4xl font-extrabold leading-9 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Sign in to your account
            </h2>
            <form  noValidate className="space-y-6 mt-10" 
            onSubmit={handleSubmit((data)=>{
              dispatch(
                checkUserAsync({email:data.email,password:data.password}))})} >
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800">
                  Email
                </label>
                <div className="mt-2">
                <input
                    id="email"
                    {...register("email",{required:"Email is Required",
                    pattern:{
                       value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                       message:'email not valid'
                  }})}
                    type="email"
                    autoComplete='username'
                    className="block w-full rounded-md border-0 py-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-sm text-red-500 mt-1 italic'>{errors?.email?.message}</p>
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm mb-1">
                    <Link to='/forgot-password' className="py-1 font-semibold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-400 hover:text-purple-600 transition-colors duration-300 ">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                <input
                    id="password"
                    {...register("password",{required:"Password is Required"})}
                    type="password"
                    autoComplete='current-password'
                    className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                  <p className='text-sm text-red-500 mt-1 italic'>{errors?.password?.message}</p>
                </div>
                <p className='text-sm text-red-500 mt-1 italic'>{error?.message}</p>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/signup" className="font-semibold leading-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 hover:text-purple-600 transition-colors duration-300">
                Create a Account
              </Link>
            </p>
            </div>
          </div>
        </div>
      </>
    )
}
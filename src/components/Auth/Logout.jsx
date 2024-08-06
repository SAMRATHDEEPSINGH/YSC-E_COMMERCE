import React, { useEffect } from 'react'
import { selectLoggedInUser, signOutAsync } from '../../features/Auth/authSlice'
import { useSelector,useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Logout() {
  const dispatch=useDispatch()
  const user=useSelector(selectLoggedInUser)
    useEffect(()=>{
      dispatch(signOutAsync())
    })
  return (
    <>
    {!user && <Navigate to='/login' replace={true}></Navigate>}

    </>
  )
}

export default Logout

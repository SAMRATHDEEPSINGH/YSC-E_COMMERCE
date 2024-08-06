import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../../features/Auth/authSlice'
import { Navigate } from 'react-router-dom'



export default function Protected({children}) {
    const user=useSelector(selectLoggedInUser)
    if(!user){
        return<Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=='admin'){
        return<Navigate to='/' replace={true}></Navigate>
    }

  return children;
}

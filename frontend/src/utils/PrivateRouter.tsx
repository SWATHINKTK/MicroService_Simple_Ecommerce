import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';


interface UserState{
    userStatus:boolean,
    user:any
  }
  

const PrivateRouter = () => {
    const { userStatus } = useSelector((state:UserState) => state.user);

  return (
    userStatus ? <Outlet/> : <Navigate to='/login' replace/>
  )
}

export default PrivateRouter

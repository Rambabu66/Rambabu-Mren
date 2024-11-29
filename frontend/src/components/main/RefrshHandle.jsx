import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefrshHandle = ({setIaSuther}) => {

    const location = useLocation();
    const navigate= useNavigate()
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setIaSuther(true)
            if(location.pathname === '/' ||
                location.pathname === '/login' ||
                location.pathname === '/signup'
            ){
                navigate('/home',{replace:false})
            }
        }
    },[location,navigate,setIaSuther])
  return (
    null
  )
}

export default RefrshHandle
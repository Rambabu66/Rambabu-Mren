import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../ErrorHandle/ErrorHandle'

const Home = () => {
    const [loggedInUser,setLoggedInUser]=useState('')
    const[products,setProducts]=useState('')
    const navigate= useNavigate()
    useEffect(()=>{
        setLoggedInUser(localStorage.getItem("loggedInUser"))
    },[])
    const handleLogout=()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess('User Logout')
        setTimeout(()=>{
            navigate('/login')
        },1000)
    }
    const fetchProduct =async()=>{
        try {
            const url='http://localhost:8000/products';
            const header= {
                headers:{
                    'authorization':localStorage.getItem('token')
                }
            }
            const resp=await fetch(url,header)
            const result=await resp.json()
            setProducts(result)
        } catch (error) {
            handleError(error)
            
        }
    }
    useEffect(()=>{
        fetchProduct()
    },[])
  return (
    <div>
      <h1>UserName:{loggedInUser}</h1>
      <button className='buttons' onClick={handleLogout}>Logout</button>
      {
       products && products?.map((item,i)=>(
            <ul key={i}>
                <span>{item.name}:{item.price}</span>
            </ul>
        ))
      }
    </div>
  )
}

export default Home

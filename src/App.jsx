import React, { useEffect } from 'react'
import Home from './Pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
 
const navigate = useNavigate();

  useEffect(()=>{
   
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log("Logged In");
        navigate('/');  // Redirect to Home page if user is logged in
      }else{
        console.log("Logged Out");  // Logs to console when no user is logged in
        navigate('/login');
      }
    })
  },[])
  return (
    <div>
      <ToastContainer theme='dark' />
        {/* Defining routes for different pages */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player/:id' element={<Player/>} />
   
     </Routes>
    </div>
  )
}

export default App

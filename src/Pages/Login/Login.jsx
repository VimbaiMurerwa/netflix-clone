import React, { useState } from 'react' 
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signup } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  // State variables to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Function to handle user authentication (login or signup)
  const user_auth = async (event)=>{
    event.preventDefault();
    setLoading(true);  // Show loading spinner while request is being processed
    if(signState==="Sign In"){
      await login(email, password);   // Calls login function if signing in
    }else{
      await signup(name, email, password);
    }
    setLoading(false);
  }

  return (
    // Show spinner if loading state is true
    loading?<div className="login-spinner">
      <img src={netflix_spinner} alt="" />
    </div>:
    <div className='login'>
      <img src={logo} className='login-logo' alt="" />
      <div className='login-form'>
        <h1>{signState}</h1>
        <form>
          {/* Show name input field only when user is signing up */}
          {signState==="Sign Up"?
          <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder='Your name' />:<></>}
          <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder='Password' />
            {/* Login/Signup button */}
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
            <input type="checkbox" />
            <label htmlFor="">Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

          {/* Switch between Sign In and Sign Up */}    
         <div className='form-switch'>
         {signState==="Sign In"?
          <p>New to Netflix? <span onClick={()=>{setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p>Already have account? <span onClick={()=>{setSignState("Sign In")}}>Sign In Now</span></p>
         }
         </div>
      </div>
      
    </div>
  )
}

export default Login

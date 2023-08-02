import React, { useState } from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebase from '../../firebase/config';

function Login() {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const nav=useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    const auth=getAuth(firebase)
    signInWithEmailAndPassword(auth,email,password)
    .then(()=>{
      nav('/')
    })
    .catch((err)=>{
      console.log(err.message);
      let error = err.message.split("/")[1].split(")")[0].trim();
      setErrMsg(error)
      setTimeout(() => {
        setErrMsg('');
      }, 3000); // Clear error message after 3 seconds
    })
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt='logo'></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
          />
          <br />
          <br />
          {errMsg ? <div style={{color:'red'}} id='errMsg' >{errMsg}</div> : null}
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;

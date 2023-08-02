import React, { useState } from "react";

import Logo from "../../olx-logo.png";
import "./Signup.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import firebase from "../../firebase/config";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [errMsg, setErrMsg] = useState('');
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(firebase); 
    const firestore = getFirestore(firebase)
    // Create a new user
    createUserWithEmailAndPassword(auth, email, password)
    .then(
      async (result) => {
        // Get the user's uid
        const uid = result.user.uid;

        await addDoc(collection(firestore, "user"), {
          id: uid,
          name: userName,
          email: email,
          mobile: phone,
        });

        // Success!
        console.log("User updated successfully!");
        nav('/login')
      }
    )
    .catch((err)=>{
      console.log(err.message,'<<error');
      let error = err.message.split("/")[1].split(")")[0].trim();
      setErrMsg(error);
    
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
           
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
           
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          {errMsg ? <div id='errMsg' >{errMsg}</div> : null}
          <button>Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}

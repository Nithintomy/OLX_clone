import React, {useEffect,useContext} from 'react';  
import './App.css';
import {BrowserRouter as Router ,Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Components/View/View';
import { AuthContext} from './Store/Context';
import { getAuth } from 'firebase/auth';

import { query ,collection, getFirestore, where ,getDocs } from 'firebase/firestore';
import firebase from './firebase/config';
import Post from './Store/PostContext';

function App() {

  const {setUser} = useContext(AuthContext)
  const auth = getAuth(firebase)
  const firestore =getFirestore(firebase)

  useEffect(() => {
    auth.onAuthStateChanged(async(user)=>{
      if(user){
        const q = query(collection(firestore,'user'),where('id','==',user.uid))
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          console.log('User not found');
        } else {
          const user = querySnapshot.docs[0].data();
          console.log(user);
          setUser(user)
        }
      }
    })

  }, [])

  return (
    <div>
      <Post>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} /> 
        <Route path='/create' element={<Create/>}/> 
        <Route path='/create' element={<Create />} />
        <Route path='/view' element={<View />} />
      </Routes>
    </Router>
    </Post>
    </div>
  );
}

export default App;

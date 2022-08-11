import { React, useState } from "react";
import ImageUpload from "./Components/ImageUpload";
import ImageDisplay from "./Components/ImageDisplay";
import Registration from "./Components/Registration";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './Db/firebase'
import { Link, Route, Routes } from 'react-router-dom'



export default function App() {

  const [userName, setUserName] = useState("")

  const signup = (e, email, password) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => console.log(userCredential))
  }

  const login = (e, email, password) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log(userCredential)
      setUserName(userCredential.user.email)
    }
    )
  }

  return (
    <div className="App">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
          display: "flex",
          gap: "4vw",
          backgroundColor: "black",
          padding: "3vh",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Link to="/">Signup/Login</Link>
        <Link to="/imageDisplay">Image Display</Link>
        <Link to="/imageUpload">Image Upload</Link>
      </nav>
      <header className="App-header">

        <div>
          <Routes>
            <Route path="/" element={<Registration onSignup={signup} onLogIn={login} />} />
            <Route path="/imageDisplay" element={<ImageDisplay />} />
            <Route path="/imageUpload" element={<ImageUpload username={userName} />} />
          </Routes>
        </div>
      </header>
    </div >
  );
}


//change stuff to functional components
//implement comments
//hide components behind authstate


//by right-->

// user goes to website, can only view newsfeed but cannot like, comment or upload
// after user signs up, alert that they have signed up
// after user logs in, then can upload and can view newsfeed plus like/comment
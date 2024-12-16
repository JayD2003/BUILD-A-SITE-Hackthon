// pages/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider} from './../firebase/firebase-config';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully:", name);
      const authInfo = {
        userID: userCredential.user.uid,
        name : name,
        gmail: userCredential.user.email,
        profilePhoto: userCredential.user.photoURL,
        isAuth: true,
      }
      localStorage.setItem("auth" , JSON.stringify(authInfo));
      setError(null); // Clear any previous errors
      navigate('/dashboard');  // Redirect to dashboard after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
  
        //initializing popup sign form using google 
        try{
          const results = await signInWithPopup(auth, provider);
          console.log(results);
  
          //collecting the information
          const authInfo = {
              userID: results.user.uid,
              name : results.user.displayName,
              gmail: results.user.email,
              profilePhoto: results.user.photoURL,
              isAuth: true,
          }
  
          // //storing the info in local storage for future purposes
          localStorage.setItem("auth" , JSON.stringify(authInfo));
          setError(null); // Clear any previous errors
          //navigating tp the dashboard page
          navigate('/dashboard'); 
        } catch (err) {
          console.error("Error during login:", err.message);
          setError(err.message); // Set error for display
        }
    };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleGoogleLogin}>Signin with Google</button>
      {error && <p>{error}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;

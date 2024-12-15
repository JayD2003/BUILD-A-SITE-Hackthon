// pages/Login.js
import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
// import { signInWithGoogle } from '../firebase/auth';
import { auth, provider} from './../firebase/firebase-config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleGoogleLogin = async () => {

      //initializing popup sign form using google 
      try{
        const results = await signInWithPopup(auth, provider);
        console.log(results);

        //collecting the information
        const authInfo = {
            userID: results.user.uid,
            name : results.user.displayName,
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

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form refresh
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in successfully:", userCredential.user);

      const authInfo = {
        userID: userCredential.user.uid,
        name : userCredential.user.displayName,
        profilePhoto: userCredential.user.photoURL,
        isAuth: true,
      }
      localStorage.setItem("auth" , JSON.stringify(authInfo));
      setError(null); // Clear any previous errors
      navigate('/dashboard'); 
    } catch (err) {
      console.error("Error during login:", err.message);
      setError(err.message); // Set error for display
    }
  };


  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
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
        <button type="submit">Login</button>
      </form>
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;

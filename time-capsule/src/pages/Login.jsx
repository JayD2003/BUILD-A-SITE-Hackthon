import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from './../firebase/firebase-config';
import '../styles/login.css'; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      console.log(results);

      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        gmail: results.user.email,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };

      localStorage.setItem('auth', JSON.stringify(authInfo));
      setError(null); // Clear any previous errors
      navigate('/dashboard');
    } catch (err) {
      console.error('Error during login:', err.message);
      setError(err.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully:', userCredential.user);

      const authInfo = {
        userID: userCredential.user.uid,
        name: userCredential.user.displayName,
        gmail: userCredential.user.email,
        profilePhoto: userCredential.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem('auth', JSON.stringify(authInfo));
      setError(null);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error during login:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <form className="loginform" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Login</button>
        </form>

        <div className="google-login">
          <p className='or'>or</p>
          <button onClick={handleGoogleLogin} className="google-btn">
            Login with Google
          </button>
        </div>

        <div className="signup-link">
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default Login;

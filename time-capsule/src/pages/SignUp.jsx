import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from './../firebase/firebase-config';
import '../styles/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords don't match");
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const authInfo = {
          userID: userCredential.user.uid,
          name: name,
          gmail: userCredential.user.email,
          profilePhoto: userCredential.user.photoURL,
          isAuth: true,
        };
        localStorage.setItem("auth", JSON.stringify(authInfo));
        setError(null); // Clear any previous errors
        navigate('/dashboard'); // Redirect to dashboard after successful signup
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const results = await signInWithPopup(auth, provider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        gmail: results.user.email,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };
      localStorage.setItem("auth", JSON.stringify(authInfo));
      setError(null); // Clear any previous errors
      navigate('/dashboard'); // Navigate to dashboard
    } catch (err) {
      setError(err.message);
      console.error("Error during login:", err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="btn">Sign Up</button>
        </form>

        <div className="or-divider">
          <span>or</span>
        </div>

        <button onClick={handleGoogleLogin} className="google-btn">Sign in with Google</button>

        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>

        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;

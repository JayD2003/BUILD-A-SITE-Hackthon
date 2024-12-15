import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase-config';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import CreateCapsule from './components/CreateCapsule';
import CapsulesList from './components/CapsuleList';
import Navbar from './components/Navbar';
import { useGetUserInfo } from './hooks/useGetUserInfo';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
      return () => unsubscribe();
    }, []);
  
    const {isAuth} = useGetUserInfo(); 
    return (
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-capsule" element={isAuth ? <CreateCapsule /> : <Navigate to="/login" />} />
          <Route path="/view-capsules" element={isAuth ? <CapsulesList /> : <Navigate to="/login" />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    );
};

export default App;

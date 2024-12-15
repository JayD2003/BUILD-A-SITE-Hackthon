import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { onAuthStateChanged } from './firebase/auth';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';

const App = () => {
    const [user, setUser] = useState(null);
  
    // useEffect(() => {
    //   onAuthStateChanged(setUser);
    // }, []);

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    );
};

export default App;

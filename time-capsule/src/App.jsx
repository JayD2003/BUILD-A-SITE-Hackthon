import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import ErrorPage from './pages/ErrorPage';
import { useGetUserInfo } from './hooks/useGetUserInfo';

const App = () => {
    const [user, setUser] = useState(null);

    const {isAuth} = useGetUserInfo();

    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    );
};

export default App;

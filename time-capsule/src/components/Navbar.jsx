import React from 'react';
import { Link } from 'react-router-dom'; // For navigation
import { auth } from '../firebase/firebase-config'; // For authentication
import { useGetUserInfo } from '../hooks/useGetUserInfo';

const Navbar = () => {
  const user = auth.currentUser;
    const {isAuth} = useGetUserInfo(); 


  const handleLogout = () => {
    auth.signOut();
    localStorage.removeItem('auth');
    window.location.reload(); // Reload the page to show changes
  };

  return (
    <nav>
      <ul>
        {/* For unauthenticated users */}
        {!isAuth ? (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </>
        ) : (
          <>
            {/* For authenticated users */}
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/view-capsules">View Capsules</Link></li>
            <li><Link to="/create-capsule">Create Capsule</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

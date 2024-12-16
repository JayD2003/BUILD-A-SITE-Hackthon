import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config'; // Assuming db is initialized in firebase-config.js
import { collection, getDocs, addDoc } from 'firebase/firestore';
import CapsulesList from '../components/CapsuleList';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import './../styles/dashboard.css';

const Dashboard = () => {
  const user = auth.currentUser;
  const { name, profilePhoto, gmail } = useGetUserInfo();

  // Logout function
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('auth');
    window.location.reload();
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome, {name || "Not Logged In"}!</h1>
      </header>

      <div className="dashboard-content">
        {/* Profile Section */}
        <section className="profile-section">
          <h2>Your Profile</h2>
          <div className="profile-info">
            <div className="profile-photo">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" />
              ) : (
                <img 
                  src="https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg" 
                  alt="Default Profile" 
                />
              )}
            </div>
            <div className="profile-details">
              <p><strong>Name:</strong> {name || "No name available"}</p>
              <p><strong>Email:</strong> {gmail}</p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>Log Out</button>
        </section>

        {/* Time Capsule Section */}
        <section className="capsules-section">
          <CapsulesList />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

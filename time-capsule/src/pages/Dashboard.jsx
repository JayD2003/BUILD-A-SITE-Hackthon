import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase-config';
import { db } from '../firebase/firebase-config';  // Assuming db is initialized in firebase-config.js
import { collection, getDocs, addDoc } from 'firebase/firestore';
import CapsulesList from '../components/CapsuleList';
import { useGetUserInfo } from '../hooks/useGetUserInfo';

const Dashboard = () => {
  const user = auth.currentUser;
  const {name, profilePhoto, gmail} = useGetUserInfo();

  // Logout function
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('auth');
    window.location.reload();
  };

  return (
    <div className="dashboard">
      <header>
        <h1>Welcome, {name || "Not Logged In"}!</h1>
      </header>

      {/* Profile Information */}
      <section className="profile">
        <h2>Your Profile</h2>
        <p><strong>Name:</strong> {name || "No name available"}</p>
        <p><strong>Email:</strong> {gmail}</p>
      </section>

      {/* Time Capsule Section */}
      <section className="capsules">
        <CapsulesList />
      </section>
    </div>
  );
};

export default Dashboard;

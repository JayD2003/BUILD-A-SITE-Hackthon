import React from 'react';
import { auth } from '../firebase/firebase-config';

const Dashboard = () => {
  const user = auth.currentUser;

  return (
    <header>
      <h1>Welcome, {user?.displayName || user?.email || 'Not Log'}!</h1>
      <button onClick={() => auth.signOut()}>Logout</button>
    </header>
  );
};

export default Dashboard;

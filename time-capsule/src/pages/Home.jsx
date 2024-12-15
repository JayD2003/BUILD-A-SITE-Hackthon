import React from 'react';
import { Link } from 'react-router-dom'; // Importing Link from React Router for navigation

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Time Capsule</h1>
      <p>Write letters to your future self and create memorable moments.</p>
      
      <div>
        {/* Button for Login */}
        <Link to="/login">
          <button>Login</button>
        </Link>

        {/* Button for Sign Up */}
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { useGetCapsules } from "../hooks/useGetCapsule";
import './../styles/capsule.css';

const CapsulesList = () => {
  const { capsules, loading, error } = useGetCapsules();

  // Show loading indicator while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Show error message if data fetch fails
  if (error) return <p>{error}</p>;

  return (
    <div className="capsules-list">
      <h2>Your Time Capsules</h2>
      {capsules.length > 0 ? (
        <ul>
          {capsules.map((capsule) => (
            <li key={capsule.id} className="capsule-item">
              <h3>Title : {capsule.title}</h3>
              <p>{capsule.message}</p>
              <small>Delivery Date: {new Date(capsule.scheduledTime).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>No time capsules created yet.</p>
      )}
    </div>
  );
};

export default CapsulesList;

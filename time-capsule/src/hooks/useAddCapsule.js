import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './../firebase/firebase-config';
import { useGetUserInfo } from './useGetUserInfo';
import { useState } from 'react';

export const useAddCapsule = () => {
  // Initialize Firestore collection reference
  const CapsuleCollectionRef = collection(db, 'Capsules');
  
  // Get user info from custom hook
  const { userID } = useGetUserInfo();
  
  // State variables to manage loading, error, and success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Function to add capsule to Firestore
  const addCapsule = async ({ fromName, toName, toEmail, title, message, scheduledTime }) => {
    if (!title.trim() || !message.trim() || !scheduledTime) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await addDoc(CapsuleCollectionRef, {
        userID,
        fromName, 
        toName, 
        toEmail, 
        title, 
        message, 
        scheduledTime,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);
    } catch (err) {
      console.error('Error adding capsule:', err);
      setError('Failed to add capsule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { addCapsule, loading, error, success };
};

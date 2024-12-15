import { useEffect, useState } from "react";
import { query, collection, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "./../firebase/firebase-config";
import { useGetUserInfo } from "./useGetUserInfo";

// Custom hook to get Capsule info from server
export const useGetCapsules = () => {
    const [capsules, setCapsules] = useState([]); // Use lowercase for state variables
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track error state

    const { userID } = useGetUserInfo(); // Fetch user ID from user info

    const CapsuleCollectionRef = collection(db, "Capsules");

    // Function to get data from the server
    const getCapsules = async () => {
        let unsubscribe;
        try {
            const queryCapsules = query(
                CapsuleCollectionRef,
                where("userID", "==", userID),
                orderBy("createdAt")
            );

            unsubscribe = onSnapshot(queryCapsules, (snapshot) => {
                const docs = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const id = doc.id;
                    docs.push({ ...data, id });
                });
                setCapsules(docs);
                setLoading(false); // Set loading to false when data is loaded
            });
        } catch (err) {
            console.error("Error fetching capsules:", err);
            setError("Error fetching capsules."); // Set error if data fetch fails
            setLoading(false);
        }

        return () => unsubscribe(); // Clean up listener
    };

    useEffect(() => {
        if (userID) {
            getCapsules();
        }
    }, [userID]); // Dependency on userID ensures this runs when userID changes

    return { capsules, loading, error }; // Return capsules, loading, and error
};

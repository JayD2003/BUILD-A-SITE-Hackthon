import { getFirestore, setDoc, doc } from 'firebase/firestore';
import app from './firebase-config';

const db = getFirestore(app);

export const createUserProfile = async (userId, data) => {
  await setDoc(doc(db, 'users', userId), data);
};

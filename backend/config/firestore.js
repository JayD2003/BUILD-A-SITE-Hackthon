const admin = require('firebase-admin');

// Initialize Firebase with Firestore credentials
admin.initializeApp({
  credential: admin.credential.cert('./firebase/credentials.json'),
});

const db = admin.firestore();

module.exports = db;

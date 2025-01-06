const express = require('express');
const cron = require('node-cron');
const db = require('./config/firestore'); // Import Firestore

const app = express();
const EMAILJS_SERVICE_ID = 'your_service_id';
const EMAILJS_TEMPLATE_ID = 'your_template_id';
const EMAILJS_PUBLIC_KEY = 'your_public_key';

// Function to send email
const sendEmail = async (recipient, message) => {
  const emailData = {
    to_email: recipient,
    message: message,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      emailData,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}


const checkCapsules = async () => {
  const currentTime = new Date();

// Convert current time to Indian Standard Time (IST) and format it as "YYYY-MM-DDTHH:mm:ss"
  const offsetIST = 330; // IST is UTC +5:30
  const istTime = new Date(currentTime.getTime() + offsetIST * 60 * 1000);

               // Keep only "YYYY-MM-DDTHH:mm:ss" format

  try {
    // Query Firestore for capsules with scheduledTime equal to current time
    const snapshot = await db.collection('Capsules')
      .where('scheduledTime', '>=', istTime.toISOString().slice(0,19))
      .get();

    if (snapshot.empty) {
      console.log('No capsules scheduled for the current time.');
      return;
    }

    const capsules = [];
    snapshot.forEach(doc => {
      capsules.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Log the capsules or perform any action you want (e.g., sending emails)
    console.log('Capsules scheduled for now:', capsules);
    
  } catch (error) {
    console.error('Error checking capsules:', error);
  }
};

// Schedule the job to run every minute
cron.schedule('* * * * *', () => {
  const currentTime = new Date();

// Convert current time to Indian Standard Time (IST) and format it as "YYYY-MM-DDTHH:mm:ss"
  const offsetIST = 330; // IST is UTC +5:30
  const istTime = new Date(currentTime.getTime() + offsetIST * 60 * 1000);
  console.log('Cron job running at', istTime);
  checkCapsules(); // Call the function to check the database
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

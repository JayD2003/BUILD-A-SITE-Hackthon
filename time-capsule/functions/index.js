const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

admin.initializeApp();

// Firebase Function to send emails via HTTP request
exports.sendEmail = functions.https.onRequest(async (req, res) => {
  try {
    const currentDate = new Date();
  
    // Fetch all pending capsules with a scheduled time that is less than or equal to the current time
    const capsulesSnapshot = await admin.firestore().collection('capsules')
      .where('scheduledTime', '<=', currentDate.toISOString())  // Check if scheduled time is <= current time
      .where('status', '==', 'pending')  // Only check capsules with status 'pending'
      .get();

    if (capsulesSnapshot.empty) {
      console.log("No capsules to send.");
      res.status(200).send("No capsules to send.");
      return;  // Exit function if there are no capsules to send
    }

    // Loop through all the scheduled capsules
    capsulesSnapshot.forEach(async (doc) => {
      const capsule = doc.data();
      const { fromName, toName, toEmail, title, message } = capsule;

      // Set up Nodemailer transport using Gmail
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: functions.config().email.user,  // Replace with your email
          pass: functions.config().email.password,  // Replace with your Gmail app password
        },
      });

      // Email options (subject, body, etc.)
      const mailOptions = {
        from: functions.config().email.user,  // Sender's email
        to: toEmail,
        subject: title,
        text: `Message from ${fromName} to ${toName}:\n\n${message}`,
        html: `<p>Message from <strong>${fromName}</strong> to <strong>${toName}</strong>:</p><p>${message}</p>`,
      };

      try {
        // Send the email using Nodemailer
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", toEmail);

        // Update the status of the capsule to 'sent' after the email is sent
        await doc.ref.update({ status: 'sent' });
      } catch (error) {
        console.error("Error sending email: ", error);
      }
    });

    res.status(200).send("Emails processed successfully.");
  } catch (error) {
    console.error("Error in processing emails:", error);
    res.status(500).send("Internal Server Error");
  }
});

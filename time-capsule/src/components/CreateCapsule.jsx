import React, { useState } from 'react';
import { useAddCapsule } from '../hooks/useAddCapsule';
import emailjs from 'emailjs-com';
import './../styles/createcapsule.css';  // Link the new CSS file

const CreateCapsule = () => {
  const [fromName, setFromName] = useState('');  // Sender's name
  const [toName, setToName] = useState('');  // Recipient's name
  const [toEmail, setToEmail] = useState('');  // Recipient's email
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const { addCapsule, loading, error, success } = useAddCapsule();

  // EmailJS setup
  const userID = "Qif3KOpvOnQGd87pn"; // Replace with your EmailJS public key
  const serviceID = "service_uzccmxn"; // Your EmailJS Service ID
  const templateID = "template_cu0xfmz"; // Your EmailJS Template ID

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scheduledTime = `${deliveryDate}T${deliveryTime}:00`;  // Combine date and time

    const emailData = {
      from_name: fromName,  // Sender's name
      to_name: toName,      // Recipient's name
      to_email: toEmail,    // Recipient's email
      subject: title,       // Email subject (title of the capsule)
      message: message,     // The message content
    };

    // Send the email
    emailjs.send(serviceID, templateID, emailData, userID)
      .then((response) => {
        console.log('Email sent successfully:', response);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });

    await addCapsule({ fromName, toName, toEmail, title, message, scheduledTime });
  };

  return (
    <div className="create-capsule">
      <h2 className="create-capsule-title">Create Time Capsule</h2>
      <form className="create-capsule-form" onSubmit={handleSubmit}>
        <input
          className="capsule-input"
          type="text"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          className="capsule-input"
          type="text"
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          placeholder="Recipient's Name"
          required
        />
        <input
          className="capsule-input"
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          placeholder="Recipient's Email"
          required
        />
        <input
          className="capsule-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="capsule-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <div className="capsule-date-time">
          <input
            className="capsule-input"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
          <input
            className="capsule-input"
            type="time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            required
          />
        </div>
        <button className="capsule-button" type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Capsule'}
        </button>
      </form>

      {error && <p className="capsule-error">{error}</p>}
      {success && <p className="capsule-success">Capsule created successfully!</p>}
    </div>
  );
};

export default CreateCapsule;

import React, { useState } from 'react';
import { useAddCapsule } from '../hooks/useAddCapsule';

const CreateCapsule = () => {
  const [fromName, setFromName] = useState('');  // Sender's name
  const [toName, setToName] = useState('');  // Recipient's name
  const [toEmail, setToEmail] = useState('');  // Recipient's email
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const { addCapsule, loading, error, success } = useAddCapsule();
  const status = 'pending';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scheduledTime = `${deliveryDate}T${deliveryTime}:00`;  // Combine date and time
    await addCapsule({ fromName, toName, toEmail, title, message, scheduledTime });
  };

  return (
    <div>
      <h2>Create Time Capsule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={fromName}
          onChange={(e) => setFromName(e.target.value)}
          placeholder="Your Name"
          required
        />
        <input
          type="text"
          value={toName}
          onChange={(e) => setToName(e.target.value)}
          placeholder="Recipient's Name"
          required
        />
        <input
          type="email"
          value={toEmail}
          onChange={(e) => setToEmail(e.target.value)}
          placeholder="Recipient's Email"
          required
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          required
        />
        <input
          type="time"
          value={deliveryTime}
          onChange={(e) => setDeliveryTime(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Capsule'}
        </button>
      </form>

      {error && <p>{error}</p>}
      {success && <p>Capsule created successfully!</p>}
    </div>
  );
};

export default CreateCapsule;

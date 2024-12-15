import React, { useState } from 'react';
import { useAddCapsule } from '../hooks/useAddCapsule';

const CreateCapsule = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const { addCapsule, loading, error, success } = useAddCapsule();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addCapsule({ title, message, deliveryDate });
  };

  return (
    <div>
      <h2>Create Time Capsule</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
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

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const CreateCodePage = () => {
  const [responseMessage, setResponseMessage] = useState('');
  const [createdCode, setCreatedCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://leader-acadmy.hwnix.com/api/addcode?expires_at=2025-12-08'
      );
      setResponseMessage(response.data.message);
      setCreatedCode(response.data.code);
    } catch (error) {
      console.error('Error creating code:', error);
      setResponseMessage('Failed to create code. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', color: 'white', padding: '20px' }}>
      <motion.h2 initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
        Create Code
      </motion.h2>
      <form onSubmit={handleSubmit}>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Create Code
        </motion.button>
      </form>
      {responseMessage && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <h3>{responseMessage}</h3>
          {createdCode && (
            <div>
              <p>Code: {createdCode.code}</p>
              <p>Expires At: {createdCode.expires_at}</p>
              <p>ID: {createdCode.id}</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CreateCodePage;

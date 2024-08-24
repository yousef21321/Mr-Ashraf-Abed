import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ChatComponent.css'; // Import the CSS file

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const apiUrl = 'https://leader-acadmy.hwnix.com/api/messages';
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(response.data.messages || []);
      } catch (err) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [apiUrl, token]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await axios.post(
        apiUrl,
        { message: newMessage },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewMessage('');
      setSuccessMessage('تم ارسال رسالتك بنجاح وسوف يتم الرد من قبل المدرس'); // Set success message
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages || []);
      setTimeout(() => setSuccessMessage(''), 5000); // Clear success message after 5 seconds
    } catch (err) {
      setError('Failed to send message');
    }
  };
  return (
    <div className="chat-container">
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="اكتب سوالك ......"
        />
        <button className="message-button" onClick={handleSendMessage}>Send</button>
      </div>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default ChatComponent;

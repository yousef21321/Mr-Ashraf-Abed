import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Assuming you will create this file for styling
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://leader-acadmy.hwnix.com/api/login', {
        phone,
        password,
      });
      const { data } = res;
      setResponse(data);

      // Save token and educational_level_id to local storage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('educationalLevelId', data.user.educational_level_id);
      localStorage.setItem('id', data.user.id);
      navigate('/PricingCard');

      console.log('Login Success:', data);
      // You can add navigation here if needed
    } catch (error) {
      setError('Login Failed: ' +'مازال الايميل تحت المراجعه 🔎📝');
      console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
  };
const BachHome =async (e) => {
  navigate('/')
}
  return (
    <div className="login-container">
    <div className="login-form">
      <div className="login-header">
        <div className="login-title">Log In</div>
        <div className="signup-link">
          <span>Don’t have an Account? </span>
          <span className="create-account"><a href='/Signup'>Create Account</a></span>
        </div>
      </div>
      <form className="input-group" onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-label">Mobile Number</div>
          <div className="input-field">
            <input className="input-field"
              type="text"
              placeholder="010000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="input-group">
          <div className="input-label">Password</div>
          <div className="input-field">
            <input className="input-field"
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <div className="forgot-password">
            <a href="#">Forget Password?</a>
          </div>
        </div>
        <div className="login-button">
          <button type="submit">Log In</button>
        </div>
      </form>
      <br/>      <br/>


      <div className="login-button">
          <button onClick={BachHome}>الرئسيه</button>
        </div>
      {response && <div className="response">Login Successful</div>}
      {error && <div className="error">{error}</div>}
    </div>
    <div className="login-banner">
      <div className="banner-overlay" />
      <div className="banner-text2">
        Unlock Your English Potential Today!
      </div>
    </div>
  </div>
  );
};

export default Login;

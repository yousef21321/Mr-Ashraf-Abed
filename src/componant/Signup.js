import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [educationalLevel, setEducationalLevel] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post('https://leader-acadmy.hwnix.com/api/signup', {
        name: `${firstName} ${lastName}`,
        phone,
        password,
        educational_level: educationalLevel,
      });

      setResponse(res.data);
      console.log('Registration Success:', res.data);
      navigate('/Login');

    } catch (error) {
      setError('Registration Failed: ' + (error.response ? error.response.data : error.message));
      console.error('Registration Failed:', error.response ? error.response.data : error.message);
    }
  };
  const BachHome =async (e) => {
    navigate('/')
  }
  return (
    <div className="signup-container">
      <div className="signup-banner">
        <div className="gradient-overlay"></div>
        <div className="banner-text">Start Your English Journey Today</div>
      </div>
      <div className="signup-form">
        <div className="signup-header">
          <h2>Get Started</h2>
          <p>
            Already a member? <span className="login-link"><a href='/Login'>Log In</a></span>
          </p>
        </div>
        <form className="signup-inputs" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Mohamed"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Hussien"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mobile Number</label>
            <input
              type="text"
              placeholder="010000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password Confirmation</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Educational Level:</label>
            <select
              value={educationalLevel}
              onChange={(e) => setEducationalLevel(e.target.value)}
              required
            >
              <option value="">Select Educational Level</option>
              <option value="الصف الاول الثانوي">الصف الاول الثانوي</option>
              <option value="الصف الثاني الثانوي">الصف الثاني الثانوي</option>
              <option value="الصف الثالث الثانوي">الصف الثالث الثانوي</option>
            </select>
          </div>
          <div className="signup-footer">
            <div className="terms-agreement">
              <input type="checkbox" id="terms" required />
              <label htmlFor="terms">
                By signing up, you agree to our <span className="terms-link">Terms of Service</span>
              </label>
            </div>
            <button className="signup-button" type="submit">Sign up</button>
          </div>
          {response && <div className="response">Registration Successful</div>}
          {error && <div className="error">{error}</div>}
        </form>

      </div>
      <div className="login-button">
          <button onClick={BachHome}>الرئسيه</button>
        </div>
    </div>
  );
};

export default Signup;

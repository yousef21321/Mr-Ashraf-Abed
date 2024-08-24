// ProfileCard.js
import React from 'react';
import './ProfileCard2.css'; // Import the CSS file

const ProfileCard2 = () => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-header-content">
          <h1 className="profile-name">John Doe</h1>
          <div className="social-links">
            <div className="social-icon">
              <img src="path/to/facebook-icon.png" alt="Facebook" />
            </div>
            <div className="social-icon">
              <img src="path/to/twitter-icon.png" alt="Twitter" />
            </div>
          </div>
        </div>
        <button className="create-account-button">Create Account</button>
      </div>
      <div className="profile-main">
        <p>Welcome to your profile!</p>
      </div>
    </div>
  );
};

export default ProfileCard2;

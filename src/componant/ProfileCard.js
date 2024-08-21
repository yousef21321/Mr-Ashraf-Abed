
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs'; // Make sure to install this package
import facebookImage from './Assets/facebook.svg';
import youtube from './Assets/social-icons-white-youtube.svg';
import './ProfileCard.css';
import SubscriptionModal from "./SubscriptionModal";
import Footer from './Footer';

const SocialIcon = ({ src, alt, href }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  </div>
);

const ProfileCard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const educationalLevelId = localStorage.getItem('package_id');
        const authToken = localStorage.getItem('authToken');
  
        // Log values for debugging
        console.log("Educational Level ID:", educationalLevelId);
        console.log("Auth Token:", authToken);
  
        // Ensure the values are valid before making the request
        if (!authToken || !educationalLevelId) {
          console.error("No authToken or educationalLevelId found");
          navigate('/login');
          return;
        }
  
        const response = await axios.get(`https://leader-acadmy.hwnix.com/api/lessons/package/${educationalLevelId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        });
  
        // Check if the response structure matches what you expect
        console.log("API Response:", response.data);
        
        setLessons(response.data); // Directly use the array returned
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError(err);
        navigate('/login'); // Redirect to login on error
      } finally {
        setLoading(false);
      }
    };
  
    const fetchDeviceFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceFingerprint(result.visitorId);
        localStorage.setItem('deviceFingerprint', result.visitorId); // Store deviceFingerprint in localStorage
      } catch (err) {
        console.error('Error fetching device fingerprint:', err);
        setErrorMessages(prev => ({ ...prev, global: 'Could not fetch device fingerprint' }));
        navigate('/login'); // Redirect to login on error
      }
    };
  
    fetchLessons();
    fetchDeviceFingerprint();
  }, [navigate]);

  const handleSubmit = async (lesson) => {
    localStorage.setItem('lesson_id', lesson.id); // Store lesson_id in localStorage
    navigate('/Video');
  };
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.post('https://leader-acadmy.hwnix.com/api/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      localStorage.clear();
      navigate('/');
    } catch (error) {
      console.error('Logout Failed:', error.response ? error.response.data : error.message);
      navigate('/login'); // Redirect to login on logout error
    }
  };

  return (
    <div className="profile-card">
      <header className="profile-header">
        <div className="profile-header-content">
          <button className="nav-button create-account-button" onClick={handleLogout}>تسجيل الخروج</button>
          <div className="social-links">
            <SocialIcon src={facebookImage} alt="Facebook" href="https://www.facebook.com/AshrafAbed2020/photos" />
            <SocialIcon src={youtube} alt="YouTube" href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Link to="/" style={styles.link}><button style={styles.button}>Home</button></Link>
            <Link to="/" style={styles.link}><button style={styles.button}>About</button></Link>
            <Link to="/ProfileCard" style={styles.link}><button style={styles.button}>Lecture</button></Link>
          </div>
          <div className="profile-name">Mr.Ashraf Abed</div>
        </div>
      </header>
      <main className="profile-main">
        <section className="lessons-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading lessons: {error.message}</p>
          ) : (
            Array.isArray(lessons) && lessons.map(lesson => (
              <div key={lesson.id} className="lesson-card">
                <img className="lesson-image" src="/images/1.png" alt="Lesson" />
                <div className="lesson-info">
                  <div className="lesson-header">
                    <span className="lesson-author">Mr. Ashraf Abed</span>
                  </div>
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-description">{lesson.description}</p>
                  <div className="lesson-tags">
                    {/* Uncomment if needed */}
                    {/* <div className="tag">Grammar</div>
                    <div className="tag">2nd Prep</div> */}
                  </div>
                  {errorMessages[lesson.id] && (
                    <p className='error'>{errorMessages[lesson.id]}</p>
                  )}
                  {/* Uncomment if needed */}
                  <div className="lesson-buttons">
                    <button className="lesson-button enter-lecture-button" onClick={() => handleSubmit(lesson)}>دخول للمحاضرة</button>
                  </div>
                </div>
              </div>
            ))
          )}
          {isModalOpen && (
            <SubscriptionModal
              lesson={selectedLesson}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  button: {
    height: "33px",
    background: "white",
    borderRadius: "7px",
    border: "1px solid #487EEA",
    color: "#487EEA",
    fontFamily: "Inter",
    fontWeight: "400",
    padding: "5 16px",
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
  },
  link: {
    textDecoration: "none",
  },
};

export default ProfileCard;

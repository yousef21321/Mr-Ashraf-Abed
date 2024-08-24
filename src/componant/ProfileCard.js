import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
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
        
        setLessons(response.data);
      } catch (err) {
        console.error('Error fetching lessons:', err);
        setError(err);
        alert("لا يوجد محاضرات متاحة.");
      } finally {
        setLoading(false);
      }
    };
  
    const fetchDeviceFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load();
        const result = await fp.get();
        setDeviceFingerprint(result.visitorId);
        localStorage.setItem('deviceFingerprint', result.visitorId);
      } catch (err) {
        console.error('Error fetching device fingerprint:', err);
        setErrorMessages(prev => ({ ...prev, global: 'Could not fetch device fingerprint' }));
        navigate('/login');
      }
    };

    const handleKeydown = (event) => {
      if (event.key === 'Enter') {
        // Handle Enter key press
        console.log('Enter key pressed');
        // Add your specific logic here
      } else if (event.key === 'Escape') {
        // Handle Escape key press
        console.log('Escape key pressed');
        // Add your specific logic here
      }
    };

    fetchLessons();
    fetchDeviceFingerprint();

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [navigate]);

  const handleSubmit = async (lesson) => {
    localStorage.setItem('lesson_id', lesson.id);
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
      navigate('/login');
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
            <Link to="/" style={styles.link}><button style={styles.button}>الرئسيه</button></Link>
            <Link to="/" style={styles.link}><button style={styles.button}>عن المنصه</button></Link>
            <Link to="/PricingCard" style={styles.link}><button style={styles.button}>الحصص الشهريه</button></Link>
          </div>
          <div className="profile-name">Mr.Ashraf Abed</div>
        </div>
      </header>
      <main className="profile-main">
        <section className="lessons-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>❌❌🔎لا يوجد محاضرات </p>
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
                    <p className='error'>❌❌🔎لا يوجد محاضرات </p>
                  )}
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

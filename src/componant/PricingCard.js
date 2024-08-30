import React, { useState, useEffect } from 'react';
import './PricingCard.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import SubscriptionModal from './SubscriptionModal';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import facebookImage from './Assets/facebook.svg';
import youtube from './Assets/social-icons-white-youtube.svg';
import Footer from './Footer';

const SocialIcon = ({ src, alt, href }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  </div>
);

const PricingCard = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deviceFingerprint, setDeviceFingerprint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const educationalLevelId = localStorage.getItem('educationalLevelId');
        const authToken = localStorage.getItem('authToken');
  
        if (!authToken || !educationalLevelId) {
          navigate('/PricingCard');
          return;
        }
  
        const response = await axios.get(
          `https://leader-acadmy.hwnix.com/api/getPackages/1/${educationalLevelId}`, 
          {
            headers: { Authorization: `Bearer ${authToken}` }
          }
        );
  
        if (response.data.packages && response.data.packages.length > 0) {
          setLessons(response.data.packages || []);
        } else {
          alert("لا يوجد محاضرات متاحة.");
          setLessons([]);
        }
  
      } catch (err) {
        setError(err);
        if (err.response && err.response.status === 404) {
          alert("لا يوجد محاضرات متاحة.");
        } else {
          alert("حدث خطأ أثناء تحميل المحاضرات.");
        }
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
        setErrorMessages(prev => ({ ...prev, global: 'Could not fetch device fingerprint' }));
        navigate('/login');
      }
    };

    fetchLessons();
    fetchDeviceFingerprint();
  }, [navigate]);

  const handleSubscribeClick = (lesson) => {
    localStorage.setItem('package_id', lesson.id);
    setSelectedLesson(lesson);
    setIsModalOpen(true);
  };

  const handleEnterClick = async (lesson) => {
    localStorage.setItem('package_id', lesson.id);

    const id = localStorage.getItem('id');
    const subscriptionCode = localStorage.getItem('subscriptionCode');
    const deviceFingerprint = localStorage.getItem('deviceFingerprint');
    
    try {
      const response = await axios.get(
        `https://leader-acadmy.hwnix.com/api/code/check/${id}/${deviceFingerprint}/${lesson.id}?code=${subscriptionCode}`
      );
      const result = response.data;
    
      if (result.message === "User has a valid code.") {
        navigate('/ProfileCard');
      } else {
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "الكود غير صالح أو يوجد مشكلة في الكود." }));
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data.message === "MAC address mismatch." || error.response.data.message === "No code found for this user and lesson.") {
          setErrorMessages(prev => ({ ...prev, [lesson.id]: "برجاء الدخول من اول جهاز تم الاشتراك عليه" }));
        } else {
          setErrorMessages(prev => ({ ...prev, [lesson.id]: "من فضلك ادخل الكود." }));
        }
      } else {
        console.log(error.message); // For network or other errors
        setErrorMessages(prev => ({ ...prev, [lesson.id]: "حدث خطأ أثناء التحقق من الكود." }));
      }
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      await axios.post('https://leader-acadmy.hwnix.com/api/logout', {}, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      localStorage.clear();
      setIsAuthenticated(false);
      navigate('/');
    } catch (error) {
      navigate('/login');
    }
  };
  
  const handleKeydown = (e) => {
    // Block F12 key
    if (e.key === 'F12') {
      e.preventDefault();
      e.stopPropagation();
    }
    // Block Ctrl+U and Ctrl+Shift+I
    if ((e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, []);

  return (
    <>
      <div className="profile-card">
        <header className="profile-header">
          <div className="profile-header-content">
            <button className="nav-button create-account-button animiL" onClick={handleLogout}>تسجيل الخروج</button>
            <div className="social-links">
              <SocialIcon src={facebookImage} alt="Facebook" href="https://www.facebook.com/AshrafAbed2020/photos" />
              <SocialIcon src={youtube} alt="YouTube" href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <Link to="/" style={styles.link}><button style={styles.button}>الرئيسيه</button></Link>
              <Link to="/" style={styles.link}><button style={styles.button}>عن المنصه</button></Link>
            </div>
            <div className="profile-name animiR">Mr.Ashraf Abed</div>
          </div>
        </header>

        <div className="pricing-cards animiL">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error loading lessons: {error.message}</p>
          ) : (
            lessons.map(lesson => (
              <div key={lesson.id} className="card">
                <div className="card-header">
                  <h2>{lesson.title}</h2>
                </div>
                <div className="card-body">
                  <p className="lesson-description">{lesson.description}</p>
                  {errorMessages[lesson.id] && (
                    <p className="error">{errorMessages[lesson.id]}</p>
                  )}
                </div>
                <div className="card-footer">
                  <button className="select-button" onClick={() => handleEnterClick(lesson)}>دخول</button>
                  <button className="select-button" onClick={() => handleSubscribeClick(lesson)}>اشتراك</button>
                  {/* <button className="select-button" onClick={""}>اختبارالشهر</button> */}

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
        </div>
      </div>
      <Footer />
    </>
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

export default PricingCard;

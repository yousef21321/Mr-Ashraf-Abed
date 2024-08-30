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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [quizUrl, setQuizUrl] = useState(""); // State for quiz URL
  const navigate = useNavigate();

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

    const fetchQuizData = async () => {
      try {
        const educationalLevelId = localStorage.getItem('package_id');
        const token = localStorage.getItem('authToken');
        
        if (!token || !educationalLevelId) {
          console.error("No authToken or educationalLevelId found");
          return;
        }

        const quizResponse = await fetch(`https://leader-acadmy.hwnix.com/api/mcqs/package/${educationalLevelId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const quizData = await quizResponse.json();
        if (quizData && quizData.mcqs && quizData.mcqs.length > 0) {
          setQuizUrl(quizData.mcqs[0].url);
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchLessons();
    fetchDeviceFingerprint();
    fetchQuizData();

    const handleKeydown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.body.classList.toggle("landing-page");
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('contextmenu', handleContextMenu);
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
          <button className="nav-button create-account-button animiR" onClick={handleLogout}>تسجيل الخروج</button>
          <div className="social-links">
            <SocialIcon src={facebookImage} alt="Facebook" href="https://www.facebook.com/AshrafAbed2020/photos" />
            <SocialIcon src={youtube} alt="YouTube" href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" />
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <Link to="/" style={styles.link}><button style={styles.button}>الرئسيه</button></Link>
            <Link to="/" style={styles.link}><button style={styles.button}>عن المنصه</button></Link>
            <Link to="/PricingCard" style={styles.link}><button style={styles.button}>الحصص الشهريه</button></Link>
          </div>
          <div className="profile-name animiL">Mr.Ashraf Abed</div>
        </div>
      </header>
      <main className="profile-main">
        <section className="lessons-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='animiL'>❌❌🔎لا يوجد محاضرات </p>
          ) : (
            Array.isArray(lessons) && lessons.map(lesson => (
              <div key={lesson.id} className="lesson-card animiL">
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
                    <button className="lesson-button enter-lecture-button animiR" onClick={() => handleSubmit(lesson)}>دخول للمحاضرة</button>
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
      <div className='animiR' style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
          <div style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>
            <a  style={{ color: "white" }} href={quizUrl || "#"} onClick={() => {
              if (!quizUrl) {
                alert("لم يتم تنزيل امتحان");
              }
            }}>الاختبار الشهري</a>
          </div>
        </div>
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
    padding: "5px 16px",
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
  },
  link: {
    textDecoration: "none",
  },
};

export default ProfileCard;

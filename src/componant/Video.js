import React, { useState, useEffect } from "react";
import './video.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ChatComponent from "./ChatComponent";
import ProfileCard2 from "./ProfileCard2";

const SocialIcon = ({ src, alt, href }) => (
  <div className="social-icon">
    <a href={href} target="_blank" rel="noopener noreferrer">
      <img src={src} alt={alt} />
    </a>
  </div>
);

export default function Video() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("landing-page");

    const fetchVideo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const lessonId = localStorage.getItem("lesson_id") || 2; // Default to 2 if not found
        const response = await fetch(`https://leader-acadmy.hwnix.com/api/videos/lesson/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data && data.length > 0) {
          setVideoUrl(data[0].url);
          setVideoTitle(data[0].title);
          setVideoDescription(data[0].description);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();

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

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    return () => {
      document.body.classList.toggle("landing-page");
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('contextmenu', (e) => e.preventDefault());
    };
  }, [navigate, isAuthenticated]);

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
      setIsAuthenticated(false);

      navigate('/Login');
    } catch (error) {
      console.error('Logout Failed:', error.response ? error.response.data : error.message);
    }
  };

  const handleLec = () => {
    navigate('/ProfileCard');
  };

  return (
    <>
      <div className="landing-page-wrapper">
        <header className="profile-header">
          <div className="profile-header-content">
            <div className="logout-button">
              <button className="nav-button create-account-button" onClick={handleLogout}>تسجيل الخروج</button>
            </div>
            <div className="logout-button">
              <button className="nav-button create-account-button" onClick={handleLec}>المحاضرات</button>
            </div>
            <div className="profile-name">Mr.Ashraf Abed</div>
          </div>
        </header>

        <section className="video-section">
          <div className="video-container">
            {videoUrl ? (
              <iframe
                title="Video"
                src={videoUrl}
                width="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                height="100%"
              ></iframe>
            ) : (
              <p>Loading video...</p>
            )}
          </div>
        </section>

        <div style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 28, display: 'inline-flex' }}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>{videoTitle}</h2>
          <p style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>{videoDescription}</p>
          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 15, display: 'inline-flex' }}>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <div style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}><a style={{color:"white"}} href="/AssignmentsPage">الواجب</a></div>
              <div style={{ width: 28, height: 28, position: 'relative' }}>
                <div style={{ width: 22.16, height: 22.16, left: 3.50, top: 2.34, position: 'absolute' }}>
                  <div style={{ width: 21, height: 21, left: 0, top: 1.16, position: 'absolute', border: '2px white solid' }}></div>
                  <div style={{ width: 16.33, height: 16.33, left: 5.83, top: -0, position: 'absolute', border: '2px white solid' }}></div>
                </div>
              </div>
            </div>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <div style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}><a style={{color:"white"}} href="/PdfList">الملازم</a></div>
              <div style={{ width: 28, height: 28, position: 'relative' }}>
                <div style={{ width: 18.67, height: 23.33, left: 4.67, top: 2.33, position: 'absolute' }}>
                  <div style={{ width: 18.67, height: 23.33, left: 0, top: 0, position: 'absolute', border: '2px white solid' }}></div>
                  <div style={{ width: 9.33, height: 4.67, left: 4.67, top: 9.33, position: 'absolute', border: '2px white solid' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ProfileCard2/> */}
        <ChatComponent/>
        <Footer />
      </div>
    </>
  );
}

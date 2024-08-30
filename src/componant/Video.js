import React, { useState, useEffect } from "react";
import './video.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import ChatComponent from "./ChatComponent";

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
  const [quizUrl, setQuizUrl] = useState(""); // State for quiz URL
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("landing-page");

    const fetchVideoAndQuiz = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const lessonId = localStorage.getItem("lesson_id") || 2; // Default to 2 if not found

        // Fetch video data
        const videoResponse = await fetch(`https://leader-acadmy.hwnix.com/api/videos/lesson/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const videoData = await videoResponse.json();
        if (videoData && videoData.length > 0) {
          setVideoUrl(videoData[0].url);
          setVideoTitle(videoData[0].title);
          setVideoDescription(videoData[0].description);
        }

        // Fetch quiz data
        const quizResponse = await fetch(`https://leader-acadmy.hwnix.com/api/mcqs/lesson/${lessonId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const quizData = await quizResponse.json();
        if (quizData && quizData.mcqs && quizData.mcqs.length > 0) {
          setQuizUrl(quizData.mcqs[0].url);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVideoAndQuiz();

    const handleKeydown = (e) => {
      if (e.key === 'F12' || (e.ctrlKey && e.key === 'u') || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
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
              <button className="nav-button create-account-button animiR" onClick={handleLogout}>تسجيل الخروج</button>
            </div>
            <div className="logout-button">
              <button className="nav-button create-account-button animiL" onClick={handleLec}>المحاضرات</button>
            </div>
            <div className="profile-name animiR">Mr.Ashraf Abed</div>
          </div>
        </header>

        <section className="video-section">
          <div className="video-container animiT">
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

        <div className="animiR" style={{ width: '100%', height: '100%', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 28, display: 'inline-flex' }}>
          <h2 style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>{videoTitle}</h2>
          <p style={{ textAlign: 'center', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>{videoDescription}</p>
          <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 15, display: 'inline-flex' }}>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <div className="animiR" style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>
                <a style={{color:"white"}} href="/AssignmentsPage" >الواجب</a>
              </div>
              <div style={{ width: 28, height: 28, position: 'relative' }}>
                <div style={{ width: 21, height: 21, left: 0, top: 1.16, position: 'absolute', border: '2px white solid' }}></div>
                <div style={{ width: 16.33, height: 16.33, left: 5.83, top: -0, position: 'absolute', border: '2px white solid' }}></div>
              </div>
            </div>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <div style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>
                <a style={{color:"white"}} href="/PdfList">الملازم</a>
              </div>
              <div style={{ width: 28, height: 28, position: 'relative' }}>
                <div style={{ width: 18.67, height: 23.33, left: 4.67, top: 2.33, position: 'absolute' }}>
                  <div style={{ width: 18.67, height: 23.33, left: 0, top: 0, position: 'absolute', border: '2px white solid' }}></div>
                  <div style={{ width: 9.33, height: 4.67, left: 4.67, top: 9.33, position: 'absolute', border: '2px white solid' }}></div>
                </div>
              </div>
            </div>
            <div style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#5E8CEA', borderRadius: 7, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex' }}>
              <div style={{ textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Lemonada', fontWeight: '380', wordWrap: 'break-word' }}>
                <a style={{color:"white"}} href={quizUrl || "#"} onClick={() => {
                  if (!quizUrl) {
                    alert("لم يتم تنزيل امتحان");
                  }
                }}>Quiz</a>
              </div>

              <div style={{ width: 28, height: 28, position: 'relative' }}>
                <div style={{ width: 18.67, height: 23.33, left: 4.67, top: 2.33, position: 'absolute' }}>
                  <div style={{ width: 18.67, height: 23.33, left: 0, top: 0, position: 'absolute', border: '2px white solid' }}></div>
                  <div style={{ width: 9.33, height: 4.67, left: 4.67, top: 9.33, position: 'absolute', border: '2px white solid' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br/>
        {/* <ProfileCard2/> */}
        <ChatComponent/>
        <Footer />
      </div>
    </>
  );
}

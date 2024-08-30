import React from "react";
import youtube2 from './Assets/social-icons-white-youtube.svg';
import web from './Assets/facebook.svg';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './About.css';

function Header() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/Signup');
  };

  const handleLogin = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/PricingCard');
    } else {
      navigate('/Login');
    }
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with id "${id}" not found`);
    }
  };

  return (
    <>
      <div
                            className="animiT"

        style={{
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundImage: "url('./componant/Background.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "35vh",
            position: "relative",
            background: "#EDF3FF",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "25vh",
              position: "absolute",
              background: "rgba(71, 125, 234, 0.20)",
            }}
          ></div>
          <div>
            <button
                         style={styles.menuButton2}

              onClick={handleLogin}
            >
              تسجيل الدخول
            </button>
            <button
                            style={styles.menuButton1}

              onClick={handleCreateAccount}
            >
              انشئ حسابك
            </button>
          </div>

          <div
            style={{
              width: "80%",
              left: "10%",
              top: "15vh",
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              gap: "1vw",
              flexWrap: "wrap",
            }}
          >
            <button
            className="animiL"
              onClick={() => scrollToSection('home')}
              style={styles.menuButton}
            >
              الرئسيه
            </button>
            <button
                        className="animiL"

              onClick={() => scrollToSection('about')}
              style={styles.menuButton}
            >
              نظام الحصص
            </button>
            <button
                        className="animiR"

              onClick={() => navigate('/PricingCard')}
              style={styles.menuButton}
            >
              الحصص الشهريه
            </button>
            <button
                        className="animiR"

              onClick={() => navigate('/ProfileCard')}
              style={styles.menuButton}
            >
              المحاضرات
            </button>
          </div>
          <div
                      className="animiT"

  style={{
    position: 'absolute', // Or 'relative' depending on your layout needs
    top: '50px', // Adjust this value to control vertical positioning
    left: '1%', // Center horizontally if needed (optional)
    transform: 'translateX(-50%)', // Center horizontally if needed (optional)
    display: 'flex',
    justifyContent: 'center', // Center items horizontally
    alignItems: 'center', // Center items vertically (if needed)
    gap: '2vw', // Space between icons
  }}
>
  <div
    style={{
      width: '7vw', // Adjusted for responsiveness
      height: '3vw', // Adjusted for responsiveness
      background: 'white',
      borderRadius: '7px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Optional: Add a shadow for better visibility
    }}
  >
    <a
      href="https://www.facebook.com/AshrafAbed2020/photos"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={web}
        alt="Facebook"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '7px',
        }}
      />
    </a>
  </div>
  <div
    style={{
      width: '7vw', // Adjusted for responsiveness
      height: '3vw', // Adjusted for responsiveness
      background: 'white',
      borderRadius: '7px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Optional: Add a shadow for better visibility
    }}
  >
    <a
      href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={youtube2}
        alt="YouTube"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '7px',
        }}
      />
    </a>
  </div>
</div>

          <div
            style={{
              position: "absolute",
              top: "2vh",
              right: "2vw",
              display: "flex",
              alignItems: "center",
              gap: "1vw",
              fontFamily: "Lemonada",
            }}
          >
            <div
              className="animiR"
              style={{
                fontFamily: "Lemonada",
                fontSize: "4vh",
                fontWeight: "bold",
                color: "white",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              Mr.Ashraf Abed
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

const styles = {
  button: {
    padding: "0.5em 1em",
    borderRadius: "5px",
    fontSize: "1em",
    cursor: "pointer",
    transition: "background 0.3s ease",
  },
  menuButton: {
    padding: "0.7em 1.5em",
    borderRadius: "25px",
    fontSize: "1.2em",
    cursor: "pointer",
    background: "#487EEA",
    color: "white",
    border: "none",
    transition: "background 0.3s ease",
    width: "100%", // Full width on small screens
    maxWidth: "200px", // Limit width on larger screens
    textAlign: "center",
  },
  menuButton1: {
    padding: "0.3em 1.5em", // Corrected padding
    borderRadius: "25px",
    fontSize: "1em",
    cursor: "pointer",
    background: "#487EEA",
    color: "white",
    border: "none",
    transition: "background 0.3s ease",
    width: "106%", // Full width on small screens
    maxWidth: "166px", // Limit width on larger screens
    textAlign: "center",
    
    // Positioning
    position: "absolute", // or "fixed" if you want it to stay at the top when scrolling
    top: "80px", // Distance from the top
    left: "190px", // Distance from the right (or use 'left' for the left side)
    zIndex: 1000, // Ensure it stays above other elements
  },
  menuButton2: {
    padding: "0.3em 1.5em", // Corrected padding
    borderRadius: "25px",
    fontSize: "1em",
    cursor: "pointer",
    background: "#487EEA",
    color: "white",
    border: "none",
    transition: "background 0.3s ease",
    width: "106%", // Full width on small screens
    maxWidth: "166px", // Limit width on larger screens
    textAlign: "center",
    
    // Positioning
    position: "absolute", // or "fixed" if you want it to stay at the top when scrolling
    top: "80px", // Distance from the top
    left: "16px", // Distance from the right (or use 'left' for the left side)
    zIndex: 1000, // Ensure it stays above other elements
  },
  link: {
    textDecoration: "none",
  },
};


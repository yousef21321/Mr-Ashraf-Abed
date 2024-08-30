import React, { useState, useEffect, useRef } from "react";
import './APPS.css'; 
import facebookImage from './componant/Assets/Assets/facebook.jpg'; 
import youtube from './componant/Assets//Assets/youtube.jpg';
import teacher from './componant/Assets/Assets/11.jpg';
import teacher22 from './componant/Assets/Assets/22.jpg';
import teacher33 from './componant/Assets/Assets/33.jpg';
import teacher44 from './componant/Assets/Assets/44.jpg';
import teacher5 from './componant/Assets/Assets/55.jpg';
import teacher6 from './componant/Assets/Assets/66.jpg';
import teacher7 from './componant/Assets/Assets/77.jpg';

import teacher2 from './componant/Assets/Assets/Teacher3.png';
import teacher3 from './componant/Assets/Assets/3.png';
import teacher4 from './componant/Assets/Assets/4.png';
import youtube2 from './componant/Assets/social-icons-white-youtube.svg';
import web from './componant/Assets/facebook.svg';
import Twitter from './componant/Assets/social-icons-white-twitter.svg';
import insta from './componant/Assets/social-icons-white-instagram.svg';
import { BrowserRouter as Router, Routes, Route, Link,useNavigate } from 'react-router-dom';
import Footer from "./componant/Footer";
import imagelesson from './lesson.png';
import ScrollProgressBar from './componant/ScrollProgressBar';
import Header from "./componant/Header";
import About from "./componant/About";
import About1 from "./componant/About1";
import About2 from "./componant/About2";
function CourseCard({ title, description, image }) 
{
    const images = [teacher,teacher22,teacher33,teacher44,teacher5,teacher6,teacher7];

    return (
      <div className="course-card">
        <img src={images} alt={title} className="course-card-image" />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    );
  }
  const SocialIcon = ({ src, alt, href }) => (
    <div className="social-icon">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <img src={src} alt={alt} />
      </a>
    </div>
  );
function APPS() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);

  const images = [teacher,teacher22,teacher33,teacher44,teacher5,teacher6,teacher7];
  const images2 = [teacher3, teacher4];
  const squaresRef = useRef([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://leader-acadmy.hwnix.com/api/getlessons/1');
        const data = await response.json();
        setCourses(data.lessons);
      } catch (error) {
        console.error('Error fetching the courses:', error);
      }
    };

    fetchCourses();
  }, []);
  useEffect(() => {
    const fullName = "مستر أشرف عابد";
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setName(fullName.slice(0, currentIndex + 1));
      currentIndex++;
      
      if (currentIndex === fullName.length) {
        currentIndex = 0; // Reset to loop
      }
    }, 500); // Adjust timing here to make it slower

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    squaresRef.current.forEach((square) => {
      if (square) observer.observe(square);
    });

    return () => {
      squaresRef.current.forEach((square) => {
        if (square) observer.unobserve(square);
      });
    };
  }, []);

  // Automated scroll every 2 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const intervalId2 = setInterval(() => {
      setCurrentImageIndex2((prevIndex2) => (prevIndex2 === images2.length - 1 ? 0 : prevIndex2 + 1));
    }, 2000);

    return () => clearInterval(intervalId2);
  }, [images2.length]);

  const handleCreateAccount = () => {
    navigate('/Signup')
  };

  const handleLogin = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/PricingCard');
    } else {
      navigate('/Login');
    }  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrevClick2 = () => {
    setCurrentImageIndex2((prevIndex2) => (prevIndex2 === 0 ? images2.length - 1 : prevIndex2 - 1));
  };

  const handleNextClick2 = () => {
    setCurrentImageIndex2((prevIndex2) => (prevIndex2 === images2.length - 1 ? 0 : prevIndex2 + 1));
  };
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Section with id "${id}" not found`);
    }
  };
  const handleNavigation = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/PricingCard');
    } else {
      navigate('/Login');
    }
  };


  const videoSrc = "https://drive.google.com/file/d/1poPs2t3VRiywXlE_sCeZh0SgFF5o72v5/preview";

const obfuscateUrl = (url) => {
  return btoa(url); // Base64 encode the URL
};

const deobfuscateUrl = (encodedUrl) => {
  return atob(encodedUrl); // Base64 decode the URL
};

const obfuscatedVideoSrc = obfuscateUrl(videoSrc);
  return (
      <>
    <ScrollProgressBar/>
    <Header/>
    <About1/>
    <About/>
    <About2/>
    <Footer/>


    </>
  );
}

const styles = {
  button: {
    height: "33px",
    background: "white",
    borderRadius: "7px",
    border: "1px solid #487EEA",
    color: "#487EEA",
    fontFamily: "Lemonada", // Match with the overall font style
    fontWeight: "400",
    padding: "5px 16px", // Fix: Added 'px' unit to padding values
    cursor: "pointer",
    transition: "background 0.3s, color 0.3s",
    textAlign: "center",
    fontSize: "12px", // Fix: Added quotes around font size value
    lineHeight: "16px",
    wordWrap: "break-word",
    
  },
};


export default APPS;

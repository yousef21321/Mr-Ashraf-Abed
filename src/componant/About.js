import React, { useState, useEffect, useRef } from "react";
import teacher from './Assets/Assets/11.jpg';
import teacher22 from './Assets/Assets/22.jpg';
import teacher33 from './Assets/Assets/33.jpg';
import teacher44 from './Assets/Assets/44.jpg';
import teacher5 from './Assets/Assets/55.jpg';
import teacher6 from './Assets/Assets/66.jpg';
import teacher7 from './Assets/Assets/77.jpg';
import teacher3 from './Assets/Assets/3.png';
import teacher4 from './Assets/Assets/4.png';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import imagelesson from '../lesson.png';
import './About.css';
function About() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [name, setName] = useState("");
  const [courses, setCourses] = useState([]);

  const images = [teacher, teacher22, teacher33, teacher44, teacher5, teacher6, teacher7];
  const images2 = [teacher3, teacher4];
  const squaresRef = useRef([]);

  useEffect(() => {
    const fullName = "مستر أشرف عابد";
    let currentIndex = 0;

    const interval = setInterval(() => {
      setName(fullName.slice(0, currentIndex + 1));
      currentIndex++;

      if (currentIndex === fullName.length) {
        currentIndex = 0; // Reset to loop
      }
    }, 500);

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

  const handlePrevClick2 = () => {
    setCurrentImageIndex2((prevIndex2) => (prevIndex2 === 0 ? images2.length - 1 : prevIndex2 - 1));
  };

  const handleNextClick2 = () => {
    setCurrentImageIndex2((prevIndex2) => (prevIndex2 === images2.length - 1 ? 0 : prevIndex2 + 1));
  };

  const videoSrc = "https://drive.google.com/file/d/1poPs2t3VRiywXlE_sCeZh0SgFF5o72v5/preview";

  const obfuscateUrl = (url) => {
    return btoa(url);
  };

  const deobfuscateUrl = (encodedUrl) => {
    return atob(encodedUrl);
  };

  const obfuscatedVideoSrc = obfuscateUrl(videoSrc);

  return (
    <div id="about" style={styles.container}>
      <div style= {styles.wrapper}>
        <div style={styles.imageContainer}>
          <img src={imagelesson} alt="Lesson" style={styles.image} />
          <div style={styles.imageSlider}>
            <button
              onClick={handlePrevClick2}
              style={styles.prevButton}
            >
              &lt;
            </button>

            <button
              onClick={handleNextClick2}
              style={styles.nextButton}
            >
              &gt;
            </button>
            <div style={styles.text}>
              في موقع أشرف عابد، نقدم نظام حصص مرن ومبتكر صُمم خصيصًا لتلبية احتياجات كل طالب. تتيح لك حصص اللغة الإنجليزية لدينا الاختيار بين مجموعة متنوعة من الأوقات والمستويات، مما يضمن تجربة تعلم تتناسب مع جدولك الزمني وأهدافك التعليمية. يتمتع كل درس بتخطيط دقيق يهدف إلى تعزيز مهاراتك اللغوية من خلال أساليب تفاعلية وشاملة. سواء كنت تبحث عن تحسين قواعد اللغة، تعزيز مهارات المحادثة، أو الاستعداد للامتحانات، فإن نظام الحصص لدينا يقدم لك الدعم والإرشاد اللازمين لتحقيق النجاح. احجز حصتك اليوم وابدأ رحلة تعلم مميزة مع أشرف عابد!
            </div>
          </div>
        </div>
        <div style={styles.videoContainer}>
          <iframe
            style={styles.video}
            src={deobfuscateUrl(obfuscatedVideoSrc)}
            title="Google Drive file"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '87%%',
    padding: '2rem',
    background: '#EDF3FF',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  imageSlider: {
    position: 'relative',
    width: '100%',
  },
  prevButton: {
    position: 'absolute',
    top: '50%',
    left: '1rem',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  nextButton: {
    position: 'absolute',
    top: '50%',
    right: '1rem',
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.5)',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: '0.5rem',
    cursor: 'pointer',
  },
  text: {
    width: '100%',
    textAlign: 'right',
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'Lemonada',
    fontWeight: '380',
    lineHeight: '1.5rem',
  },
  videoContainer: {
    width: '100%',
    background: '#D9D9D9',
    borderRadius: '10px',
  },
  videoContainer: {
    display: 'flex',
    justifyContent: 'center', // Centers the video horizontally
    alignItems: 'center', // Centers the video vertically if the parent has a height set
    padding: '20px', // Optional: Add padding around the video
  },
  video: {
    width: '100%', // Adjust width as needed
    maxWidth: '800px', // Limit the maximum width of the video
    height: '515px',
    borderRadius: '15px', // Rounded corners
    border: '5px solid #487EEA', // Blue frame around the video
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Optional: Add a shadow for a 3D effect
  },
};

export default About;

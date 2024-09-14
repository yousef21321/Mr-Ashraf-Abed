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
function APPS2() {
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
      <div
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
      width: "102%",
      height: "60vw", // Adjusted for responsiveness
      position: "relative",
      background: "#EDF3FF",
    }}
  >     
   <div
      style={{
        width: "100%",
        height: "8vw", // Adjusted for responsiveness
        position: "absolute",
        background: "rgba(71, 125, 234, 0.20)",
      }}
    ></div>       
       <div>
            <button
              style={{
                ...styles.button,
                border: "1.3px solid #487EEA",
                color: "#487EEA",
                position: "absolute",
                left: "2vw", // Adjusted for responsiveness
                top: "3vw", // Adjusted for responsiveness
              }}
              onClick={handleLogin}
            >
              تسجيل الدخول
            </button>
            <button
               style={{
                ...styles.button,
                background: "#487EEA",
                border: "none",
                color: "white",
                position: "absolute",
                left: "12vw", // Adjusted for responsiveness
                top: "3vw", // Adjusted for responsiveness
              }}
              onClick={handleCreateAccount}
            >
              انشئ حسابك
            </button>
          </div>
         

          <div
      style={{
        width: "40%",
        left: "25%",
        top: "3vw", // Adjusted for responsiveness
        position: "absolute",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: "1.5vw", // Adjusted for responsiveness
      }}
    >
<div
        style={{
          height: "2vw", // Adjusted for responsiveness
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "1vw", // Adjusted for responsiveness
        }}
      >        
 <div
          style={{
            width: "3vw", // Adjusted for responsiveness
            height: "3vw", // Adjusted for responsiveness
            background: "white",
            borderRadius: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "7px",
              }}
            />
                            </a>
              </div>
              <div
          style={{
            width: "3vw", // Adjusted for responsiveness
            height: "3vw", // Adjusted for responsiveness
            background: "white",
            borderRadius: "7px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >        
        
                <a href="https://www.youtube.com/channel/UC2_e1-9trV5x3beP_wXQfpw" target="_blank" rel="noopener noreferrer">
                <img
              src={youtube2}
              alt="YouTube"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "7px",
              }}
            />
                            </a>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5vw" }}>
            <Link to="/" style={styles.link}><button 
                            onClick={() => scrollToSection('home')} 
                            style={styles.button}>الرئسيه</button></Link>
              <Link  style={styles.link}><button 
                            onClick={() => scrollToSection('about')} 
                            style={styles.button}>نظام الحصص</button></Link>
              <Link to="/PricingCard" style={styles.link}><button style={styles.button}> الحصص الشهريه</button></Link>
              <Link to="/ProfileCard" style={styles.link}><button style={styles.button}>المحاضرات</button></Link>
            </div>
          </div>
          <div
      style={{
        position: "absolute",
        top: "2vw", // Adjusted for responsiveness
        right: "2vw", // Adjusted for responsiveness
        display: "flex",
        alignItems: "center",
        gap: "1vw", // Adjusted for responsiveness
        fontFamily: "Lemonada",
      }}
    >
 <div
 className="animiR"
        style={{
          fontFamily: "Lemonada",
          fontSize: "3vw", // Adjusted for responsiveness
          fontWeight: "bold",
          color: "white",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        Mr.Ashraf Abed
      </div>
                </div>
         

                <div
      style={{
        width: "45%",
        height: "40vw", // Adjusted for responsiveness
        left: "2vw", // Adjusted for responsiveness
        top: "18vw", // Adjusted for responsiveness
        position: "absolute",
      }}
    >            
 <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          background: "#D9D9D9",
        }}
      >
        <img
      src={images[currentImageIndex]}
      alt="Slide"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
                    <button
          onClick={handlePrevClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "1vw", // Adjusted for responsiveness
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "1vw", // Adjusted for responsiveness
          }}
        >
          &lt;
        </button>
        <button
          onClick={handleNextClick}
          style={{
            position: "absolute",
            top: "50%",
            right: "1vw", // Adjusted for responsiveness
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            borderRadius: "50%",
            padding: "1vw", // Adjusted for responsiveness
          }}
        >
          &gt;
        </button>
        <div
          style={{
            width: "8vw", // Adjusted for responsiveness
            height: "1vw", // Adjusted for responsiveness
            position: "absolute",
            bottom: "2vw", // Adjusted for responsiveness
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5vw", // Adjusted for responsiveness
          }}
        >
          <div
            style={{
              width: "1.5vw", // Adjusted for responsiveness
              height: "1.5vw", // Adjusted for responsiveness
              background: "#A4BBEA",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "1.5vw", // Adjusted for responsiveness
              height: "1.5vw", // Adjusted for responsiveness
              background: "#A4BBEA",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "1.5vw", // Adjusted for responsiveness
              height: "1.5vw", // Adjusted for responsiveness
              background: "#A4BBEA",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              width: "3vw", // Adjusted for responsiveness
              height: "1.5vw", // Adjusted for responsiveness
              background: "#759CEA",
              borderRadius: "14px",
            }}
          ></div>
        </div>
      </div>
      <h1
        style={{
          fontFamily: "Lemonada",
          top: "5vw", // Adjusted for responsiveness
          right: "-51vw", // Adjusted for responsiveness
          color: "black",
          fontSize: "3vw", // Adjusted for responsiveness
          fontWeight: 575,
          position: "absolute",
        }}
      >              {name}            
            </h1>
            <h2 className="animiR" style={{ top: '35%', right: '-48vw', color: '#454545', fontSize: '2vw', fontFamily: 'Lemonada', fontWeight: 575, wordWrap: 'break-word', textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", position: 'absolute' }}>
  صانع الأوائل
</h2>        
<div className="animiR" style={{ width: "50vw", left: "47vw", top: "61%", position: "absolute", textAlign: "right", color: "black", fontSize: "1.5vw", fontFamily: "Lemonada", fontWeight: "380", lineHeight: "1.8vw" }}>
  مرحبًا بكم في منصه أشرف عابد، حيث يجتمع الشغف بالتعليم مع الأداء الرائع. يتميز مستر أشرف عابد بقدرات استثنائية في تعليم اللغة الإنجليزية، مقدماً أساليب تعليمية مبتكرة تضمن تجربة تعلم فعالة وممتعة.  حيث يلتزم بتقديم محتوى تعليمي ذو جودة عالية يعزز مهارات الطلاب ويحقق نتائج ملحوظة. انضموا إلينا واستمتعوا بتعلم اللغة الإنجليزية بأسلوب مميز يتناسب مع احتياجاتكم التعليمية. احجزوا دروسكم الآن وابدأوا رحلتكم التعليمية مع الأفضل!
</div>

{Array.from({ length: 7 }, (_, i) => (
  <div
    key={i}
    className={`animiR squares square square${i + 2} `}
    ref={(el) => (squaresRef.current[i] = el)}
  />
))}
          </div>
        </div>


        {/* /////////////////////////////// */}
        <div id="about">
          
  <div style={{ padding: "5vw 3vw", background: "#EDF3FF", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "5vw", width: "95vw" }}>
    <div style={{ width: "40vw", height: "30vw", position: "relative" }}>
    <div style={{ width: '10%', height: '10%',top:'100%',left:'5vw' }} >
    <img src={imagelesson}   /></div>
      <div style={{ width: "100%", height: "100%", position: "absolute" }}>
       
        <button
          onClick={handlePrevClick2}
          style={{ position: 'absolute', top: '50%', left: '1vw', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '1vw' }}
        >
          &lt;
        </button>

           <button
          onClick={handleNextClick2}
          style={{ position: 'absolute', top: '50%', right: '1vw', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '1vw' }}
        >
          &gt;
        </button>
        <div style={{ width: "96%", left: "-5px", top: "5vw", position: "absolute", textAlign: "right", color: "black", fontSize: "1.5vw", fontFamily: "Lemonada", fontWeight: "380", lineHeight: "2vw" }}>
          في موقع أشرف عابد، نقدم نظام حصص مرن ومبتكر صُمم خصيصًا لتلبية احتياجات كل طالب. تتيح لك حصص اللغة الإنجليزية لدينا الاختيار بين مجموعة متنوعة من الأوقات والمستويات، مما يضمن تجربة تعلم تتناسب مع جدولك الزمني وأهدافك التعليمية. يتمتع كل درس بتخطيط دقيق يهدف إلى تعزيز مهاراتك اللغوية من خلال أساليب تفاعلية وشاملة. سواء كنت تبحث عن تحسين قواعد اللغة، تعزيز مهارات المحادثة، أو الاستعداد للامتحانات، فإن نظام الحصص لدينا يقدم لك الدعم والإرشاد اللازمين لتحقيق النجاح. احجز حصتك اليوم وابدأ رحلة تعلم مميزة مع أشرف عابد!
        </div>
      </div>
    </div>
    <div style={{ width: "50vw", height: "35vw", background: "#D9D9D9", borderRadius: "20px" }}>
  <iframe 
    style={{ width: "100%", height: "100%" }} 
    src="https://www.youtube.com/embed/_3awAWDRl6g?si=ZGGL4MJAXwTZRzD5" 
    title="YouTube video player" 
    frameBorder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen
  ></iframe>
</div>

  </div>
</div>


<div className="latest-courses" >
<div className="latest-courses-header" >
<h2 style={{ color: '#454545', fontSize: '2vw', fontFamily: 'Lemonada', fontWeight: 575, wordWrap: 'break-word', textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
      أحدث الكورسات
    </h2>
    </div>
    <div className="course-cards">
    <section className="lessons-section">
      {courses.map((course) => (
        <div key={course.id} className="lesson-card">
          <img className="lesson-image" src="/images/1.png" alt="Lesson" style={{ width: '100%', borderRadius: '10px' }} />
          <div className="lesson-info" style={{ padding: '1vw' }}>
            <div className="lesson-header">
              <span className="lesson-author" style={{ fontWeight: 'bold' }}>Mr. Ashraf Abed</span>
            </div>
            <h3 className="lesson-title" style={{ fontSize: '1.5vw', marginTop: '0.5vw' }}>{course.title}</h3>
            <p className="lesson-description" style={{ fontSize: '1.2vw', color: '#555' }}>{course.description}</p>
            <div className="lesson-tags" style={{ display: 'flex', gap: '0.5vw', marginTop: '1vw' }}>
              <div className="tag" style={{ backgroundColor: '#d1e0ff', padding: '0.5vw 1vw', borderRadius: '5px' }}>Grammar</div>
              <div className="tag" style={{ backgroundColor: '#d1e0ff', padding: '0.5vw 1vw', borderRadius: '5px' }}>2nd Prep</div>
            </div>
          </div>
        </div>
      ))}
    </section>
    
  </div>
  <div style={{
    width: "100%",
    height: "170vh",
    position: "absolute",
    top: "28%",
    background: "linear-gradient(180deg, rgba(96, 128, 191, 0) 0%, rgba(96, 128, 191, 0.25) 25%, rgba(96, 128, 191, 0.50) 50%, #6080BF 100%)",
    backdropFilter: "blur(13px)"
}}></div>
<div style={{
    width: "20vw",
    height: "10vh",
    left: "40vw",
    top: "40%",
    position: "absolute",
    opacity: "0.75",
    background: "white",
    borderRadius: "11px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}}>
      <a
        style={{
          color: "#000",
          fontSize: '1.5vw',
          fontFamily: 'Lemonada',
          fontWeight: 575,
          textDecoration: 'none'
        }}
        onClick={handleNavigation}
      >
        عرض المزيد
      </a>
</div>


</div>    

<Footer/>

      </div> 

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


export default APPS2;

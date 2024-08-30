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
import './About.css';

import { useNavigate } from 'react-router-dom';

function About1() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = useState(0);
  const [name, setName] = useState("");
  const [scale, setScale] = useState(1); // For zoom functionality
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

  const handleZoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 2)); // Max zoom level
  };

  const handleZoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min zoom level
  };

  return (<>
    <div id="about" style={styles.container}>
    <h1
    className="animiL"
          style={{
            fontFamily: "Lemonada",
            textAlign: "center",
            color: "black",
            fontSize: "5vw",
            fontWeight: 575,
          }} 
        >
          {name}
        </h1>
    <div     className="animiR"
 style={styles.imageContainer}>
      <img src={images[currentImageIndex]} alt="Teacher" style={styles.image} />
    </div>
    
          <div style={{ flex: '1', paddingLeft: '2vw' }}>
        

        <h2
          style={{
            textAlign: "center",
            color: "#454545",
            fontSize: "3vw",
            fontFamily: "Lemonada",
            fontWeight: 575,
            wordWrap: "break-word",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          صانع الأوائل
        </h2>

        <div
          style={{
            textAlign: "right",
            color: "black",
            fontSize: "2vw",
            fontFamily: "Lemonada",
            fontWeight: 380,
            lineHeight: "5vw",
            marginTop: '2vw'
          }}
        >
          مرحبًا بكم في منصه أشرف عابد، حيث يجتمع الشغف بالتعليم مع الأداء
          الرائع. يتميز مستر أشرف عابد بقدرات استثنائية في تعليم اللغة
          الإنجليزية، مقدماً أساليب تعليمية مبتكرة تضمن تجربة تعلم فعالة
          وممتعة. حيث يلتزم بتقديم محتوى تعليمي ذو جودة عالية يعزز مهارات
          الطلاب ويحقق نتائج ملحوظة. انضموا إلينا واستمتعوا بتعلم اللغة
          الإنجليزية بأسلوب مميز يتناسب مع احتياجاتكم التعليمية. احجزوا
          دروسكم الآن وابدأوا رحلتكم التعليمية مع الأفضل!
        </div>
      </div>
    </div>
    <div
    style={{
      display: 'flex',
      flexDirection: 'row-reverse', // This will make the text appear on the right side of the images (RTL)
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      width: '90%',
      margin: '2vw auto',
    }}
  >
    <div style={{ flex: '1', paddingRight: '2vw' }}>
      <div
        style={{
          width: "87%",
          position: "relative",
          transform: `scale(${scale})`,
          overflow: "hidden",
          borderRadius: "20px",
          background: "#D9D9D9",
        }}
      >
  
        </div>

 
    </div>

    </div>
    </>
  );
}

const styles = {
    container: {
        width: '87%%',
        padding: '4rem',
        background: '#EDF3FF',
      },
  zoomButton: {
    padding: "0.5vw 1vw",
    fontSize: "3vw",
    background: "#487EEA",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  imageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0", // Adds some spacing around the image
  },
  image: {
    width: "342px", // Small size
    height: "auto", // Maintain aspect ratio
    border: "5px solid white", // White frame
    borderRadius: "10px", // Optional: Rounded corners
    boxShadow: "0 0 10px rgba(71, 125, 234, 0.5)", // Blue shadow for a blue frame effect
  },
};

export default About1;

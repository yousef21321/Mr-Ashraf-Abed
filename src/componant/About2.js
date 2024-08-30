import React, { useState, useEffect, useRef } from "react";
import teacher from './Assets/Assets/11.jpg';
import teacher22 from './Assets/Assets/22.jpg';
import teacher33 from './Assets/Assets/33.jpg';
import teacher44 from './Assets/Assets/44.jpg';
import teacher5 from './Assets/Assets/55.jpg';
import teacher6 from './Assets/Assets/66.jpg';
import teacher7 from './Assets/Assets/77.jpg';

import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function CourseCard({ title, description, image }) {
  return (
    <div className="course-card" style={styles.courseCard}>
      <img src={image} alt={title} style={styles.courseCardImage} />
      <h3 style={styles.courseCardTitle}>{title}</h3>
      <p style={styles.courseCardDescription}>{description}</p>
    </div>
  );
}

function About2() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const images = [teacher, teacher22, teacher33, teacher44, teacher5, teacher6, teacher7];

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

  const handleNavigation = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      navigate('/PricingCard');
    } else {
      navigate('/Login');
    }
  };

  return (
    <>
      <div className="latest-courses" style={styles.latestCourses}>
        <div className="latest-courses-header" style={styles.latestCoursesHeader}>
          <h2 style={styles.headerText}>
            أحدث الكورسات
          </h2>
        </div>
        <div className="course-cards" style={styles.courseCards}>
          <section className="lessons-section">
            {courses.map((course, index) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={images[index % images.length]} // Cycle through images
              />
            ))}
          </section>
        </div>
        <div style={styles.gradientBackground}></div>
        <div style={styles.viewMoreContainer}>
          <a onClick={handleNavigation} style={styles.viewMoreLink}>
            عرض المزيد
          </a>
        </div>
      </div>
    </>
  );
}

const styles = {
  latestCourses: {
    position: 'relative',
    padding: '2vw 0',
  },
  latestCoursesHeader: {
    textAlign: 'center',
    marginBottom: '2vw',
  },
  headerText: {
    color: '#454545',
    fontSize: '2vw',
    fontFamily: 'Lemonada',
    fontWeight: 575,
    wordWrap: 'break-word',
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  },
  courseCards: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '2vw',
  },
  courseCard: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transition: 'transform 0.3s ease',
  },
  courseCardImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px 10px 0 0',
  },
  courseCardTitle: {
    fontSize: '1.5vw',
    margin: '1vw 0',
    padding: '0 1vw',
  },
  courseCardDescription: {
    fontSize: '1.2vw',
    color: '#555',
    padding: '0 1vw 1vw 1vw',
  },
  gradientBackground: {
    width: "100%",
    height: "155vh",
    position: "absolute",
    top: "28%",
    background: "linear-gradient(180deg, rgba(96, 128, 191, 0) 0%, rgba(96, 128, 191, 0.25) 25%, rgba(96, 128, 191, 0.50) 50%, #6080BF 100%)",
    backdropFilter: "blur(13px)",
  },
  viewMoreContainer: {
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
    alignItems: "center",
  },
  viewMoreLink: {
    color: "#000",
    fontSize: '1.5vw',
    fontFamily: 'Lemonada',
    fontWeight: 575,
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

export default About2;

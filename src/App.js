import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from './componant/ProfileCard';
import Login from './componant/Login';
import Signup from './componant/Signup';
import Video from './componant/Video';
import APPS from './APPS';
import AssignmentsPage from './componant/AssignmentsPage';
import PdfList from './componant/PdfList';
import PricingCard from './componant/PricingCard';
import AddQuestion from './componant/AddQuestion';
import LessonTable from './componant/LessonTable';
import ListStudent from './componant/ListStudent';
import UserTable from './componant/UserTable';
import CreateCodePage from './componant/CreateCodePage';
import MessagesTable from './componant/MessagesTable';
import Words from './componant/Words';
import APPS2 from './APP2.js';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  // Function to check if the screen width is mobile-sized
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Check screen size on initial load
    window.addEventListener('resize', handleResize); // Listen for window resize events
    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup event listener on component unmount
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ProfileCard" element={<ProfileCard />} />
        <Route path="/Video" element={<Video />} />
        
        {/* Conditional Rendering Based on Screen Size */}
        <Route path="/" element={isMobile ? <APPS /> : <APPS2 />} />

        <Route path="/AssignmentsPage" element={<AssignmentsPage />} />
        <Route path="/PdfList" element={<PdfList />} />
        <Route path="/PricingCard" element={<PricingCard />} />
        <Route path="/AddQuestion" element={<AddQuestion />} />
        <Route path="/LessonTable" element={<LessonTable />} />
        <Route path="/ListStudent" element={<ListStudent />} />
        <Route path="/UserTable" element={<UserTable />} />
        <Route path="/Create" element={<CreateCodePage />} />
        <Route path="/Message" element={<MessagesTable />} />
        <Route path="/Words" element={<Words />} />
        
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

// import './App.css';
// import Login from './componant/Login';
// import ProfileCard from './componant/ProfileCard';
// import Signup from './componant/Signup';
// import Video from './componant/Video';

// function App() {
//   return (
//     <div className="App">
//    {/* <Login/>
//    <Signup/> */}
//    <ProfileCard/>
//    {/* <Video/> */}
//     </div>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileCard from './componant/ProfileCard';
import Login from './componant/Login';
import Signup from './componant/Signup';
import Video from './componant/Video';
import APPS from './APPS';
import AssignmentsPage from './componant/AssignmentsPage';
import PdfList from './componant/PdfList';
import PricingCard from './componant/PricingCard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ProfileCard" element={<ProfileCard />} />
        <Route path="/Video" element={<Video />} />
        <Route path="/" element={<APPS />} />
        <Route path="/AssignmentsPage" element={<AssignmentsPage />} />
        <Route path="/PdfList" element={<PdfList />} />
        <Route path="/PricingCard" element={<PricingCard />} />

        
        {/* Define other routes here */}
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Students from './components/Students';
import Courses from './components/Courses';
import styles from './components/project-style.css';

function App() {
  return (
    <div className={styles.back}>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

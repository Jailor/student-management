import React from 'react';
import NavigationBar from './components/NavigationBar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './components/Home';
import Students from './components/Students';
import Courses from './components/Courses';
import Login from './components/Login';
import Logout from './components/Logout';
import Users from './components/Users';
import styles from './components/project-style.css';
import { checkAuthenticationStatus } from './components/Auth';

function App() {
  const authResult = checkAuthenticationStatus();
  return (
    <div className={styles.back}>
      <Router>
        {authResult && <NavigationBar />}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/users" element={<Users />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

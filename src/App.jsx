import React, { useState } from 'react';
// 1. Remove "BrowserRouter as Router" from this import
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Modal from './components/Modal';
import Dashboard from './components/Dashboard';
import Subjects from './components/Subjects';
import TutorsBySubject from './components/Subjects.jsx';
import ContactUs from './components/ContactUs';
import './index.css';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('login');

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  return (
    // 2. The <Router> tags have been removed from here
    <Routes>
      {/* Home Page */}
      <Route
        path="/"
        element={
          <>
            <Navbar onOpenModal={openModal} />
            <HeroSection onGetStarted={() => openModal('signup')} />
            {showModal && <Modal type={modalType} onClose={closeModal} />}
          </>
        }
      />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Subjects Page */}
      <Route path="/subjects" element={<Subjects />} />

      {/* Tutors by Subject Page */}
      <Route path="/subjects/:subjectId/tutors" element={<TutorsBySubject />} />

      {/* Contact Us Page */}
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default App;
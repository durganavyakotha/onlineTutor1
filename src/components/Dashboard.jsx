import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import ContactUs from './ContactUs';

const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({ firstName: '', lastName: '' });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [loadingTutors, setLoadingTutors] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', reason: '' });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    school: '',
    studentClass: '',
  });

  const email = localStorage.getItem('email');
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      localStorage.removeItem('isLoggedIn');
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/user?email=${email}`);
        const { firstName, lastName } = response.data;
        setUserDetails({ firstName, lastName });
        setFormData((prev) => ({
          ...prev,
          name: `${firstName} ${lastName}`,
          email: email,
        }));
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };

    if (email) fetchUserDetails();
  }, [email]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/subjects');
        setSubjects(response.data);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };

    fetchSubjects();
  }, []);

  const handleProfileClick = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem('email');
    navigate('/');
  };

  const handleFindTutor = async () => {
    setSelectedSubject(null);
    try {
      const response = await axios.get('http://localhost:org/api/subjects/all-tutors');
      setTutors(response.data);
      setActiveSection('tutors');
    } catch (err) {
      console.error('Error fetching all tutors:', err);
    }
  };

  const handleSubjectClick = async (subject) => {
    setSelectedSubject(subject);
    setLoadingTutors(true);
    try {
      const response = await axios.get(`http://localhost:8080/api/subjects/${subject.id}/tutors`);
      setTutors(response.data);
      setActiveSection('tutors');
    } catch (err) {
      console.error('Error fetching tutors:', err);
    } finally {
      setLoadingTutors(false);
    }
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    setContactInfo({ name: '', email: '', reason: '' });
    setActiveSection('subjects');
  };

  const openRegisterPopup = (tutor) => {
    setSelectedTutor(tutor);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setFormData((prev) => ({
      ...prev,
      phone: '',
      school: '',
      studentClass: '',
    }));
  };

  const handlePopupChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePopupSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        tutorId: selectedTutor.id,
        studentEmail: formData.email,
        name: formData.name,
        phone: formData.phone,
        school: formData.school,
        studentClass: formData.studentClass,
      };
      await axios.post('http://localhost:8080/api/registration', payload);
      alert(`Successfully registered with ${selectedTutor.name}!`);
      closePopup();
    } catch (err) {
      console.error('Error submitting registration:', err);
      alert('Failed to register.');
    }
  };

  return (
    <div>
      <header className="navbar">
        <div className="nav-left">
          <a href="#" onClick={() => setActiveSection('home')}>
            Home
          </a>
          <a href="#" onClick={handleFindTutor}>
            Find Tutor
          </a>
          <a href="#" onClick={() => setActiveSection('subjects')}>
            Subjects
          </a>
          <a href="#" onClick={() => setActiveSection('about')}>
            About Us
          </a>
          <a href="#" onClick={() => setActiveSection('contact')} className="link-button">
            Contact Us
          </a>
        </div>
        <div className="nav-right">
          <div className="user-info">
            <span>
              {userDetails.firstName} {userDetails.lastName}
            </span>
          </div>
          <div className="profile-section">
            <button className="profile-icon" onClick={handleProfileClick}>
              <img src="image.png" alt="profile" className="profile-pic" />
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item">Profile</button>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {activeSection === 'home' && (
          <div className="home-section">
            {/* Remove HeroSection  */}

            {/* Add the welcome message and other content directly here */}
            <div className="welcome-message">
              <h1 className="welcome-heading">
                Welcome to Our Tutoring Platform
              </h1>
              <p className="welcome-text">
                We offer a wide range of tutoring services to help you succeed.
                Find a tutor, explore subjects, and get the support you need.
              </p>
            </div>

            {/* Footer  */}
            <footer className="home-footer">
              <p>
                &copy; {new Date().getFullYear()} [Your Online Tutoring Platform
                Name]. All rights reserved.
              </p>
              <p>
                Contact us: support@example.com | Phone: +123 456 7890 | Address:
                123 Learning Way, EduCity
              </p>
              {/* Add social media icons/links if needed */}
            </footer>

            <style>
              {`
                .home-section {
                  background-image: url('baby.jpg');
                  background-size: cover;
                  background-position: center;
                  min-height: 100vh;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: flex-start;
                  text-align: center;
                  color: white;
                  position: relative;
                  overflow: hidden;
                  padding-top: 120px;
                  box-sizing: border-box;
                }

                .home-section::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                }

                .welcome-message {
                  z-index: 1;
                  padding: 30px;
                  max-width: 900px;
                  margin-bottom: 30px;
                  border-radius: 12px;
                  background-color: rgba(255, 255, 255, 0.1);
                  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
                  backdrop-filter: blur(10px);
                }

                .welcome-message h1 {
                  font-size: 4rem;
                  margin-bottom: 30px;
                  font-weight: bold;
                  letter-spacing: 2px;
                  color: #ffdb58;
                  text-shadow: 3px 3px 6āāāpx rgba(0, 0, 0, 0.7);
                }

                .welcome-message p {
                  font-size: 1.4rem;
                  margin-bottom: 40px;
                  line-height: 1.8;
                  color: #ffffff;
                  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
                }

                .home-footer {
                  background-color: #004c99;
                  color: white;
                  padding: 25px;
                  text-align: center;
                  margin-top: auto;
                  z-index: 10;
                  position: relative;
                  width: 100%;
                  border-top: 1px solid rgba(255, 255, 255, 0.1);
                }

                .home-footer p {
                  font-size: 1.1rem;
                  margin-bottom: 8px;
                  color: #eeeeee;
                }
              `}
            </style>
          </div>
        )}
        {activeSection === 'subjects' && (
          <section className="subjects-container">
            <h2 className="av">Available Subjects</h2>
            <div className="subjects-grid">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="subject-card"
                  onClick={() => handleSubjectClick(subject)}
                >
                  <h3>{subject.name}</h3>
                  <p>{subject.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeSection === 'tutors' && (
          <section className="tutors-container">
            <h2>
              {selectedSubject
                ? `Available Tutors for ${selectedSubject.name}`
                : 'All Available Tutors'}
            </h2>
            {loadingTutors ? (
              <p>Loading tutors...</p>
            ) : (
              <div className="tutors-grid">
                {tutors.map((tutor) => (
                  <div key={tutor.id} className="tutor-card">
                    <h3>{tutor.name}</h3>
                    <p>
                      <strong>Experience:</strong> {tutor.experience}
                    </p>
                    <p>
                      <strong>Subjects:</strong> {tutor.subjects}
                    </p>
                    <p>
                      <strong>Location:</strong> {tutor.location}
                    </p>
                    <p>
                      <strong>Availability:</strong> {tutor.availability}
                    </p>
                    <p>
                      <strong>Available Days:</strong> {tutor.availableDays}
                    </p>
                    <p>
                      <strong>Available Time:</strong> {tutor.availableTime}
                    </p>
                    <p>
                      <strong>Email:</strong> {tutor.email}
                    </p>
                    <p>
                      <strong>qualification:</strong> {tutor.qualification}
                    </p>
                    <button
                      className="register-button"
                      onClick={() => openRegisterPopup(tutor)}
                    >
                      Register
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
        {activeSection === 'contact' && (
          <div className="contact-form-container">
            <ContactUs />
          </div>
        )}

        {activeSection === 'about' && (
          <section className="about-section">
            <h2>About Our Online Tutoring Platform</h2>
            <p>
              Welcome to [Your Platform Name]! We're passionate about
              transforming the way students learn by providing a seamless and
              effective online tutoring experience. Our platform was born from
              the belief that every student deserves personalized support and
              guidance to unlock their full academic potential.
            </p>
            <p>
              We understand the challenges students face in today's dynamic
              educational landscape. That's why we've created a space where
              learners can connect with experienced and qualified tutors who are
              dedicated to fostering understanding and building confidence.
              Whether a student needs help with core subjects, test preparation,
              or advanced coursework, [Your Platform Name] offers a diverse pool
              of expertise to meet their unique needs.
            </p>
            <p>
              Our commitment extends beyond simply connecting students and tutors.
              We strive to create a supportive and engaging learning
              environment through features like [mention a key feature, e.g.,
              interactive whiteboards, file sharing, progress tracking]. We
              believe in empowering students to take control of their learning
              journey and achieve lasting academic success.
            </p>

            <h3>Our Team and Project Roles</h3>
            <div className="about-grid">
              <div className="about-card">
                <img
                  src="/image2.jpg"
                  alt="Project Lead"
                  className="about-image"
                />
                <h3>Project Lead</h3>
                <p>
                  Responsible for guiding the overall vision and execution of the
                  online tutoring platform.
                </p>
              </div>
              <div className="about-card">
                <img
                  src="/image1.jpg"
                  alt="Technology Developer"
                  className="about-image"
                />
                <h3>Technology Developer</h3>
                <p>
                  Drives the technical development and ensures the platform is
                  robust and user-friendly.
                </p>
              </div>
              <div className="about-card">
                <img
                  src="ppp.jpg"
                  alt="Tutor Coordinator"
                  className="about-image"
                />
                <h3>Tutor Coordinator</h3>
                <p>
                  Focuses on recruiting, vetting, and supporting our network of
                  qualified tutors.
                </p>
              </div>
              {/* You can add more roles here following the same structure */}
            </div>

            <p className="join-us">
              Join us in our mission to make quality education accessible and
              effective for every student!
            </p>
          </section>
        )}

        {/* Register Popup */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              {/* Add the close button (X) here */}
              <button
                type="button"
                onClick={closePopup}
                className="popup-close-btn"
              >
                &times;
              </button>

              <h3>Register with {selectedTutor.name}</h3>
              <form onSubmit={handlePopupSubmit} className="popup-form">
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handlePopupChange}
                    placeholder="Your Name"
                    required
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handlePopupChange}
                    placeholder="Your Email"
                    required
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    id="phone"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handlePopupChange}
                    placeholder="Phone Number"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="school">School:</label>
                  <input
                    id="school"
                    type="text"
                    name="school"
                    value={formData.school}
                    onChange={handlePopupChange}
                    placeholder="School"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentClass">Class:</label>
                  <input
                    id="studentClass"
                    type="text"
                    name="studentClass"
                    value={formData.studentClass}
                    onChange={handlePopupChange}
                    placeholder="Class"
                    required
                  />
                </div>

                {/* Only the submit button now */}
                <div className="popup-buttons">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
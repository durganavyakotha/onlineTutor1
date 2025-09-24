import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Subjects.css';

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/subjects')
      .then(response => setSubjects(response.data))
      .catch(error => console.error("Error fetching subjects:", error));
  }, []);

  const handleSubjectClick = (subjectId) => {
    setSelectedSubjectId(subjectId);
    axios.get(`http://localhost:8080/api/subjects/${subjectId}/tutors`)
      .then(response => setTutors(response.data))
      .catch(error => console.error("Error fetching tutors:", error));
  };

  return (
    <div className="subject-page">
      <h1>Subjects</h1>
      <div className="subject-container">
        {subjects.map(subject => (
          <div
            key={subject.id}
            className="subject-card"
            onClick={() => handleSubjectClick(subject.id)}
          >
            <h3>{subject.name}</h3>
          </div>
        ))}
      </div>

      {selectedSubjectId && (
        <div className="tutors-section">
          <h2>Tutors for Selected Subject</h2>
          <div className="tutors-container">
            {tutors.map(tutor => (
              <div key={tutor.id} className="tutor-card">
                <h4>{tutor.name}</h4>
                <p><strong>Experience:</strong> {tutor.experience} years</p>
                <p><strong>Availability:</strong> {tutor.availability}</p>
                <button>Book</button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subjects;

import React from 'react';

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="navbar">
      <div className="logo">OnlineTutor</div>
      <div className="nav-buttons">
        <button onClick={() => onOpenModal('login')}>Login</button>
        <button onClick={() => onOpenModal('signup')}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;

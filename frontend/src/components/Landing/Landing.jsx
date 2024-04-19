import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <nav className="landing-navbar">
          <div className="navbar-logo">ChatRooms</div>
          <ul className="navbar-menu">
            <li>
              <Link to="/login" className="navbar-link">Log in</Link>
            </li>
            <li>
              <Link to="/register" className="navbar-link">Sign up</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="landing-main">
        <div className="landing-content">
          {/* <h1 className="landing-title">LocalChat-Join the Conversation</h1> */}
          <h1 id="landing-title" className="typing-title">ChatRooms-Join the Conversation</h1>

          <p className="landing-description">Ride the wave of communication</p>
          {/* <Link to="/" className="landing-cta-button">Explore</Link> */}
        </div>
      </main>

      <div className="background-effect"></div>
    </div>
  );
};

export default Landing;

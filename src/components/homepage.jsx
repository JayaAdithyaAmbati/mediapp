import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <Link to="/landingPage">
        <button className="link-button">Book an Appointment</button>
      </Link>
    </div>
  );
}

export default HomePage;

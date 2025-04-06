import React from 'react';
import Image from "next/image";
import './About.css'; // Import the updated CSS

const About: React.FC = () => {
  return (
    <div>
      {/* Header */}
      <div className="header">
        <h1>Explore the World: Learn & Play Geography!</h1>
        <Image 
          src="https://static.wikia.nocookie.net/logopedia/images/0/0c/GeoGuessr_Globe.png/revision/latest?cb=20220415010520"
          alt="EcoGuessr Logo"
          width={150}
          height={150}
          className="logo-img"
        />
      </div>

      {/* Content Section */}
      <div className="content">
        <p className="center-text">
          🌍 Welcome to EcoGuessr! Explore, learn, and make a difference. Challenge yourself with geography-based games that bring the beauty of our planet to life.
        </p>
        
        <p className="center-text">
          Our mission is to inspire a love for the environment through fun and interactive geography challenges. The more you play, the more you’ll learn about our world and how we can help protect it!
        </p>

        <p className="center-text">
          Ready to test your knowledge and see how well you know the world's wonders? Join us on this exciting adventure for a greener future!
        </p>

        <button className="button">Start Your Journey</button>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 EcoGuessr - Learn, Play, Protect the Planet</p>
      </div>
    </div>
  );
};

export default About;

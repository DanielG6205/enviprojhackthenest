import React from "react";
import Link from "next/link";
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-title">EcoGuessr</h2>
          <p className="footer-description">
            Learn about protecting the enviroment while having fun with geography!
          </p>
        </div>
        <div className="footer-links">
          <Link href="/" className="footer-link">Home</Link>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/team" className="footer-link">Team</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} EcoGuessr. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

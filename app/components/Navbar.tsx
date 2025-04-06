import React from "react";
import Link from "next/link";
import Image from "next/image";
import './Navbar.css'; 

const Navbar: React.FC = () => {
  return (
    <header className="navbar-container">
      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <Image 
            src="/file.svg" 
            alt="logo" 
            className="navbar-logo-img" 
            width={100}  
            height={100} 
          />
        </Link>

        <div className="navbar-links">
          <Link href="/about" className="navbar-link">About</Link>
          <Link href="/play" className="navbar-link">Play</Link>
          <Link href="/team" className="navbar-link">Team</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;




import React from 'react';
import logo from '../../assets/logo.png';

const Header = () => {
  return (
    <header className="bg-[#0a4275] py-4 w-full fixed top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="image" className="h-10 w-auto" />
          </div>

          {/* Brand Name and Subtitle */}
          <div className="ml-4">
            <h2 className="text-white text-2xl font-semibold">ORCHID</h2>
            <p className="text-white text-xl">The International School</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

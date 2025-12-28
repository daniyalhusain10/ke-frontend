import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3 } from "react-icons/hi"; // Hamburger Icon
import { IoClose } from "react-icons/io5"; // Close Icon

export const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isOpen, setIsOpen] = useState(false); // Sidebar state

  const navLinks = [
    { to: "/", label: "home" },
    { to: "/all-jobs-user", label: "all jobs" },
    { to: "/about", label: "about us" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="px-6 md:px-10 capitalize font-semibold sticky top-3 text-xl py-5 z-50 bg-white shadow-sm md:shadow-none mx-2 md:mx-0 rounded-3xl md:rounded-none">
      <div className="flex justify-between items-center">
        
        {/* Logo + Desktop Links */}
        <div className="flex items-center">
          <img src="/ke.png" alt="logo" className="w-24 md:w-30" />

          {/* Desktop Links (Hidden on mobile) */}
          <div className="hidden md:flex capitalize tracking-tighter items-center justify-center pl-10 ml-5 border-l border-gray-300 gap-8">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="relative py-2"
                >
                  <span className={`px-2 ${isActive ? "text-black" : "text-gray-500 hover:text-black"}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex justify-end text-sm items-center">
            <div className="flex relative items-center p-2 px-3 rounded-full">
             <img className=' w-[45px] md:w-[60px] rounded-full' src="/download.jfif" alt="" />
             <span className='border-7 border-green-300 rounded-full top-4 right-3 absolute'></span>
            </div>
          </div>

          {/* Hamburger Button (Only Visible on Mobile) */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-3xl text-black focus:outline-none"
          >
            <HiMenuAlt3 />
          </button>
        </div>
      </div>

      {/* --- MOBILE OVERLAY SIDEBAR --- */}
      {/* Background Dim Layer */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={toggleMenu}
      />

      {/* Sidebar Content */}
      <div 
        className={`fixed top-0 right-0 h-full w-[80%] max-w-[300px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Top Bar: Logo & Close */}
          <div className="flex justify-between items-start mb-12">
            <img src="/ke.png" alt="logo" className="w-24" />
            <button onClick={toggleMenu} className="text-3xl text-gray-700 hover:text-black">
              <IoClose />
            </button>
          </div>

          {/* Links List */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={toggleMenu} // Menu band ho jaye click karne par
                  className={`text-2xl font-bold tracking-tight transition-colors ${
                    isActive ? "text-black border-l-4 border-black pl-4" : "text-gray-400 pl-4"
                  }`}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Footer of Sidebar */}
          <div className="mt-auto border-t border-gray-100 pt-6">
            <p className="text-xs text-gray-400 uppercase font-black">System Status</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <p className="text-sm text-green-700 font-bold uppercase">All Systems Operational</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
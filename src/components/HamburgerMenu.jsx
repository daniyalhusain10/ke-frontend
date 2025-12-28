import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Dashboard', to: '/admin-dashboard' },
  { name: 'Task', to: '/admin-task' },
  { name: 'Team', to: '/admin-team' },
];

const OverlayMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* HEADER */}
      <nav className="">
        <div className="flex justify-between items-center">
        
          {/* ✅ Hamburger: ONLY MOBILE */}
          <button
            onClick={toggleMenu}
            className="md:hidden bg-white p-4 rounded-full cursor-pointer  text-gray-600 hover:text-gray-900"
            aria-expanded={isOpen}
          >
            <HiOutlineMenu className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* OVERLAY BACKDROP (mobile only) */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-30 md:hidden
          ${isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMenu}
      />

      {/* SIDE DRAWER (mobile only) */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-xl transform transition-transform duration-300 z-40 md:hidden
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4">
          <div className="flex justify-end mb-6">
            <button onClick={toggleMenu}>
              <HiOutlineX className="h-6 w-6 text-gray-700" />
            </button>
          </div>

          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Menu
          </h2>

          <div className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={toggleMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium
                  ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlayMenu;

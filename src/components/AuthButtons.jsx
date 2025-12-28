// src/components/AuthButtons.jsx (Aapko yeh file banani hogi)

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GiExitDoor } from "react-icons/gi";
import { MdAdminPanelSettings } from "react-icons/md";

const AuthButtons = () => {
    const navigate = useNavigate(); 
    
    // Check karein ki user login hai ya nahi
    const isAuthenticated = localStorage.getItem("ather-husain");

    const handleLogout = () => {
        localStorage.removeItem("ather-husain"); 
        navigate("/login"); 
    };

    return (
        <div className='flex items-center px-10 my-6 rounded-lg text-white'>
            {isAuthenticated ? (
                // === LOGIN KE BAAD WALE BUTTONS ===
                <>
                    {/* 1. Admin Dashboard Button */}
                    <Link to={"/admin-dashboard"}>
                        <div className='flex items-center bg-[#118ab2] py-3 px-6 rounded-xl active:scale-95 mr-4'>
                            <p className='text-lg'>Dashboard</p>
                            <span className='text-xl ml-2'><MdAdminPanelSettings /></span>
                        </div>
                    </Link>

                    {/* 2. Logout Button */}
                    <button onClick={handleLogout}>
                        <div className='flex items-center cursor-pointer bg-red-500 py-3 px-6 rounded-xl active:scale-95'>
                            <p className='text-lg'>Logout</p>
                            <span className='text-xl ml-2'><GiExitDoor /></span>
                        </div>
                    </button>
                </>
            ) : (
                // === LOGIN NAHI HAI WALA BUTTON ===
                <Link to={"/login"}>
                    <div className='flex items-center bg-[#ef476f] py-3 px-6 rounded-xl active:scale-95'>
                        <p className='text-lg'>Login</p>
                        <span className='text-xl ml-2'><GiExitDoor /></span>
                    </div>
                </Link>
            )}
        </div>
    );
};

export default AuthButtons;
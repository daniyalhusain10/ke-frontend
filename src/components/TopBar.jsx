import React, { useState, useEffect, useRef } from 'react'; 
import { IoSearchOutline } from "react-icons/io5"; 
import { TfiEmail } from "react-icons/tfi";
import { PiBellSimpleBold } from "react-icons/pi";
import { GiExitDoor } from "react-icons/gi";
import { IoIosArrowRoundForward } from "react-icons/io";
import { NavLink, useNavigate} from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import SearchOverlay from './SearchOverlay';

const TopBar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const desktopSearchRef = useRef(null); 

    const handleLogout = () => {
        localStorage.removeItem("ather-husain");
        navigate("/login")
        console.log("User logged out, token removed."); 
        
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const isModifierPressed = event.metaKey || event.ctrlKey;
            
            if (isModifierPressed && event.key === 'f') {
                event.preventDefault(); 
                
                if (desktopSearchRef.current) {
                    desktopSearchRef.current.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

    return (
        <div className="flex w-full md:w-[98.5%] justify-between mt-5 py-4 rounded-3xl bg-gray-100">
            
            <div className="flex items-center hidden md:flex ml-6 h-14 bg-white rounded-full shadow-lg overflow-hidden p-1">
                <div className="flex items-center justify-center h-full px-4 text-gray-500">
                    <IoSearchOutline className="text-2xl" />
                </div>
                <input
                    ref={desktopSearchRef} 
                    type="text"
                    placeholder="Search task"
                    className="flex-grow h-full text-lg placeholder-gray-500 focus:outline-none bg-transparent"
                />
                <div className="flex items-center justify-center h-10 px-3 mr-2 text-sm text-gray-700 bg-gray-200 rounded-lg select-none">
                    <span className="font-mono">⌘F</span> 
                </div>
            </div>

            <div className="flex items-center justify-end w-full md:w-fit gap-4 md:gap-10 mx-6">
                
                <div className='flex items-center gap-4 flex-row'>
                    
                    <div className='flex gap-4'>
                        <div className='flex text-[22px] items-center gap-4'>
                            <NavLink to={"/"} className="flex" >
               <span className='-rotate-35 border-2 p-1 ml-3 rounded-full cursor-pointer md:text-4xl text-white'>
                   <IoIosArrowRoundForward className='text-black' />
                              </span>
                            </NavLink>
                             
                    <span onClick={() => { window.open("https://mail.google.com/mail/u/0/#inbox", "_blank"); }} 
                          className='cursor-pointer relative bg-white p-4 rounded-full'>
                        <TfiEmail />
                        <span className='bg-red-600 w-3 top-[10%] right-[0%] rounded-full h-3 absolute'></span>
                    </span>
                    <span className='cursor-pointer md:flex hidden bg-white p-4 rounded-full'>
                        <PiBellSimpleBold /> 
                    </span>
                </div>

                <div 
                    className='relative' 
                    onMouseEnter={() => setIsDropdownOpen(true)} 
                    onMouseLeave={() => setIsDropdownOpen(false)} 
                >
                    <div className='items-center flex tracking-tighter cursor-pointer'>
                        <img className='w-[55px] h-[55px] object-cover rounded-full' src="/download.jfif" alt="Profile" />
                        <div className='ml-3 lg:flex flex-col hidden'>
                            <p className='font-semibold capitalize'>ather husain</p>
                            <p className='text-sm text-gray-400 leading-4 font-semibold'>ayanather26@gmail.com</p>
                        </div>
                    </div>

              
                    {isDropdownOpen && (
                        <div className="absolute flex flex-col right-0 mt-0 w-50 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
                            <div className="py-2 px-3 text-sm text-gray-700 border-b border-gray-100">
                                Logged in as:
                                <p className="font-medium truncate">Ather Husain</p>
                            </div>
                            <button>
                              <div className='flex justify-between items-center cursor-pointer border-t-1 border-gray-300 hover:font-semibold hover:bg-[#193767] hover:text-white py-3 px-6 active:scale-95'>
                               <p className='text-lg'>Contact us</p>
                              <span className='-rotate-35 border-2 p-1 w-fit h-fit rounded-full text-xl '><IoIosArrowRoundForward /></span>
                              </div>
                           </button>
                            
                            <button onClick={handleLogout} >
                              <div className='flex justify-between items-center cursor-pointer border-t-1 border-gray-300 hover:font-semibold hover:bg-red-500 hover:text-white py-3 px-6 active:scale-95'>
                               <p className='text-lg'>Logout</p>
                             <span className='text-xl ml-2'><GiExitDoor /></span>
                            </div>
                           </button>
                        </div>
                    )}
                </div>
                    </div>
                    <div>
                        <HamburgerMenu />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
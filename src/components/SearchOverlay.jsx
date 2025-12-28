import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

const SearchOverlay = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // 1. Ref banaya jisse hum component ko DOM mein target kar saken
    const searchRef = useRef(null); 

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // 2. useEffect hook to handle clicks outside the search bar
    useEffect(() => {
        /**
         * Agar click ref element ke bahar hua hai, toh search bar band kar do.
         */
        function handleClickOutside(event) {
            // Agar search open hai AND click hamare search overlay ke andar nahi hua hai
            if (isSearchOpen && searchRef.current && !searchRef.current.contains(event.target)) {
                // Lekin humein trigger button ko exclude karna hoga, warna woh khulte hi band ho jayega.
                // Trigger button ko exclude karne ka sabse aasaan tareeka hai ki hum check karein ki
                // kya click search icon button par hua hai ya uske bahar.

                // Filhaal, simple logic: Agar overlay ke bahar click hua toh band kar do.
                setIsSearchOpen(false);
            }
        }
        
        // Agar search open hai, toh event listener attach karo
        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        
        // Cleanup function: Jab component unmount ho ya isSearchOpen false ho, toh listener hata do
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]); // isSearchOpen change hone par re-run hoga

    return (
        <>
            {/* 1. Trigger Button (Search Icon) */}
            {/* Trigger button ko search overlay container ke andar se exclude karne ke liye, 
               hum ise component ke bahar (yahan par) rakhte hain. */}
            {!isSearchOpen && (
                <button
                    onClick={toggleSearch}
                    className="text-gray-700 flex md:hidden p-4 bg-white rounded-full focus:outline-none transition-colors duration-200"
                    aria-label="Open search"
                >
                    <FiSearch className="h-6 w-6" />
                </button>
            )}

            {/* 2. Search Overlay Container */}
            {/* 3. Ref ko container se attach karna */}
            <div
                ref={searchRef} 
                className={`fixed top-0 left-0 right-0 h-25 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out
                    ${isSearchOpen ? 'translate-y-0' : '-translate-y-full'}`}
                aria-hidden={!isSearchOpen}
                role="search"
            >
                <div className="flex items-center h-full max-w-4xl mx-auto px-4 py-4">
                    {/* Search Input Field */}
                    <input
                        type="text"
                        placeholder="Search tasks, or teams..."
                        className="flex-grow h-10 px-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150"
                        autoFocus={isSearchOpen}
                    />
                    
                    {/* Close Button (Right Corner) */}
                    <button
                        onClick={toggleSearch}
                        className="ml-4 p-2 text-gray-500 hover:text-red-600 focus:outline-none rounded-full transition-colors duration-150"
                        aria-label="Close search"
                    >
                        <FiX className="h-7 w-7" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchOverlay;
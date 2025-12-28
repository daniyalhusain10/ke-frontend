import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { useShop } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // Added Framer Motion
import {
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaTimes,
  FaLayerGroup,
  FaTag,
  FaCalendarCheck,
  FaIdBadge,
  FaChevronDown
} from 'react-icons/fa';
import { IoSearchOutline } from "react-icons/io5";

const AllJobsUser = () => {
  const { jobs = [] } = useShop();
  const [selectedDate, setSelectedDate] = useState("");
  const [showLast7Days, setShowLast7Days] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); 
  const searchInputRef = useRef(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const categoryFromURL = searchParams.get("category");
    if (categoryFromURL) {
      setSelectedCategory(categoryFromURL);
    }
  }, [searchParams]);

  const categories = ["RMU", "SUB STATION", "PMT", "TASK"];

  const filteredAndSortedJobs = jobs
    .filter((job) => {
      if (!job) return false;
      const jobDateStr = job.jobCreatedDate?.split('T')[0];
      const lowerSearch = searchQuery.toLowerCase().trim();

      const matchesSearch =
        lowerSearch === "" ||
        job.inputField1?.toLowerCase().includes(lowerSearch) ||
        job.inputField2?.toLowerCase().includes(lowerSearch) ||
        job.inputField6?.toLowerCase().includes(lowerSearch);

      const matchesCategory = 
        selectedCategory === "" || 
        job.workCategory?.toUpperCase() === selectedCategory.toUpperCase();

      if (!matchesSearch || !matchesCategory) return false;

      if (showLast7Days) {
        const today = new Date();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);
        const jobDateObj = new Date(job.jobCreatedDate);
        return jobDateObj >= sevenDaysAgo && jobDateObj <= today;
      }

      if (selectedDate) return jobDateStr === selectedDate;
      return true;
    })
    .sort((a, b) => new Date(b.jobCreatedDate) - new Date(a.jobCreatedDate));

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <Navbar />

      <div className="p-4 mt-4 md:p-8 max-w-screen mx-auto">
        
        {/* Header Animation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100 mb-10 flex flex-col xl:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center ">
            <div className="flex items-center h-14 bg-gray-50 rounded-full border border-gray-100 overflow-hidden p-1 group focus-within:border-blue-400 focus-within:bg-white transition-all duration-300">
                <div className="flex items-center justify-center h-full px-4 text-gray-400 group-focus-within:text-blue-500">
                    <IoSearchOutline className="text-2xl" />
                </div>
                <input
                    ref={searchInputRef} 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks, sites..."
                    className="flex-grow h-full text-base placeholder-gray-400 focus:outline-none bg-transparent font-medium"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="p-2 text-gray-300 hover:text-red-500">
                    <FaTimes />
                  </button>
                )}
                <div className="hidden sm:flex items-center justify-center h-10 px-3 mr-1 text-[10px] font-black text-gray-400 bg-white border border-gray-100 rounded-full select-none shadow-sm">
                    <span className="font-mono tracking-tighter uppercase">Ctrl+F</span> 
                </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-end">
            <div className="relative ">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 md:h-14 pl-11 pr-10 bg-gray-50 border border-gray-100 rounded-full text-xs md:text-sm font-bold text-gray-600 appearance-none outline-none focus:ring-2 ring-blue-500/10 cursor-pointer"
              >
                <option value="">ALL CATEGORIES</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <FaTag className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              <FaChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setShowLast7Days(false); }}
              className="bg-gray-50 border border-gray-100 rounded-full px-3 md:px-6 h-10 md:h-14 text-xs font-bold outline-none focus:ring-2 ring-black/5 text-gray-600"
            />
            <button
              onClick={() => { setShowLast7Days(!showLast7Days); setSelectedDate(""); }}
              className={`hidden md:flex items-center gap-2 px-8 h-14 rounded-full text-xs font-black transition-all border ${showLast7Days ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-100 hover:border-black'}`}
            >
              <FaHistory /> 7 DAYS
            </button>
          </div>
        </motion.div>

        {/* Cards Grid with Framer Motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredAndSortedJobs.length ? filteredAndSortedJobs.map((job) => (
              <motion.div 
                layout
                key={job._id || job.id} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[3rem] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden flex flex-col"
              >
                
                {/* Card Header */}
                <div className="bg-gray-50/50 p-6 px-10 border-b border-gray-50 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-black text-sm shadow-inner">
                      {job.atherHusain?.charAt(0) || 'A'}
                    </div>
                    <span className="text-sm hidden md:block font-black text-gray-800 uppercase tracking-tight">{job.atherHusain || 'Admin'}</span>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${job.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'}`}>
                    {job.status}
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 grid grid-cols-2 gap-6 flex-grow">
                  <div className="col-span-2 flex items-center gap-4 mb-2">
                    <div className="bg-blue-50 p-3 rounded-2xl text-blue-500"><FaLayerGroup size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Site</p>
                      <h2 className=" md:text-lg font-bold text-gray-800 capitalize leading-none mt-1">{job.inputField1 || 'Untitled'}</h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><FaTag size={16} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase">Category</p>
                      <p className="text-gray-700 font-bold text-xs uppercase">{job.workCategory || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><FaUser size={16} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase">Fitter</p>
                      <p className="text-gray-700 font-bold text-xs truncate max-w-[120px]">{job.inputField6 || '---'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><FaIdBadge size={16} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase">KK</p>
                      <p className="text-gray-700 font-bold text-xs uppercase">{job.inputField7 || '---'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><FaMapMarkerAlt size={16} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase">AOC</p>
                      <p className="text-gray-700 font-bold text-xs">{job.inputField2 || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl text-gray-400"><FaLayerGroup size={18} /></div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-black uppercase">WorkScope</p>
                      <p className="text-gray-700 font-bold text-xs">{job.inputField3 || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="col-span-2  bg-gray-50/80 p-5 rounded-[2rem] border border-gray-100">
                    <p className="text-gray-400 text-[9px] font-black uppercase mb-2 tracking-widest">Remarks</p>
                    <p className="text-gray-600 text-[15px] font-semibold leading-relaxed">
                      {job.inputField5 ? `"${job.inputField5}"` : 'No remarks available.'}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-auto px-10 py-6 border-t border-gray-50 bg-gray-50/30 flex justify-between items-center">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Posted Date</span>
                  <div className="flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-gray-100">
                    <FaCalendarCheck className="text-blue-500" />
                    <span className="text-base font-black text-gray-900 tracking-tight leading-none">
                      {job.jobCreatedDate?.split('T')[0]}
                    </span>
                  </div>
                </div>
              </motion.div>
            )) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-40 bg-white rounded-[3rem] border-2 border-dashed border-gray-100"
              >
                <p className="text-gray-400 font-bold text-lg italic">No records found matching your selection.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllJobsUser;
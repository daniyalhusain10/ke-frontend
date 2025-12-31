import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '../components/Navbar';
import { useShop } from '../context/ShopContext';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser,
  FaMapMarkerAlt,
  FaHistory,
  FaTimes,
  FaLayerGroup,
  FaTag,
  FaCalendarCheck,
  FaIdBadge,
  FaChevronDown,
  FaSun,
  FaMoon,
  FaTruck,
  FaInfoCircle
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      <Navbar />

      <div className="p-4 mt-4 md:p-8 max-w-9xl mx-auto">
        
        {/* Search & Filters Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-col xl:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center w-full xl:w-auto">
            <div className="flex items-center w-full h-12 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden p-1 focus-within:border-blue-500 focus-within:bg-white transition-all">
                <div className="px-4 text-gray-400">
                    <IoSearchOutline className="text-xl" />
                </div>
                <input
                    ref={searchInputRef} 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks, sites..."
                    className="flex-grow h-full text-sm bg-transparent outline-none font-medium"
                />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full xl:w-auto justify-end">
            <div className="relative flex-grow md:flex-grow-0">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 pl-10 pr-8 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-600 appearance-none outline-none focus:ring-2 ring-blue-500/10"
              >
                <option value="">CATEGORIES</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
            </div>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setShowLast7Days(false); }}
              className="bg-gray-50 border border-gray-100 rounded-2xl px-4 h-12 text-xs font-bold outline-none text-gray-600"
            />

            <button
              onClick={() => { setShowLast7Days(!showLast7Days); setSelectedDate(""); }}
              className={`flex items-center gap-2 px-6 h-12 rounded-2xl text-xs font-black transition-all border ${showLast7Days ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-100'}`}
            >
              <FaHistory /> 7 DAYS
            </button>
          </div>
        </motion.div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredAndSortedJobs.length ? filteredAndSortedJobs.map((job) => (
              <motion.div 
                layout
                key={job._id || job.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
              >
                {/* Header (Admin Name & Status) */}
                <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-black  ">
                      {job.atherHusain?.charAt(0) || 'A'}
                    </div>
                    <div>
                        <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter leading-none">Supervisor</p>
                        <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{job.atherHusain || 'Ather Husain'}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${job.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {job.status}
                  </span>
                </div>

                {/* Main Content */}
                <div className="p-6 space-y-5">
                  {/* Site Name Section (Primary) */}
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-50">
                    <p className="text-[9px] text-blue-400 font-black uppercase mb-1 flex items-center gap-1.5"><FaLayerGroup /> Site Name</p>
                    <h3 className="text-sm font-black text-blue-900 uppercase">{job.inputField1 || 'No Site'}</h3>
                  </div>

                  {/* Shift & Category Row */}
                  <div className="flex gap-2">
                    <div className={`flex-1 p-3 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black border transition-colors ${job.shift?.toLowerCase() === 'night' ? 'bg-slate-800 text-white border-slate-900' : 'bg-orange-50 text-orange-600 border-orange-100'}`}>
                       {job.shift?.toLowerCase() === 'night' ? <FaMoon size={12}/> : <FaSun size={12}/>}
                       {job.shift?.toUpperCase() || 'DAY'}
                    </div>
                    <div className="flex-1 p-3 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 flex items-center justify-center gap-2 text-[10px] font-black">
                        <FaTag size={12} className="text-gray-400"/> {job.workCategory || 'GENERAL'}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">Fitter</p>
                      <div className="bg-gray-50 p-3 rounded-xl text-[11px] font-bold text-gray-700 truncate"><FaUser className="inline mr-2 text-gray-300"/> {job.inputField6 || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">K.K. Name</p>
                      <div className="bg-gray-50 p-3 rounded-xl text-[11px] font-bold text-gray-700 truncate"><FaIdBadge className="inline mr-2 text-gray-300"/> {job.inputField7 || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">AOC</p>
                      <div className="bg-gray-50 p-3 rounded-xl text-[11px] font-bold text-gray-700 truncate"><FaMapMarkerAlt className="inline mr-2 text-gray-300"/> {job.inputField2 || 'N/A'}</div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold text-gray-400 uppercase ml-1">Vehicle</p>
                      <div className="bg-gray-50 p-3 rounded-xl text-[11px] font-bold text-gray-700 truncate"><FaTruck className="inline mr-2 text-gray-300"/> {job.inputField4 || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Workscope & Remarks Section */}
                  <div className="space-y-3 pt-2">
                    <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      <p className="text-[9px] font-black text-gray-400 uppercase mb-1 flex items-center gap-1.5"><FaInfoCircle /> Workscope</p>
                      <p className="text-[11px] font-semibold text-gray-600 leading-snug">{job.inputField3 || 'N/A'}</p>
                    </div>

                    <div className="bg-amber-50/30 p-4 rounded-2xl border border-amber-50/50">
                      <p className="text-[9px] font-black text-amber-500/70 uppercase mb-1">Remarks</p>
                      <p className="text-[12px] font-medium text-gray-600 whitespace-pre-wrap italic">
                        {job.inputField5 ? `"${job.inputField5}"` : 'No special remarks.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Footer (Date) */}
                <div className="mt-auto px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-gray-400">
                    <FaCalendarCheck size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Posted On</span>
                  </div>
                  <span className="text-xs font-black text-gray-900 tracking-tight">
                    {job.jobCreatedDate?.split('T')[0]}
                  </span>
                </div>
              </motion.div>
            )) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <p className="text-gray-400 font-bold italic text-sm">No task records found.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default AllJobsUser;

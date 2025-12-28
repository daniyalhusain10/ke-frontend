import React, { useMemo } from 'react';
import { motion } from 'framer-motion'; 
import { FaPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { IoIosArrowRoundForward } from "react-icons/io";

import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import AnalyticsChart from '../components/AnalyticsChart';
import ProjectProgressChart from '../components/ProjectProgressChart';
import AddTaskButton from '../components/AddTaskButton';
import { useShop } from '../context/ShopContext';   // ✅ ADD THIS

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const chartVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const AdminDashboard = () => {
    const { jobs = [] } = useShop();   // ✅ FETCH JOBS

    // ✅ CALCULATIONS (LOGIC ONLY)
    const stats = useMemo(() => {
        const totalJobs = jobs.length;
        const completedJobs = jobs.filter(j => j.status === 'completed').length;
        const pendingJobs = jobs.filter(j => j.status === 'pending').length;

        return {
            totalJobs,
            completedJobs,
            pendingJobs,
        };
    }, [jobs]);

    return (
        <div className="flex hide-scrollbar-chrome max-h-screen overflow-x-hidden"> 
            <Sidebar />
            <div className="w-full"> 
                <TopBar />
                
                <div className='bg-gray-100 capitalize tracking-tighter 1xl:h-[81vh] w-[98.5%] mt-5 rounded-3xl'>
                    
                    {/* Header Section */}
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='md:text-5xl text-3xl font-semibold tracking-tighter pt-10 pl-6'>
                                dashboard
                            </p>
                            <p className='tracking-tighter flex flex-wrap text-xs md:text-sm pl-6 pt-4 text-gray-500'>
                                plan, prioritize, and accomplish you task with ease.
                            </p>
                        </div>

                        <div className='md:flex items-center mt-3 md:mt-0 md:gap-6 pr-6'>
                            <AddTaskButton />
                            <NavLink to={"/all-jobs"}>
                                <button className='flex whitespace-nowrap mt-3 md:mt-0 cursor-pointer items-center gap-2 border-1 border-[#336F47] text-sm md:text-[17px] bg-white px-3 md:px-6 rounded-[15px] md:rounded-4xl py-4'>
                                    <span><FaPlus /></span> see work
                                </button>
                            </NavLink>
                        </div>
                    </div>

                    {/* Cards */}
                    <motion.div 
                        className='flex flex-wrap gap-6 p-4'
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                    > 
                        {/* Completed Jobs */}
                        <motion.div variants={itemVariants}>
                            <NavLink
                                to={"/all-jobs"}
                                className="inline-block px-7 w-[288.3px] py-4 mt-6 rounded-2xl flex-col h-[170px] flex-shrink-0 basis-72 text-white bg-[#2B6140] hover:shadow-lg transition-shadow"
                            >
                                <div className='flex mt-1 items-center justify-between'>
                                    <p className='text-2xl'>completed jo..</p>
                                    <span className='-rotate-35 border-2 border-white bg-white p-1 rounded-full text-4xl text-black'>
                                        <IoIosArrowRoundForward />
                                    </span>
                                </div>
                                <p className='text-5xl font-semibold'>
                                    {stats.completedJobs}
                                </p>
                                <p className='text-green-400 mt-3'>
                                    🢁 increased from last month
                                </p>
                            </NavLink>
                        </motion.div>

                        {/* Total Jobs */}
                        <motion.div variants={itemVariants}>
                            <NavLink
                                to={"/all-jobs"}
                                className="inline-block px-7 py-4 mt-6 w-[288.3px] rounded-2xl flex-col h-[170px] flex-shrink-0 basis-72 bg-white hover:shadow-lg transition-shadow"
                            >
                                <div className='flex mt-1 items-center justify-between'>
                                    <p className='text-2xl font-semibold'>total jobs</p>
                                    <span className='-rotate-35 border-2 p-1 ml-3 rounded-full text-4xl text-black'>
                                        <IoIosArrowRoundForward />
                                    </span>
                                </div>
                                <p className='text-5xl font-semibold'>
                                    {stats.totalJobs}
                                </p>
                                <p className='text-green-400 mt-3'>
                                    🢁 increased from last month
                                </p>
                            </NavLink>
                        </motion.div>

                        {/* Pending Jobs */}
                        <motion.div variants={itemVariants}>
                            <NavLink
                                to={"/all-jobs"}
                                className='inline-block px-7 py-4 mt-6 w-[288.3px] rounded-2xl flex-col h-[170px] flex-shrink-0 basis-72 bg-white hover:shadow-lg transition-shadow'
                            >
                                <div className='flex mt-1 items-center justify-between'>
                                    <p className='text-2xl font-semibold'>pending jobs</p>
                                    <span className='-rotate-35 border-2 p-1 ml-3 rounded-full text-4xl text-black'>
                                        <IoIosArrowRoundForward />
                                    </span>
                                </div>
                                <p className='text-5xl font-semibold'>
                                    {stats.pendingJobs}
                                </p>
                                <p className='text-green-400 mt-3'>
                                    status updated soon...
                                </p>
                            </NavLink>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <NavLink to={""} 
                                className='inline-block px-7 lg:hidden xl:flex w-[288.3px] py-4 mt-6 rounded-2xl flex-col h-[170px] flex-shrink-0 basis-72 bg-white hover:shadow-lg transition-shadow'>
                                <div className='flex mt-1 justify-between'>
                                    {/* Placeholder for Image */}
                                    <div className="w-22 bg-gray-200 rounded-full"><img src="/dev.jfif" alt="" /></div> 
                                    <span className='-rotate-35 border-2 p-1 ml-3 w-fit h-fit rounded-full text-4xl text-black'><IoIosArrowRoundForward /></span>
                                </div>
                                <p className='text-xl font-semibold'>developers</p>
                                <p className='text-gray-400 text-xs'>created by,  <span className='text-green-400 text-[17px] '> daniyal husain</span></p>
                            </NavLink>
                        </motion.div>
                        

                        {/* Charts */}
                        <div className='flex hidden pr-6 lg:flex gap-6'>
                            <motion.div variants={chartVariants} initial="hidden" animate="show">
                                <AnalyticsChart />
                            </motion.div>
                            <motion.div variants={chartVariants} initial="hidden" animate="show">
                                <ProjectProgressChart />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;






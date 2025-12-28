import React from 'react'
import { motion } from 'framer-motion';
import LinkComponent from './LinkReuseable'
import { MdElectricBolt } from "react-icons/md";
import { FaTasks, FaTools, FaSyncAlt, FaIndustry } from "react-icons/fa";
import { useShop } from '../context/ShopContext';

/* 🔹 Animation Variants */
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const HeroSection = () => {
  const {
    jobs,
    rmuJobs,
    pmtJobs,
    subStationJobs,
    taskJobs,
  } = useShop();

  return (
    <motion.div
      className="md:px-10 flex flex-col"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >

      {/* 🔹 HEADING */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col lg:-tracking-[6px] bold tracking-tighter text-[5vw] md:text-[40px] lg:text-[80px] text-center py-15 font-bold md:leading-[90px] items-center"
      >
        <p>Assistant Engineer (AE)</p>
        <p>Ather Husain </p>
      </motion.div>

      {/* 🔹 CARDS */}
      <motion.div
        className="flex flex-wrap gap-6"
        variants={containerVariants}
      >

        {/* ALL JOBS */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.04 }}>
          <LinkComponent
            to="/all-jobs-user"
            title="all jobs"
            span1="sub station shifting"
            icon={<FaSyncAlt />}
            number={jobs.length}
            className="bg-[#61c89c]"
          />
        </motion.div>

        {/* RMU */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.04 }}>
          <LinkComponent
            to="/all-jobs-user?category=RMU"
            title="rmu"
            span1="rmu operation issue"
            span2="rmu shifting"
            icon={<MdElectricBolt />}
            number={rmuJobs.length}
            className="bg-black text-white"
          />
        </motion.div>

        {/* SUB STATION */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.04 }}>
          <LinkComponent
            to="/all-jobs-user?category=SUB STATION"
            title="sub station"
            span1="sub station shifting"
            span2="trolly operating"
            span3="earthing meshing"
            span4="cd & pt installation"
            span5="tsw maintenance"
            icon={<FaIndustry />}
            number={subStationJobs.length}
            className="bg-[#CB9BFB]"
          />
        </motion.div>

        {/* PMT */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.04 }}>
          <LinkComponent
            to="/all-jobs-user?category=PMT"
            title="pmt"
            span1="pmt maintenance"
            icon={<FaTools />}
            number={pmtJobs.length}
            className="bg-[#F9FD91]"
          />
        </motion.div>

        {/* TASK */}
        <motion.div variants={itemVariants} whileHover={{ scale: 1.04 }}>
          <LinkComponent
            to="/all-jobs-user?category=TASK"
            title="task"
            span1="daily tasks"
            icon={<FaTasks />}
            number={taskJobs.length}
            className="bg-gray-100"
          />
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, easeIn } from 'framer-motion';

const LinkComponent = ({
  span1,
  span2,
  span3,
  span4,
  number,
  icon,
 duration = 0.6, 
  to,
  title,
  className = '',
}) => {
  const textLines = [span1, span2,span3,span4].filter(Boolean); 

  return (
   <>
   <div className=' flex px-10 md:px-0 justify-center md:justify-normal'>
    <Link to={`${to}`} className={`${className} px-4 py-7 flex  flex-col gap-10  tracking-tighter capitalize font-semibold w-[82vw]  rounded-2xl  md:w-[350px] h-[270px]`}>
        <div className=''>
          <div className='flex justify-between'>
            <p className='text-gray-500'>AE</p>
            <span className='text-white p-2 rounded-lg  bg-black'>{icon}</span>
          </div>
       <div>
         <p className='text-3xl '>{title}</p>
        <p className='text-sm'>{span1}</p>
       </div>
        </div>
     <p className='border-t border-gray-500 '></p>
    <div>
      <p className='text-gray-500 '>total jobs</p>
    <p className='text-3xl'>{number}</p>
    </div>
   </Link>
   </div>
   
   </>
  );
};

export default LinkComponent;

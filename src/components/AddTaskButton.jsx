import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import TaskModal from '../components/AddTask'; // Assuming correct path

const AddTaskButton = () => {
    // State to control the visibility of the modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
       
             <button  onClick={openModal} className='whitespace-nowrap active:scale-90 flex mt-3 md:mt-0 cursor-pointer items-center gap-2 bg-[#336F47] text-white text-sm md:text-[17px] px-3 md:px-6 rounded-[15px] md:rounded-4xl py-4'>
               <span><FaPlus /></span> add task
                     </button>
            {isModalOpen && <TaskModal onClose={closeModal} />}
        </>
    );
};

export default AddTaskButton;
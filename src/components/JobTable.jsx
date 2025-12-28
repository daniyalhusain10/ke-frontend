import React, { useState } from 'react';
import { useShop } from '../context/ShopContext.jsx';
import JobCard from './JobCard'; 
import { useEditDeleteTask } from '../hooks/useEditDeleteTask';
import EditTaskModal from './EditTaskModel.jsx'; 

const JobTable = () => {
    const { jobs, loading, error } = useShop();
    const { editTask, deleteTask } = useEditDeleteTask(); // Hook se API function nikala
    
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // 🚀 1. Modal open karne ka function
    const openEditModal = (job) => {
        setTaskToEdit(job);
        setIsEditOpen(true);
    };

    if (loading) return <div className="p-6 text-center text-blue-600">Loading Job Data...</div>;
    if (error) return <div className="p-6 text-center text-red-600 font-bold">{error}</div>;

    return (
        <div className="p-4 my-3 min-h-screen">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Job/Task Entries ({jobs.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <JobCard
                        key={job._id} 
                        jobData={job} 
                        deleteTask={deleteTask}
                        // 🚀 2. Yahan sirf openEditModal pass karein
                        editTask={openEditModal} 
                    />
                ))}
            </div>

            {/* Modal Call */}
            <EditTaskModal 
                isOpen={isEditOpen} 
                onClose={() => setIsEditOpen(false)} 
                taskData={taskToEdit} 
                onSave={editTask} // Backend API call yahan se hogi
            />

            {jobs.length === 0 && (
                <div className="text-center p-10 text-gray-500">
                    No jobs found.
                </div>
            )}
        </div>
    );
};

export default JobTable;
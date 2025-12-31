import React from 'react';
import { FiEdit2, FiTrash2, FiSun, FiMoon } from 'react-icons/fi'; // Naye icons add kiye
import { FaClock } from "react-icons/fa";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlinePlace } from "react-icons/md";
import { FiTruck, FiTag } from "react-icons/fi";
import { CiUser } from "react-icons/ci";

// Helper functions
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); 
};

const DetailItem = ({ label, value, fullWidth = false }) => (
    <div className={`flex flex-col ${fullWidth ? 'w-full' : 'flex-1 min-w-0'}`}>
        <label className="text-xs font-semibold uppercase text-gray-500 mb-1">{label}</label>
        <div className="text-sm font-medium text-gray-800 break-words">{value || 'N/A'}</div>
    </div>
);

const JobCard = ({ jobData, editTask, deleteTask }) => { 
    if (!jobData) return null;

    return (
        <div className="shadow-xl rounded-xl overflow-hidden p-0 border w-full h-fit border-gray-100 bg-white">
            
            {/* Header */}
            <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-200">
                <div className="flex items-center gap-2">
                    {/* 🟢 Work Category Display */}
                    <span className="flex items-center gap-1 text-[10px] font-black bg-blue-600 text-white px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        <FiTag size={10} />
                        {jobData.workCategory || 'General'}
                    </span>

                    {/* 🟠 Shift Display (New) */}
                    {jobData.shift && (
                        <span className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm border ${
                            jobData.shift.toLowerCase() === 'night' 
                            ? 'bg-slate-800 text-white border-slate-900' 
                            : 'bg-orange-100 text-orange-600 border-orange-200'
                        }`}>
                            {jobData.shift.toLowerCase() === 'night' ? <FiMoon size={10} /> : <FiSun size={10} />}
                            {jobData.shift}
                        </span>
                    )}
                </div>
                
                <span className="text-sm opacity-90 font-medium whitespace-nowrap bg-white px-3 py-1 rounded-full shadow-sm text-gray-600 border border-gray-200">
                    {formatDate(jobData.jobCreatedDate)}
                </span>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
               <div className="flex gap-4 border-b pb-3 border-gray-100">
                <DetailItem
                    label="Fitter"
                    value={
                        <span className="flex items-center gap-1">
                            <CiUser className="text-gray-400" />
                            {jobData.inputField6}
                        </span>
                    }
                />
                <DetailItem
                    label='KK Name'
                    value={
                        <span className="flex items-center gap-1">
                            <CiUser className="text-gray-400" />
                            {jobData.inputField7}
                        </span>
                    }
                />
                </div>

                <div>
                    <DetailItem
                        label='site'
                        value={
                            <span className="flex items-center gap-1 font-bold text-gray-900">
                                <MdOutlinePlace className="text-blue-500" />
                                {jobData.inputField1}
                            </span>
                        }
                    />
                </div>

                <div className="space-y-3">
                    <DetailItem label="AOC" value={jobData.inputField2} fullWidth />
                    <div className="flex gap-4">
                        <DetailItem label="Workscope" value={jobData.inputField3 || '0'} />
                        <DetailItem
                            label='Vehicle'
                            value={
                                <span className="flex items-center gap-1">
                                    <FiTruck className="text-gray-400" />
                                    {jobData.inputField4}
                                </span>
                            }
                        />
                    </div>
                </div>

                <div className="pt-3 border-t border-dashed border-gray-200">
                    <DetailItem label="Remarks" value={jobData.inputField5} fullWidth />
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    
                    <div className="flex gap-3">
                        <button 
                            onClick={() => editTask(jobData)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                            title="Edit Job"
                        >
                            <FiEdit2 size={16} />
                        </button>
                        <button 
                            onClick={() => deleteTask(jobData._id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors shadow-sm bg-white border border-gray-100"
                            title="Delete Job"
                        >
                            <FiTrash2 size={16} />
                        </button>
                    </div>

                    {/* Status Badge */}
                    <div className="text-[12px] tracking-tighter font-semibold">
                        {jobData.status === 'pending' ? (
                            <div className='flex items-center bg-amber-100 text-amber-700 p-2 px-4 rounded-full border border-amber-200'>
                                <FaClock className='mr-1.5' />
                                <span className="uppercase tracking-tight">pending</span>
                            </div> 
                        ) : (
                            <div className='flex items-center bg-green-100 text-green-700 p-2 px-4 rounded-full border border-green-200'>
                                <IoMdCheckmarkCircleOutline className='mr-1.5' size={16} />
                                <span className="uppercase tracking-tight">completed</span>    
                            </div>
                        )} 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobCard;

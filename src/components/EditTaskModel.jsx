import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle, FiClock, FiTag, FiCalendar, FiSun, FiMoon } from 'react-icons/fi';

const EditTaskModal = ({ isOpen, onClose, taskData, onSave }) => {
    const [formData, setFormData] = useState({
        jobCreatedDate: '',
        shift: '', // Default shift
        inputField1: '', inputField2: '', inputField3: '',
        inputField4: '', inputField5: '', inputField6: '',
        inputField7: '', status: 'pending', workCategory: '' 
    });

    const categories = ["RMU", "SUB STATION", "PMT", "TASK"];

    useEffect(() => {
        if (taskData && isOpen) {
            setFormData({
                jobCreatedDate: taskData.jobCreatedDate ? taskData.jobCreatedDate.split('T')[0] : '',
                shift: taskData.shift || '', 
                inputField1: taskData.inputField1 || '',
                inputField2: taskData.inputField2 || '',
                inputField3: taskData.inputField3 || '',
                inputField4: taskData.inputField4 || '',
                inputField5: taskData.inputField5 || '',
                inputField6: taskData.inputField6 || '',
                inputField7: taskData.inputField7 || '',
                status: taskData.status || 'pending',
                workCategory: taskData.workCategory || '' 
            });
        }
    }, [taskData, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fieldConfig = [
        { name: 'inputField1', label: 'Site' },
        { name: 'inputField2', label: 'AOC' },
        { name: 'inputField3', label: 'Workscope' },
        { name: 'inputField4', label: 'Vehicle' },
        { name: 'inputField6', label: 'Fitter' },
        { name: 'inputField7', label: 'K.K. Name' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex justify-end items-start p-4 pointer-events-none bg-black/40 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md shadow-2xl rounded-3xl border border-gray-100 pointer-events-auto flex flex-col max-h-[95vh] overflow-hidden translate-x-0 transition-all">
                
                {/* Header */}
                <div className="p-5 border-b flex justify-between items-center bg-white sticky top-0 z-10">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Edit Job Details</h2>
                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Update task information</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <FiX size={24} className="text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6 overflow-y-auto bg-white">
                    
                    {/* JOB CREATED DATE */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
                            <FiCalendar className="text-blue-500" /> Job Created Date
                        </label>
                        <input
                            type="date"
                            name="jobCreatedDate"
                            value={formData.jobCreatedDate}
                            onChange={handleChange}
                            className="w-full bg-blue-50/50 border-2 border-transparent rounded-xl px-4 py-3 text-sm font-bold text-blue-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                        />
                    </div>

                    <hr className="border-gray-100" />

                    {/* ✅ SHIFT TOGGLE (Day/Night) */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Shift
                        </label>
                        <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, shift: 'Day' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                                    formData.shift === 'Day' ? 'bg-white text-orange-500 shadow-sm border border-orange-100' : 'text-gray-400'
                                }`}
                            >
                                <FiSun size={16} /> DAY
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, shift: 'Night' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                                    formData.shift === 'Night' ? 'bg-slate-800 text-white shadow-lg' : 'text-gray-400'
                                }`}
                            >
                                <FiMoon size={16} /> NIGHT
                            </button>
                        </div>
                    </div>
                    
                    {/* WORK CATEGORY SECTION */}
                    <div className="space-y-3">
                        <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                            <FiTag className="text-blue-600" /> Work Category
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {categories.map((cat) => {
                                const isSelected = formData.workCategory?.trim().toUpperCase() === cat.toUpperCase();
                                return (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, workCategory: cat })}
                                        className={`py-3 px-4 rounded-xl text-xs font-black transition-all border-2 ${
                                            isSelected 
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-100' 
                                            : 'bg-gray-50 text-gray-400 border-transparent hover:border-gray-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Input Fields */}
                    <div className="grid grid-cols-1 gap-5">
                        {fieldConfig.map((field) => (
                            <div key={field.name} className="relative group">
                                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
                                    {field.label}
                                </label>
                                <input
                                    type="text"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border-2 border-gray-50 rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:bg-white focus:border-blue-500 outline-none transition-all"
                                    placeholder={`Enter ${field.label}...`}
                                />
                            </div>
                        ))}

                        {/* REMARKS */}
                        <div className="relative group">
                            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 ml-1">
                                Remarks
                            </label>
                            <textarea
                                name="inputField5"
                                value={formData.inputField5}
                                onChange={handleChange}
                                rows="3"
                                className="w-full bg-amber-50/50 border-2 border-transparent rounded-xl px-4 py-3 text-sm font-semibold text-gray-700 focus:bg-white focus:border-amber-400 outline-none transition-all whitespace-pre-wrap"
                                placeholder="Enter Remarks (Shift+Enter for new line)..."
                            />
                        </div>
                    </div>

                    {/* Status Selection */}
                    <div className="pt-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase mb-3 block ml-1">Current Status</label>
                        <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, status: 'pending' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                                    formData.status === 'pending' ? 'bg-white text-amber-600 shadow-sm' : 'text-gray-400'
                                }`}
                            >
                                <FiClock /> PENDING
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, status: 'completed' })}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${
                                    formData.status === 'completed' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-400'
                                }`}
                            >
                                <FiCheckCircle /> COMPLETED
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-5 border-t bg-gray-50 flex gap-3">
                    <button onClick={onClose} className="flex-1 py-4 text-sm font-bold text-gray-500 hover:text-gray-700">
                        Cancel
                    </button>
                    <button 
                        onClick={() => { 
                            onSave(taskData._id, formData); 
                            onClose(); 
                        }}
                        className="flex-[2] py-4 bg-gray-900 text-white text-sm font-bold rounded-2xl hover:bg-black shadow-lg transition-all active:scale-95"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditTaskModal;

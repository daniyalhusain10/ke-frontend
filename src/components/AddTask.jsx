import React from 'react';
import { IoClose } from "react-icons/io5";
import { useAddTaskLogic } from '../hooks/useAddTaskLogic';

const TaskModal = ({ onClose }) => {
    
    const {
        formData,
        isSubmitting,
        message,
        handleChange,
        handleSubmit,
    } = useAddTaskLogic(onClose);

    // Categories array for easier mapping
    const categories = ["RMU", "SUB STATION", "PMT", "TASK"];

    return (
        <div className="fixed h-screen inset-0 capitalize bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-4">
            
            <div className="bg-white hide-scrollbar-chrome rounded-4xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 cursor-pointer hover:text-gray-900 transition duration-200 p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    aria-label="Close"
                >
                    <IoClose size={24} />
                </button>
                
                <div className="p-6 pb-2 border-b">
                    <h2 className="text-3xl font-bold text-gray-800">New Job Entry</h2>
                </div>

                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Creator Name</label>
                                <input
                                    type="text"
                                    name="atherHusain"
                                    value={formData.atherHusain || "Default Name"}
                                    readOnly
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Created Date</label>
                                <input
                                    type="date"
                                    name="jobCreatedDate"
                                    value={formData.jobCreatedDate}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {/* ✅ Work Category Selection (New Section) */}
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">Work Category:</label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        // Maan lete hain aap ise inputField1 ya kisi category field mein save kar rahe hain
                                        onClick={() => handleChange({ target: { name: 'workCategory', value: cat } })}
                                        className={`py-3 px-2 rounded-2xl text-[12px] font-black transition-all duration-200 border-2 ${
                                            formData.workCategory === cat 
                                            ? 'bg-blue-600 text-white border-blue-800 shadow-md scale-105' 
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Status Selection Buttons */}
                        <div className="pt-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Job Status:</label>
                            <div className="flex gap-4">
                                <button
                                    type="button" 
                                    onClick={() => handleChange({ target: { name: 'status', value: 'pending' } })}
                                    className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all duration-200 border-2 ${
                                        formData.status === 'pending' 
                                        ? 'bg-[#0fcab7] text-white border-teal-700 shadow-lg scale-105' 
                                        : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
                                    }`}
                                >
                                    🟡 Pending
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleChange({ target: { name: 'status', value: 'completed' } })}
                                    className={`flex-1 py-3 px-4 rounded-2xl font-bold transition-all duration-200 border-2 ${
                                        formData.status === 'completed' 
                                        ? 'bg-[#275853] text-white border-green-900 shadow-lg scale-105' 
                                        : 'bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200'
                                    }`}
                                >
                                    ✅ Completed
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Fitter Name</label>
                                <input
                                    type="text"
                                    name="inputField6"
                                    value={formData.inputField6}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Name"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">KK Name</label>
                                <input
                                    type="text"
                                    name="inputField7"
                                    value={formData.inputField7}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter Name"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Site Name (Required) *</label>
                                <input
                                    type="text"
                                    name="inputField1"
                                    value={formData.inputField1}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g., Site A"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">AOC</label>
                                <input
                                    type="text"
                                    name="inputField2"
                                    value={formData.inputField2}
                                    onChange={handleChange}
                                    placeholder="e.g., Location"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Workscope:</label>
                                <input
                                    type="text"
                                    name="inputField3"
                                    value={formData.inputField3}
                                    onChange={handleChange}
                                    placeholder="Scope"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Vehicle:</label>
                                <input
                                    type="text"
                                    name="inputField4"
                                    value={formData.inputField4}
                                    onChange={handleChange}
                                    placeholder="Vehicle No"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Remarks:</label>
                                <input
                                    type="text"
                                    name="inputField5"
                                    value={formData.inputField5}
                                    onChange={handleChange}
                                    placeholder="Notes"
                                    className="mt-1 block w-full rounded-2xl border-gray-300 bg-amber-50 shadow-sm p-3 border focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`mt-4 p-3 rounded-2xl text-sm ${message.startsWith('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {message}
                            </div>
                        )}
                        
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full active:scale-95 flex justify-center py-4 px-4 border border-transparent rounded-2xl shadow-sm text-lg font-bold text-white transition-all duration-200 
                                    ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#275853] cursor-pointer hover:bg-green-800 shadow-green-900/20 shadow-xl'}`
                                }
                            >
                                {isSubmitting ? 'Saving Job...' : 'Submit New Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
import { useState } from 'react';
import axios from 'axios';
import { useShop } from '../context/ShopContext'; 
import { toast} from 'react-toastify'

const VITE_BACKEND_URI="https://ke-backend.vercel.app"
const API_BASE_URL = `${VITE_BACKEND_URI}/api`;

export const useEditDeleteTask = () => {
    const { jobs, fetchJobs } = useShop(); 
    const [loading, setLoading] = useState(false);

        const deleteTask = async (id) => {
         const confirmed = window.confirm("Are you sure?");
        
        if (!confirmed) return;

        setLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
            if (fetchJobs) await fetchJobs(); 
            toast.warning("deleted successfully")
        } catch (error) {
            toast.error("delete error")
        } finally {
            setLoading(false);
        }
    };

    // ✏️ EDIT TASK
    const editTask = async (id, updatedData) => {
        const confirmed = window.confirm("Kya aap changes save karna chahte hain?");
        
        if (!confirmed) return;

        setLoading(true);
        try {
            await axios.put(`${API_BASE_URL}/${id}`, updatedData);
            if (fetchJobs) await fetchJobs();
            toast.success("task is updated")
        } catch (error) {
            toast.error("update error")
        } finally {
            setLoading(false);
        }
    };

    return {
        jobs,       // Aap yahan se bhi jobs access kar sakte hain
        deleteTask,
        editTask,
        loading
    };
};

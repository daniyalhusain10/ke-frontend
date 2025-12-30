import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from 'react';
import axios from 'axios';

const ShopContext = createContext(null);
const VITE_BACKEND_URI="https://ke-backend.vercel.app"

export const ShopProvider = ({ children }) => {
  const API_BASE_URL = `${VITE_BACKEND_URI}/api/get-jobs`;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔹 Fetch Jobs
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE_URL);
      setJobs(response.data?.data || response.data || []);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch jobs:', err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // 🔹 Categorized Jobs (Derived State)
  const {
    rmuJobs,
    pmtJobs,
    subStationJobs,
    taskJobs
  } = useMemo(() => {
    return {
      rmuJobs: jobs.filter(j => j.workCategory?.toLowerCase() === 'rmu'),
      pmtJobs: jobs.filter(j => j.workCategory?.toLowerCase() === 'pmt'),
      subStationJobs: jobs.filter(j =>
        j.workCategory?.toLowerCase() === 'sub station'
      ),
      taskJobs: jobs.filter(j => j.workCategory?.toLowerCase() === 'task')
    };
  }, [jobs]);

  // 🔹 Context Value
  const contextValue = {
    jobs,
    rmuJobs,
    pmtJobs,
    subStationJobs,
    taskJobs,
    loading,
    error,
    fetchJobs
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {children}
    </ShopContext.Provider>
  );
};

// 🔹 Custom Hook
export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
};

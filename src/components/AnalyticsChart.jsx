import React from 'react';
import { useShop } from '../context/ShopContext'; 

const CHART_MAX_HEIGHT_REM = 8;
const INACTIVE_BAR_CLASSES = 'border-2 border-gray-400 bg-gray-100 opacity-80';

// ✅ Local date formatter (timezone safe)
const formatDate = (date) =>
  date.getFullYear() +
  '-' +
  String(date.getMonth() + 1).padStart(2, '0') +
  '-' +
  String(date.getDate()).padStart(2, '0');

const AnalyticsChart = () => {
    const { jobs = [] } = useShop();   // ✅ safe default

    const daysName = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];
    
const processChartData = () => {
    if (!jobs || jobs.length === 0) return [];

    const today = new Date();

    // ✅ Last 7 days (rolling window)
    const last7Days = [...Array(7)].map((_, index) => {
        const d = new Date(today);
        d.setUTCDate(today.getUTCDate() - (6 - index));
        return d.toISOString().split('T')[0];
    });

    return daysName.map((day, index) => {
        const dayUTCString = last7Days[index];

        const jobsOnThisDay = jobs.filter(job => {
            if (!job.jobCreatedDate) return false;

            const jobUTCDate = new Date(job.jobCreatedDate)
                .toISOString()
                .split('T')[0];

            return jobUTCDate === dayUTCString;
        });

        const completedJobs = jobsOnThisDay.filter(
            j => j.status === 'completed'
        ).length;

        const pendingJobs = jobsOnThisDay.filter(
            j => j.status === 'pending'
        ).length;

        return {
            day,
            isActive: jobsOnThisDay.length > 0,
            color: completedJobs >= pendingJobs ? 'dark' : 'light',
            completed: completedJobs,
            pending: pendingJobs
        };
    });
};



    const dynamicChartData = processChartData();

    return (
        <div className="project-analytics-card min-h-[260px] lg:min-w-[45vw] flex flex-col bg-white rounded-2xl shadow-lg p-5 max-w-sm mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Project Analytics</h2>
            
            <div 
                className="analytics-chart flex justify-between items-end h-[10rem] relative" 
                style={{ maxHeight: `${CHART_MAX_HEIGHT_REM + 5}rem` }}
            >
               {dynamicChartData.map((item, index) => {
                    const isPendingMore = item.pending > item.completed;
    
                    let barHeightRem = 6; 
                    if (item.isActive) {
                        barHeightRem = isPendingMore ? 7 : CHART_MAX_HEIGHT_REM;
                    }
    
                    let barClasses = 'bar w-17 rounded-full transition-all ease-out duration-300 absolute bottom-6 ';

                    if (item.isActive) {
                        barClasses += isPendingMore 
                            ? ' bg-teal-500'
                            : ' bg-teal-800';
                    } else {
                        barClasses += ` ${INACTIVE_BAR_CLASSES}`;
                    }
    
                    return (
                        <div className="chart-item flex flex-col items-center w-[12%] h-full relative group" key={index}>
                            <div 
                                className={barClasses} 
                                style={{ height: `${barHeightRem}rem` }}
                            >
                                {item.isActive && (
                                    <div className="tooltip absolute -top-12 left-1/2 transform -translate-x-1/2 
                                        bg-gray-800 text-white text-[15px] px-2 py-1 rounded opacity-0 
                                        group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                                        <p>✅ Done: {item.completed}</p>
                                        <p>⏳ Pending: {item.pending}</p>
                                        <div className="absolute w-1.5 h-1.5 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2"></div>
                                    </div>
                                )}
                            </div>
                            <span className="day-label text-sm text-gray-500 absolute bottom-0">
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AnalyticsChart;

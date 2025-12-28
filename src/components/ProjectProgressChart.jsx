import React from 'react';
import { useShop } from '../context/ShopContext';

const RADIUS = 90;
const STROKE_WIDTH = 40;
const svgSize = RADIUS * 2 + STROKE_WIDTH;
const center = svgSize / 2;

const ProjectProgressChart = () => {
  const { jobs } = useShop();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const monthlyJobs = (jobs || []).filter(job => {
    const jobDate = new Date(job.jobCreatedDate);
    return (
      jobDate.getMonth() === currentMonth &&
      jobDate.getFullYear() === currentYear
    );
  });

  const totalMonthly = monthlyJobs.length;

  const completedCount = monthlyJobs.filter(
    job => job.status === 'completed'
  ).length;

  const pendingCount = totalMonthly - completedCount;

  const completedPercentage =
    totalMonthly > 0 ? Math.round((completedCount / totalMonthly) * 100) : 0;

  const pendingPercentage =
    totalMonthly > 0 ? 100 - completedPercentage : 0;

  const arcPath = `
    M ${STROKE_WIDTH / 2}, ${center}
    A ${RADIUS}, ${RADIUS}, 0, 0, 1,
    ${svgSize - STROKE_WIDTH / 2}, ${center}
  `;

  return (
    <div className="bg-white hidden xl:flex flex-col rounded-2xl px-5 shadow-lg pt-5 h-[260px] min-w-[400px] mx-auto text-center border border-gray-50">
      <h2 className="text-xl font-semibold text-gray-800 mb-3 text-left">
        Monthly Progress
      </h2>

      <div className="relative flex justify-center">
        <svg
          width={svgSize}
          height={center + STROKE_WIDTH / 2 + 5}
          viewBox={`0 0 ${svgSize} ${center + STROKE_WIDTH / 2 + 5}`}
        >
          {/* Base gray arc */}
          <path
            d={arcPath}
            fill="none"
            stroke="#F3F4F6"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />

          {/* Pending (Sea Green) */}
          {pendingPercentage > 0 && (
            <path
              d={arcPath}
              fill="none"
              stroke="#26a69a"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${pendingPercentage} 100`}
              strokeDashoffset={-completedPercentage}
              className="transition-all duration-1000 ease-in-out"
            />
          )}

          {/* Completed (Dark Green) */}
          {completedPercentage > 0 && (
            <path
              d={arcPath}
              fill="none"
              stroke="#336F47"
              strokeWidth={STROKE_WIDTH}
              strokeLinecap="round"
              pathLength="100"
              strokeDasharray={`${completedPercentage} 100`}
              strokeDashoffset="0"
              className="transition-all duration-1000 ease-in-out"
            />
          )}
        </svg>

        <div className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/3">
          <p className="text-3xl font-extrabold text-gray-900">
            {completedPercentage}%
          </p>
          <p className="text-[10px] uppercase font-bold text-gray-400 mt-2 tracking-widest">
            {now.toLocaleString('default', { month: 'long' })}
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-3 pt-2 px-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#336F47]" />
          <span className="text-xs font-bold text-gray-600 uppercase">
            Completed ({completedCount})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#26a69a]" />
          <span className="text-xs font-bold text-gray-600 uppercase">
            Pending ({pendingCount})
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressChart;

import React from 'react';

/**
 * Reusable progress bar component with color-coding
 * - Gray: 0%
 * - Blue: 1-99%
 * - Green: 100%
 */
const ProgressBar = ({ progress = 0 }) => {
  // Determine color based on progress
  const getColorClass = () => {
    if (progress === 0) return 'gray';
    if (progress === 100) return 'green';
    return 'blue';
  };

  return (
    <div className="progress-bar" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
      <div 
        className={`progress-bar-fill ${getColorClass()}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
};

export default ProgressBar;
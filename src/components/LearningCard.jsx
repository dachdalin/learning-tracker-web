import React from 'react';
import ProgressBar from './ProgressBar';
import { getCategoryById, getStatusById } from '../data/categories';

const LearningCard = ({ item, onEdit, onDelete }) => {
  const category = getCategoryById(item.category);
  const status = getStatusById(item.status);
  const isCompleted = item.progress === 100;

  return (
    <div className="card learning-card animate-fade-in">
      <div className="learning-card-header">
        <div>
          <h3 className="learning-card-title">{item.title}</h3>
          <div className="learning-card-meta mt-sm">
            <span className={`badge ${category.colorClass}`}>
              {category.icon} {category.name}
            </span>
            <span className={`badge ${status.colorClass}`}>
              {status.name}
            </span>
            {isCompleted && (
              <span className="completion-badge">
                🎖️ Completed
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="learning-card-progress">
        <ProgressBar progress={item.progress} />
        <span className="learning-card-progress-text">{item.progress}%</span>
      </div>

      {item.skills && item.skills.length > 0 && (
        <div className="learning-card-skills">
          {item.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

      <div className="learning-card-actions">
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={() => onEdit(item)}
        >
          ✏️ Edit
        </button>
        <button 
          className="btn btn-ghost btn-sm" 
          onClick={() => onDelete(item)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default LearningCard;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, getStatusFromProgress } from '../data/categories';
import ProgressBar from '../components/ProgressBar';

const AddLearning = ({ onAddItem }) => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    progress: 0,
    skillsText: '',
  });
  
  // Validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value,
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 2) {
      newErrors.title = 'Title must be at least 2 characters';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Parse skills from comma-separated text
    const skills = formData.skillsText
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
    
    // Create new learning item
    const newItem = {
      id: Date.now().toString(),
      title: formData.title.trim(),
      category: formData.category,
      progress: formData.progress,
      status: getStatusFromProgress(formData.progress),
      skills,
      createdAt: new Date().toISOString(),
    };
    
    onAddItem(newItem);
    navigate('/');
  };

  return (
    <div className="container main-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">➕ Add New Learning Topic</h1>
        <p className="page-subtitle">Start tracking your learning journey</p>
      </div>

      {/* Form Card */}
      <div className="card form-card">
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              placeholder="e.g., React Basics, Node.js Fundamentals"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className="form-error">{errors.title}</p>}
          </div>

          {/* Category */}
          <div className="form-group">
            <label className="form-label" htmlFor="category">
              Category <span className="text-danger">*</span>
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            {errors.category && <p className="form-error">{errors.category}</p>}
          </div>

          {/* Progress */}
          <div className="form-group">
            <label className="form-label" htmlFor="progress">
              Initial Progress
            </label>
            <div className="progress-display">
              <input
                type="range"
                id="progress"
                name="progress"
                className="form-range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
              />
              <span className="progress-value">{formData.progress}%</span>
            </div>
            <div className="mt-sm">
              <ProgressBar progress={formData.progress} />
            </div>
          </div>

          {/* Skills */}
          <div className="form-group">
            <label className="form-label" htmlFor="skillsText">
              What You'll Learn
            </label>
            <textarea
              id="skillsText"
              name="skillsText"
              className="form-textarea"
              placeholder="Enter skills separated by commas, e.g., useState, Props, Components"
              value={formData.skillsText}
              onChange={handleChange}
            />
            <p className="text-muted mt-sm" style={{ fontSize: 'var(--font-size-sm)' }}>
              Separate each skill with a comma
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-md mt-lg">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : '✨ Add Learning Topic'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLearning;
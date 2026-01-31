import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import LearningCard from '../components/LearningCard';
import FilterBar from '../components/FilterBar';
import Modal from '../components/Modal';
import ProgressBar from '../components/ProgressBar';
import { getStatusFromProgress } from '../data/categories';

const Home = ({ items, onUpdateItem, onDeleteItem }) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [editProgress, setEditProgress] = useState(0);

  // Filter items based on search and filters
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !categoryFilter || item.category === categoryFilter;
      
      const matchesStatus = !statusFilter || item.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [items, searchTerm, categoryFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = items.length;
    const completed = items.filter((item) => item.progress === 100).length;
    const inProgress = items.filter((item) => item.progress > 0 && item.progress < 100).length;
    const notStarted = items.filter((item) => item.progress === 0).length;
    const avgProgress = total > 0 
      ? Math.round(items.reduce((sum, item) => sum + item.progress, 0) / total) 
      : 0;
    
    return { total, completed, inProgress, notStarted, avgProgress };
  }, [items]);

  // Handle edit
  const handleEdit = (item) => {
    setEditItem(item);
    setEditProgress(item.progress);
  };

  const handleEditSave = () => {
    if (editItem) {
      const newStatus = getStatusFromProgress(editProgress);
      onUpdateItem({
        ...editItem,
        progress: editProgress,
        status: newStatus,
      });
      setEditItem(null);
    }
  };

  // Handle delete
  const handleDelete = (item) => {
    setDeleteItem(item);
  };

  const handleDeleteConfirm = () => {
    if (deleteItem) {
      onDeleteItem(deleteItem.id);
      setDeleteItem(null);
    }
  };

  return (
    <div className="container main-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">📚 My Learning Dashboard</h1>
        <p className="page-subtitle">Track your learning progress and achieve your goals</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Topics</div>
        </div>
        <div className="stat-card">
          <div className="stat-value text-success">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value" style={{ color: 'var(--color-warning)' }}>{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.avgProgress}%</div>
          <div className="stat-label">Avg Progress</div>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {/* Learning Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <LearningCard
              key={item.id}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📖</div>
          <h3 className="empty-state-title">
            {items.length === 0 ? 'No learning topics yet' : 'No matching topics'}
          </h3>
          <p className="empty-state-text">
            {items.length === 0 
              ? 'Start by adding your first learning topic!' 
              : 'Try adjusting your search or filters'}
          </p>
          {items.length === 0 && (
            <Link to="/add" className="btn btn-primary">
              ➕ Add Learning Topic
            </Link>
          )}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
        title="Edit Progress"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setEditItem(null)}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleEditSave}>
              Save Changes
            </button>
          </>
        }
      >
        {editItem && (
          <div>
            <h4 className="mb-md">{editItem.title}</h4>
            <div className="form-group">
              <label className="form-label">Progress</label>
              <div className="progress-display">
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="100"
                  value={editProgress}
                  onChange={(e) => setEditProgress(Number(e.target.value))}
                />
                <span className="progress-value">{editProgress}%</span>
              </div>
              <div className="mt-md">
                <ProgressBar progress={editProgress} />
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        title="Confirm Delete"
        footer={
          <>
            <button className="btn btn-secondary" onClick={() => setDeleteItem(null)}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>
              Delete
            </button>
          </>
        }
      >
        {deleteItem && (
          <p>
            Are you sure you want to delete <strong>"{deleteItem.title}"</strong>? This action cannot be undone.
          </p>
        )}
      </Modal>
    </div>
  );
};

export default Home;
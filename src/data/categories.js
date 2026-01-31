
export const categories = [
  { id: 'frontend', name: 'Frontend', icon: '🎨', colorClass: 'badge-frontend' },
  { id: 'backend', name: 'Backend', icon: '⚙️', colorClass: 'badge-backend' },
  { id: 'design', name: 'Design', icon: '✨', colorClass: 'badge-design' },
  { id: 'devops', name: 'DevOps', icon: '🚀', colorClass: 'badge-devops' },
  { id: 'database', name: 'Database', icon: '🗄️', colorClass: 'badge-database' },
  { id: 'testing', name: 'Testing', icon: '🧪', colorClass: 'badge-testing' },
  { id: 'other', name: 'Other', icon: '📚', colorClass: 'badge-other' },
];


export const statuses = [
  { id: 'not-started', name: 'Not Started', colorClass: 'badge-info' },
  { id: 'learning', name: 'Learning', colorClass: 'badge-warning' },
  { id: 'completed', name: 'Completed', colorClass: 'badge-success' },
];


export function getCategoryById(id) {
  return categories.find((cat) => cat.id === id) || categories[categories.length - 1];
}


export function getStatusById(id) {
  return statuses.find((status) => status.id === id) || statuses[0];
}


export function getStatusFromProgress(progress) {
  if (progress === 0) return 'not-started';
  if (progress === 100) return 'completed';
  return 'learning';
}

import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AddLearning from './pages/AddLearning';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

function App() {
  // Theme state
  const [isDarkMode, setIsDarkMode] = useLocalStorage('learning-tracker-theme', false);
  
  // Learning items state
  const [items, setItems] = useLocalStorage('learning-tracker-items', []);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Toggle theme
  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Add new learning item
  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  // Update existing item
  const handleUpdateItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  // Delete item
  const handleDeleteItem = (itemId) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <BrowserRouter>
      <Header isDarkMode={isDarkMode} onToggleTheme={handleToggleTheme} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              onUpdateItem={handleUpdateItem}
              onDeleteItem={handleDeleteItem}
            />
          }
        />
        <Route
          path="/add"
          element={<AddLearning onAddItem={handleAddItem} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// App.jsx
import React, { useState } from 'react';
import './App.css';
import CompanyForm from './components/CompanyForm';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <div className="page-wrapper">
      <div className="theme-toggle">
      </div>

      <div className="glass-container">
        <h1>🚀 ProSpectra</h1>
        <CompanyForm />
      </div>
    </div>
  );
}

export default App;

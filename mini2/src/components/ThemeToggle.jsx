import React from 'react';

const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button onClick={toggleTheme} style={{
      padding: '8px 16px',
      marginLeft: '20px',
      backgroundColor: isDark ? '#444' : '#ccc',
      color: isDark ? '#fff' : '#000',
      border: 'none',
      borderRadius: '5px'
    }}>
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;

import React from 'react';

const QuoteButton = ({ label, onClick }) => {
  return (
    <button onClick={onClick} style={{
      padding: '10px 20px',
      margin: '10px',
      cursor: 'pointer',
      backgroundColor: '#4caf50',
      border: 'none',
      borderRadius: '5px',
      color: '#fff'
    }}>
      {label}
    </button>
  );
};

export default QuoteButton;

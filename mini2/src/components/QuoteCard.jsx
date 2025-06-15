import React from 'react';

const QuoteCard = ({ quote, author, fontSize, liked, onLikeToggle }) => {
  return (
    <div className="quote-card">
      <p style={{ fontSize }}>{quote}</p>
      <p style={{ fontStyle: 'italic' }}>— {author || 'Unknown'}</p>
    </div>
  );
};

export default QuoteCard;

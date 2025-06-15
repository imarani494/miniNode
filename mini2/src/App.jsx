import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuoteCard from './components/QuoteCard';
import QuoteButton from './components/QuoteButton';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState({ q: '', a: '' });
  const [liked, setLiked] = useState(false);
  const [fontSize, setFontSize] = useState('18px');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://zenquotes.io/api/random');
      const { q, a } = response.data[0];
      setQuote({ q, a });
      setLiked(false); // Reset like on new quote
    } catch (err) {
      console.error('Error fetching quote', err);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const themeColor = isDarkTheme ? '#333' : '#f0f0f0';
  const textColor = isDarkTheme ? '#f0f0f0' : '#333';

  return (
    <div className="app" style={{ backgroundColor: themeColor, color: textColor }}>
      <div className="container">
        <QuoteCard
          quote={quote.q}
          author={quote.a}
          fontSize={fontSize}
          liked={liked}
          onLikeToggle={() => setLiked(!liked)}
        />

        <QuoteButton label="New Quote" onClick={fetchQuote} />
        <QuoteButton label={liked ? 'Unlike ❤️' : 'Like 🤍'} onClick={() => setLiked(!liked)} />

        <div className="controls">
          <label>Font Size: </label>
          <select onChange={(e) => setFontSize(e.target.value)} value={fontSize}>
            <option value="16px">Small</option>
            <option value="18px">Medium</option>
            <option value="24px">Large</option>
          </select>

          <ThemeToggle isDark={isDarkTheme} toggleTheme={() => setIsDarkTheme(!isDarkTheme)} />
        </div>
      </div>
    </div>
  );
};

export default App;

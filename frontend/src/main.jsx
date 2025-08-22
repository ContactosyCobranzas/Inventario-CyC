import React, { useEffect, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

function GlobalFontSizeWrapper({ children }) {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('uiFontSize') || '100%');
  useEffect(() => {
    document.body.style.fontSize = fontSize;
    localStorage.setItem('uiFontSize', fontSize);
  }, [fontSize]);
  useEffect(() => {
    window.setGlobalFontSize = setFontSize;
  }, []);
  return children;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalFontSizeWrapper>
      <App />
    </GlobalFontSizeWrapper>
  </StrictMode>,
)

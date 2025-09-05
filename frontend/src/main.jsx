import React, { useEffect, useState, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import GlobalToastContainer from './common/GlobalToastContainer';

function GlobalFontSizeWrapper({ children }) {
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('uiFontSize') || '100%');
  useEffect(() => {
    document.body.style.fontSize = fontSize;
    localStorage.setItem('uiFontSize', fontSize);
  }, [fontSize]);
  useEffect(() => {
    window.setGlobalFontSize = setFontSize;
  }, []);
  return <>
    {children}
    <GlobalToastContainer />
  </>;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalFontSizeWrapper>
        <App />
      </GlobalFontSizeWrapper>
    </BrowserRouter>
  </StrictMode>,
)

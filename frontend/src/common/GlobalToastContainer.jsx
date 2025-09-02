import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyleLight = {
  background: '#fff',
  color: '#23272e',
  fontWeight: 600,
  fontSize: '1.08rem',
  border: '1.5px solid #43a047',
  boxShadow: '0 4px 24px 0 rgba(67,160,71,0.18)',
  borderRadius: '14px',
};
const toastStyleDark = {
  background: '#23272e',
  color: '#43a047',
  fontWeight: 600,
  fontSize: '1.08rem',
  border: '1.5px solid #43a047',
  boxShadow: '0 4px 24px 0 rgba(67,160,71,0.18)',
  borderRadius: '14px',
};

function useThemeWatcher() {
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark-theme'));
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains('dark-theme'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}
export default function GlobalToastContainer() {
  const isDark = useThemeWatcher();
  return <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    toastStyle={isDark ? toastStyleDark : toastStyleLight}
  />;
}

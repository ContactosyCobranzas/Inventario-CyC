import React from 'react';
import { toast } from 'react-toastify';
import { FaBell, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
// 
export function showToast({
  message,
  type = 'info',
  icon,
  autoClose = 4000,
  position = 'bottom-right',
  theme = 'dark',
}) {
  let toastIcon = icon;
  if (!icon) {
    if (type === 'success') toastIcon = getSuccessIcon(theme);
    else if (type === 'error') toastIcon = getErrorIcon(theme);
    else toastIcon = getInfoIcon(theme);
  }
  const styleDark = {
    background: '#23272b',
    color: '#fff',
    fontWeight: 500,
    fontSize: '1.08rem',
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.22)',
    borderRadius: '14px',
  };
  const styleLight = {
    background: '#fff',
    color: '#23272b',
    fontWeight: 500,
    fontSize: '1.08rem',
  };
  // ...existing code...

function getSuccessIcon(theme) {
  return FaCheckCircle ? React.createElement(FaCheckCircle, { style: { color: theme === 'dark' ? '#43a047' : '#388e3c' } }) : null;
}
function getErrorIcon(theme) {
  return FaExclamationCircle ? React.createElement(FaExclamationCircle, { style: { color: theme === 'dark' ? '#c62828' : '#d32f2f' } }) : null;
}
function getInfoIcon(theme) {
  return FaBell ? React.createElement(FaBell, { style: { color: theme === 'dark' ? '#c62828' : '#1976d2' } }) : null;
}
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: toastIcon,
    style: theme === 'dark' ? styleDark : styleLight,
  });
}

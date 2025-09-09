import React from 'react';
import { toast } from 'react-toastify';
import { FaBell, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export function showToast({
  message,
  type = 'info',
  icon,
  autoClose = 4000,
  position = 'bottom-right',
  theme = 'dark',
}) {
  let toastIcon = null;
  // Estilos personalizados por tipo y tema
  const borderColors = {
    success: theme === 'dark' ? '#43a047' : '#388e3c',
    error: theme === 'dark' ? '#c62828' : '#d32f2f',
    info: theme === 'dark' ? '#FFD600' : '#d2cf19ff',
  };
  const styleDark = {
    background: '#23272b',
    color: borderColors[type] || '#fff',
    fontWeight: 600,
    fontSize: '1.08rem',
    border: `2px solid ${borderColors[type]}`,
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.22)',
    borderRadius: '14px',
    letterSpacing: '0.01em',
  };
  const styleLight = {
    background: '#fff',
    color: borderColors[type] || '#23272b',
    fontWeight: 600,
    fontSize: '1.08rem',
    border: `2px solid ${borderColors[type]}`,
    boxShadow: '0 4px 24px 0 rgba(44,62,80,0.10)',
    borderRadius: '14px',
    letterSpacing: '0.01em',
  };

function getSuccessIcon(theme) {
  return FaCheckCircle ? React.createElement(FaCheckCircle, { style: { color: theme === 'dark' ? '#43a047' : '#388e3c' } }) : null;
}
function getErrorIcon(theme) {
  return FaExclamationCircle ? React.createElement(FaExclamationCircle, { style: { color: theme === 'dark' ? '#c62828' : '#d32f2f' } }) : null;
}
function getInfoIcon(theme) {
  return FaBell ? React.createElement(FaBell, { style: { color: theme === 'dark' ? '#c62828' : '#d2b619ff' } }) : null;
}
  toast[type](message, {
    position,
    autoClose,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: null,
    style: theme === 'dark' ? styleDark : styleLight,
  });
}

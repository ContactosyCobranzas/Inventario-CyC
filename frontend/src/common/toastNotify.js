import { toast } from 'react-toastify';
import { FaBell, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export function showToast({
  message,
  type = 'info', // 'info', 'success', 'error', 'warning'
  icon,
  autoClose = 4000,
  position = 'bottom-right',
  theme = 'dark', // 'dark' o 'light'
}) {
  let toastIcon = icon;
  if (!icon) {
    if (type === 'success') toastIcon = <FaCheckCircle style={{ color: theme === 'dark' ? '#43a047' : '#388e3c' }} />;
    else if (type === 'error') toastIcon = <FaExclamationCircle style={{ color: theme === 'dark' ? '#c62828' : '#d32f2f' }} />;
    else toastIcon = <FaBell style={{ color: theme === 'dark' ? '#c62828' : '#1976d2' }} />;
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
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)',
    borderRadius: '14px',
  };
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

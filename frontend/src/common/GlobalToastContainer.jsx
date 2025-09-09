import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyleDark = {
  background: '#23272e',
  color: '#43a047',
  fontWeight: 600,
  fontSize: '1.08rem',
  border: '1.5px solid #43a047',
  boxShadow: '0 4px 24px 0 rgba(67,160,71,0.18)',
  borderRadius: '14px',
};

export default function GlobalToastContainer() {
  return <ToastContainer
    position="top-right"
    autoClose={2500}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    toastStyle={toastStyleDark}
  />;
}

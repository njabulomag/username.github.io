import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Performance monitoring
if (import.meta.env.PROD) {
  // Initialize performance monitoring
  console.log('Production build - performance monitoring enabled');
}

// Error reporting setup
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // In production, send to error reporting service
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // In production, send to error reporting service
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
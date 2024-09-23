import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';

// Commentaire pour forcer le push
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

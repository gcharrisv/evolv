import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './tokens.css';
import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);

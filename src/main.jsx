import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style/index.css'
import { AuthProvider } from '../src/admin/AdminComponents/auth/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);

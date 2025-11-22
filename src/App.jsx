import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './App.css';
import MainRoutes from './routes/MainRoutes';
import DashboardRoutes from './routes/DashboardRoutes';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path="/*" element={<MainRoutes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;

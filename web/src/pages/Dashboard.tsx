import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.firstName}!</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>📊 Overview</h3>
            <p>Your compliance overview and statistics will appear here.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>📄 Recent Documents</h3>
            <p>Your recently uploaded documents will be listed here.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>🔍 Analysis Results</h3>
            <p>Latest compliance analysis results will be shown here.</p>
          </div>
          
          <div className="dashboard-card">
            <h3>⚡ Quick Actions</h3>
            <p>Quick access to common actions will be available here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 
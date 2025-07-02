import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profile</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-avatar">
            {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          
          <div className="profile-info">
            <h2>{user?.firstName} {user?.lastName}</h2>
            <p className="profile-email">{user?.email}</p>
            <p className="profile-role">Role: {user?.role}</p>
            <p className="profile-joined">Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
          </div>
        </div>

        <div className="profile-sections">
          <div className="profile-section">
            <h3>Account Settings</h3>
            <p>Profile editing and account management will be implemented here.</p>
          </div>
          
          <div className="profile-section">
            <h3>Preferences</h3>
            <p>Theme, notifications, and other preferences will be managed here.</p>
          </div>
          
          <div className="profile-section">
            <h3>Security</h3>
            <p>Password change and security settings will be available here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
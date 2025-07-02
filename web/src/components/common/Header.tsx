import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { THEMES } from '../../../shared/constants';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, setTheme, isDark } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  const toggleTheme = () => {
    const newTheme = isDark ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Compliance Engine</h1>
      </div>
      
      <div className="header-right">
        {/* Theme Toggle */}
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* User Menu */}
        <div className="user-menu">
          <button 
            className="user-menu-button"
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div className="user-avatar">
              {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span className="user-name">{user?.firstName} {user?.lastName}</span>
            <span className="user-menu-arrow">▼</span>
          </button>
          
          {showUserMenu && (
            <div className="user-dropdown">
              <div className="user-info">
                <strong>{user?.firstName} {user?.lastName}</strong>
                <span className="user-email">{user?.email}</span>
                <span className="user-role">{user?.role}</span>
              </div>
              <div className="user-menu-items">
                <button className="menu-item">Profile</button>
                <button className="menu-item">Settings</button>
                <hr className="menu-divider" />
                <button className="menu-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 
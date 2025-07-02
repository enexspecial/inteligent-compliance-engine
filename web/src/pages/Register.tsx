import React from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join the Compliance Engine platform</p>
        </div>

        <div className="register-content">
          <p>Registration functionality will be implemented here.</p>
          <p>For now, please use the login page.</p>
        </div>

        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register; 
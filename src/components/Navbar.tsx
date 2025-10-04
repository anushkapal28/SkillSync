import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/" className="brand">SkillSync</Link>
      </div>
      <div className="nav-right">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/advice">Advice</Link>
            <Link to="/progress">Progress</Link>
            <Link to="/profile">Profile</Link>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-primary">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Navbar = ({ user }) => {
  return (
    <header className="navbar glass">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search products, orders..." />
      </div>
      <div className="nav-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user?.email?.split('@')[0]}</span>
            <span className="user-role">{user?.role || 'Staff'}</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>

      <style>{`
        .navbar {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          margin-bottom: 2rem;
          border-radius: 16px;
          border: 1px solid var(--border);
        }

        .search-container {
          display: flex;
          align-items: center;
          background: var(--surface);
          padding: 0.5rem 1rem;
          border-radius: 12px;
          width: 300px;
          border: 1px solid var(--border);
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 0.75rem;
        }

        .search-container input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          width: 100%;
          font-size: 0.9rem;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-btn {
          background: var(--surface);
          color: var(--text);
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid var(--border);
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--secondary);
          border-radius: 50%;
          border: 2px solid var(--surface);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .user-name {
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: capitalize;
        }

        .user-role {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(45deg, var(--surface-light), var(--surface));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          border: 1px solid var(--border);
        }
      `}</style>
    </header>
  );
};

export default Navbar;

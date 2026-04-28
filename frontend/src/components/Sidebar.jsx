import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Box, ShoppingCart, Users, FileText, PieChart, LogOut, Package } from 'lucide-react';


// for side-bar
const Sidebar = ({ logout }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <Package size={20} />, label: 'Products', path: '/products' },
    { icon: <ShoppingCart size={20} />, label: 'Sales', path: '/sales' },
    { icon: <Box size={20} />, label: 'Purchases', path: '/purchases' },
    { icon: <Users size={20} />, label: 'Suppliers', path: '/suppliers' },
    { icon: <FileText size={20} />, label: 'Invoices', path: '/invoices' },
    { icon: <PieChart size={20} />, label: 'Reports', path: '/reports' },
  ];

  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">IM</div>
          <span>Inventory Manager</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button onClick={logout} className="nav-item logout-btn">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      <style>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          display: flex;
          flex-direction: column;
          z-index: 100;
          border-right: 1px solid var(--border);
        }

        .sidebar-header {
          padding: 2rem 1.5rem;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--text);
        }

        .logo-icon {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 0.8rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
        }

        .sidebar-nav {
          flex: 1;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          color: var(--text-muted);
          transition: var(--transition);
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text);
        }

        .nav-item.active {
          background: var(--primary);
          color: white;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .sidebar-footer {
          padding: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .logout-btn {
          width: 100%;
          background: transparent;
          border: none;
          color: var(--danger);
        }

        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;

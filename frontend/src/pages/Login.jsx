import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authApi.login({ email, password });
      onLogin(response.data.token, { email: response.data.email, role: response.data.role });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-wrapper glass"
      >
        <div className="auth-side-panel">
          <div className="side-content">
            <div className="auth-logo-large">IM</div>
            <h2>Inventory Manager Pro</h2>
            <p>Optimize your warehouse operations, track stock in real-time, and grow your business with our premium solution.</p>
            
            <div className="feature-list">
              <div className="feature-item">
                <div className="dot"></div>
                <span>Real-time Stock Tracking</span>
              </div>
              <div className="feature-item">
                <div className="dot"></div>
                <span>Sales & Revenue Analytics</span>
              </div>
              <div className="feature-item">
                <div className="dot"></div>
                <span>Automated Invoice Generation</span>
              </div>
            </div>
          </div>
          <div className="side-footer">
            <span>v1.0.4 • © 2026 Inventory Manager</span>
          </div>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Login to manage your inventory</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? <Loader2 className="spinner" size={20} /> : <><LogIn size={20} /> Login</>}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </motion.div>

      <style>{`
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(circle at top right, #1e293b, #0f172a);
          padding: 2rem;
        }

        .auth-wrapper {
          width: 100%;
          max-width: 900px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 32px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--card-shadow);
        }

        .auth-side-panel {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          padding: 3rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .auth-side-panel::before {
          content: '';
          position: absolute;
          top: -100px;
          right: -100px;
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          filter: blur(50px);
        }

        .auth-logo-large {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 2.5rem;
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .side-content h2 {
          font-size: 2.2rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }

        .side-content p {
          font-size: 1.1rem;
          opacity: 0.9;
          margin-bottom: 2.5rem;
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-weight: 500;
        }

        .dot {
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .side-footer {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .auth-card {
          background: var(--surface);
          padding: 3.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .auth-header {
          text-align: left;
          margin-bottom: 2.5rem;
        }

        .auth-header h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .auth-header p {
          color: var(--text-muted);
        }

        .auth-error {
          background: rgba(239, 68, 68, 0.1);
          color: var(--danger);
          padding: 0.75rem;
          border-radius: 10px;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
          border: 1px solid rgba(239, 68, 68, 0.2);
          text-align: center;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: var(--background);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 0 1.25rem;
          transition: var(--transition);
        }

        .input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .input-wrapper svg {
          color: var(--text-muted);
        }

        .input-wrapper input {
          background: transparent;
          border: none;
          outline: none;
          padding: 1rem 0.75rem;
          color: var(--text);
          width: 100%;
          font-size: 1rem;
        }

        .auth-submit {
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
          font-size: 1rem;
        }

        .auth-submit:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(99, 102, 241, 0.4);
        }

        .auth-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .auth-footer {
          margin-top: 2.5rem;
          text-align: center;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }

        @media (max-width: 850px) {
          .auth-wrapper {
            grid-template-columns: 1fr;
            max-width: 450px;
          }
          .auth-side-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;

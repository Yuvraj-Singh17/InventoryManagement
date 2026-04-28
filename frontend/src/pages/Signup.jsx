import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../api';

const Signup = ({ onLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await authApi.signup({ fullName, email, password });
      onLogin(response.data.token, { email: response.data.email, role: response.data.role });
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Email might already be registered.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="auth-card glass"
      >
        <div className="auth-header">
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

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <User size={18} />
              <input 
                type="text" 
                placeholder="John Doe" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="john@example.com" 
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
            {loading ? <Loader2 className="spinner" size={20} /> : <><UserPlus size={20} /> Sign Up</>}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </motion.div>

      <style>{`
        /* Reuse styles from Login.jsx */
        .auth-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: radial-gradient(circle at top right, #1e293b, #0f172a);
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          padding: 3rem;
          border-radius: 24px;
          border: 1px solid var(--border);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .auth-logo {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 auto 1.5rem;
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.4);
        }

        .auth-header h1 {
          font-size: 1.75rem;
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
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 0 1rem;
          transition: var(--transition);
        }

        .input-wrapper:focus-within {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .input-wrapper svg {
          color: var(--text-muted);
        }

        .input-wrapper input {
          background: transparent;
          border: none;
          outline: none;
          padding: 0.8rem 0.75rem;
          color: var(--text);
          width: 100%;
        }

        .auth-submit {
          background: var(--primary);
          color: white;
          padding: 0.8rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 1rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .auth-submit:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
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
          margin-top: 2rem;
          text-align: center;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .auth-footer a {
          color: var(--primary);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Signup;

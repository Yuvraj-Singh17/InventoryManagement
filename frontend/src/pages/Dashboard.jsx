import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardApi } from '../api';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalProducts: 0,
    totalStock: 0,
    revenue: 0,
    lowStock: [],
    chartData: [],
    recentActivity: []
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await dashboardApi.getSummary();
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to fetch summary", error);
      }
    };
    fetchSummary();
  }, []);

  const stats = [
    { label: 'Total Revenue', value: `$${summary.revenue?.toLocaleString() || '0'}`, icon: <DollarSign />, color: 'var(--primary)', trend: '+0%' },
    { label: 'Total Products', value: summary.totalProducts || '0', icon: <Package />, color: 'var(--secondary)', trend: '+0%' },
    { label: 'Total Stock', value: summary.totalStock || '0', icon: <ShoppingCart />, color: 'var(--success)', trend: '+0%' },
    { label: 'Low Stock', value: summary.lowStock?.length || '0', icon: <AlertTriangle />, color: 'var(--warning)', trend: '+0%' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your inventory and sales performance.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card glass"
          >
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className={`stat-trend ${stat.trend.startsWith('+') ? 'up' : 'down'}`}>
                {stat.trend.startsWith('+') ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="chart-card glass"
        >
          <div className="chart-header">
            <h2>Revenue Analytics</h2>
            <select>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={summary.chartData?.length > 0 ? summary.chartData : [{name: 'Empty', revenue: 0}]}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="recent-orders glass"
        >
          <div className="chart-header">
            <h2>Recent Activity</h2>
            <button className="text-btn">View All</button>
          </div>
          <div className="activity-list">
            {summary.recentActivity?.length > 0 ? (
              summary.recentActivity.map((activity, i) => (
                <div key={i} className="activity-item">
                  <div className="activity-avatar">
                    <ShoppingCart size={16} />
                  </div>
                  <div className="activity-details">
                    <p><strong>{activity.type}:</strong> {activity.message}</p>
                    <span>{new Date(activity.time).toLocaleString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="activity-item">
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No recent activity</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: var(--text-muted);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          padding: 1.5rem;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          border: 1px solid var(--border);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 0.85rem;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stat-trend.up { color: var(--success); }
        .stat-trend.down { color: var(--danger); }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }

        .chart-card, .recent-orders {
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--border);
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .chart-header h2 {
          font-size: 1.1rem;
        }

        .chart-header select {
          background: var(--surface);
          color: var(--text);
          border: 1px solid var(--border);
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          outline: none;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 1rem;
          align-items: center;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border);
        }

        .activity-item:last-child { border-bottom: none; }

        .activity-avatar {
          width: 36px;
          height: 36px;
          background: var(--surface-light);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .activity-details p {
          font-size: 0.85rem;
          margin-bottom: 0.15rem;
        }

        .activity-details span {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .text-btn {
          background: transparent;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
        }

        @media (max-width: 1024px) {
          .charts-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

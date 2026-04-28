import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, FileText, TrendingUp } from 'lucide-react';

const Reports = () => {
  const data = [
    { name: 'Jan', sales: 4000, purchases: 2400 },
    { name: 'Feb', sales: 3000, purchases: 1398 },
    { name: 'Mar', sales: 2000, purchases: 9800 },
    { name: 'Apr', sales: 2780, purchases: 3908 },
    { name: 'May', sales: 1890, purchases: 4800 },
    { name: 'Jun', sales: 2390, purchases: 3800 },
  ];

  const pieData = [
    { name: 'Electronics', value: 400 },
    { name: 'Furniture', value: 300 },
    { name: 'Groceries', value: 300 },
    { name: 'Clothing', value: 200 },
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Analytics & Reports</h1>
          <p>In-depth analysis of your business performance.</p>
        </div>
        <div className="action-btns">
          <button className="secondary-btn"><FileText size={18} /> Export PDF</button>
          <button className="primary-btn"><Download size={18} /> Download CSV</button>
        </div>
      </div>

      <div className="reports-grid">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="report-card glass">
          <h3>Sales vs Purchases</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <YAxis stroke="var(--text-muted)" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px' }}
                />
                <Bar dataKey="sales" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="purchases" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="report-card glass">
          <h3>Inventory by Category</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <style>{`
        .reports-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 1.5rem;
        }
        .report-card {
          padding: 1.5rem;
          border-radius: 24px;
          border: 1px solid var(--border);
        }
        .report-card h3 { margin-bottom: 1.5rem; font-size: 1.1rem; }
        .action-btns { display: flex; gap: 1rem; }
        @media (max-width: 1024px) {
          .reports-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Reports;

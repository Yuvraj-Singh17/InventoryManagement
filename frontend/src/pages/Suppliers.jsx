import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Mail, Phone, MapPin } from 'lucide-react';
import { supplierApi } from '../api';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setLoading(true);
    try {
      const response = await supplierApi.getAll();
      setSuppliers(response.data.content || []);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Suppliers Directory</h1>
          <p>Manage your product sources and contact info.</p>
        </div>
        <button className="primary-btn">
          <Plus size={20} /> Add Supplier
        </button>
      </div>

      <div className="suppliers-grid">
        {loading ? (
          <p>Loading suppliers...</p>
        ) : suppliers.length === 0 ? (
          <p>No suppliers found.</p>
        ) : (
          suppliers.map((supplier) => (
            <motion.div 
              key={supplier.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="supplier-card glass"
            >
              <div className="supplier-avatar">
                <Users size={24} />
              </div>
              <h3>{supplier.name}</h3>
              <div className="supplier-info">
                <div className="info-item"><Mail size={14} /> {supplier.email}</div>
                <div className="info-item"><Phone size={14} /> {supplier.phone}</div>
                <div className="info-item"><MapPin size={14} /> {supplier.address}</div>
              </div>
              <button className="secondary-btn full-width">View Products</button>
            </motion.div>
          ))
        )}
      </div>

      <style>{`
        .suppliers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .supplier-card {
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .supplier-avatar {
          width: 60px;
          height: 60px;
          background: var(--surface-light);
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          margin-bottom: 1rem;
        }
        .supplier-card h3 { margin-bottom: 1rem; font-size: 1.1rem; }
        .supplier-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }
        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .full-width { width: 100%; justify-content: center; }
      `}</style>
    </div>
  );
};

export default Suppliers;

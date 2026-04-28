import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Search, Calendar } from 'lucide-react';
import { saleApi } from '../api';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const response = await saleApi.getAll();
      setSales(response.data.content || []);
    } catch (error) {
      console.error("Failed to fetch sales", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Sales Transactions</h1>
          <p>Track all product sales and revenue.</p>
        </div>
        <button className="primary-btn">
          <Plus size={20} /> Record New Sale
        </button>
      </div>

      <div className="table-container glass">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Sold By</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>Loading sales...</td></tr>
            ) : sales.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem' }}>No sales records found.</td></tr>
            ) : (
              sales.map((sale) => (
                <tr key={sale.id}>
                  <td><div className="cell-with-icon"><Calendar size={16} /> {new Date(sale.soldAt).toLocaleDateString()}</div></td>
                  <td><strong>{sale.product?.name}</strong></td>
                  <td>{sale.quantity} units</td>
                  <td><span className="price-tag">${sale.totalAmount}</span></td>
                  <td>{sale.soldBy?.fullName || 'System'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style>{`
        .cell-with-icon { display: flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
        .price-tag { color: var(--success); font-weight: 700; }
      `}</style>
    </div>
  );
};

export default Sales;

import React from 'react';
import { Package, Plus } from 'lucide-react';


// for tracking the purchase
const Purchases = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Purchase Orders</h1>
          <p>Manage incoming stock and supplier orders.</p>
        </div>
        <button className="primary-btn">
          <Plus size={20} /> Create Purchase Order
        </button>
      </div>
      <div className="table-container glass" style={{ textAlign: 'center', padding: '5rem' }}>
        <Package size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p>No purchase orders yet.</p>
      </div>
    </div>
  );
};

export default Purchases;

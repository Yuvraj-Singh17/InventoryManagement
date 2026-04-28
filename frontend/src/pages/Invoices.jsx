import React from 'react';
import { FileText, Plus } from 'lucide-react';

const Invoices = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Invoices</h1>
          <p>Generate and manage customer invoices.</p>
        </div>
        <button className="primary-btn">
          <Plus size={20} /> Create New Invoice
        </button>
      </div>
      <div className="table-container glass" style={{ textAlign: 'center', padding: '5rem' }}>
        <FileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
        <p>No invoices generated yet.</p>
      </div>
    </div>
  );
};

export default Invoices;

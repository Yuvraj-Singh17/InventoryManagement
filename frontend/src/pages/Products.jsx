import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Package, Tag, Layers, Home } from 'lucide-react';
import { productApi } from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '', sku: '', categoryName: '', supplierName: '', costPrice: '', salePrice: '', quantity: '', description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productApi.getAll();
      setProducts(response.data.content || []);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.length > 2) {
      const response = await productApi.search(e.target.value);
      setProducts(response.data.content || []);
    } else if (e.target.value === '') {
      fetchProducts();
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      await productApi.create(newProduct);
      setShowAddModal(false);
      setNewProduct({ name: '', sku: '', categoryName: '', supplierName: '', costPrice: '', salePrice: '', quantity: '', description: '' });
      fetchProducts();
    } catch (error) {
      alert("Failed to create product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productApi.delete(id);
        fetchProducts();
      } catch (error) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Product Inventory</h1>
          <p>Manage and track your items across categories.</p>
        </div>
        <button className="primary-btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="filters-bar glass">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name or SKU..." 
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="filter-actions">
          <button className="secondary-btn"><Filter size={18} /> Filters</button>
        </div>
      </div>

      <div className="table-container glass">
        <table>
          <thead>
            <tr>
              <th>Product Details</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>Loading products...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '3rem' }}>No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info-cell">
                      <div className="product-thumb">
                        <Package size={20} />
                      </div>
                      <div>
                        <div className="product-name">{product.name}</div>
                        <div className="product-desc">{product.description || 'No description'}</div>
                      </div>
                    </div>
                  </td>
                  <td><code className="sku-tag">{product.sku}</code></td>
                  <td><span className="category-badge">{product.category?.name || 'Uncategorized'}</span></td>
                  <td>
                    <div className={`stock-level ${product.quantity < 10 ? 'low' : ''}`}>
                      {product.quantity} units
                    </div>
                  </td>
                  <td>
                    <div className="price-info">
                      <div className="sale-price">${product.salePrice}</div>
                      <div className="cost-price">Cost: ${product.costPrice}</div>
                    </div>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="icon-btn-small" title="Edit"><Edit2 size={16} /></button>
                      <button className="icon-btn-small delete" title="Delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="modal-content glass"
            >
              <div className="modal-header">
                <h2>Add New Product</h2>
                <button className="close-btn" onClick={() => setShowAddModal(false)}>&times;</button>
              </div>
              <form onSubmit={handleCreateProduct} className="product-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" placeholder="e.g. MacBook Pro M2" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>SKU</label>
                    <input type="text" placeholder="e.g. LAP-MAC-001" required value={newProduct.sku} onChange={e => setNewProduct({...newProduct, sku: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input type="text" placeholder="e.g. Electronics" value={newProduct.categoryName} onChange={e => setNewProduct({...newProduct, categoryName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Supplier</label>
                    <input type="text" placeholder="e.g. Apple Inc" value={newProduct.supplierName} onChange={e => setNewProduct({...newProduct, supplierName: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Cost Price ($)</label>
                    <input type="number" step="0.01" required value={newProduct.costPrice} onChange={e => setNewProduct({...newProduct, costPrice: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Sale Price ($)</label>
                    <input type="number" step="0.01" required value={newProduct.salePrice} onChange={e => setNewProduct({...newProduct, salePrice: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label>Initial Quantity</label>
                    <input type="number" required value={newProduct.quantity} onChange={e => setNewProduct({...newProduct, quantity: e.target.value})} />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea rows="3" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="secondary-btn" onClick={() => setShowAddModal(false)}>Cancel</button>
                  <button type="submit" className="primary-btn">Create Product</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
        .page-header p { color: var(--text-muted); }

        .primary-btn {
          background: var(--primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
        }

        .primary-btn:hover { background: var(--primary-hover); transform: translateY(-2px); }

        .filters-bar {
          padding: 1rem;
          border-radius: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          border: 1px solid var(--border);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: var(--surface);
          padding: 0.5rem 1rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          width: 350px;
        }

        .search-box input {
          background: transparent;
          border: none;
          outline: none;
          color: var(--text);
          width: 100%;
        }

        .search-box svg { color: var(--text-muted); }

        .secondary-btn {
          background: var(--surface);
          color: var(--text);
          padding: 0.6rem 1.25rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
        }

        .table-container {
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        thead {
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid var(--border);
        }

        th {
          padding: 1.25rem 1.5rem;
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        td {
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        tr:last-child td { border-bottom: none; }
        tr:hover { background: rgba(255, 255, 255, 0.01); }

        .product-info-cell {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .product-thumb {
          width: 44px;
          height: 44px;
          background: var(--surface-light);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
        }

        .product-name { font-weight: 600; margin-bottom: 0.15rem; }
        .product-desc { font-size: 0.75rem; color: var(--text-muted); }

        .sku-tag {
          background: var(--surface);
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          font-size: 0.8rem;
          color: var(--secondary);
          font-family: monospace;
          border: 1px solid var(--border);
        }

        .category-badge {
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
          padding: 0.35rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .stock-level { font-weight: 600; }
        .stock-level.low { color: var(--danger); }

        .price-info { display: flex; flex-direction: column; }
        .sale-price { font-weight: 700; color: var(--success); }
        .cost-price { font-size: 0.75rem; color: var(--text-muted); }

        .action-btns { display: flex; gap: 0.5rem; }
        .icon-btn-small {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: var(--surface);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
        }

        .icon-btn-small:hover { color: var(--primary); border-color: var(--primary); }
        .icon-btn-small.delete:hover { color: var(--danger); border-color: var(--danger); }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 2rem;
        }

        .modal-content {
          width: 100%;
          max-width: 650px;
          border-radius: 24px;
          padding: 2rem;
          border: 1px solid var(--border);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .close-btn { background: transparent; font-size: 2rem; color: var(--text-muted); }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        .form-group.full-width { grid-column: span 2; }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input, .form-group textarea {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: var(--text);
          outline: none;
        }

        .form-group input:focus { border-color: var(--primary); }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Products;

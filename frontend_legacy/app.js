const API_BASE = '';
const messageEl = document.getElementById('message');
const authSection = document.getElementById('auth-section');
const appSection = document.getElementById('app-section');
const userLabel = document.getElementById('user-label');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout-btn');
const loadDashboardBtn = document.getElementById('load-dashboard');
const loadProductsBtn = document.getElementById('load-products');
const loadLowStockBtn = document.getElementById('load-low-stock');
const productsList = document.getElementById('products-list');
const productForm = document.getElementById('product-form');

function showMessage(text, type = 'info') {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');
  window.setTimeout(() => messageEl.classList.add('hidden'), 5000);
}

function getToken() {
  return localStorage.getItem('inventoryToken');
}

function setToken(token) {
  localStorage.setItem('inventoryToken', token);
}

function removeToken() {
  localStorage.removeItem('inventoryToken');
}

function apiFetch(path, options = {}) {
  const headers = options.headers || {};
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(`${API_BASE}${path}`, { ...options, headers })
    .then(async (response) => {
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Session expired or unauthorized. Please sign in again.');
        }
        const body = await response.text();
        throw new Error(body || response.statusText);
      }
      return response.json().catch(() => null);
    });
}

function setAuthenticated(userEmail) {
  authSection.classList.add('hidden');
  appSection.classList.remove('hidden');
  userLabel.textContent = userEmail;
}

function logout() {
  removeToken();
  authSection.classList.remove('hidden');
  appSection.classList.add('hidden');
  userLabel.textContent = '';
  showMessage('Logged out successfully.', 'success');
}

async function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  try {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    setAuthenticated(data.email);
    showMessage('Login successful.', 'success');
    loadDashboard();
    loadProducts();
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const fullName = document.getElementById('signup-fullName').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value.trim();
  try {
    const data = await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName })
    });
    setToken(data.token);
    setAuthenticated(data.email);
    showMessage('Signup successful. You are signed in.', 'success');
    loadDashboard();
    loadProducts();
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

async function loadDashboard() {
  try {
    const data = await apiFetch('/api/dashboard/summary');
    document.getElementById('total-products').textContent = data.totalProducts ?? 0;
    document.getElementById('total-stock').textContent = data.totalStock ?? 0;
    document.getElementById('revenue').textContent = data.revenue ?? 0;
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

function renderProducts(products) {
  if (!products || products.length === 0) {
    productsList.innerHTML = '<p>No products found.</p>';
    return;
  }
  const rows = products.map((product) => `
    <tr>
      <td>${product.id ?? ''}</td>
      <td>${product.name ?? ''}</td>
      <td>${product.sku ?? ''}</td>
      <td>${product.quantity ?? 0}</td>
      <td>${product.salePrice ?? 0}</td>
      <td>${product.category?.name ?? ''}</td>
      <td>${product.supplier?.name ?? ''}</td>
    </tr>
  `).join('');
  productsList.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>SKU</th>
          <th>Quantity</th>
          <th>Sale Price</th>
          <th>Category</th>
          <th>Supplier</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

async function loadProducts() {
  try {
    const data = await apiFetch('/api/products');
    renderProducts(data.content || []);
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

async function loadLowStock() {
  try {
    const data = await apiFetch('/api/products/low-stock?threshold=10');
    renderProducts(data.content || []);
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

async function handleCreateProduct(event) {
  event.preventDefault();
  const product = {
    name: document.getElementById('product-name').value.trim(),
    sku: document.getElementById('product-sku').value.trim(),
    categoryName: document.getElementById('product-category').value.trim(),
    supplierName: document.getElementById('product-supplier').value.trim(),
    costPrice: Number(document.getElementById('product-cost').value),
    salePrice: Number(document.getElementById('product-sale').value),
    quantity: Number(document.getElementById('product-quantity').value),
    description: document.getElementById('product-description').value.trim()
  };
  try {
    await apiFetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(product)
    });
    showMessage('Product created successfully.', 'success');
    productForm.reset();
    loadProducts();
  } catch (error) {
    showMessage(error.message, 'error');
  }
}

function initialize() {
  const token = getToken();
  if (token) {
    setAuthenticated('current user');
    loadDashboard();
    loadProducts();
  }
  loginForm.addEventListener('submit', handleLogin);
  signupForm.addEventListener('submit', handleSignup);
  logoutBtn.addEventListener('click', logout);
  loadDashboardBtn.addEventListener('click', loadDashboard);
  loadProductsBtn.addEventListener('click', loadProducts);
  loadLowStockBtn.addEventListener('click', loadLowStock);
  productForm.addEventListener('submit', handleCreateProduct);
}

window.addEventListener('DOMContentLoaded', initialize);

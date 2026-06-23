'use client';

import { useState, useEffect } from 'react';
import { Product, Size, ProductColor } from '@/types';
import styles from './admin.module.css';
import { 
  Plus, Search, Edit2, Trash2, X, PlusCircle, 
  MinusCircle, Check, AlertCircle, ShoppingBag, 
  Layers, Star, RefreshCw, Eye, EyeOff, LogOut 
} from 'lucide-react';

const emptyProduct: Product = {
  id: '',
  slug: '',
  name: '',
  price: 0,
  originalPrice: undefined,
  description: '',
  details: [],
  materials: '',
  care: [],
  category: 'men',
  subcategory: '',
  images: [],
  sizes: [
    { label: 'XS', available: true, stock: 10 },
    { label: 'S', available: true, stock: 10 },
    { label: 'M', available: true, stock: 10 },
    { label: 'L', available: true, stock: 10 },
    { label: 'XL', available: true, stock: 10 }
  ],
  colors: [
    { name: 'Black', hex: '#1A1A1A' }
  ],
  badge: undefined,
  rating: 5.0,
  reviews: 0,
  inStock: true
};

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];

const PRESET_COLORS = [
  { name: 'Black', hex: '#1A1A1A' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Charcoal', hex: '#36454F' },
  { name: 'Navy', hex: '#1B2A4A' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Sage', hex: '#B2AC88' },
  { name: 'ruby', hex: '#9B111E' },
  { name: 'Emerald', hex: '#50C878' },
  { name: 'Chocolate', hex: '#7B3F00' }
];

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Auth State
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>(emptyProduct);
  const [isEditing, setIsEditing] = useState(false);

  // Form helpers for array elements
  const [newDetail, setNewDetail] = useState('');
  const [newCare, setNewCare] = useState('');
  const [newImage, setNewImage] = useState('');
  
  // Color helper state
  const [customColorName, setCustomColorName] = useState('');
  const [customColorHex, setCustomColorHex] = useState('#ffffff');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    setCheckingAuth(true);
    try {
      // sessionStorage is always wiped when browser closes — this is the gate.
      const sessionFlag = sessionStorage.getItem('admin_auth');
      if (!sessionFlag) {
        // Not in this browser session — force login regardless of cookie.
        setAuthenticated(false);
        setCheckingAuth(false);
        return;
      }
      // sessionStorage is present, now verify the cookie is still valid.
      const res = await fetch('/api/admin/status');
      const data = await res.json();
      if (data.authenticated) {
        setAuthenticated(true);
        fetchProducts();
      } else {
        sessionStorage.removeItem('admin_auth');
        setAuthenticated(false);
      }
    } catch (err) {
      sessionStorage.removeItem('admin_auth');
      setAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Set sessionStorage flag — cleared automatically when browser closes.
        sessionStorage.setItem('admin_auth', '1');
        setAuthenticated(true);
        setLoginPassword('');
        fetchProducts();
      } else {
        setLoginError(data.error || 'Incorrect password.');
      }
    } catch (err) {
      setLoginError('Failed to connect to authentication service.');
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/admin/logout', { method: 'POST' });
      if (res.ok) {
        sessionStorage.removeItem('admin_auth');
        setAuthenticated(false);
        setProducts([]);
      }
    } catch (err) {
      alert('Error during logout.');
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const saveProductsList = async (updatedList: Product[]) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedList)
      });
      if (!res.ok) throw new Error('Failed to save products');
      setProducts(updatedList);
      setIsModalOpen(false);
      return true;
    } catch (err: any) {
      alert(err.message || 'Error saving changes');
      return false;
    }
  };

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setCurrentProduct({
      ...emptyProduct,
      id: (Math.max(...products.map(p => parseInt(p.id) || 0)) + 1).toString()
    });
    setNewDetail('');
    setNewCare('');
    setNewImage('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setIsEditing(true);
    setCurrentProduct(JSON.parse(JSON.stringify(product))); // Deep clone
    setNewDetail('');
    setNewCare('');
    setNewImage('');
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const updatedList = products.filter(p => p.id !== id);
    await saveProductsList(updatedList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Auto-generate slug from name if not provided
    let finalProduct = { ...currentProduct };
    if (!finalProduct.slug) {
      finalProduct.slug = finalProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    if (!finalProduct.name || finalProduct.price <= 0) {
      alert('Please fill out all required fields.');
      return;
    }

    // Default image if none provided
    if (finalProduct.images.length === 0) {
      finalProduct.images = ['https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop'];
    }

    let updatedList = [...products];
    if (isEditing) {
      updatedList = updatedList.map(p => p.id === finalProduct.id ? finalProduct : p);
    } else {
      // Check for duplicate slug/id
      if (products.some(p => p.id === finalProduct.id)) {
        alert('Product ID already exists. Generating new ID.');
        finalProduct.id = (Math.max(...products.map(p => parseInt(p.id) || 0)) + 1).toString();
      }
      updatedList.push(finalProduct);
    }

    await saveProductsList(updatedList);
  };

  // Add Item to array builders
  const addDetail = () => {
    if (newDetail.trim()) {
      setCurrentProduct({
        ...currentProduct,
        details: [...currentProduct.details, newDetail.trim()]
      });
      setNewDetail('');
    }
  };

  const removeDetail = (index: number) => {
    setCurrentProduct({
      ...currentProduct,
      details: currentProduct.details.filter((_, i) => i !== index)
    });
  };

  const addCare = () => {
    if (newCare.trim()) {
      setCurrentProduct({
        ...currentProduct,
        care: [...currentProduct.care, newCare.trim()]
      });
      setNewCare('');
    }
  };

  const removeCare = (index: number) => {
    setCurrentProduct({
      ...currentProduct,
      care: currentProduct.care.filter((_, i) => i !== index)
    });
  };

  const addImage = () => {
    if (newImage.trim()) {
      setCurrentProduct({
        ...currentProduct,
        images: [...currentProduct.images, newImage.trim()]
      });
      setNewImage('');
    }
  };

  const removeImage = (index: number) => {
    setCurrentProduct({
      ...currentProduct,
      images: currentProduct.images.filter((_, i) => i !== index)
    });
  };

  // Sizes handlers
  const handleToggleSize = (sizeLabel: string) => {
    const sizeIndex = currentProduct.sizes.findIndex(s => s.label === sizeLabel);
    let updatedSizes = [...currentProduct.sizes];
    
    if (sizeIndex > -1) {
      updatedSizes[sizeIndex].available = !updatedSizes[sizeIndex].available;
    } else {
      updatedSizes.push({ label: sizeLabel, available: true, stock: 10 });
    }
    
    setCurrentProduct({
      ...currentProduct,
      sizes: updatedSizes
    });
  };

  const handleSizeStockChange = (sizeLabel: string, stockAmount: number) => {
    const sizeIndex = currentProduct.sizes.findIndex(s => s.label === sizeLabel);
    let updatedSizes = [...currentProduct.sizes];
    
    if (sizeIndex > -1) {
      updatedSizes[sizeIndex].stock = stockAmount;
    } else {
      updatedSizes.push({ label: sizeLabel, available: true, stock: stockAmount });
    }
    
    setCurrentProduct({
      ...currentProduct,
      sizes: updatedSizes
    });
  };

  // Colors handlers
  const handleAddColor = (color: ProductColor) => {
    if (currentProduct.colors.some(c => c.name.toLowerCase() === color.name.toLowerCase())) return;
    setCurrentProduct({
      ...currentProduct,
      colors: [...currentProduct.colors, color]
    });
  };

  const handleRemoveColor = (name: string) => {
    setCurrentProduct({
      ...currentProduct,
      colors: currentProduct.colors.filter(c => c.name !== name)
    });
  };

  // Filtering
  const filteredProducts = products.filter(product => {
    const q = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.subcategory.toLowerCase().includes(q) ||
      product.id.includes(q)
    );
  });

  // Stats calculation
  const totalProducts = products.length;
  const menCount = products.filter(p => p.category === 'men').length;
  const womenCount = products.filter(p => p.category === 'women').length;
  const accessoriesCount = products.filter(p => p.category === 'accessories').length;

  if (checkingAuth) {
    return (
      <div className={styles.loginWrapper}>
        <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Verifying administrator session...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginCard}>
          <div className={styles.loginTitleArea}>
            <h2>Admin Login</h2>
            <p>Enter your password to access the control panel</p>
          </div>
          
          {loginError && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '14px', background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Password</label>
              <div className={styles.passwordInputWrapper}>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setLoginError(null); }}
                  className={styles.formInput}
                  style={{ width: '100%', paddingRight: '40px' }}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggleBtn}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.loginBtn}>
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Admin Control Panel</h1>
          <p>Manage and update product catalog details</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={fetchProducts} className={styles.actionBtn} style={{ padding: '10px 14px' }} title="Reload data">
            <RefreshCw size={16} />
          </button>
          <button onClick={handleOpenAddModal} className={styles.addButton}>
            <Plus size={16} /> Add Product
          </button>
          <button onClick={handleLogout} className={`${styles.actionBtn} ${styles.deleteBtn}`} style={{ padding: '10px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }} title="Log out">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Products</div>
          <div className={styles.statValue}>{totalProducts}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Men's Collection</div>
          <div className={styles.statValue}>{menCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Women's Collection</div>
          <div className={styles.statValue}>{womenCount}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Accessories</div>
          <div className={styles.statValue}>{accessoriesCount}</div>
        </div>
      </section>

      {/* Error and Loading */}
      {error && (
        <div className="alert alert-error" style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Product List Table Section */}
      <div className={styles.tableSection}>
        <div className={styles.searchBar}>
          <Search size={18} color="var(--color-muted)" />
          <input 
            type="text" 
            placeholder="Search products by ID, name, category..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.tableWrapper}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-muted)' }}>
              Loading product catalog...
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--color-muted)' }}>
              No products found.
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price (LKR)</th>
                  <th>Badge</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map(product => {
                  const firstColor = product.colors?.[0]?.hex || '#333333';
                  const initials = product.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                  
                  return (
                    <tr key={product.id}>
                      <td>
                        <div className={styles.productRowInfo}>
                          <div 
                            className={styles.productImagePlaceholder}
                            style={{ backgroundColor: firstColor }}
                          >
                            {initials}
                          </div>
                          <div>
                            <div className={styles.productName}>{product.name}</div>
                            <div className={styles.productSub}>ID: {product.id} • Slug: {product.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ textTransform: 'capitalize' }}>{product.category}</div>
                        <div className={styles.productSub}>{product.subcategory}</div>
                      </td>
                      <td>
                        <span className={styles.price}>{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()}</span>
                        )}
                      </td>
                      <td>
                        {product.badge ? (
                          <span className={`${styles.badge} ${
                            product.badge === 'new' ? styles.badgeNew :
                            product.badge === 'sale' ? styles.badgeSale :
                            styles.badgeBestseller
                          }`}>
                            {product.badge}
                          </span>
                        ) : (
                          <span style={{ color: 'var(--color-muted)', fontSize: '12px' }}>—</span>
                        )}
                      </td>
                      <td>
                        <div className={styles.stockStatus}>
                          <span className={`${styles.statusDot} ${product.inStock ? styles.inStockDot : styles.outOfStockDot}`} />
                          <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                        </div>
                        {product.sizes && product.sizes.filter(s => s.available).length > 0 && (
                          <div className={styles.productSub} style={{ marginTop: '4px', maxWidth: '180px' }}>
                            {product.sizes
                              .filter(s => s.available)
                              .map(s => `${s.label}: ${s.stock !== undefined ? s.stock : '—'}`)
                              .join(' • ')}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button 
                            onClick={() => handleOpenEditModal(product)} 
                            className={styles.actionBtn}
                            title="Edit Product"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => handleDelete(product.id)} 
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2>{isEditing ? 'Edit Product Details' : 'Add New Product'}</h2>
              <button onClick={() => setIsModalOpen(false)} className={styles.closeModalBtn}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Product Name *</label>
                <input 
                  type="text" 
                  required
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  placeholder="e.g. Silk Evening Dress"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Slug (Auto-generated if blank)</label>
                <input 
                  type="text" 
                  value={currentProduct.slug}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })}
                  placeholder="e.g. silk-evening-dress"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Price (LKR) *</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={currentProduct.price || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseInt(e.target.value) || 0 })}
                  placeholder="e.g. 132300"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Original Price (LKR) (Optional)</label>
                <input 
                  type="number" 
                  min="0"
                  value={currentProduct.originalPrice || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: parseInt(e.target.value) || undefined })}
                  placeholder="e.g. 150000"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Category *</label>
                <select 
                  value={currentProduct.category}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value as any })}
                  className={styles.formSelect}
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Subcategory *</label>
                <input 
                  type="text" 
                  required
                  value={currentProduct.subcategory}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, subcategory: e.target.value })}
                  placeholder="e.g. Dresses, Outerwear"
                  className={styles.formInput}
                />
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Description *</label>
                <textarea 
                  required
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  placeholder="A detailed description of the product..."
                  className={styles.formTextarea}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Materials *</label>
                <input 
                  type="text" 
                  required
                  value={currentProduct.materials}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, materials: e.target.value })}
                  placeholder="e.g. 100% Mulberry Silk"
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Badge</label>
                <select 
                  value={currentProduct.badge || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, badge: (e.target.value || undefined) as any })}
                  className={styles.formSelect}
                >
                  <option value="">None</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="bestseller">Bestseller</option>
                </select>
              </div>

              {/* Sizes Selection */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Sizes & Stock Available</label>
                <div className={styles.sizeGrid}>
                  {AVAILABLE_SIZES.map(sz => {
                    const matchedSize = currentProduct.sizes.find(s => s.label === sz);
                    const isActive = matchedSize ? matchedSize.available : false;
                    const stockVal = matchedSize ? (matchedSize.stock !== undefined ? matchedSize.stock : 0) : 0;
                    
                    return (
                      <div
                        key={sz}
                        className={`${styles.sizeOption} ${isActive ? styles.sizeOptionActive : ''}`}
                      >
                        <div className={styles.sizeHeaderRow}>
                          <span style={{ fontWeight: '600' }}>{sz}</span>
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => handleToggleSize(sz)}
                            className={styles.sizeCheckbox}
                          />
                        </div>
                        {isActive && (
                          <input
                            type="number"
                            min="0"
                            placeholder="Stock"
                            value={stockVal}
                            onChange={(e) => handleSizeStockChange(sz, parseInt(e.target.value) || 0)}
                            className={styles.sizeInput}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Colors Selection */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Colors Selected</label>
                <div className={styles.colorGrid}>
                  {currentProduct.colors.map(col => (
                    <div key={col.name} className={styles.colorOption}>
                      <span 
                        style={{ 
                          width: '18px', 
                          height: '18px', 
                          borderRadius: '50%', 
                          backgroundColor: col.hex,
                          border: '1px solid rgba(255,255,255,0.2)'
                        }} 
                      />
                      <span>{col.name}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveColor(col.name)}
                        className={styles.removeListItemBtn}
                        style={{ fontSize: '10px', marginTop: '4px' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Preset colors selection */}
                <div style={{ marginTop: '10px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--color-muted)', marginBottom: '6px' }}>Quick Add Color:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {PRESET_COLORS.map(c => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => handleAddColor(c)}
                        style={{ 
                          display: 'inline-flex',
                          alignItems: 'center', 
                          gap: '4px',
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          color: '#fff',
                          fontSize: '11px',
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: c.hex }} />
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Form */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <input 
                    type="text" 
                    placeholder="Custom color name" 
                    value={customColorName}
                    onChange={(e) => setCustomColorName(e.target.value)}
                    className={styles.formInput}
                    style={{ flex: 1, padding: '6px 10px' }}
                  />
                  <input 
                    type="color" 
                    value={customColorHex}
                    onChange={(e) => setCustomColorHex(e.target.value)}
                    style={{ width: '40px', height: '36px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (customColorName.trim()) {
                        handleAddColor({ name: customColorName.trim(), hex: customColorHex });
                        setCustomColorName('');
                      }
                    }}
                    className={styles.actionBtn}
                    style={{ padding: '6px 12px' }}
                  >
                    Add Custom
                  </button>
                </div>
              </div>

              {/* Product Details List Builder */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Key Details (Bullet Points) *</label>
                <div className={styles.listBuilder}>
                  {currentProduct.details.map((detail, index) => (
                    <div key={index} className={styles.listBuilderItem}>
                      <span>{detail}</span>
                      <button 
                        type="button" 
                        onClick={() => removeDetail(index)} 
                        className={styles.removeListItemBtn}
                      >
                        <MinusCircle size={16} />
                      </button>
                    </div>
                  ))}
                  <div className={styles.addListItemRow}>
                    <input 
                      type="text" 
                      placeholder="Add bullet point..."
                      value={newDetail}
                      onChange={(e) => setNewDetail(e.target.value)}
                      className={styles.formInput}
                      style={{ flex: 1 }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addDetail(); } }}
                    />
                    <button type="button" onClick={addDetail} className={styles.actionBtn}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Care Details List Builder */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Care Instructions *</label>
                <div className={styles.listBuilder}>
                  {currentProduct.care.map((careItem, index) => (
                    <div key={index} className={styles.listBuilderItem}>
                      <span>{careItem}</span>
                      <button 
                        type="button" 
                        onClick={() => removeCare(index)} 
                        className={styles.removeListItemBtn}
                      >
                        <MinusCircle size={16} />
                      </button>
                    </div>
                  ))}
                  <div className={styles.addListItemRow}>
                    <input 
                      type="text" 
                      placeholder="Add care instructions..."
                      value={newCare}
                      onChange={(e) => setNewCare(e.target.value)}
                      className={styles.formInput}
                      style={{ flex: 1 }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addCare(); } }}
                    />
                    <button type="button" onClick={addCare} className={styles.actionBtn}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Images URL list */}
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label className={styles.formLabel}>Image URLs (Optional - uses placeholders if empty)</label>
                <div className={styles.listBuilder}>
                  {currentProduct.images.map((img, index) => (
                    <div key={index} className={styles.listBuilderItem} style={{ gap: '8px' }}>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>{img}</span>
                      <button 
                        type="button" 
                        onClick={() => removeImage(index)} 
                        className={styles.removeListItemBtn}
                      >
                        <MinusCircle size={16} />
                      </button>
                    </div>
                  ))}
                  <div className={styles.addListItemRow}>
                    <input 
                      type="url" 
                      placeholder="Add Image URL (https://...)"
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className={styles.formInput}
                      style={{ flex: 1 }}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addImage(); } }}
                    />
                    <button type="button" onClick={addImage} className={styles.actionBtn}>
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.formCheckGroup}>
                <input 
                  type="checkbox" 
                  id="inStockCheck"
                  checked={currentProduct.inStock}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })}
                  className={styles.formCheckInput}
                />
                <label htmlFor="inStockCheck" className={styles.formCheckLabel}>
                  Product is currently in stock
                </label>
              </div>

              <div className={styles.formFooter}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" className={styles.saveBtn}>
                  {isEditing ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

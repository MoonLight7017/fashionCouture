// Products Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize products data
    loadProducts();
    
    // Initialize event listeners
    initializeProductsEventListeners();
    
    console.log('Products Management loaded successfully!');
});

// Sample products data
const productsData = [
    {
        id: 1,
        name: 'Royal Bridal Lehenga',
        category: 'bridal',
        price: 25000,
        stock: 15,
        minStock: 5,
        description: 'Exquisite bridal lehenga with intricate embroidery and premium fabric.',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Red', 'Gold', 'Pink'],
        image: 'bridal',
        status: 'active',
        sku: 'BR001',
        createdAt: '2024-01-15'
    },
    {
        id: 2,
        name: 'Glamorous Party Gown',
        category: 'party',
        price: 12000,
        stock: 8,
        minStock: 3,
        description: 'Stunning party gown perfect for special occasions and celebrations.',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Blue', 'Red'],
        image: 'party',
        status: 'active',
        sku: 'PW001',
        createdAt: '2024-01-20'
    },
    {
        id: 3,
        name: 'Traditional Anarkali',
        category: 'ethnic',
        price: 8500,
        stock: 12,
        minStock: 4,
        description: 'Beautiful traditional anarkali suit with modern design elements.',
        sizes: ['M', 'L', 'XL', 'XXL'],
        colors: ['Green', 'Purple', 'Orange'],
        image: 'ethnic',
        status: 'active',
        sku: 'EW001',
        createdAt: '2024-02-01'
    },
    {
        id: 4,
        name: 'Stylish Casual Dress',
        category: 'casual',
        price: 3200,
        stock: 25,
        minStock: 8,
        description: 'Comfortable and stylish casual dress for everyday wear.',
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['White', 'Pink', 'Yellow'],
        image: 'casual',
        status: 'active',
        sku: 'CW001',
        createdAt: '2024-02-10'
    },
    {
        id: 5,
        name: 'Elegant Evening Dress',
        category: 'western',
        price: 7500,
        stock: 0,
        minStock: 2,
        description: 'Sophisticated evening dress for formal events and parties.',
        sizes: ['S', 'M', 'L'],
        colors: ['Navy', 'Burgundy'],
        image: 'western',
        status: 'out-of-stock',
        sku: 'WW001',
        createdAt: '2024-02-15'
    },
    {
        id: 6,
        name: 'Designer Saree',
        category: 'ethnic',
        price: 9800,
        stock: 3,
        minStock: 5,
        description: 'Handcrafted designer saree with traditional motifs and premium silk.',
        sizes: ['Free Size'],
        colors: ['Maroon', 'Teal', 'Gold'],
        image: 'ethnic',
        status: 'active',
        sku: 'EW002',
        createdAt: '2024-02-20'
    }
];

let filteredProducts = [...productsData];

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        productsGrid.appendChild(card);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    const stockStatus = getStockStatus(product.stock, product.minStock);
    
    card.innerHTML = `
        <div class="product-image">
            <div class="image-placeholder ${product.image}">
                <i class="fas fa-tshirt"></i>
            </div>
            <div class="product-overlay">
                <button class="overlay-btn view" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="overlay-btn edit" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="overlay-btn delete" onclick="deleteProduct(${product.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="product-status ${product.status}">
                ${product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </div>
        </div>
        <div class="product-info">
            <h3>${product.name}</h3>
            <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
            <p class="product-sku">SKU: ${product.sku}</p>
            <div class="product-price">₹${product.price.toLocaleString()}</div>
            <div class="product-stock ${stockStatus.class}">
                <i class="fas ${stockStatus.icon}"></i>
                <span>${product.stock} in stock</span>
            </div>
            <div class="product-actions">
                <button class="btn-secondary" onclick="adjustStock(${product.id})">
                    <i class="fas fa-boxes"></i>
                    Stock
                </button>
                <button class="btn-primary" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i>
                    View
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Get stock status
function getStockStatus(stock, minStock) {
    if (stock === 0) {
        return { class: 'out-of-stock', icon: 'fa-times-circle' };
    } else if (stock <= minStock) {
        return { class: 'low-stock', icon: 'fa-exclamation-triangle' };
    } else {
        return { class: 'in-stock', icon: 'fa-check-circle' };
    }
}

// Initialize event listeners
function initializeProductsEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('productSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProducts();
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // Add product form
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewProduct();
        });
    }
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;
    
    filteredProducts = productsData.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.sku.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || product.category === categoryFilter;
        const matchesStatus = !statusFilter || product.status === statusFilter;
        
        return matchesSearch && matchesCategory && matchesStatus;
    });
    
    loadProducts();
}

// View product details
function viewProduct(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productDetailsModal');
    const content = document.getElementById('productDetailsContent');
    
    content.innerHTML = `
        <div class="product-details-view">
            <div class="product-header">
                <div class="product-image-large">
                    <div class="image-placeholder ${product.image}">
                        <i class="fas fa-tshirt"></i>
                    </div>
                </div>
                <div class="product-info-large">
                    <h2>${product.name}</h2>
                    <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                    <div class="product-price-large">₹${product.price.toLocaleString()}</div>
                    <div class="product-status-large">
                        <span class="status-badge ${product.status}">${product.status}</span>
                        <span class="sku-badge">SKU: ${product.sku}</span>
                    </div>
                </div>
            </div>
            
            <div class="product-details-grid">
                <div class="detail-section">
                    <h3>Product Information</h3>
                    <div class="detail-item">
                        <label>Description</label>
                        <p>${product.description}</p>
                    </div>
                    <div class="detail-item">
                        <label>Created Date</label>
                        <p>${formatDate(product.createdAt)}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Inventory</h3>
                    <div class="detail-item">
                        <label>Current Stock</label>
                        <p class="stock-info ${getStockStatus(product.stock, product.minStock).class}">
                            ${product.stock} units
                        </p>
                    </div>
                    <div class="detail-item">
                        <label>Minimum Stock</label>
                        <p>${product.minStock} units</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Available Options</h3>
                    <div class="detail-item">
                        <label>Sizes</label>
                        <p>${product.sizes.join(', ')}</p>
                    </div>
                    <div class="detail-item">
                        <label>Colors</label>
                        <p>${product.colors.join(', ')}</p>
                    </div>
                </div>
            </div>
            
            <div class="product-actions">
                <button class="btn-primary" onclick="editProduct(${product.id})">
                    <i class="fas fa-edit"></i>
                    Edit Product
                </button>
                <button class="btn-secondary" onclick="adjustStock(${product.id})">
                    <i class="fas fa-boxes"></i>
                    Adjust Stock
                </button>
                <button class="btn-secondary" onclick="duplicateProduct(${product.id})">
                    <i class="fas fa-copy"></i>
                    Duplicate
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Edit product
function editProduct(productId) {
    showNotification('Edit product functionality coming soon!', 'info');
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
        const productIndex = productsData.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            productsData.splice(productIndex, 1);
            filteredProducts = filteredProducts.filter(p => p.id !== productId);
            loadProducts();
            showNotification('Product deleted successfully!', 'success');
        }
    }
}

// Add new product
function addNewProduct() {
    const form = document.getElementById('addProductForm');
    const formData = new FormData(form);
    
    const selectedSizes = Array.from(form.querySelectorAll('input[name="sizes"]:checked'))
        .map(checkbox => checkbox.value);
    
    const newProduct = {
        id: productsData.length + 1,
        name: formData.get('productName'),
        category: formData.get('productCategory'),
        price: parseFloat(formData.get('productPrice')),
        stock: parseInt(formData.get('productStock')),
        minStock: 5, // Default minimum stock
        description: formData.get('productDescription'),
        sizes: selectedSizes,
        colors: formData.get('productColors').split(',').map(color => color.trim()),
        image: formData.get('productCategory'),
        status: 'active',
        sku: generateSKU(formData.get('productCategory')),
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Validate required fields
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    // Check if product name already exists
    if (productsData.some(product => product.name.toLowerCase() === newProduct.name.toLowerCase())) {
        showNotification('Product name already exists!', 'error');
        return;
    }
    
    productsData.push(newProduct);
    filteredProducts = [...productsData];
    loadProducts();
    
    closeAddProductModal();
    form.reset();
    showNotification('Product added successfully!', 'success');
}

// Generate SKU
function generateSKU(category) {
    const categoryCode = category.toUpperCase().substring(0, 2);
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${categoryCode}${randomNum}`;
}

// Adjust stock
function adjustStock(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const newStock = prompt(`Current stock: ${product.stock}\nEnter new stock level:`, product.stock);
    
    if (newStock !== null && !isNaN(newStock)) {
        const stockValue = parseInt(newStock);
        if (stockValue >= 0) {
            product.stock = stockValue;
            
            // Update status based on stock
            if (stockValue === 0) {
                product.status = 'out-of-stock';
            } else if (stockValue <= product.minStock) {
                product.status = 'low-stock';
            } else {
                product.status = 'active';
            }
            
            filteredProducts = [...productsData];
            loadProducts();
            showNotification(`Stock updated to ${stockValue}`, 'success');
        } else {
            showNotification('Stock cannot be negative!', 'error');
        }
    }
}

// Duplicate product
function duplicateProduct(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const duplicatedProduct = {
        ...product,
        id: productsData.length + 1,
        name: `${product.name} (Copy)`,
        sku: generateSKU(product.category),
        createdAt: new Date().toISOString().split('T')[0]
    };
    
    productsData.push(duplicatedProduct);
    filteredProducts = [...productsData];
    loadProducts();
    showNotification('Product duplicated successfully!', 'success');
}

// Export products
function exportProducts() {
    showNotification('Exporting products data...', 'info');
    
    setTimeout(() => {
        const csvContent = generateProductsCSV(filteredProducts);
        downloadCSV(csvContent, 'products_export.csv');
        showNotification('Products exported successfully!', 'success');
    }, 1000);
}

// Generate products CSV
function generateProductsCSV(products) {
    const headers = ['ID', 'Name', 'Category', 'Price', 'Stock', 'Status', 'SKU', 'Created Date'];
    const csvRows = [headers.join(',')];
    
    products.forEach(product => {
        const row = [
            product.id,
            product.name,
            product.category,
            product.price,
            product.stock,
            product.status,
            product.sku,
            product.createdAt
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

// Download CSV
function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Bulk actions
function bulkActions() {
    const action = prompt('Choose action: activate, deactivate, delete, or export');
    
    if (!action) return;
    
    switch(action.toLowerCase()) {
        case 'activate':
            bulkUpdateStatus('active');
            break;
        case 'deactivate':
            bulkUpdateStatus('inactive');
            break;
        case 'delete':
            bulkDeleteProducts();
            break;
        case 'export':
            exportProducts();
            break;
        default:
            showNotification('Invalid action!', 'error');
    }
}

// Bulk update status
function bulkUpdateStatus(status) {
    if (confirm(`Are you sure you want to ${status} all products?`)) {
        productsData.forEach(product => {
            product.status = status;
        });
        filteredProducts = [...productsData];
        loadProducts();
        showNotification(`All products ${status} successfully!`, 'success');
    }
}

// Bulk delete products
function bulkDeleteProducts() {
    if (confirm('Are you sure you want to delete all products? This action cannot be undone.')) {
        productsData.length = 0;
        filteredProducts = [];
        loadProducts();
        showNotification('All products deleted successfully!', 'success');
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Modal functions
function openAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.style.display = 'flex';
}

function closeAddProductModal() {
    const modal = document.getElementById('addProductModal');
    modal.style.display = 'none';
}

function closeProductDetailsModal() {
    const modal = document.getElementById('productDetailsModal');
    modal.style.display = 'none';
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Show notification (using the one from admin.js)
function showNotification(message, type = 'info') {
    if (window.AdminDashboard && window.AdminDashboard.showNotification) {
        window.AdminDashboard.showNotification(message, type);
    } else {
        // Fallback notification
        alert(message);
    }
} 
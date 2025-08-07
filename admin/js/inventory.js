// Inventory Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize inventory data
    loadInventory();
    
    // Initialize event listeners
    initializeInventoryEventListeners();
    
    // Initialize charts
    initializeInventoryCharts();
    
    console.log('Inventory Management loaded successfully!');
});

// Sample inventory data
const inventoryData = [
    {
        id: 1,
        productName: 'Royal Bridal Lehenga',
        category: 'bridal',
        sku: 'BR001',
        currentStock: 15,
        minStock: 5,
        maxStock: 50,
        unitCost: 15000,
        totalValue: 225000,
        lastUpdated: '2024-03-25',
        status: 'in-stock',
        supplier: 'Royal Fabrics Ltd.',
        location: 'Warehouse A'
    },
    {
        id: 2,
        productName: 'Glamorous Party Gown',
        category: 'party',
        sku: 'PW001',
        currentStock: 8,
        minStock: 3,
        maxStock: 30,
        unitCost: 8000,
        totalValue: 64000,
        lastUpdated: '2024-03-24',
        status: 'low-stock',
        supplier: 'Elegant Designs',
        location: 'Warehouse B'
    },
    {
        id: 3,
        productName: 'Traditional Anarkali',
        category: 'ethnic',
        sku: 'EW001',
        currentStock: 12,
        minStock: 4,
        maxStock: 40,
        unitCost: 5000,
        totalValue: 60000,
        lastUpdated: '2024-03-23',
        status: 'in-stock',
        supplier: 'Heritage Textiles',
        location: 'Warehouse A'
    },
    {
        id: 4,
        productName: 'Stylish Casual Dress',
        category: 'casual',
        sku: 'CW001',
        currentStock: 25,
        minStock: 8,
        maxStock: 100,
        unitCost: 2000,
        totalValue: 50000,
        lastUpdated: '2024-03-22',
        status: 'in-stock',
        supplier: 'Casual Wear Co.',
        location: 'Warehouse C'
    },
    {
        id: 5,
        productName: 'Elegant Evening Dress',
        category: 'western',
        sku: 'WW001',
        currentStock: 0,
        minStock: 2,
        maxStock: 20,
        unitCost: 4500,
        totalValue: 0,
        lastUpdated: '2024-03-20',
        status: 'out-of-stock',
        supplier: 'Western Fashion',
        location: 'Warehouse B'
    },
    {
        id: 6,
        productName: 'Designer Saree',
        category: 'ethnic',
        sku: 'EW002',
        currentStock: 3,
        minStock: 5,
        maxStock: 25,
        unitCost: 6000,
        totalValue: 18000,
        lastUpdated: '2024-03-21',
        status: 'low-stock',
        supplier: 'Heritage Textiles',
        location: 'Warehouse A'
    }
];

let filteredInventory = [...inventoryData];

// Load inventory
function loadInventory() {
    const tableBody = document.getElementById('inventoryTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    filteredInventory.forEach(item => {
        const row = createInventoryRow(item);
        tableBody.appendChild(row);
    });
    
    // Update alerts
    updateAlerts();
}

// Create inventory row
function createInventoryRow(item) {
    const row = document.createElement('tr');
    row.className = 'inventory-row';
    row.setAttribute('data-inventory-id', item.id);
    
    const stockStatus = getStockStatus(item.currentStock, item.minStock);
    
    row.innerHTML = `
        <td>
            <input type="checkbox" class="inventory-checkbox" value="${item.id}">
        </td>
        <td>
            <div class="product-info">
                <h4>${item.productName}</h4>
                <p class="product-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</p>
            </div>
        </td>
        <td>${item.sku}</td>
        <td>
            <div class="stock-info ${stockStatus.class}">
                <span class="stock-number">${item.currentStock}</span>
                <span class="stock-indicator">
                    <i class="fas ${stockStatus.icon}"></i>
                </span>
            </div>
        </td>
        <td>${item.minStock}</td>
        <td>
            <span class="status-badge ${item.status}">
                ${item.status.replace('-', ' ').charAt(0).toUpperCase() + item.status.replace('-', ' ').slice(1)}
            </span>
        </td>
        <td>${formatDate(item.lastUpdated)}</td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" onclick="viewInventoryItem(${item.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="adjustStock(${item.id})" title="Adjust Stock">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteInventoryItem(${item.id})" title="Delete Item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Get stock status
function getStockStatus(currentStock, minStock) {
    if (currentStock === 0) {
        return { class: 'out-of-stock', icon: 'fa-times-circle' };
    } else if (currentStock <= minStock) {
        return { class: 'low-stock', icon: 'fa-exclamation-triangle' };
    } else {
        return { class: 'in-stock', icon: 'fa-check-circle' };
    }
}

// Initialize event listeners
function initializeInventoryEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('inventorySearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterInventory();
        });
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterInventory();
        });
    }
    
    // Stock filter
    const stockFilter = document.getElementById('stockFilter');
    if (stockFilter) {
        stockFilter.addEventListener('change', function() {
            filterInventory();
        });
    }
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAllInventory');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.inventory-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Stock adjustment form
    const stockAdjustmentForm = document.getElementById('stockAdjustmentForm');
    if (stockAdjustmentForm) {
        stockAdjustmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyStockAdjustment();
        });
    }
}

// Filter inventory
function filterInventory() {
    const searchTerm = document.getElementById('inventorySearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const stockFilter = document.getElementById('stockFilter').value;
    
    filteredInventory = inventoryData.filter(item => {
        const matchesSearch = item.productName.toLowerCase().includes(searchTerm) ||
                            item.sku.toLowerCase().includes(searchTerm);
        
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesStock = !stockFilter || item.status === stockFilter;
        
        return matchesSearch && matchesCategory && matchesStock;
    });
    
    loadInventory();
}

// Update alerts
function updateAlerts() {
    const alertsList = document.getElementById('alertsList');
    if (!alertsList) return;
    
    const lowStockItems = inventoryData.filter(item => item.currentStock <= item.minStock && item.currentStock > 0);
    const outOfStockItems = inventoryData.filter(item => item.currentStock === 0);
    
    alertsList.innerHTML = '';
    
    // Low stock alerts
    lowStockItems.forEach(item => {
        const alert = document.createElement('div');
        alert.className = 'alert-item low-stock';
        alert.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="alert-content">
                <h4>Low Stock Alert</h4>
                <p>${item.productName} (${item.sku}) - ${item.currentStock} units remaining</p>
            </div>
        `;
        alertsList.appendChild(alert);
    });
    
    // Out of stock alerts
    outOfStockItems.forEach(item => {
        const alert = document.createElement('div');
        alert.className = 'alert-item out-of-stock';
        alert.innerHTML = `
            <div class="alert-icon">
                <i class="fas fa-times-circle"></i>
            </div>
            <div class="alert-content">
                <h4>Out of Stock</h4>
                <p>${item.productName} (${item.sku}) - 0 units in stock</p>
            </div>
        `;
        alertsList.appendChild(alert);
    });
    
    // No alerts message
    if (lowStockItems.length === 0 && outOfStockItems.length === 0) {
        const noAlerts = document.createElement('div');
        noAlerts.className = 'no-alerts';
        noAlerts.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>No stock alerts at the moment</p>
        `;
        alertsList.appendChild(noAlerts);
    }
}

// Initialize inventory charts
function initializeInventoryCharts() {
    // Stock Level Chart
    const stockLevelCtx = document.getElementById('stockLevelChart');
    if (stockLevelCtx) {
        const stockLevelChart = new Chart(stockLevelCtx, {
            type: 'bar',
            data: {
                labels: inventoryData.map(item => item.productName.substring(0, 15) + '...'),
                datasets: [{
                    label: 'Current Stock',
                    data: inventoryData.map(item => item.currentStock),
                    backgroundColor: inventoryData.map(item => {
                        if (item.currentStock === 0) return '#f44336';
                        if (item.currentStock <= item.minStock) return '#ff9800';
                        return '#4CAF50';
                    }),
                    borderColor: inventoryData.map(item => {
                        if (item.currentStock === 0) return '#d32f2f';
                        if (item.currentStock <= item.minStock) return '#f57c00';
                        return '#388e3c';
                    }),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
}

// View inventory item
function viewInventoryItem(itemId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (!item) return;
    
    const modal = document.getElementById('inventoryDetailsModal');
    const content = document.getElementById('inventoryDetailsContent');
    
    content.innerHTML = `
        <div class="inventory-details-view">
            <div class="inventory-header">
                <div class="inventory-info">
                    <h2>${item.productName}</h2>
                    <p class="inventory-sku">SKU: ${item.sku}</p>
                    <div class="inventory-status">
                        <span class="status-badge ${item.status}">${item.status}</span>
                        <span class="category-badge">${item.category}</span>
                    </div>
                </div>
                <div class="inventory-value">
                    <h3>₹${item.totalValue.toLocaleString()}</h3>
                    <p>Total Value</p>
                </div>
            </div>
            
            <div class="inventory-details-grid">
                <div class="detail-section">
                    <h3>Stock Information</h3>
                    <div class="detail-item">
                        <label>Current Stock</label>
                        <p class="stock-number ${getStockStatus(item.currentStock, item.minStock).class}">
                            ${item.currentStock} units
                        </p>
                    </div>
                    <div class="detail-item">
                        <label>Minimum Stock</label>
                        <p>${item.minStock} units</p>
                    </div>
                    <div class="detail-item">
                        <label>Maximum Stock</label>
                        <p>${item.maxStock} units</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Financial Information</h3>
                    <div class="detail-item">
                        <label>Unit Cost</label>
                        <p>₹${item.unitCost.toLocaleString()}</p>
                    </div>
                    <div class="detail-item">
                        <label>Total Value</label>
                        <p>₹${item.totalValue.toLocaleString()}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Location & Supplier</h3>
                    <div class="detail-item">
                        <label>Warehouse Location</label>
                        <p>${item.location}</p>
                    </div>
                    <div class="detail-item">
                        <label>Supplier</label>
                        <p>${item.supplier}</p>
                    </div>
                    <div class="detail-item">
                        <label>Last Updated</label>
                        <p>${formatDate(item.lastUpdated)}</p>
                    </div>
                </div>
            </div>
            
            <div class="inventory-actions">
                <button class="btn-primary" onclick="adjustStock(${item.id})">
                    <i class="fas fa-edit"></i>
                    Adjust Stock
                </button>
                <button class="btn-secondary" onclick="reorderItem(${item.id})">
                    <i class="fas fa-shopping-cart"></i>
                    Reorder
                </button>
                <button class="btn-secondary" onclick="viewHistory(${item.id})">
                    <i class="fas fa-history"></i>
                    View History
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Adjust stock
function adjustStock(itemId) {
    const item = inventoryData.find(i => i.id === itemId);
    if (!item) return;
    
    const modal = document.getElementById('stockAdjustmentModal');
    const productSelect = document.getElementById('adjustmentProduct');
    
    // Populate product select
    productSelect.innerHTML = '<option value="">Select Product</option>';
    inventoryData.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.productName;
        if (product.id === itemId) {
            option.selected = true;
        }
        productSelect.appendChild(option);
    });
    
    // Store item ID for form submission
    modal.setAttribute('data-item-id', itemId);
    
    modal.style.display = 'flex';
}

// Apply stock adjustment
function applyStockAdjustment() {
    const modal = document.getElementById('stockAdjustmentModal');
    const itemId = parseInt(modal.getAttribute('data-item-id'));
    const productId = parseInt(document.getElementById('adjustmentProduct').value);
    const adjustmentType = document.getElementById('adjustmentType').value;
    const quantity = parseInt(document.getElementById('adjustmentQuantity').value);
    const reason = document.getElementById('adjustmentReason').value;
    
    const item = inventoryData.find(i => i.id === itemId);
    if (!item) return;
    
    let newStock = item.currentStock;
    
    switch(adjustmentType) {
        case 'add':
            newStock += quantity;
            break;
        case 'remove':
            newStock -= quantity;
            if (newStock < 0) {
                showNotification('Cannot remove more stock than available!', 'error');
                return;
            }
            break;
        case 'set':
            newStock = quantity;
            break;
        default:
            showNotification('Invalid adjustment type!', 'error');
            return;
    }
    
    // Update inventory
    item.currentStock = newStock;
    item.totalValue = newStock * item.unitCost;
    item.lastUpdated = new Date().toISOString().split('T')[0];
    
    // Update status
    if (newStock === 0) {
        item.status = 'out-of-stock';
    } else if (newStock <= item.minStock) {
        item.status = 'low-stock';
    } else {
        item.status = 'in-stock';
    }
    
    filteredInventory = [...inventoryData];
    loadInventory();
    
    closeStockAdjustmentModal();
    showNotification(`Stock adjusted successfully. New stock: ${newStock}`, 'success');
}

// Delete inventory item
function deleteInventoryItem(itemId) {
    if (confirm('Are you sure you want to delete this inventory item? This action cannot be undone.')) {
        const itemIndex = inventoryData.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
            inventoryData.splice(itemIndex, 1);
            filteredInventory = filteredInventory.filter(i => i.id !== itemId);
            loadInventory();
            showNotification('Inventory item deleted successfully!', 'success');
        }
    }
}

// Export inventory
function exportInventory() {
    showNotification('Exporting inventory data...', 'info');
    
    setTimeout(() => {
        const csvContent = generateInventoryCSV(filteredInventory);
        downloadCSV(csvContent, 'inventory_export.csv');
        showNotification('Inventory exported successfully!', 'success');
    }, 1000);
}

// Generate inventory CSV
function generateInventoryCSV(inventory) {
    const headers = ['ID', 'Product Name', 'SKU', 'Category', 'Current Stock', 'Min Stock', 'Max Stock', 'Unit Cost', 'Total Value', 'Status', 'Last Updated'];
    const csvRows = [headers.join(',')];
    
    inventory.forEach(item => {
        const row = [
            item.id,
            item.productName,
            item.sku,
            item.category,
            item.currentStock,
            item.minStock,
            item.maxStock,
            item.unitCost,
            item.totalValue,
            item.status,
            item.lastUpdated
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

// Generate inventory report
function generateInventoryReport() {
    showNotification('Generating inventory report...', 'info');
    
    setTimeout(() => {
        const reportData = {
            totalItems: inventoryData.length,
            totalValue: inventoryData.reduce((sum, item) => sum + item.totalValue, 0),
            lowStockItems: inventoryData.filter(item => item.currentStock <= item.minStock && item.currentStock > 0).length,
            outOfStockItems: inventoryData.filter(item => item.currentStock === 0).length,
            averageStockLevel: Math.round(inventoryData.reduce((sum, item) => sum + item.currentStock, 0) / inventoryData.length)
        };
        
        showNotification('Inventory report generated successfully!', 'success');
        console.log('Inventory Report:', reportData);
    }, 2000);
}

// Additional functions
function reorderItem(itemId) {
    showNotification('Reorder functionality coming soon!', 'info');
}

function viewHistory(itemId) {
    showNotification('History view functionality coming soon!', 'info');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Modal functions
function openStockAdjustmentModal() {
    const modal = document.getElementById('stockAdjustmentModal');
    modal.style.display = 'flex';
}

function closeStockAdjustmentModal() {
    const modal = document.getElementById('stockAdjustmentModal');
    modal.style.display = 'none';
    document.getElementById('stockAdjustmentForm').reset();
}

function closeInventoryDetailsModal() {
    const modal = document.getElementById('inventoryDetailsModal');
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
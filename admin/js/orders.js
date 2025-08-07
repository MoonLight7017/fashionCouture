// Orders Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize orders data
    loadOrders();
    
    // Initialize event listeners
    initializeOrdersEventListeners();
    
    console.log('Orders Management loaded successfully!');
});

// Sample orders data
const ordersData = [
    {
        id: 'VC2024001',
        customer: {
            name: 'Priya Sharma',
            email: 'priya.sharma@example.com',
            phone: '+91 98765 43210'
        },
        products: [
            {
                name: 'Royal Bridal Lehenga',
                category: 'Bridal',
                price: 25000,
                quantity: 1,
                image: 'bridal'
            }
        ],
        total: 25000,
        status: 'delivered',
        date: '2024-03-15',
        paymentStatus: 'paid',
        paymentMethod: 'Credit Card',
        shippingAddress: '123 Fashion Street, Mumbai, Maharashtra 400001'
    },
    {
        id: 'VC2024002',
        customer: {
            name: 'Anjali Patel',
            email: 'anjali.patel@example.com',
            phone: '+91 87654 32109'
        },
        products: [
            {
                name: 'Glamorous Party Gown',
                category: 'Party Wear',
                price: 12000,
                quantity: 1,
                image: 'party'
            }
        ],
        total: 12000,
        status: 'processing',
        date: '2024-03-20',
        paymentStatus: 'paid',
        paymentMethod: 'UPI',
        shippingAddress: '456 Style Avenue, Delhi, Delhi 110001'
    },
    {
        id: 'VC2024003',
        customer: {
            name: 'Meera Singh',
            email: 'meera.singh@example.com',
            phone: '+91 76543 21098'
        },
        products: [
            {
                name: 'Traditional Anarkali',
                category: 'Ethnic',
                price: 8500,
                quantity: 1,
                image: 'ethnic'
            }
        ],
        total: 8500,
        status: 'shipped',
        date: '2024-03-25',
        paymentStatus: 'paid',
        paymentMethod: 'Net Banking',
        shippingAddress: '789 Design Road, Bangalore, Karnataka 560001'
    },
    {
        id: 'VC2024004',
        customer: {
            name: 'Kavya Reddy',
            email: 'kavya.reddy@example.com',
            phone: '+91 65432 10987'
        },
        products: [
            {
                name: 'Stylish Casual Dress',
                category: 'Casual',
                price: 3200,
                quantity: 1,
                image: 'casual'
            }
        ],
        total: 3200,
        status: 'pending',
        date: '2024-03-28',
        paymentStatus: 'pending',
        paymentMethod: 'Cash on Delivery',
        shippingAddress: '321 Trend Lane, Chennai, Tamil Nadu 600001'
    },
    {
        id: 'VC2024005',
        customer: {
            name: 'Riya Gupta',
            email: 'riya.gupta@example.com',
            phone: '+91 54321 09876'
        },
        products: [
            {
                name: 'Elegant Evening Dress',
                category: 'Western',
                price: 7500,
                quantity: 1,
                image: 'western'
            }
        ],
        total: 7500,
        status: 'cancelled',
        date: '2024-03-10',
        paymentStatus: 'refunded',
        paymentMethod: 'Credit Card',
        shippingAddress: '654 Fashion Boulevard, Hyderabad, Telangana 500001'
    }
];

let filteredOrders = [...ordersData];

// Load orders
function loadOrders() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    filteredOrders.forEach(order => {
        const row = createOrderRow(order);
        tableBody.appendChild(row);
    });
}

// Create order row
function createOrderRow(order) {
    const row = document.createElement('tr');
    row.className = 'order-row';
    row.setAttribute('data-order-id', order.id);
    
    row.innerHTML = `
        <td>
            <input type="checkbox" class="order-checkbox" value="${order.id}">
        </td>
        <td>
            <div class="order-id">
                <strong>${order.id}</strong>
            </div>
        </td>
        <td>
            <div class="customer-info">
                <h4>${order.customer.name}</h4>
                <p>${order.customer.email}</p>
            </div>
        </td>
        <td>
            <div class="products-info">
                ${order.products.map(product => `
                    <div class="product-item">
                        <div class="product-image">
                            <div class="image-placeholder ${product.image}">
                                <i class="fas fa-tshirt"></i>
                            </div>
                        </div>
                        <div class="product-details">
                            <h5>${product.name}</h5>
                            <p>Qty: ${product.quantity}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </td>
        <td>
            <div class="order-total">
                <strong>₹${order.total.toLocaleString()}</strong>
            </div>
        </td>
        <td>
            <span class="status-badge ${order.status}">
                ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
        </td>
        <td>${formatDate(order.date)}</td>
        <td>
            <span class="payment-status ${order.paymentStatus}">
                ${order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
            </span>
        </td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" onclick="viewOrder('${order.id}')" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="updateOrderStatus('${order.id}')" title="Update Status">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteOrder('${order.id}')" title="Delete Order">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Initialize event listeners
function initializeOrdersEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('orderSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterOrders();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterOrders();
        });
    }
    
    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', function() {
            filterOrders();
        });
    }
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAllOrders');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.order-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Update status form
    const updateStatusForm = document.getElementById('updateStatusForm');
    if (updateStatusForm) {
        updateStatusForm.addEventListener('submit', function(e) {
            e.preventDefault();
            updateOrderStatusSubmit();
        });
    }
}

// Filter orders
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    filteredOrders = ordersData.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm) ||
                            order.customer.name.toLowerCase().includes(searchTerm) ||
                            order.customer.email.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || order.status === statusFilter;
        const matchesDate = !dateFilter || filterByDate(order.date, dateFilter);
        
        return matchesSearch && matchesStatus && matchesDate;
    });
    
    loadOrders();
}

// Filter by date
function filterByDate(orderDate, filterType) {
    const order = new Date(orderDate);
    const today = new Date();
    
    switch(filterType) {
        case 'today':
            return order.toDateString() === today.toDateString();
        case 'week':
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            return order >= weekAgo;
        case 'month':
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
            return order >= monthAgo;
        case 'quarter':
            const quarterAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
            return order >= quarterAgo;
        default:
            return true;
    }
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

// View order details
function viewOrder(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('orderDetailsModal');
    const content = document.getElementById('orderDetailsContent');
    
    content.innerHTML = `
        <div class="order-details-view">
            <div class="order-header">
                <div class="order-info">
                    <h2>Order ${order.id}</h2>
                    <p class="order-date">Placed on ${formatDate(order.date)}</p>
                    <div class="order-status">
                        <span class="status-badge ${order.status}">${order.status}</span>
                        <span class="payment-status ${order.paymentStatus}">${order.paymentStatus}</span>
                    </div>
                </div>
                <div class="order-total-large">
                    <h3>₹${order.total.toLocaleString()}</h3>
                    <p>Total Amount</p>
                </div>
            </div>
            
            <div class="order-sections">
                <div class="section">
                    <h3>Customer Information</h3>
                    <div class="customer-details">
                        <div class="detail-item">
                            <label>Name</label>
                            <p>${order.customer.name}</p>
                        </div>
                        <div class="detail-item">
                            <label>Email</label>
                            <p>${order.customer.email}</p>
                        </div>
                        <div class="detail-item">
                            <label>Phone</label>
                            <p>${order.customer.phone}</p>
                        </div>
                        <div class="detail-item">
                            <label>Shipping Address</label>
                            <p>${order.shippingAddress}</p>
                        </div>
                    </div>
                </div>
                
                <div class="section">
                    <h3>Order Items</h3>
                    <div class="order-items">
                        ${order.products.map(product => `
                            <div class="order-item">
                                <div class="item-image">
                                    <div class="image-placeholder ${product.image}">
                                        <i class="fas fa-tshirt"></i>
                                    </div>
                                </div>
                                <div class="item-details">
                                    <h4>${product.name}</h4>
                                    <p class="item-category">${product.category}</p>
                                    <p class="item-quantity">Quantity: ${product.quantity}</p>
                                </div>
                                <div class="item-price">
                                    ₹${product.price.toLocaleString()}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="section">
                    <h3>Payment Information</h3>
                    <div class="payment-details">
                        <div class="detail-item">
                            <label>Payment Method</label>
                            <p>${order.paymentMethod}</p>
                        </div>
                        <div class="detail-item">
                            <label>Payment Status</label>
                            <p>${order.paymentStatus}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="order-actions">
                <button class="btn-primary" onclick="updateOrderStatus('${order.id}')">
                    <i class="fas fa-edit"></i>
                    Update Status
                </button>
                <button class="btn-secondary" onclick="printOrder('${order.id}')">
                    <i class="fas fa-print"></i>
                    Print Order
                </button>
                <button class="btn-secondary" onclick="sendInvoice('${order.id}')">
                    <i class="fas fa-envelope"></i>
                    Send Invoice
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Update order status
function updateOrderStatus(orderId) {
    const order = ordersData.find(o => o.id === orderId);
    if (!order) return;
    
    const modal = document.getElementById('updateStatusModal');
    const statusSelect = document.getElementById('newStatus');
    
    // Set current status
    statusSelect.value = order.status;
    
    // Store order ID for form submission
    modal.setAttribute('data-order-id', orderId);
    
    modal.style.display = 'flex';
}

// Update order status submit
function updateOrderStatusSubmit() {
    const modal = document.getElementById('updateStatusModal');
    const orderId = modal.getAttribute('data-order-id');
    const newStatus = document.getElementById('newStatus').value;
    const statusNote = document.getElementById('statusNote').value;
    
    const order = ordersData.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        filteredOrders = [...ordersData];
        loadOrders();
        
        showNotification(`Order ${orderId} status updated to ${newStatus}`, 'success');
    }
    
    closeUpdateStatusModal();
}

// Delete order
function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
        const orderIndex = ordersData.findIndex(o => o.id === orderId);
        if (orderIndex !== -1) {
            ordersData.splice(orderIndex, 1);
            filteredOrders = filteredOrders.filter(o => o.id !== orderId);
            loadOrders();
            showNotification('Order deleted successfully!', 'success');
        }
    }
}

// Create order
function createOrder() {
    showNotification('Create order functionality coming soon!', 'info');
}

// Export orders
function exportOrders() {
    showNotification('Exporting orders data...', 'info');
    
    setTimeout(() => {
        const csvContent = generateOrdersCSV(filteredOrders);
        downloadCSV(csvContent, 'orders_export.csv');
        showNotification('Orders exported successfully!', 'success');
    }, 1000);
}

// Generate orders CSV
function generateOrdersCSV(orders) {
    const headers = ['Order ID', 'Customer Name', 'Customer Email', 'Total', 'Status', 'Date', 'Payment Status'];
    const csvRows = [headers.join(',')];
    
    orders.forEach(order => {
        const row = [
            order.id,
            order.customer.name,
            order.customer.email,
            order.total,
            order.status,
            order.date,
            order.paymentStatus
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

// Bulk update status
function bulkUpdateStatus() {
    const selectedOrders = document.querySelectorAll('.order-checkbox:checked');
    
    if (selectedOrders.length === 0) {
        showNotification('Please select orders to update', 'info');
        return;
    }
    
    const newStatus = prompt('Enter new status (pending/processing/shipped/delivered/cancelled):');
    if (!newStatus) return;
    
    const orderIds = Array.from(selectedOrders).map(checkbox => checkbox.value);
    
    orderIds.forEach(orderId => {
        const order = ordersData.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
        }
    });
    
    filteredOrders = [...ordersData];
    loadOrders();
    showNotification(`${orderIds.length} orders updated to ${newStatus}`, 'success');
}

// Close modals
function closeOrderDetailsModal() {
    const modal = document.getElementById('orderDetailsModal');
    modal.style.display = 'none';
}

function closeUpdateStatusModal() {
    const modal = document.getElementById('updateStatusModal');
    modal.style.display = 'none';
    document.getElementById('updateStatusForm').reset();
}

// Additional functions
function printOrder(orderId) {
    showNotification('Print functionality coming soon!', 'info');
}

function sendInvoice(orderId) {
    showNotification('Invoice sent successfully!', 'success');
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
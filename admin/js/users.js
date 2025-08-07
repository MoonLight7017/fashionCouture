// Users Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize users data
    loadUsers();
    
    // Initialize event listeners
    initializeUsersEventListeners();
    
    console.log('Users Management loaded successfully!');
});

// Sample users data
const usersData = [
    {
        id: 1,
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya.sharma@example.com',
        phone: '+91 98765 43210',
        status: 'active',
        role: 'customer',
        joinedDate: '2024-01-15',
        orders: 12,
        avatar: 'PS',
        totalSpent: '₹1,25,000',
        lastOrder: '2024-03-20'
    },
    {
        id: 2,
        firstName: 'Anjali',
        lastName: 'Patel',
        email: 'anjali.patel@example.com',
        phone: '+91 87654 32109',
        status: 'active',
        role: 'premium',
        joinedDate: '2024-02-10',
        orders: 8,
        avatar: 'AP',
        totalSpent: '₹2,10,000',
        lastOrder: '2024-03-18'
    },
    {
        id: 3,
        firstName: 'Meera',
        lastName: 'Singh',
        email: 'meera.singh@example.com',
        phone: '+91 76543 21098',
        status: 'active',
        role: 'customer',
        joinedDate: '2024-01-25',
        orders: 5,
        avatar: 'MS',
        totalSpent: '₹85,000',
        lastOrder: '2024-03-15'
    },
    {
        id: 4,
        firstName: 'Kavya',
        lastName: 'Reddy',
        email: 'kavya.reddy@example.com',
        phone: '+91 65432 10987',
        status: 'inactive',
        role: 'customer',
        joinedDate: '2024-02-05',
        orders: 3,
        avatar: 'KR',
        totalSpent: '₹45,000',
        lastOrder: '2024-02-28'
    },
    {
        id: 5,
        firstName: 'Riya',
        lastName: 'Gupta',
        email: 'riya.gupta@example.com',
        phone: '+91 54321 09876',
        status: 'pending',
        role: 'customer',
        joinedDate: '2024-03-10',
        orders: 0,
        avatar: 'RG',
        totalSpent: '₹0',
        lastOrder: 'N/A'
    },
    {
        id: 6,
        firstName: 'Zara',
        lastName: 'Khan',
        email: 'zara.khan@example.com',
        phone: '+91 43210 98765',
        status: 'active',
        role: 'premium',
        joinedDate: '2024-01-20',
        orders: 15,
        avatar: 'ZK',
        totalSpent: '₹3,20,000',
        lastOrder: '2024-03-22'
    },
    {
        id: 7,
        firstName: 'Aditi',
        lastName: 'Verma',
        email: 'aditi.verma@example.com',
        phone: '+91 32109 87654',
        status: 'active',
        role: 'customer',
        joinedDate: '2024-02-15',
        orders: 7,
        avatar: 'AV',
        totalSpent: '₹95,000',
        lastOrder: '2024-03-19'
    },
    {
        id: 8,
        firstName: 'Ishita',
        lastName: 'Joshi',
        email: 'ishita.joshi@example.com',
        phone: '+91 21098 76543',
        status: 'active',
        role: 'admin',
        joinedDate: '2024-01-01',
        orders: 2,
        avatar: 'IJ',
        totalSpent: '₹25,000',
        lastOrder: '2024-03-10'
    }
];

let filteredUsers = [...usersData];

// Load users
function loadUsers() {
    const tableBody = document.getElementById('usersTableBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    filteredUsers.forEach(user => {
        const row = createUserRow(user);
        tableBody.appendChild(row);
    });
}

// Create user row
function createUserRow(user) {
    const row = document.createElement('tr');
    row.className = 'user-row';
    row.setAttribute('data-user-id', user.id);
    
    row.innerHTML = `
        <td>
            <input type="checkbox" class="user-checkbox" value="${user.id}">
        </td>
        <td>
            <div class="user-info">
                <div class="user-avatar">
                    <span>${user.avatar}</span>
                </div>
                <div class="user-details">
                    <h4>${user.firstName} ${user.lastName}</h4>
                    <span class="user-id">#${user.id.toString().padStart(6, '0')}</span>
                </div>
            </div>
        </td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>
            <span class="status-badge ${user.status}">
                ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
            </span>
        </td>
        <td>
            <span class="role-badge ${user.role}">
                ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
        </td>
        <td>${formatDate(user.joinedDate)}</td>
        <td>${user.orders}</td>
        <td>
            <div class="action-buttons">
                <button class="action-btn view" onclick="viewUser(${user.id})" title="View Details">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn edit" onclick="editUser(${user.id})" title="Edit User">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="deleteUser(${user.id})" title="Delete User">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </td>
    `;
    
    return row;
}

// Initialize event listeners
function initializeUsersEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('userSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterUsers();
        });
    }
    
    // Status filter
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', function() {
            filterUsers();
        });
    }
    
    // Role filter
    const roleFilter = document.getElementById('roleFilter');
    if (roleFilter) {
        roleFilter.addEventListener('change', function() {
            filterUsers();
        });
    }
    
    // Select all checkbox
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.user-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // Add user form
    const addUserForm = document.getElementById('addUserForm');
    if (addUserForm) {
        addUserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewUser();
        });
    }
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    const roleFilter = document.getElementById('roleFilter').value;
    
    filteredUsers = usersData.filter(user => {
        const matchesSearch = user.firstName.toLowerCase().includes(searchTerm) ||
                            user.lastName.toLowerCase().includes(searchTerm) ||
                            user.email.toLowerCase().includes(searchTerm) ||
                            user.phone.includes(searchTerm);
        
        const matchesStatus = !statusFilter || user.status === statusFilter;
        const matchesRole = !roleFilter || user.role === roleFilter;
        
        return matchesSearch && matchesStatus && matchesRole;
    });
    
    loadUsers();
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

// View user details
function viewUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const modal = document.getElementById('userDetailsModal');
    const content = document.getElementById('userDetailsContent');
    
    content.innerHTML = `
        <div class="user-details-view">
            <div class="user-header">
                <div class="user-avatar-large">
                    <span>${user.avatar}</span>
                </div>
                <div class="user-info-large">
                    <h2>${user.firstName} ${user.lastName}</h2>
                    <p class="user-email">${user.email}</p>
                    <div class="user-status">
                        <span class="status-badge ${user.status}">${user.status}</span>
                        <span class="role-badge ${user.role}">${user.role}</span>
                    </div>
                </div>
            </div>
            
            <div class="user-stats">
                <div class="stat-item">
                    <h4>Total Orders</h4>
                    <p>${user.orders}</p>
                </div>
                <div class="stat-item">
                    <h4>Total Spent</h4>
                    <p>${user.totalSpent}</p>
                </div>
                <div class="stat-item">
                    <h4>Last Order</h4>
                    <p>${user.lastOrder}</p>
                </div>
            </div>
            
            <div class="user-details-grid">
                <div class="detail-item">
                    <label>Phone Number</label>
                    <p>${user.phone}</p>
                </div>
                <div class="detail-item">
                    <label>Joined Date</label>
                    <p>${formatDate(user.joinedDate)}</p>
                </div>
                <div class="detail-item">
                    <label>User ID</label>
                    <p>#${user.id.toString().padStart(6, '0')}</p>
                </div>
                <div class="detail-item">
                    <label>Account Status</label>
                    <p>${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</p>
                </div>
            </div>
            
            <div class="user-actions">
                <button class="btn-primary" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                    Edit User
                </button>
                <button class="btn-secondary" onclick="sendMessage(${user.id})">
                    <i class="fas fa-envelope"></i>
                    Send Message
                </button>
                <button class="btn-secondary" onclick="viewOrders(${user.id})">
                    <i class="fas fa-shopping-bag"></i>
                    View Orders
                </button>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
}

// Edit user
function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    showNotification('Edit user functionality coming soon!', 'info');
}

// Delete user
function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        const user = usersData.find(u => u.id === userId);
        if (user) {
            usersData.splice(usersData.indexOf(user), 1);
            filteredUsers = filteredUsers.filter(u => u.id !== userId);
            loadUsers();
            showNotification('User deleted successfully!', 'success');
        }
    }
}

// Add new user
function addNewUser() {
    const form = document.getElementById('addUserForm');
    const formData = new FormData(form);
    
    const newUser = {
        id: usersData.length + 1,
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        status: formData.get('status'),
        role: formData.get('role'),
        joinedDate: new Date().toISOString().split('T')[0],
        orders: 0,
        avatar: formData.get('firstName').charAt(0) + formData.get('lastName').charAt(0),
        totalSpent: '₹0',
        lastOrder: 'N/A'
    };
    
    // Validate password
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (password.length < 6) {
        showNotification('Password must be at least 6 characters long!', 'error');
        return;
    }
    
    // Check if email already exists
    if (usersData.some(user => user.email === newUser.email)) {
        showNotification('Email already exists!', 'error');
        return;
    }
    
    usersData.push(newUser);
    filteredUsers = [...usersData];
    loadUsers();
    
    closeAddUserModal();
    form.reset();
    showNotification('User added successfully!', 'success');
}

// Open add user modal
function openAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'flex';
}

// Close add user modal
function closeAddUserModal() {
    const modal = document.getElementById('addUserModal');
    modal.style.display = 'none';
}

// Close user details modal
function closeUserDetailsModal() {
    const modal = document.getElementById('userDetailsModal');
    modal.style.display = 'none';
}

// Export users
function exportUsers() {
    showNotification('Exporting users data...', 'info');
    
    setTimeout(() => {
        const csvContent = generateCSV(filteredUsers);
        downloadCSV(csvContent, 'users_export.csv');
        showNotification('Users exported successfully!', 'success');
    }, 1000);
}

// Generate CSV
function generateCSV(users) {
    const headers = ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Status', 'Role', 'Joined Date', 'Orders'];
    const csvRows = [headers.join(',')];
    
    users.forEach(user => {
        const row = [
            user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.phone,
            user.status,
            user.role,
            user.joinedDate,
            user.orders
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
    const selectedUsers = document.querySelectorAll('.user-checkbox:checked');
    
    if (selectedUsers.length === 0) {
        showNotification('Please select users to perform bulk actions', 'info');
        return;
    }
    
    const action = prompt('Choose action: activate, deactivate, delete, or export');
    
    if (!action) return;
    
    const userIds = Array.from(selectedUsers).map(checkbox => parseInt(checkbox.value));
    
    switch(action.toLowerCase()) {
        case 'activate':
            bulkUpdateStatus(userIds, 'active');
            break;
        case 'deactivate':
            bulkUpdateStatus(userIds, 'inactive');
            break;
        case 'delete':
            bulkDeleteUsers(userIds);
            break;
        case 'export':
            exportSelectedUsers(userIds);
            break;
        default:
            showNotification('Invalid action!', 'error');
    }
}

// Bulk update status
function bulkUpdateStatus(userIds, status) {
    userIds.forEach(id => {
        const user = usersData.find(u => u.id === id);
        if (user) {
            user.status = status;
        }
    });
    
    filteredUsers = [...usersData];
    loadUsers();
    showNotification(`${userIds.length} users ${status} successfully!`, 'success');
}

// Bulk delete users
function bulkDeleteUsers(userIds) {
    if (confirm(`Are you sure you want to delete ${userIds.length} users?`)) {
        userIds.forEach(id => {
            usersData.splice(usersData.findIndex(u => u.id === id), 1);
        });
        
        filteredUsers = [...usersData];
        loadUsers();
        showNotification(`${userIds.length} users deleted successfully!`, 'success');
    }
}

// Export selected users
function exportSelectedUsers(userIds) {
    const selectedUsers = usersData.filter(user => userIds.includes(user.id));
    const csvContent = generateCSV(selectedUsers);
    downloadCSV(csvContent, 'selected_users_export.csv');
    showNotification('Selected users exported successfully!', 'success');
}

// Send message to user
function sendMessage(userId) {
    showNotification('Message feature coming soon!', 'info');
}

// View user orders
function viewOrders(userId) {
    showNotification('Redirecting to orders page...', 'info');
    setTimeout(() => {
        window.location.href = `orders.html?user=${userId}`;
    }, 1000);
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
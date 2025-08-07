// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize current date
    updateCurrentDate();
    
    // Initialize charts
    initializeCharts();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load dashboard data
    loadDashboardData();
    
    console.log('Admin Dashboard loaded successfully!');
});

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    const currentDate = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
}

// Initialize charts
function initializeCharts() {
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart');
    if (revenueCtx) {
        const revenueChart = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue',
                    data: [120000, 150000, 180000, 200000, 220000, 245000, 230000, 260000, 280000, 300000, 320000, 350000],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ff6b6b',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
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
                        ticks: {
                            callback: function(value) {
                                return '₹' + (value / 1000) + 'K';
                            }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    // Order Status Chart
    const orderStatusCtx = document.getElementById('orderStatusChart');
    if (orderStatusCtx) {
        const orderStatusChart = new Chart(orderStatusCtx, {
            type: 'doughnut',
            data: {
                labels: ['Delivered', 'Processing', 'Shipped', 'Pending', 'Cancelled'],
                datasets: [{
                    data: [45, 25, 20, 8, 2],
                    backgroundColor: [
                        '#4CAF50',
                        '#2196F3',
                        '#FF9800',
                        '#FFC107',
                        '#f44336'
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });
    }
}

// Initialize event listeners
function initializeEventListeners() {
    // Revenue period selector
    const revenuePeriod = document.getElementById('revenuePeriod');
    if (revenuePeriod) {
        revenuePeriod.addEventListener('change', function() {
            updateRevenueChart(this.value);
        });
    }

    // Quick action buttons
    const actionBtns = document.querySelectorAll('.action-btn');
    actionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            handleQuickAction(action);
        });
    });

    // Admin profile dropdown
    const adminProfile = document.querySelector('.admin-profile');
    if (adminProfile) {
        adminProfile.addEventListener('click', function() {
            showAdminDropdown();
        });
    }

    // Notifications
    const notifications = document.querySelector('.admin-notifications');
    if (notifications) {
        notifications.addEventListener('click', function() {
            showNotifications();
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.admin-sidebar');
    if (hamburger && sidebar) {
        hamburger.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.admin-sidebar') && !e.target.closest('.hamburger')) {
                sidebar.classList.remove('active');
            }
        }
    });
}

// Update revenue chart based on period
function updateRevenueChart(period) {
    const chart = Chart.getChart('revenueChart');
    if (!chart) return;

    let labels, data;
    
    switch(period) {
        case '7':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [25000, 30000, 28000, 35000, 40000, 45000, 42000];
            break;
        case '30':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [180000, 200000, 220000, 245000];
            break;
        case '90':
            labels = ['Jan', 'Feb', 'Mar'];
            data = [120000, 150000, 180000];
            break;
        case '365':
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            data = [450000, 520000, 580000, 650000];
            break;
        default:
            return;
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
}

// Handle quick actions
function handleQuickAction(action) {
    switch(action) {
        case 'Add Product':
            showNotification('Redirecting to Add Product page...', 'info');
            setTimeout(() => {
                window.location.href = 'products.html?action=add';
            }, 1000);
            break;
        case 'Add Customer':
            showNotification('Redirecting to Add Customer page...', 'info');
            setTimeout(() => {
                window.location.href = 'users.html?action=add';
            }, 1000);
            break;
        case 'Generate Report':
            generateReport();
            break;
        case 'Send Newsletter':
            showNotification('Newsletter feature coming soon!', 'info');
            break;
        default:
            showNotification('Action not implemented yet', 'info');
    }
}

// Generate report
function generateReport() {
    showNotification('Generating report...', 'info');
    
    // Simulate report generation
    setTimeout(() => {
        const reportData = {
            totalRevenue: '₹2,45,000',
            totalOrders: 156,
            totalCustomers: 1234,
            topProduct: 'Royal Bridal Lehenga',
            growthRate: '+12.5%'
        };
        
        showNotification('Report generated successfully!', 'success');
        
        // In a real application, this would download the report
        console.log('Report Data:', reportData);
    }, 2000);
}

// Show admin dropdown
function showAdminDropdown() {
    // Create dropdown menu if it doesn't exist
    let dropdown = document.querySelector('.admin-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'admin-dropdown';
        dropdown.innerHTML = `
            <div class="dropdown-menu">
                <a href="profile.html" class="dropdown-item">
                    <i class="fas fa-user"></i>
                    <span>Profile</span>
                </a>
                <a href="settings.html" class="dropdown-item">
                    <i class="fas fa-cog"></i>
                    <span>Settings</span>
                </a>
                <div class="dropdown-divider"></div>
                <a href="../index.html" class="dropdown-item">
                    <i class="fas fa-home"></i>
                    <span>Back to Site</span>
                </a>
                <a href="#" class="dropdown-item logout-btn">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </a>
            </div>
        `;
        
        // Add styles
        dropdown.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            min-width: 200px;
            z-index: 1000;
            margin-top: 10px;
        `;
        
        document.querySelector('.admin-profile').appendChild(dropdown);
        
        // Add event listeners
        dropdown.querySelector('.logout-btn').addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Logging out...', 'success');
            setTimeout(() => {
                window.location.href = '../login.html';
            }, 1000);
        });
    }
    
    // Toggle dropdown
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function closeDropdown(e) {
        if (!e.target.closest('.admin-profile')) {
            dropdown.style.display = 'none';
            document.removeEventListener('click', closeDropdown);
        }
    });
}

// Show notifications
function showNotifications() {
    const notifications = [
        { type: 'order', message: 'New order #VC2024005 received', time: '2 minutes ago' },
        { type: 'customer', message: 'New customer registration', time: '15 minutes ago' },
        { type: 'inventory', message: 'Low stock alert for Party Gown', time: '1 hour ago' }
    ];
    
    // Create notifications panel
    let panel = document.querySelector('.notifications-panel');
    if (!panel) {
        panel = document.createElement('div');
        panel.className = 'notifications-panel';
        panel.style.cssText = `
            position: absolute;
            top: 100%;
            right: 0;
            background: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            min-width: 300px;
            z-index: 1000;
            margin-top: 10px;
            max-height: 400px;
            overflow-y: auto;
        `;
        
        document.querySelector('.admin-notifications').appendChild(panel);
    }
    
    // Populate notifications
    panel.innerHTML = `
        <div style="padding: 15px; border-bottom: 1px solid #eee;">
            <h4 style="margin: 0; color: #333;">Notifications</h4>
        </div>
        ${notifications.map(notification => `
            <div style="padding: 15px; border-bottom: 1px solid #f0f0f0;">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 5px;">
                    <i class="fas fa-${getNotificationIcon(notification.type)}" style="color: #ff6b6b;"></i>
                    <span style="font-size: 14px; color: #333;">${notification.message}</span>
                </div>
                <span style="font-size: 12px; color: #666;">${notification.time}</span>
            </div>
        `).join('')}
        <div style="padding: 15px; text-align: center;">
            <a href="#" style="color: #ff6b6b; text-decoration: none; font-size: 14px;">View All Notifications</a>
        </div>
    `;
    
    // Toggle panel
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    
    // Close panel when clicking outside
    document.addEventListener('click', function closePanel(e) {
        if (!e.target.closest('.admin-notifications')) {
            panel.style.display = 'none';
            document.removeEventListener('click', closePanel);
        }
    });
}

// Get notification icon
function getNotificationIcon(type) {
    switch(type) {
        case 'order': return 'shopping-cart';
        case 'customer': return 'user-plus';
        case 'inventory': return 'exclamation-triangle';
        default: return 'bell';
    }
}

// Load dashboard data
function loadDashboardData() {
    // Simulate loading data
    showLoadingState();
    
    setTimeout(() => {
        hideLoadingState();
        updateStats();
    }, 1000);
}

// Show loading state
function showLoadingState() {
    const main = document.querySelector('.admin-main');
    main.classList.add('loading');
}

// Hide loading state
function hideLoadingState() {
    const main = document.querySelector('.admin-main');
    main.classList.remove('loading');
}

// Update stats
function updateStats() {
    // Animate stat numbers
    const statNumbers = document.querySelectorAll('.stat-content h3');
    statNumbers.forEach(stat => {
        const finalValue = stat.textContent;
        animateNumber(stat, finalValue);
    });
}

// Animate number
function animateNumber(element, finalValue) {
    const isCurrency = finalValue.includes('₹');
    const isPercentage = finalValue.includes('%');
    
    let numericValue;
    if (isCurrency) {
        numericValue = parseInt(finalValue.replace(/[₹,]/g, ''));
    } else if (isPercentage) {
        numericValue = parseInt(finalValue.replace('%', ''));
    } else {
        numericValue = parseInt(finalValue.replace(/,/g, ''));
    }
    
    let currentValue = 0;
    const increment = numericValue / 50;
    const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= numericValue) {
            currentValue = numericValue;
            clearInterval(timer);
        }
        
        let displayValue;
        if (isCurrency) {
            displayValue = '₹' + Math.floor(currentValue).toLocaleString();
        } else if (isPercentage) {
            displayValue = Math.floor(currentValue) + '%';
        } else {
            displayValue = Math.floor(currentValue).toLocaleString();
        }
        
        element.textContent = displayValue;
    }, 20);
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Real-time updates simulation
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time data updates
        const randomChange = Math.random() > 0.5 ? 1 : -1;
        const randomAmount = Math.floor(Math.random() * 1000);
        
        // Update revenue
        const revenueElement = document.querySelector('.stat-card .stat-content h3');
        if (revenueElement && revenueElement.textContent.includes('₹')) {
            const currentRevenue = parseInt(revenueElement.textContent.replace(/[₹,]/g, ''));
            const newRevenue = currentRevenue + (randomChange * randomAmount);
            revenueElement.textContent = '₹' + newRevenue.toLocaleString();
        }
    }, 30000); // Update every 30 seconds
}

// Export functions for use in other admin pages
window.AdminDashboard = {
    showNotification,
    updateRevenueChart,
    handleQuickAction,
    generateReport
};

// Start real-time updates
startRealTimeUpdates(); 
// Analytics JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize analytics
    initializeAnalytics();
    
    // Initialize event listeners
    initializeAnalyticsEventListeners();
    
    console.log('Analytics loaded successfully!');
});

// Initialize analytics
function initializeAnalytics() {
    // Initialize all charts
    initializeRevenueTrendChart();
    initializeCategoryChart();
    initializeDemographicsChart();
    initializeOrderStatusChart();
    initializeRegionChart();
    
    // Update metrics
    updateMetrics();
}

// Initialize event listeners
function initializeAnalyticsEventListeners() {
    // Date range selector
    const dateRange = document.getElementById('dateRange');
    if (dateRange) {
        dateRange.addEventListener('change', function() {
            updateCharts(this.value);
        });
    }
    
    // Chart period buttons
    const chartBtns = document.querySelectorAll('.chart-btn');
    chartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            chartBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateRevenueTrendChart(period);
        });
    });
}

// Initialize Revenue Trend Chart
function initializeRevenueTrendChart() {
    const ctx = document.getElementById('revenueTrendChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
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

// Initialize Category Chart
function initializeCategoryChart() {
    const ctx = document.getElementById('categoryChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Bridal', 'Party Wear', 'Ethnic', 'Casual', 'Western'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#feca57'
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

// Initialize Demographics Chart
function initializeDemographicsChart() {
    const ctx = document.getElementById('demographicsChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
            datasets: [{
                label: 'Age Groups',
                data: [25, 40, 20, 10, 5],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#feca57'
                ],
                borderWidth: 0
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

// Initialize Order Status Chart
function initializeOrderStatusChart() {
    const ctx = document.getElementById('orderStatusChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'pie',
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

// Initialize Region Chart
function initializeRegionChart() {
    const ctx = document.getElementById('regionChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
            datasets: [{
                label: 'Sales by Region',
                data: [850000, 720000, 650000, 450000, 380000],
                backgroundColor: [
                    '#ff6b6b',
                    '#4ecdc4',
                    '#45b7d1',
                    '#96ceb4',
                    '#feca57'
                ],
                borderWidth: 0
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
            }
        }
    });
}

// Update charts based on date range
function updateCharts(dateRange) {
    let labels, data;
    
    switch(dateRange) {
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
    
    // Update revenue trend chart
    const revenueChart = Chart.getChart('revenueTrendChart');
    if (revenueChart) {
        revenueChart.data.labels = labels;
        revenueChart.data.datasets[0].data = data;
        revenueChart.update();
    }
}

// Update revenue trend chart by period
function updateRevenueTrendChart(period) {
    let labels, data;
    
    switch(period) {
        case 'daily':
            labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            data = [25000, 30000, 28000, 35000, 40000, 45000, 42000];
            break;
        case 'weekly':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            data = [180000, 200000, 220000, 245000];
            break;
        case 'monthly':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [120000, 150000, 180000, 200000, 220000, 245000, 230000, 260000, 280000, 300000, 320000, 350000];
            break;
        default:
            return;
    }
    
    const chart = Chart.getChart('revenueTrendChart');
    if (chart) {
        chart.data.labels = labels;
        chart.data.datasets[0].data = data;
        chart.update();
    }
}

// Update metrics
function updateMetrics() {
    // Animate metric numbers
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metric => {
        const finalValue = metric.textContent;
        animateMetricNumber(metric, finalValue);
    });
}

// Animate metric number
function animateMetricNumber(element, finalValue) {
    const isCurrency = finalValue.includes('₹');
    const isPercentage = finalValue.includes('%');
    
    let numericValue;
    if (isCurrency) {
        numericValue = parseInt(finalValue.replace(/[₹,]/g, ''));
    } else if (isPercentage) {
        numericValue = parseFloat(finalValue.replace('%', ''));
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
            displayValue = currentValue.toFixed(1) + '%';
        } else {
            displayValue = Math.floor(currentValue).toLocaleString();
        }
        
        element.textContent = displayValue;
    }, 20);
}

// Generate report
function generateReport() {
    showNotification('Generating comprehensive report...', 'info');
    
    setTimeout(() => {
        const reportData = {
            totalRevenue: '₹24,50,000',
            totalOrders: 1567,
            averageOrderValue: '₹15,650',
            conversionRate: '3.8%',
            topCategory: 'Bridal (35%)',
            topRegion: 'Mumbai (₹8,50,000)',
            customerSatisfaction: '4.8/5',
            growthRate: '+15.3%'
        };
        
        showNotification('Report generated successfully!', 'success');
        
        // In a real application, this would download the report
        console.log('Analytics Report:', reportData);
        
        // Create and download report
        downloadReport(reportData);
    }, 3000);
}

// Download report
function downloadReport(data) {
    const reportContent = `
Vandana Couture - Analytics Report
Generated on: ${new Date().toLocaleDateString()}

SUMMARY
=======
Total Revenue: ${data.totalRevenue}
Total Orders: ${data.totalOrders}
Average Order Value: ${data.averageOrderValue}
Conversion Rate: ${data.conversionRate}

TOP PERFORMERS
==============
Top Category: ${data.topCategory}
Top Region: ${data.topRegion}
Customer Satisfaction: ${data.customerSatisfaction}
Growth Rate: ${data.growthRate}

DETAILED ANALYSIS
================
Revenue Trend: Steady growth with seasonal peaks
Customer Demographics: 26-35 age group dominates (40%)
Order Status: 45% delivered, 25% processing
Geographic Performance: Mumbai leads with highest sales

RECOMMENDATIONS
==============
1. Focus on bridal collection expansion
2. Increase marketing in Delhi and Bangalore
3. Improve order processing efficiency
4. Enhance customer satisfaction initiatives
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_report_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Export analytics data
function exportAnalyticsData() {
    showNotification('Exporting analytics data...', 'info');
    
    setTimeout(() => {
        const analyticsData = {
            revenue: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                data: [120000, 150000, 180000, 200000, 220000, 245000, 230000, 260000, 280000, 300000, 320000, 350000]
            },
            categories: {
                labels: ['Bridal', 'Party Wear', 'Ethnic', 'Casual', 'Western'],
                data: [35, 25, 20, 15, 5]
            },
            demographics: {
                labels: ['18-25', '26-35', '36-45', '46-55', '55+'],
                data: [25, 40, 20, 10, 5]
            },
            regions: {
                labels: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad'],
                data: [850000, 720000, 650000, 450000, 380000]
            }
        };
        
        const csvContent = generateAnalyticsCSV(analyticsData);
        downloadCSV(csvContent, 'analytics_export.csv');
        showNotification('Analytics data exported successfully!', 'success');
    }, 1000);
}

// Generate analytics CSV
function generateAnalyticsCSV(data) {
    let csvContent = 'Category,Value\n';
    
    // Revenue data
    data.revenue.labels.forEach((label, index) => {
        csvContent += `Revenue ${label},${data.revenue.data[index]}\n`;
    });
    
    // Category data
    data.categories.labels.forEach((label, index) => {
        csvContent += `Category ${label},${data.categories.data[index]}\n`;
    });
    
    // Demographics data
    data.demographics.labels.forEach((label, index) => {
        csvContent += `Age ${label},${data.demographics.data[index]}\n`;
    });
    
    // Region data
    data.regions.labels.forEach((label, index) => {
        csvContent += `Region ${label},${data.regions.data[index]}\n`;
    });
    
    return csvContent;
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

// Real-time data updates simulation
function startRealTimeUpdates() {
    setInterval(() => {
        // Simulate real-time data updates
        updateMetrics();
        
        // Update charts with new data
        const revenueChart = Chart.getChart('revenueTrendChart');
        if (revenueChart) {
            const newData = revenueChart.data.datasets[0].data.map(value => {
                return value + Math.floor(Math.random() * 1000) - 500;
            });
            revenueChart.data.datasets[0].data = newData;
            revenueChart.update('none');
        }
    }, 30000); // Update every 30 seconds
}

// Show notification (using the one from admin.js)
function showNotification(message, type = 'info') {
    if (window.AdminDashboard && window.AdminDashboard.showNotification) {
        window.AdminDashboard.showNotification(message, type);
    } else {
        // Fallback notification
        alert(message);
    }
}

// Start real-time updates
startRealTimeUpdates(); 
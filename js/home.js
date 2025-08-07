// Home page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    let currentSlide = 0;
    let slideInterval;

    // Initialize carousel
    function initCarousel() {
        showSlide(currentSlide);
        startAutoSlide();
    }

    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide and activate corresponding dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Auto slide
    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Stop auto slide
    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    // Event listeners for carousel
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto slide on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);
    }

    // Initialize carousel
    initCarousel();

    // Category Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.getAttribute('data-category');
            
            // Filter products
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Pagination Functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const prevPaginationBtn = document.querySelector('.pagination-btn.prev');
    const nextPaginationBtn = document.querySelector('.pagination-btn.next');
    const paginationNumbers = document.querySelectorAll('.pagination-numbers .pagination-btn');
    
    let currentPage = 1;
    const itemsPerPage = 6;
    const totalItems = productCards.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        productCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update pagination buttons
        paginationNumbers.forEach((btn, index) => {
            btn.classList.remove('active');
            if (index + 1 === page) {
                btn.classList.add('active');
            }
        });
        
        // Update prev/next buttons
        prevPaginationBtn.disabled = page === 1;
        nextPaginationBtn.disabled = page === totalPages;
        
        currentPage = page;
    }

    // Initialize pagination
    if (paginationNumbers.length > 0) {
        showPage(1);
        
        // Event listeners for pagination numbers
        paginationNumbers.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                showPage(index + 1);
            });
        });
        
        // Event listeners for prev/next buttons
        if (prevPaginationBtn) {
            prevPaginationBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            });
        }
        
        if (nextPaginationBtn) {
            nextPaginationBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            });
        }
    }

    // Product Interactions
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    let cartCount = 0;

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            showNotification(`Quick view for ${productName} - ${productPrice}`, 'info');
        });
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            
            cartCount++;
            const cartCountElement = document.querySelector('.cart-count');
            if (cartCountElement) {
                cartCountElement.textContent = cartCount;
            }
            
            showNotification(`${productName} added to cart!`, 'success');
            
            // Add animation to cart icon
            const cartIcon = document.querySelector('.cart-icon');
            if (cartIcon) {
                cartIcon.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    cartIcon.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Cart functionality
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            window.location.href = 'cart.html';
        });
    }

    // Profile dropdown functionality
    const profileDropdown = document.querySelector('.profile-dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (profileDropdown) {
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('active');
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            }
        });

        // Toggle dropdown on click
        profileDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = profileDropdown.classList.contains('active');
            
            if (isActive) {
                profileDropdown.classList.remove('active');
                dropdownMenu.style.opacity = '0';
                dropdownMenu.style.visibility = 'hidden';
                dropdownMenu.style.transform = 'translateY(-10px)';
            } else {
                profileDropdown.classList.add('active');
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }
        });

        // Ensure dropdown links work properly
        const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-item');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Allow the link to work normally
                e.stopPropagation();
                // Close dropdown after clicking a link
                setTimeout(() => {
                    profileDropdown.classList.remove('active');
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(-10px)';
                }, 100);
            });
        });
    }

    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('Logging out...', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Carousel button functionality
    const carouselBtns = document.querySelectorAll('.carousel-btn');
    carouselBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Collection page coming soon!', 'info');
        });
    });

    // Service button functionality
    const serviceBtns = document.querySelectorAll('.service-btn');
    serviceBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Service details page coming soon!', 'info');
        });
    });

    // Pricing button functionality
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Booking system coming soon!', 'info');
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Statistics animation
    const statItems = document.querySelectorAll('.stat-item h3');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateNumber(target, 0, finalValue, 2000);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statItems.forEach(item => {
        observer.observe(item);
    });

    // Number animation function
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const difference = end - start;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (difference * progress));
            element.textContent = current + (element.textContent.includes('+') ? '+' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // Profile Page Functionality
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Profile updated successfully!', 'success');
        });
    }

    // Profile picture change functionality
    const changePictureBtn = document.querySelector('.change-picture-btn');
    if (changePictureBtn) {
        changePictureBtn.addEventListener('click', () => {
            showNotification('Profile picture upload feature coming soon!', 'info');
        });
    }

    // Orders Page Functionality
    const orderFilterBtns = document.querySelectorAll('.order-filters .filter-btn');
    const orderCards = document.querySelectorAll('.order-card');
    
    orderFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            orderFilterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const status = btn.getAttribute('data-status');
            
            // Filter orders
            orderCards.forEach(card => {
                const cardStatus = card.getAttribute('data-status');
                
                if (status === 'all' || cardStatus === status) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Order action buttons
    const trackOrderBtns = document.querySelectorAll('.btn-secondary');
    const writeReviewBtns = document.querySelectorAll('.btn-primary');
    
    trackOrderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Order tracking feature coming soon!', 'info');
        });
    });
    
    writeReviewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showNotification('Review system coming soon!', 'info');
        });
    });

    // Cart Page Functionality
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const removeItemBtns = document.querySelectorAll('.remove-item-btn');
    const clearCartBtn = document.querySelector('.clear-cart-btn');
    const applyCouponBtn = document.querySelector('.apply-coupon-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');

    // Quantity controls
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.getAttribute('data-item');
            const input = document.querySelector(`.quantity-input[data-item="${itemId}"]`);
            let value = parseInt(input.value);
            
            if (btn.classList.contains('minus') && value > 1) {
                value--;
            } else if (btn.classList.contains('plus') && value < 10) {
                value++;
            }
            
            input.value = value;
            updateCartItemTotal(itemId, value);
        });
    });

    // Quantity input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', () => {
            const itemId = input.getAttribute('data-item');
            const value = parseInt(input.value);
            updateCartItemTotal(itemId, value);
        });
    });

    // Remove item functionality
    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.getAttribute('data-item');
            const cartItem = btn.closest('.cart-item');
            
            cartItem.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                cartItem.remove();
                updateCartSummary();
            }, 300);
            
            showNotification('Item removed from cart', 'success');
        });
    });

    // Clear cart functionality
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => {
                item.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => {
                    item.remove();
                }, 300);
            });
            
            setTimeout(() => {
                updateCartSummary();
                showNotification('Cart cleared', 'success');
            }, 300);
        });
    }

    // Apply coupon functionality
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', () => {
            const couponCode = document.getElementById('couponCode').value;
            if (couponCode) {
                showNotification(`Coupon "${couponCode}" applied successfully!`, 'success');
            } else {
                showNotification('Please enter a coupon code', 'error');
            }
        });
    }

    // Checkout functionality
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            showNotification('Redirecting to checkout...', 'success');
            setTimeout(() => {
                showNotification('Checkout system coming soon!', 'info');
            }, 1500);
        });
    }

    // Continue shopping functionality
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

    // Recently viewed items
    const recentAddToCartBtns = document.querySelectorAll('.recent-item .add-to-cart-btn');
    recentAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemName = btn.closest('.recent-item').querySelector('h4').textContent;
            showNotification(`${itemName} added to cart!`, 'success');
        });
    });

    // Update cart item total
    function updateCartItemTotal(itemId, quantity) {
        const cartItem = document.querySelector(`[data-item="${itemId}"]`).closest('.cart-item');
        const priceElement = cartItem.querySelector('.item-price');
        const totalElement = cartItem.querySelector('.total-amount');
        
        const price = parseInt(priceElement.textContent.replace('₹', '').replace(',', ''));
        const total = price * quantity;
        
        totalElement.textContent = `₹${total.toLocaleString()}`;
        updateCartSummary();
    }

    // Update cart summary
    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const total = parseInt(item.querySelector('.total-amount').textContent.replace('₹', '').replace(',', ''));
            subtotal += total;
        });
        
        const shipping = 500;
        const tax = subtotal * 0.05; // 5% tax
        const discount = 2000;
        const total = subtotal + shipping + tax - discount;
        
        // Update summary display
        const summaryRows = document.querySelectorAll('.summary-row');
        if (summaryRows.length >= 4) {
            summaryRows[0].querySelector('span:last-child').textContent = `₹${subtotal.toLocaleString()}`;
            summaryRows[3].querySelector('span:last-child').textContent = `₹${total.toLocaleString()}`;
        }
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Set background color based on type
        switch (type) {
            case 'success':
                notification.style.background = '#4CAF50';
                break;
            case 'error':
                notification.style.background = '#f44336';
                break;
            case 'info':
                notification.style.background = '#2196F3';
                break;
            default:
                notification.style.background = '#333';
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('carousel-btn') && !this.classList.contains('carousel-arrow') && !this.classList.contains('filter-btn') && !this.classList.contains('pagination-btn') && !this.classList.contains('quick-view-btn') && !this.classList.contains('add-to-cart-btn') && !this.classList.contains('quantity-btn') && !this.classList.contains('remove-item-btn')) {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    });

    // Initialize tooltips for better UX
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = e.target.dataset.tooltip;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
        });
        
        element.addEventListener('mouseleave', () => {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    console.log('Vandana Couture - All pages loaded successfully!');
}); 
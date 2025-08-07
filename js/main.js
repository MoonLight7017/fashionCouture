// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle for all password fields
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Change icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form submission handling
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Google sign-in/sign-up button
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', handleGoogleAuth);
    }

    // Add input focus effects
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.parentElement.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

// Login form handler
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        return;
    }
    
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Signing In...';
    
    // Simulate API call
    setTimeout(() => {
        loginBtn.classList.remove('loading');
        loginBtn.textContent = 'LOGIN';
        
        // Success message (replace with actual authentication logic)
        showSuccess('Login successful!');
        
        // Redirect to home page after successful login
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }, 2000);
}

// Register form handler
function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Clear previous errors
    clearErrors();
    
    // Validation
    let hasErrors = false;
    
    if (fullname.trim().length < 2) {
        showError('fullname', 'Full name must be at least 2 characters');
        hasErrors = true;
    }
    
    if (!validateEmail(email)) {
        showError('email', 'Please enter a valid email address');
        hasErrors = true;
    }
    
    if (password.length < 6) {
        showError('password', 'Password must be at least 6 characters');
        hasErrors = true;
    }
    
    if (password !== confirmPassword) {
        showError('confirmPassword', 'Passwords do not match');
        hasErrors = true;
    }
    
    if (hasErrors) return;
    
    // Show loading state
    const registerBtn = document.querySelector('.register-btn');
    registerBtn.classList.add('loading');
    registerBtn.textContent = 'Creating Account...';
    
    // Simulate API call
    setTimeout(() => {
        registerBtn.classList.remove('loading');
        registerBtn.textContent = 'SIGN UP';
        
        // Success message (replace with actual registration logic)
        showSuccess('Account created successfully!');
        
        // Redirect to home page after successful registration
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 2000);
    }, 2000);
}

// Google authentication handler
function handleGoogleAuth() {
    const googleBtn = document.querySelector('.google-btn');
    const originalText = googleBtn.innerHTML;
    
    googleBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Connecting...</span>';
    googleBtn.style.pointerEvents = 'none';
    
    // Simulate Google OAuth process
    setTimeout(() => {
        googleBtn.innerHTML = originalText;
        googleBtn.style.pointerEvents = 'auto';
        
        // Replace with actual Google OAuth implementation
        showSuccess('Google authentication would be implemented here');
    }, 2000);
}

// Validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateField(input) {
    const fieldName = input.id;
    const value = input.value.trim();
    
    switch (fieldName) {
        case 'email':
            if (value && !validateEmail(value)) {
                showError(fieldName, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'password':
            if (value && value.length < 6) {
                showError(fieldName, 'Password must be at least 6 characters');
                return false;
            }
            break;
        case 'confirmPassword':
            const password = document.getElementById('password').value;
            if (value && value !== password) {
                showError(fieldName, 'Passwords do not match');
                return false;
            }
            break;
    }
    
    // Clear error if validation passes
    clearFieldError(fieldName);
    return true;
}

// Error handling functions
function showError(fieldName, message) {
    const input = document.getElementById(fieldName);
    const inputGroup = input.parentElement;
    
    inputGroup.classList.add('error');
    inputGroup.classList.remove('success');
    
    // Remove existing error message
    const existingError = inputGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 12px;
        margin-top: 5px;
        font-weight: 500;
    `;
    
    inputGroup.appendChild(errorDiv);
}

function clearFieldError(fieldName) {
    const input = document.getElementById(fieldName);
    const inputGroup = input.parentElement;
    
    inputGroup.classList.remove('error');
    const errorMessage = inputGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorGroups = document.querySelectorAll('.input-group.error');
    
    errorMessages.forEach(msg => msg.remove());
    errorGroups.forEach(group => group.classList.remove('error'));
}

// Success message function
function showSuccess(message) {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
        z-index: 1000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .input-group.focused .input-underline {
        background: linear-gradient(90deg, #4CAF50, #45a049);
        box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
    }
`;
document.head.appendChild(style);

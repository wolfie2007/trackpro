// Authentication Form Handler

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;
        const loginMessage = document.getElementById('loginMessage');
        
        // Validate inputs
        if (!email || !password) {
            showMessage(loginMessage, 'Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(loginMessage, 'Please enter a valid email address', 'error');
            return;
        }

        // Simulate login (In a real application, this would send data to a server)
        loginMessage.textContent = 'Logging in...';
        loginMessage.classList.add('auth-message');
        loginMessage.style.display = 'block';
        loginMessage.style.color = '#155724';
        loginMessage.style.backgroundColor = '#d4edda';

        setTimeout(() => {
            // Store user data in localStorage
            const userData = {
                email: email,
                loginTime: new Date().toLocaleString()
            };
            
            if (remember) {
                localStorage.setItem('rememberMe', email);
            }
            
            localStorage.setItem('userLoggedIn', JSON.stringify(userData));
            
            showMessage(loginMessage, '✓ Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1000);
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const address = document.getElementById('address').value;
        const agree = document.getElementById('agree').checked;
        const signupMessage = document.getElementById('signupMessage');
        
        // Validate all fields
        if (!firstName || !lastName || !email || !phone || !password || !confirmPassword || !address) {
            showMessage(signupMessage, 'Please fill in all fields', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage(signupMessage, 'Please enter a valid email address', 'error');
            return;
        }

        // Phone validation (basic)
        const phoneRegex = /^[0-9\-\+\(\)\s]{10,}$/;
        if (!phoneRegex.test(phone)) {
            showMessage(signupMessage, 'Please enter a valid phone number', 'error');
            return;
        }

        // Password strength validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            showMessage(signupMessage, 'Password must be at least 8 characters with uppercase, lowercase, and numbers', 'error');
            return;
        }

        // Password match validation
        if (password !== confirmPassword) {
            showMessage(signupMessage, 'Passwords do not match', 'error');
            return;
        }

        // Terms agreement
        if (!agree) {
            showMessage(signupMessage, 'Please agree to the Terms and Conditions', 'error');
            return;
        }

        // Simulate signup (In a real application, this would send data to a server)
        showMessage(signupMessage, 'Creating your account...', 'success');
        
        setTimeout(() => {
            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                signupDate: new Date().toLocaleString()
            };
            
            // Store user data in localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userLoggedIn', JSON.stringify(userData));
            
            showMessage(signupMessage, '✓ Account created successfully! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 1000);
    });
}

// Helper function to display messages
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = 'auth-message ' + type;
    element.style.display = 'block';
}

// Loading bar animation
function showLoadingBar() {
    const loadingBar = document.getElementById('loadingBar');
    if (loadingBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 90) progress = 90;
            loadingBar.style.width = progress + '%';
            
            if (progress >= 90) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingBar.style.width = '100%';
                    setTimeout(() => {
                        loadingBar.style.opacity = '0';
                    }, 500);
                }, 200);
            }
        }, 200);
    }
}

// Run loading bar on page load
document.addEventListener('DOMContentLoaded', showLoadingBar);

// Social login buttons (placeholder functionality)
const socialButtons = document.querySelectorAll('.btn-social');
socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Social login integration would be implemented here');
    });
});

// Check if user is already logged in and redirect
document.addEventListener('DOMContentLoaded', function() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    
    // If user tries to access login/signup pages while logged in
    if (userLoggedIn && (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html'))) {
        // Optionally redirect to home page if already logged in
        // window.location.href = 'index.html';
    }
});

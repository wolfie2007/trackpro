// account.js - TrackPro Account Management

// Sample shipping history database (in real app, this would come from backend)
const userShippingHistory = [
    {
        trackingNumber: 'TRK123456789',
        date: '2025-12-18',
        sender: 'ABC Electronics Store, Karachi',
        receiver: 'Ahmed Khan, Lahore',
        status: 'In Transit',
        statusClass: 'status-transit',
        estimatedDelivery: '2025-12-20'
    },
    {
        trackingNumber: 'TRK987654321',
        date: '2025-12-19',
        sender: 'Fashion Hub, Islamabad',
        receiver: 'Fatima Ahmed, Rawalpindi',
        status: 'Dispatched',
        statusClass: 'status-transit',
        estimatedDelivery: '2025-12-21'
    },
    {
        trackingNumber: 'TRK111222333',
        date: '2025-12-15',
        sender: 'Book Store, Lahore',
        receiver: 'Ali Raza, Karachi',
        status: 'Delivered',
        statusClass: 'status-delivered',
        estimatedDelivery: '2025-12-17'
    },
    {
        trackingNumber: 'TRK444555666',
        date: '2025-12-10',
        sender: 'Tech World, Faisalabad',
        receiver: 'Sara Khan, Multan',
        status: 'Delivered',
        statusClass: 'status-delivered',
        estimatedDelivery: '2025-12-12'
    },
    {
        trackingNumber: 'TRK777888999',
        date: '2025-12-20',
        sender: 'Sports Store, Peshawar',
        receiver: 'Usman Ali, Quetta',
        status: 'Processing',
        statusClass: 'status-pending',
        estimatedDelivery: '2025-12-23'
    }
];

// Check if user is logged in
function checkAuth() {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    
    if (!userLoggedIn) {
        // Redirect to login if not logged in
        alert('Please login to access your account');
        window.location.href = 'login.html';
        return null;
    }
    
    return JSON.parse(userLoggedIn);
}

// Load user data and populate profile
function loadUserData() {
    const userData = checkAuth();
    if (!userData) return;

    // Get additional user data if available
    const storedUserData = localStorage.getItem('userData');
    const fullUserData = storedUserData ? JSON.parse(storedUserData) : userData;

    // Update profile sidebar
    const firstName = fullUserData.firstName || userData.email.split('@')[0];
    const lastName = fullUserData.lastName || '';
    const fullName = `${firstName} ${lastName}`.trim();
    
    document.getElementById('profileName').textContent = fullName || 'User';
    document.getElementById('profileEmail').textContent = fullUserData.email || userData.email;
    
    // Update avatar with first letter
    const initials = firstName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '');
    document.getElementById('profileAvatar').textContent = initials || '👤';

    // Update profile section
    document.getElementById('displayName').textContent = fullName || '-';
    document.getElementById('displayEmail').textContent = fullUserData.email || '-';
    document.getElementById('displayPhone').textContent = fullUserData.phone || '-';
    document.getElementById('displayAddress').textContent = fullUserData.address || '-';
    document.getElementById('displaySignupDate').textContent = fullUserData.signupDate || userData.loginTime || '-';

    // Populate edit form
    document.getElementById('editFirstName').value = fullUserData.firstName || '';
    document.getElementById('editLastName').value = fullUserData.lastName || '';
    document.getElementById('editPhone').value = fullUserData.phone || '';
    document.getElementById('editAddress').value = fullUserData.address || '';

    // Load dashboard stats
    loadDashboardStats();
    
    // Load shipping history
    loadShippingHistory();
}

// Load dashboard statistics
function loadDashboardStats() {
    const totalShipments = userShippingHistory.length;
    const activeShipments = userShippingHistory.filter(s => 
        s.status !== 'Delivered'
    ).length;
    const deliveredShipments = userShippingHistory.filter(s => 
        s.status === 'Delivered'
    ).length;

    document.getElementById('totalShipments').textContent = totalShipments;
    document.getElementById('activeShipments').textContent = activeShipments;
    document.getElementById('deliveredShipments').textContent = deliveredShipments;

    // Load recent activity
    loadRecentActivity();
}

// Load recent activity
function loadRecentActivity() {
    const recentActivityContainer = document.getElementById('recentActivity');
    const recentItems = userShippingHistory.slice(0, 3); // Get last 3 items

    if (recentItems.length === 0) {
        recentActivityContainer.innerHTML = `
            <div class="empty-state">
                <div class="icon">📦</div>
                <h3>No Recent Activity</h3>
                <p>Start tracking your parcels to see activity here</p>
            </div>
        `;
        return;
    }

    let html = '<table class="history-table"><thead><tr><th>Tracking #</th><th>Status</th><th>Date</th><th>Action</th></tr></thead><tbody>';
    
    recentItems.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.trackingNumber}</strong></td>
                <td><span class="status-badge-history ${item.statusClass}">${item.status}</span></td>
                <td>${formatDate(item.date)}</td>
                <td><a href="index.html#track" class="btn-track-again" onclick="setTrackingNumber('${item.trackingNumber}')">Track</a></td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    recentActivityContainer.innerHTML = html;
}

// Load full shipping history
function loadShippingHistory() {
    const historyContainer = document.getElementById('historyContent');

    if (userShippingHistory.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <div class="icon">📦</div>
                <h3>No Shipping History</h3>
                <p>You haven't tracked any parcels yet. Start tracking to see your history here!</p>
                <a href="index.html#track" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: var(--primary-color); color: var(--yellow-accent); border-radius: 8px; text-decoration: none; font-weight: 700;">Track a Parcel</a>
            </div>
        `;
        return;
    }

    let html = `
        <table class="history-table">
            <thead>
                <tr>
                    <th>Tracking Number</th>
                    <th>Date</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                    <th>Est. Delivery</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
    `;

    userShippingHistory.forEach(item => {
        html += `
            <tr>
                <td><strong>${item.trackingNumber}</strong></td>
                <td>${formatDate(item.date)}</td>
                <td>${item.sender.split(',')[0]}</td>
                <td>${item.receiver.split(',')[0]}</td>
                <td><span class="status-badge-history ${item.statusClass}">${item.status}</span></td>
                <td>${formatDate(item.estimatedDelivery)}</td>
                <td>
                    <a href="index.html#track" class="btn-track-again" onclick="setTrackingNumber('${item.trackingNumber}')">
                        Track Again
                    </a>
                </td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    historyContainer.innerHTML = html;
}

// Menu navigation
document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all links
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        this.classList.add('active');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const sectionId = this.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
    });
});

// Edit profile form submission
document.getElementById('editProfileForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('editFirstName').value;
    const lastName = document.getElementById('editLastName').value;
    const phone = document.getElementById('editPhone').value;
    const address = document.getElementById('editAddress').value;
    
    // Get existing user data
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn') || '{}');
    
    // Update user data
    userData.firstName = firstName;
    userData.lastName = lastName;
    userData.phone = phone;
    userData.address = address;
    
    userLoggedIn.firstName = firstName;
    userLoggedIn.lastName = lastName;
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));
    
    // Reload user data
    loadUserData();
    
    alert('✓ Profile updated successfully!');
});

// Change password form submission
document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;
    
    // Validate new password
    if (newPassword !== confirmNewPassword) {
        alert('New passwords do not match!');
        return;
    }
    
    // Password strength validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
        alert('Password must be at least 8 characters with uppercase, lowercase, and numbers');
        return;
    }
    
    // In a real app, this would verify current password and update on server
    alert('✓ Password changed successfully!');
    
    // Clear form
    this.reset();
});

// Save notification settings
function saveSettings() {
    const emailNotif = document.getElementById('emailNotif').checked;
    const smsNotif = document.getElementById('smsNotif').checked;
    const pushNotif = document.getElementById('pushNotif').checked;
    
    const settings = {
        emailNotifications: emailNotif,
        smsNotifications: smsNotif,
        pushNotifications: pushNotif
    };
    
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
    
    alert('✓ Notification preferences saved!');
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('userLoggedIn');
        localStorage.removeItem('rememberMe');
        alert('You have been logged out successfully');
        window.location.href = 'login.html';
    }
}

// Set tracking number in localStorage and redirect
function setTrackingNumber(trackingNumber) {
    localStorage.setItem('pendingTrackingNumber', trackingNumber);
}

// Format date helper
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    loadUserData();
    
    // Load notification settings if available
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        document.getElementById('emailNotif').checked = settings.emailNotifications;
        document.getElementById('smsNotif').checked = settings.smsNotifications;
        document.getElementById('pushNotif').checked = settings.pushNotifications;
    }
});
// Function to generate and download PDF account statement
function downloadAccountStatement() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Get user data from localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const trackingHistory = JSON.parse(localStorage.getItem('trackingHistory') || '[]');
    
    // Add logo/header
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 215, 0);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('📦 TrackPro', 20, 25);
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text('Account Statement', 20, 33);
    
    // Date
    const today = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.setTextColor(255, 215, 0);
    doc.text(`Generated: ${today}`, 150, 25);
    
    // Account Information Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Account Information', 20, 55);
    
    doc.setDrawColor(255, 215, 0);
    doc.setLineWidth(0.5);
    doc.line(20, 58, 190, 58);
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    let yPos = 68;
    
    doc.setFont(undefined, 'bold');
    doc.text('Name:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(`${currentUser.firstName || 'N/A'} ${currentUser.lastName || ''}`, 60, yPos);
    
    yPos += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Email:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(currentUser.email || 'N/A', 60, yPos);
    
    yPos += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Phone:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(currentUser.phone || 'N/A', 60, yPos);
    
    yPos += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Address:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(currentUser.address || 'N/A', 60, yPos);
    
    yPos += 8;
    doc.setFont(undefined, 'bold');
    doc.text('Member Since:', 20, yPos);
    doc.setFont(undefined, 'normal');
    doc.text(currentUser.signupDate || 'N/A', 60, yPos);
    
    // Statistics Section
    yPos += 20;
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Shipment Statistics', 20, yPos);
    
    doc.setDrawColor(255, 215, 0);
    doc.line(20, yPos + 3, 190, yPos + 3);
    
    yPos += 13;
    const totalShipments = trackingHistory.length;
    const activeShipments = trackingHistory.filter(t => 
        t.status !== 'Delivered' && t.status !== 'delivered'
    ).length;
    const deliveredShipments = trackingHistory.filter(t => 
        t.status === 'Delivered' || t.status === 'delivered'
    ).length;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Shipments: ${totalShipments}`, 20, yPos);
    yPos += 8;
    doc.text(`Active Shipments: ${activeShipments}`, 20, yPos);
    yPos += 8;
    doc.text(`Delivered Shipments: ${deliveredShipments}`, 20, yPos);
    
    // Shipping History Section
    if (trackingHistory.length > 0) {
        yPos += 20;
        doc.setFontSize(16);
        doc.setFont(undefined, 'bold');
        doc.text('Shipping History', 20, yPos);
        
        doc.setDrawColor(255, 215, 0);
        doc.line(20, yPos + 3, 190, yPos + 3);
        
        yPos += 13;
        doc.setFontSize(10);
        
        trackingHistory.forEach((item, index) => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            
            doc.setFont(undefined, 'bold');
            doc.text(`${index + 1}. ${item.trackingNumber || 'N/A'}`, 20, yPos);
            yPos += 6;
            
            doc.setFont(undefined, 'normal');
            doc.text(`Status: ${item.status || 'N/A'}`, 25, yPos);
            yPos += 5;
            doc.text(`Date: ${item.date || 'N/A'}`, 25, yPos);
            yPos += 5;
            doc.text(`Location: ${item.location || 'N/A'}`, 25, yPos);
            yPos += 10;
        });
    }
    
    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFillColor(0, 0, 0);
        doc.rect(0, 282, 210, 15, 'F');
        doc.setTextColor(255, 215, 0);
        doc.setFontSize(9);
        doc.text('© 2025 TrackPro | ICT FP Meerub, Waqas, Saaib', 105, 290, { align: 'center' });
        doc.text(`Page ${i} of ${pageCount}`, 190, 290, { align: 'right' });
    }
    
    // Save the PDF
    const fileName = `TrackPro_Statement_${currentUser.firstName || 'Account'}_${new Date().getTime()}.pdf`;
    doc.save(fileName);
    
    // Show success message
    alert('✅ Account statement downloaded successfully!');
}

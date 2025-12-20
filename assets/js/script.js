// Sample Tracking Data Database
const trackingDatabase = {
    'TRK123456789': {
        trackingNumber: 'TRK123456789',
        sender: 'ABC Electronics Store, Karachi',
        receiver: 'Ahmed Khan, Lahore',
        weight: '2.5 kg',
        serviceType: 'Express Delivery',
        destination: 'Lahore, Punjab',
        origin: 'Karachi, Sindh',
        estimatedDelivery: '2 days',
        currentStatus: 'In Transit',
        statusEmoji: '🚚',
        progressPercentage: 65,
        timeline: [
            {
                status: 'Order Placed',
                location: 'Karachi, Sindh',
                time: '2025-12-18 09:30 AM',
                completed: true,
                current: false
            },
            {
                status: 'Picked Up',
                location: 'Karachi Warehouse',
                time: '2025-12-18 02:45 PM',
                completed: true,
                current: false
            },
            {
                status: 'In Transit',
                location: 'On Highway to Lahore',
                time: '2025-12-19 06:15 AM',
                completed: true,
                current: true
            },
            {
                status: 'In Local Delivery',
                location: 'Lahore Distribution Center',
                time: 'Expected by 2025-12-20 08:00 AM',
                completed: false,
                current: false
            },
            {
                status: 'Delivered',
                location: 'Ahmed Khan, Lahore',
                time: 'Expected by 2025-12-20 06:00 PM',
                completed: false,
                current: false
            }
        ]
    },
    'TRK987654321': {
        trackingNumber: 'TRK987654321',
        sender: 'Fashion Hub, Islamabad',
        receiver: 'Fatima Ahmed, Rawalpindi',
        weight: '1.2 kg',
        serviceType: 'Standard Delivery',
        destination: 'Rawalpindi, Punjab',
        origin: 'Islamabad, Islamabad Capital Territory',
        estimatedDelivery: '3 days',
        currentStatus: 'Dispatched',
        statusEmoji: '📦',
        progressPercentage: 30,
        timeline: [
            {
                status: 'Order Placed',
                location: 'Islamabad, Islamabad Capital Territory',
                time: '2025-12-19 11:20 AM',
                completed: true,
                current: false
            },
            {
                status: 'Dispatched',
                location: 'Islamabad Warehouse',
                time: '2025-12-19 04:30 PM',
                completed: true,
                current: true
            },
            {
                status: 'In Transit',
                location: 'On Way to Rawalpindi',
                time: 'Expected by 2025-12-20 09:00 AM',
                completed: false,
                current: false
            },
            {
                status: 'Out for Delivery',
                location: 'Rawalpindi Local Hub',
                time: 'Expected by 2025-12-20 03:00 PM',
                completed: false,
                current: false
            },
            {
                status: 'Delivered',
                location: 'Fatima Ahmed, Rawalpindi',
                time: 'Expected by 2025-12-21 08:00 PM',
                completed: false,
                current: false
            }
        ]
    },
    'TRK555555555': {
        trackingNumber: 'TRK555555555',
        sender: 'Tech Store, Multan',
        receiver: 'Hassan Raza, Faisalabad',
        weight: '3.8 kg',
        serviceType: 'Standard Delivery',
        destination: 'Faisalabad, Punjab',
        origin: 'Multan, Punjab',
        estimatedDelivery: '4 days',
        currentStatus: 'Out for Delivery',
        statusEmoji: '🚚',
        progressPercentage: 85,
        timeline: [
            {
                status: 'Order Placed',
                location: 'Multan, Punjab',
                time: '2025-12-17 10:15 AM',
                completed: true,
                current: false
            },
            {
                status: 'Picked Up',
                location: 'Multan Warehouse',
                time: '2025-12-17 05:00 PM',
                completed: true,
                current: false
            },
            {
                status: 'In Transit',
                location: 'Highway Route',
                time: '2025-12-18 07:30 AM',
                completed: true,
                current: false
            },
            {
                status: 'Reached City',
                location: 'Faisalabad Distribution Center',
                time: '2025-12-19 01:45 PM',
                completed: true,
                current: false
            },
            {
                status: 'Out for Delivery',
                location: 'Faisalabad Local Hub',
                time: '2025-12-20 08:00 AM',
                completed: true,
                current: true
            },
            {
                status: 'Delivered',
                location: 'Hassan Raza, Faisalabad',
                time: 'Expected by 2025-12-20 05:00 PM',
                completed: false,
                current: false
            }
        ]
    }
};

// DOM Elements
const trackingForm = document.getElementById('trackingForm');
const trackingInput = document.getElementById('trackingInput');
const resultsContainer = document.getElementById('resultsContainer');
const errorMessage = document.getElementById('errorMessage');
const loadingBar = document.getElementById('loadingBar');
const searchButton = trackingForm.querySelector('.btn-search');

// Event Listeners
trackingForm.addEventListener('submit', handleTracking);

// Make sample tracking numbers clickable
document.querySelectorAll('.sample-numbers strong').forEach(element => {
    element.addEventListener('click', function () {
        trackingInput.value = this.textContent;
        trackingForm.dispatchEvent(new Event('submit'));
    });
});

// Show Loading Bar
function showLoadingBar() {
    loadingBar.classList.add('show');
    loadingBar.classList.remove('complete');
}

// Complete Loading Bar
function completeLoadingBar() {
    loadingBar.classList.add('complete');
    setTimeout(() => {
        loadingBar.classList.remove('show');
        loadingBar.classList.remove('complete');
    }, 600);
}

// Handle Tracking Form Submission
function handleTracking(e) {
    e.preventDefault();
    const trackingNumber = trackingInput.value.trim().toUpperCase();

    // Show loading bar and disable button
    showLoadingBar();
    searchButton.classList.add('loading');
    searchButton.disabled = true;

    // Reset error message
    errorMessage.classList.remove('show');
    errorMessage.textContent = '';

    // Simulate search delay
    setTimeout(() => {
        // Validate tracking number
        if (!trackingNumber) {
            showError('Please enter a tracking number');
            completeLoadingBar();
            searchButton.classList.remove('loading');
            searchButton.disabled = false;
            return;
        }

        // Check if tracking number exists
        if (!trackingDatabase[trackingNumber]) {
            showError(`Tracking number "${trackingNumber}" not found. Try Again with a valid number.`);
            completeLoadingBar();
            searchButton.classList.remove('loading');
            searchButton.disabled = false;
            return;
        }

        // Display results
        displayTrackingResults(trackingNumber);
        completeLoadingBar();
        searchButton.classList.remove('loading');
        searchButton.disabled = false;
    }, 1500);

// Show Error Message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    resultsContainer.classList.add('hidden');
}

// Display Tracking Results
function displayTrackingResults(trackingNumber) {
    const data = trackingDatabase[trackingNumber];

    // Update header
    document.getElementById('packageTitle').textContent = `Package #${trackingNumber}`;
    document.getElementById('packageStatus').textContent = `Status: ${data.currentStatus}`;
    document.getElementById('statusEmoji').textContent = data.statusEmoji;
    document.getElementById('statusText').textContent = data.currentStatus;

    // Update info cards
    document.getElementById('currentLocation').textContent = data.timeline[data.timeline.length - 2]?.location || data.origin;
    document.getElementById('deliveryStatus').textContent = data.currentStatus;
    document.getElementById('estimatedDelivery').textContent = data.estimatedDelivery;
    document.getElementById('lastUpdated').textContent = new Date().toLocaleString();

    // Update package details
    document.getElementById('detailTrackingNo').textContent = data.trackingNumber;
    document.getElementById('detailSender').textContent = data.sender;
    document.getElementById('detailReceiver').textContent = data.receiver;
    document.getElementById('detailWeight').textContent = data.weight;
    document.getElementById('detailService').textContent = data.serviceType;
    document.getElementById('detailDestination').textContent = data.destination;

    // Update timeline
    updateTimeline(data.timeline);

    // Update route
    document.getElementById('routeFrom').textContent = data.origin;
    document.getElementById('routeTo').textContent = data.destination;
    document.getElementById('routeProgress').style.width = data.progressPercentage + '%';

    // Show results container
    resultsContainer.classList.remove('hidden');

    // Scroll to results
    setTimeout(() => {
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// Update Timeline Display
function updateTimeline(timeline) {
    const timelineElement = document.getElementById('timeline');
    timelineElement.innerHTML = '';

    timeline.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.completed ? 'completed' : ''} ${item.current ? 'current' : ''} ${!item.completed && !item.current ? 'pending' : ''}`;

        const statusIcon = item.completed ? '✓' : item.current ? '⏳' : '○';

        timelineItem.innerHTML = `
            <div class="timeline-dot">${statusIcon}</div>
            <div class="timeline-content">
                <div class="timeline-status">${item.status}</div>
                <div class="timeline-location">📍 ${item.location}</div>
                <div class="timeline-time">🕐 ${item.time}</div>
            </div>
        `;

        timelineElement.appendChild(timelineItem);
    });
}

// Reset Tracking
function resetTracking() {
    trackingInput.value = '';
    resultsContainer.classList.add('hidden');
    errorMessage.classList.remove('show');
    
    // Scroll back to search box smoothly
    const searchBox = document.querySelector('.search-box');
    if (searchBox) {
        searchBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Focus on input after a short delay
    setTimeout(() => {
        trackingInput.focus();
    }, 500);
}

// Save Notifications
function saveNotifications() {
    const checkboxes = document.querySelectorAll('.notification-checkbox:checked');
    const selectedOptions = Array.from(checkboxes).map(cb => cb.parentElement.textContent.trim());

    if (selectedOptions.length === 0) {
        alert('Please select at least one notification option');
        return;
    }

    alert(`Notification preferences saved!\n\nYou will receive updates via:\n• ${selectedOptions.join('\n• ')}`);
}

// Initialize animations and load tracking data on page load
document.addEventListener('DOMContentLoaded', function () {
    console.log('TrackPro Application Loaded Successfully');
    console.log('Available Test Tracking Numbers:', Object.keys(trackingDatabase));

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Add loading animation to tracking input
    trackingInput.addEventListener('focus', function () {
        this.style.borderColor = 'var(--primary-color)';
    });

    trackingInput.addEventListener('blur', function () {
        this.style.borderColor = 'var(--border-gray)';
    });
});

// Simulate real-time updates (optional feature)
function simulateRealTimeUpdate() {
    // This function can be called to simulate real-time updates
    // In a real application, this would fetch data from a server using WebSockets or polling
    console.log('Real-time update simulation activated');
}

// Format Date Helper
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
}

// Export tracking data (optional feature)
function exportTrackingData(trackingNumber) {
    const data = trackingDatabase[trackingNumber];
    if (!data) return;

    const csvContent = `
Tracking Number, ${data.trackingNumber}
Status, ${data.currentStatus}
Sender, ${data.sender}
Receiver, ${data.receiver}
Weight, ${data.weight}
Service Type, ${data.serviceType}
Destination, ${data.destination}
Estimated Delivery, ${data.estimatedDelivery}
    `;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tracking-${trackingNumber}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Print tracking information
function printTracking(trackingNumber) {
    const data = trackingDatabase[trackingNumber];
    if (!data) return;

    const printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>Tracking Report - ${trackingNumber}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2563eb; }
                    .detail { margin: 10px 0; }
                    .label { font-weight: bold; }
                </style>
            </head>
            <body>
                <h1>TrackPro - Tracking Report</h1>
                <div class="detail"><span class="label">Tracking Number:</span> ${data.trackingNumber}</div>
                <div class="detail"><span class="label">Current Status:</span> ${data.currentStatus}</div>
                <div class="detail"><span class="label">Sender:</span> ${data.sender}</div>
                <div class="detail"><span class="label">Receiver:</span> ${data.receiver}</div>
                <div class="detail"><span class="label">Weight:</span> ${data.weight}</div>
                <div class="detail"><span class="label">Service:</span> ${data.serviceType}</div>
                <div class="detail"><span class="label">Estimated Delivery:</span> ${data.estimatedDelivery}</div>
                <hr>
                <h3>Timeline</h3>
                ${data.timeline.map(item => `
                    <div class="detail">
                        <strong>${item.status}</strong><br>
                        Location: ${item.location}<br>
                        Time: ${item.time}
                    </div>
                `).join('')}
            </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}}

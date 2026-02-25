/**
 * precision-auth.js
 * Central authentication script for the ACE Bank Precision Redesign pages.
 * Integrates with ace-db.js to protect pages and inject session data.
 */

// Format numbers as INR currency
function formatINR(amount) {
    if (amount === undefined || amount === null) return "₹ 0.00";
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Ensure the user is logged in
function checkAuth() {
    if (typeof DB === 'undefined') {
        console.error('ace-db.js is not loaded before precision-auth.js');
        return;
    }

    // Check if session exists in DB
    if (!DB.isLoggedIn()) {
        console.warn('User is not logged in, redirecting to login.jsp');
        window.location.href = 'login.jsp?error=unauthorized';
        return;
    }

    // User is logged in, grab details
    const account = DB.getLoggedInAccount();
    if (account) {
        populateUserData(account);
    }
}

// Populate UI tags with account information
function populateUserData(account) {
    // Helper to set text content if element exists
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    };

    // User Data Fields
    const fullName = account.firstName + ' ' + account.lastName;

    // Sidebar Fields (common to all pages)
    setText('sidebar-user-name', fullName);
    setText('sidebar-account-no', 'AC: ' + String(account.accountNumber).padStart(8, '0'));

    // Dashboard Specific Fields
    setText('dashboard-user-greeting', 'Welcome back, ' + account.firstName);
    setText('dashboard-balance', formatINR(account.balance));

    // Profile Specific Fields
    setText('profile-name', fullName);
    setText('profile-email', account.email);
    setText('profile-account-type', account.accountType || 'Savings Account');

    console.log('[ACE CRM] Successfully loaded user session for:', account.accountNumber);
}

// Perform Logout and clear session
function performLogout() {
    if (typeof DB !== 'undefined') {
        DB.logout();
    }
    window.location.href = 'login.jsp';
}

// Execute check immediately upon script load for protected pages
document.addEventListener('DOMContentLoaded', () => {
    // Only check auth if we are not on the login page itself
    if (!window.location.pathname.includes('login.jsp')) {
        checkAuth();
    }
});

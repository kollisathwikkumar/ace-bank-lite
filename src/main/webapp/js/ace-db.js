/* ═══════════════════════════════════════════════════════════
   ACE BANK — API Client (calls Java Servlet backend → MySQL)
   Session kept in localStorage, accounts live in MySQL.
   ═══════════════════════════════════════════════════════════ */
'use strict';

class ACEBankDB {

    constructor() {
        this.SESSION_KEY = 'ace_bank_session';
    }

    // ── SESSION (localStorage only) ───────────────────
    _getSession() {
        try { return JSON.parse(localStorage.getItem(this.SESSION_KEY) || 'null'); }
        catch (e) { return null; }
    }

    _saveSession(data) {
        var session = {
            accountNumber: data.accountNumber,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            balance: data.balance || 0,
            loginTime: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        };
        localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
        return session;
    }

    _clearSession() {
        localStorage.removeItem(this.SESSION_KEY);
    }

    // ── API CALLS ─────────────────────────────────────

    /** Sign up — POST /api/signup */
    async createAccount(formData) {
        try {
            var response = await fetch('/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    aadhaar: formData.aadhaar || '',
                    email: formData.email,
                    phone: formData.phone || '',
                    password: formData.password
                })
            });
            var result = await response.json();
            if (result.success) {
                // Auto-save session with returned data
                this._saveSession({
                    accountNumber: result.accountNumber,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    balance: 0
                });
                return {
                    success: true,
                    account: {
                        accountNumber: result.accountNumber,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        email: result.email,
                        balance: 0,
                        accountType: formData.accountType || 'Savings',
                        id: 'ACE-' + new Date().getFullYear() + '-' + String(result.accountNumber)
                    },
                    message: 'Account created! Your Account Number is ' + result.accountNumber
                };
            } else {
                return { success: false, error: result.message || 'Registration failed.' };
            }
        } catch (err) {
            return { success: false, error: 'Could not reach server. Please try again.' };
        }
    }

    /** Login — POST /api/login */
    async login(email, password) {
        try {
            var response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            });
            var result = await response.json();
            if (result.success) {
                var session = this._saveSession({
                    accountNumber: result.accountNumber,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    balance: result.balance || 0
                });
                return {
                    success: true,
                    account: {
                        accountNumber: result.accountNumber,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        fullName: result.firstName + ' ' + result.lastName,
                        email: result.email,
                        balance: result.balance || 0,
                        accountType: 'Savings',
                        status: 'active',
                        createdAt: session.loginTime,
                        cardType: 'Visa Classic',
                        cardExpiry: '12/28',
                        tier: 'Silver',
                        creditScore: 700,
                        creditHistory: [700],
                        transactions: [],
                        goals: []
                    }
                };
            } else {
                return { success: false, error: result.message || 'Login failed.' };
            }
        } catch (err) {
            return { success: false, error: 'Could not reach server. Please try again.' };
        }
    }

    /** Login with phone — POST /api/login */
    async loginWithPhone(phone, password) {
        try {
            var response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone, password: password })
            });
            var result = await response.json();
            if (result.success) {
                var session = this._saveSession({
                    accountNumber: result.accountNumber,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    balance: result.balance || 0
                });
                return {
                    success: true,
                    account: {
                        accountNumber: result.accountNumber,
                        firstName: result.firstName,
                        lastName: result.lastName,
                        fullName: result.firstName + ' ' + result.lastName,
                        email: result.email,
                        balance: result.balance || 0
                    }
                };
            } else {
                return { success: false, error: result.message || 'Login failed.' };
            }
        } catch (err) {
            return { success: false, error: 'Could not reach server. Please try again.' };
        }
    }

    /** Send OTP — POST /api/otp/send */
    async sendOtp(email) {
        try {
            var response = await fetch('/api/otp/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            return await response.json();
        } catch (err) {
            return { success: false, error: 'Could not reach server.' };
        }
    }

    /** Verify OTP & login — POST /api/otp/verify */
    async verifyOtp(email, otp) {
        try {
            var response = await fetch('/api/otp/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, otp: otp })
            });
            var result = await response.json();
            if (result.success) {
                this._saveSession({
                    accountNumber: result.accountNumber,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    email: result.email,
                    balance: result.balance || 0
                });
            }
            return result;
        } catch (err) {
            return { success: false, error: 'Could not reach server.' };
        }
    }

    /** Update balance — POST /api/balance */
    async updateBalance(accountNumber, amount, type) {
        try {
            var response = await fetch('/api/balance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accountNumber: accountNumber, amount: amount, type: type })
            });
            var result = await response.json();
            if (result.success) {
                // Update localStorage session with new balance
                var session = this._getSession();
                if (session) {
                    session.balance = result.balance;
                    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
                }
            }
            return result;
        } catch (err) {
            return { success: false, error: 'Could not reach server.' };
        }
    }

    // ── LOGOUT ────────────────────────────────────────
    logout() {
        this._clearSession();
        return { success: true };
    }

    // ── SESSION CHECKS ────────────────────────────────
    getCurrentSession() {
        var session = this._getSession();
        if (!session) return null;
        if (new Date() > new Date(session.expiresAt)) {
            this._clearSession();
            return null;
        }
        return session;
    }

    getLoggedInAccount() {
        var session = this.getCurrentSession();
        if (!session) return null;
        // Build a full account-like object from session data
        return {
            accountNumber: session.accountNumber,
            firstName: session.firstName,
            lastName: session.lastName,
            fullName: session.firstName + ' ' + session.lastName,
            email: session.email,
            balance: session.balance || 0,
            accountType: 'Savings',
            status: 'active',
            createdAt: session.loginTime,
            cardType: 'Visa Classic',
            cardExpiry: '12/28',
            cardFrozen: false,
            tier: 'Silver',
            creditScore: 700,
            creditHistory: [700],
            transactions: [],
            goals: [],
            ifsc: 'ACE0001234',
            branch: 'Main Branch',
            mobile: '',
            dob: '',
            cardNumber: '',
            cardLimits: { atm: 25000, online: 50000, international: 0, daily: 50000 },
            features: { debitCard: true, internetBanking: true, mobileBanking: true }
        };
    }

    isLoggedIn() {
        return this.getCurrentSession() !== null;
    }
}

// Global instance
var DB = new ACEBankDB();

/**
 * SAL Architecture: State / Actions / Logic
 * Login flow implementation
 */

const SAL = {
    state: {
        email: localStorage.getItem('ace_remembered_email') || '',
        rememberMe: localStorage.getItem('ace_remembered_email') ? true : false,
        isLoading: false
    },

    actions: {
        init: function () {
            SAL.logic.bindEvents();
            SAL.logic.populateState();
        },

        handleLoginSubmit: function (e) {
            e.preventDefault();
            if (SAL.state.isLoading) return;

            const emailInput = document.getElementById('email').value.trim();
            const passInput = document.getElementById('password').value;
            const rememberCheck = document.getElementById('rememberMe').checked;

            // Update State
            SAL.state.email = emailInput;
            SAL.state.rememberMe = rememberCheck;

            // Basic Validation
            if (!SAL.logic.validateEmail(emailInput) || passInput.length < 4) {
                SAL.logic.showErrorBanner("Please enter a valid email and a password of at least 4 characters.");
                return;
            }

            SAL.logic.hideErrorBanner();
            SAL.actions.startLoginProcess();
        },

        startLoginProcess: function () {
            SAL.state.isLoading = true;
            SAL.logic.renderLoadingState(true);

            // Simulate API Call
            setTimeout(() => {
                // Save user to session
                sessionStorage.setItem('ace_user_email', SAL.state.email);

                // Handle remember me
                if (SAL.state.rememberMe) {
                    localStorage.setItem('ace_remembered_email', SAL.state.email);
                } else {
                    localStorage.removeItem('ace_remembered_email');
                }

                // Transition to dashboard
                SAL.logic.transitionToDashboard();
            }, 1200);
        },

        togglePasswordVisibility: function () {
            const passInput = document.getElementById('password');
            const icon = document.querySelector('#togglePasswordBtn span');

            if (passInput.type === 'password') {
                passInput.type = 'text';
                icon.textContent = 'visibility_off';
            } else {
                passInput.type = 'password';
                icon.textContent = 'visibility';
            }
        },

        handleForgotPassword: function () {
            const emailInput = document.getElementById('email').value.trim();
            if (!emailInput) {
                SAL.logic.showToast("Please enter your email first to reset your password.", "error");
            } else {
                SAL.logic.showToast(`Reset link sent to ${emailInput}`, "success");
            }
        },

        handleSocialLogin: function (provider) {
            SAL.logic.showToast(`Connecting to ${provider}...`, "info");
            setTimeout(() => {
                SAL.logic.showToast(`${provider} login coming soon`, "info");
            }, 1000);
        },

        handleCreateAccount: function (e) {
            e.preventDefault();
            SAL.logic.showToast("Account creation coming soon", "info");
        }
    },

    logic: {
        bindEvents: function () {
            document.getElementById('loginForm').addEventListener('submit', SAL.actions.handleLoginSubmit);
            document.getElementById('togglePasswordBtn').addEventListener('click', SAL.actions.togglePasswordVisibility);
            document.getElementById('forgotPasswordLink').addEventListener('click', (e) => { e.preventDefault(); SAL.actions.handleForgotPassword(); });
            document.getElementById('googleBtn').addEventListener('click', () => SAL.actions.handleSocialLogin('Google'));
            document.getElementById('appleBtn').addEventListener('click', () => SAL.actions.handleSocialLogin('Apple ID'));
            document.getElementById('createAccountLink').addEventListener('click', SAL.actions.handleCreateAccount);

            // Ripple effects binding
            document.querySelectorAll('.ripple-container').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    let rect = this.getBoundingClientRect();
                    let x = e.clientX - rect.left;
                    let y = e.clientY - rect.top;

                    let ripple = document.createElement('span');
                    ripple.style.left = `${x}px`;
                    ripple.style.top = `${y}px`;
                    ripple.classList.add('ripple');

                    this.appendChild(ripple);
                    setTimeout(() => ripple.remove(), 600);
                });
            });
        },

        populateState: function () {
            if (SAL.state.email) {
                document.getElementById('email').value = SAL.state.email;
            }
            if (SAL.state.rememberMe) {
                document.getElementById('rememberMe').checked = true;
            }
        },

        validateEmail: function (email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        showErrorBanner: function (msg) {
            const banner = document.getElementById('errorBanner');
            const msgSpan = document.getElementById('errorMessage');
            msgSpan.textContent = msg;

            banner.classList.remove('hidden');
            banner.classList.remove('shake');
            // Trigger reflow to restart animation
            void banner.offsetWidth;
            banner.classList.add('shake');
        },

        hideErrorBanner: function () {
            document.getElementById('errorBanner').classList.add('hidden');
        },

        renderLoadingState: function (isLoading) {
            const btnText = document.querySelector('#signInBtn .btn-text');
            const spinner = document.querySelector('#signInBtn .spinner');
            const btn = document.getElementById('signInBtn');

            if (isLoading) {
                btnText.textContent = "Signing In...";
                spinner.classList.remove('hidden');
                btn.disabled = true;
            } else {
                btnText.textContent = "Sign In";
                spinner.classList.add('hidden');
                btn.disabled = false;
            }
        },

        transitionToDashboard: function () {
            const card = document.getElementById('loginCard');
            card.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 400); // 400ms CSS animation duration
        },

        showToast: function (message, type = 'info') {
            const container = document.getElementById('toastContainer');
            const toast = document.createElement('div');
            toast.className = `toast ${type}`;

            let iconStr = 'info';
            if (type === 'success') iconStr = 'check_circle';
            if (type === 'error') iconStr = 'error';

            toast.innerHTML = `
                <span class="material-symbols-outlined toast-icon">${iconStr}</span>
                <div class="toast-content">
                    <div class="toast-message">${message}</div>
                </div>
            `;

            container.appendChild(toast);

            // Trigger animation
            setTimeout(() => { toast.classList.add('show'); }, 10);

            // Auto dismiss
            setTimeout(() => {
                toast.classList.remove('show');
                toast.classList.add('hide');
                setTimeout(() => toast.remove(), 500);
            }, 3500);
        }
    }
};

// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', SAL.actions.init);

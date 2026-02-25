/*
  ACE Bank - Dashboard Interactions using SAL Pattern
  Single source of truth, separation of concerns.
*/

const SAL = {
    state: {
        currentUser: null,
        activePage: 'dashboard',
        isDarkMode: false,
        isNotificationPanelOpen: false,
        isLoading: false,
        modals: {
            transferModal: false,
            addFundsModal: false,
            newPaymentModal: false,
            scanPayModal: false,
            applyCardModal: false,
            submitTicketModal: false,
            addAccountModal: false
        },
        transactions: [], // Will hold transaction data
        searchQuery: ''
    },

    actions: {
        init: () => {
            // Check authentication
            const userStr = sessionStorage.getItem('acebank_user');
            if (!userStr) {
                window.location.href = 'index.html'; // Redirect to login if not authenticated
                return;
            }
            SAL.state.currentUser = JSON.parse(userStr);

            // Set user profile data in DOM
            SAL.logic.renderUserProfile();

            // Load initial page (dashboard)
            SAL.actions.switchPage('dashboard');

            // Attach Event Listeners
            SAL.logic.attachEventListeners();

            // Simulate loading some dash data
            SAL.logic.loadDashboardData();
        },

        switchPage: (pageId) => {
            if (SAL.state.activePage === pageId && document.querySelector(`.page-view[id="page-${pageId}"]`).classList.contains('active')) return;

            SAL.state.activePage = pageId;

            // DOM Updates
            document.querySelectorAll('.sidebar-nav li').forEach(item => {
                if (item.dataset.page === pageId) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            document.querySelectorAll('.page-view').forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('active', 'animate-fade-up');
            });

            const targetPage = document.getElementById(`page-${pageId}`);
            if (targetPage) {
                targetPage.classList.remove('hidden');
                // Small delay to ensure display:block applies before animation
                setTimeout(() => {
                    targetPage.classList.add('active', 'animate-fade-up');
                }, 10);
            }
        },

        toggleDarkMode: () => {
            SAL.state.isDarkMode = !SAL.state.isDarkMode;
            SAL.logic.applyDarkMode();
        },

        toggleNotificationPanel: () => {
            SAL.state.isNotificationPanelOpen = !SAL.state.isNotificationPanelOpen;
            const panel = document.getElementById('notificationPanel');
            if (SAL.state.isNotificationPanelOpen) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        },

        openModal: (modalId) => {
            SAL.state.modals[modalId] = true;
            const overlay = document.getElementById(`${modalId}Overlay`);
            if (overlay) overlay.classList.add('active');
        },

        closeModal: (modalId) => {
            SAL.state.modals[modalId] = false;
            const overlay = document.getElementById(`${modalId}Overlay`);
            if (overlay) overlay.classList.remove('active');
        },

        handleLogout: () => {
            sessionStorage.removeItem('acebank_user');
            // Add a nice fade out effect before redirecting
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.4s ease';
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 400);
        },

        handleTransferSubmit: (e) => {
            e.preventDefault();
            // Simulate processing
            const btn = e.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Processing... <span class="material-symbols-outlined">sync</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                SAL.actions.closeModal('transferModal');
                SAL.logic.showToast('Transfer completed successfully!');
                e.target.reset(); // clear form
            }, 1500);
        }
    },

    logic: {
        attachEventListeners: () => {
            // Sidebar Navigation
            document.querySelectorAll('.sidebar-nav li').forEach(li => {
                li.addEventListener('click', (e) => {
                    const pageId = e.currentTarget.dataset.page;
                    SAL.actions.switchPage(pageId);
                    // Close notification panel if open on mobile/small screen (optional, but good UX)
                });
            });

            // Dark Mode Toggle
            const themeToggleBtn = document.getElementById('themeToggleBtn');
            if (themeToggleBtn) {
                themeToggleBtn.addEventListener('click', SAL.actions.toggleDarkMode);
            }

            // Notification Panel Toggle
            const notifBtn = document.getElementById('notificationBtn');
            if (notifBtn) {
                notifBtn.addEventListener('click', SAL.actions.toggleNotificationPanel);
            }

            // Logout
            const logoutBtn = document.getElementById('logoutBtn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', SAL.actions.handleLogout);
            }

            // Modal Triggers
            // We map data-modal-target attributes to modal IDs
            document.querySelectorAll('[data-modal-target]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    SAL.actions.openModal(e.currentTarget.dataset.modalTarget);
                });
            });

            // Modal Close Buttons
            document.querySelectorAll('.modal-close').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // find closest overlay
                    const overlay = e.target.closest('.modal-overlay');
                    if (overlay) {
                        const modalId = overlay.id.replace('Overlay', '');
                        SAL.actions.closeModal(modalId);
                    }
                });
            });

            // Modal Overlay Click outside
            document.querySelectorAll('.modal-overlay').forEach(overlay => {
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        const modalId = overlay.id.replace('Overlay', '');
                        SAL.actions.closeModal(modalId);
                    }
                });
            });

            // Escape key to close modals
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    // Close notifications if open
                    if (SAL.state.isNotificationPanelOpen) {
                        SAL.actions.toggleNotificationPanel();
                    }
                    // Close any open modal
                    Object.keys(SAL.state.modals).forEach(modalId => {
                        if (SAL.state.modals[modalId]) {
                            SAL.actions.closeModal(modalId);
                        }
                    });
                }
            });

            // Forms validation/submission simulation
            const transferForm = document.getElementById('transferForm');
            if (transferForm) transferForm.addEventListener('submit', SAL.actions.handleTransferSubmit);

            const addFundsForm = document.getElementById('addFundsForm');
            if (addFundsForm) addFundsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                SAL.actions.closeModal('addFundsModal');
                SAL.logic.showToast('Funds added successfully!');
            });

            const scanPayBtn = document.getElementById('scanPayActionBtn');
            if (scanPayBtn) {
                scanPayBtn.addEventListener('click', () => {
                    SAL.logic.showToast('Camera access request sent...');
                });
            }

            // Export CSV Toast
            const exportBtn = document.getElementById('exportCsvBtn');
            if (exportBtn) {
                exportBtn.addEventListener('click', () => {
                    SAL.logic.showToast('Exporting transactions to CSV... This may take a moment.');
                });
            }
        },

        renderUserProfile: () => {
            const user = SAL.state.currentUser;
            if (user) {
                // Update profile name
                document.querySelectorAll('.profile-name').forEach(el => el.textContent = user.name);
                // Update profile email
                document.querySelectorAll('.profile-email').forEach(el => el.textContent = user.email);

                // Set initials for avatar
                const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
                document.querySelectorAll('.avatar').forEach(el => el.textContent = initials);
            }
        },

        applyDarkMode: () => {
            if (SAL.state.isDarkMode) {
                document.body.classList.add('dark-mode');
                document.getElementById('themeIcon').textContent = 'light_mode';
            } else {
                document.body.classList.remove('dark-mode');
                document.getElementById('themeIcon').textContent = 'dark_mode';
            }
        },

        showToast: (message) => {
            // Note: Since dashboard has its own layout, we might want to inject a toast container if it doesn't exist,
            // or we add it to HTML. Let's create it dynamically if it doesn't exist.
            let toastContainer = document.getElementById('toastContainer');
            if (!toastContainer) {
                toastContainer = document.createElement('div');
                toastContainer.id = 'toastContainer';
                toastContainer.className = 'toast-container';
                // Add minimal CSS for toast container dynamically if needed, or rely on login CSS which might not be here.
                // Let's add basic inline styles for safety.
                toastContainer.style.position = 'fixed';
                toastContainer.style.bottom = '24px';
                toastContainer.style.right = '24px';
                toastContainer.style.zIndex = '9999';
                toastContainer.style.display = 'flex';
                toastContainer.style.flexDirection = 'column';
                toastContainer.style.gap = '10px';
                document.body.appendChild(toastContainer);
            }

            const toast = document.createElement('div');
            toast.className = 'toast animate-fade-up';
            toast.style.background = 'var(--bg-surface)';
            toast.style.color = 'var(--text-main)';
            toast.style.padding = '16px 24px';
            toast.style.borderRadius = '8px';
            toast.style.boxShadow = 'var(--shadow-lg)';
            toast.style.borderLeft = '4px solid var(--primary)';
            toast.style.display = 'flex';
            toast.style.alignItems = 'center';
            toast.style.gap = '12px';

            toast.innerHTML = `
                <span class="material-symbols-outlined text-primary" style="color: var(--primary)">info</span>
                <span>${message}</span>
            `;

            toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(10px)';
                toast.style.transition = 'all 0.3s ease';
                setTimeout(() => toast.remove(), 300);
            }, 3000);
        },

        loadDashboardData: () => {
            // Simulate fetching data visually by removing any 'shimmer' classes
            // For now we don't have shimmer on text, but this is where API calls would go.
            console.log("Dashboard data loaded.");
        }
    }
};

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', SAL.actions.init);

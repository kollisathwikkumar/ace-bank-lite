<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Create Account — ACE Bank</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link
            href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap"
            rel="stylesheet">
        <link
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
            rel="stylesheet">
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box
            }

            :root {
                --navy: #0a0e27;
                --navy-light: #111640;
                --blue: #1f1fff;
                --blue-glow: rgba(31, 31, 255, .15);
                --purple: #8b5cf6;
                --green: #10b981;
                --red: #ef4444;
                --gold: #f59e0b;
                --text: #e2e8f0;
                --text-muted: #94a3b8;
                --border: rgba(255, 255, 255, .08)
            }

            body {
                font-family: 'DM Sans', sans-serif;
                background: var(--navy);
                color: var(--text);
                min-height: 100vh;
                display: flex
            }

            .auth-brand {
                width: 42%;
                min-height: 100vh;
                background: linear-gradient(135deg, #0a0e27 0%, #111640 50%, #1a1f5e 100%);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 60px;
                position: relative;
                overflow: hidden
            }

            .auth-brand::before {
                content: '';
                position: absolute;
                top: 10%;
                right: -30%;
                width: 160%;
                height: 160%;
                background: radial-gradient(circle at 60% 50%, rgba(139, 92, 246, .08), transparent 60%);
                animation: brandFloat 18s ease-in-out infinite
            }

            @keyframes brandFloat {

                0%,
                100% {
                    transform: translate(0, 0)
                }

                50% {
                    transform: translate(-15px, 15px)
                }
            }

            .brand-logo {
                display: flex;
                align-items: center;
                gap: 14px;
                margin-bottom: 48px;
                position: relative;
                z-index: 2
            }

            .brand-logo-icon {
                width: 52px;
                height: 52px;
                background: linear-gradient(135deg, var(--blue), var(--purple));
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Sora', sans-serif;
                font-weight: 800;
                font-size: 22px;
                color: #fff
            }

            .brand-logo-text {
                font-family: 'Sora', sans-serif;
                font-weight: 700;
                font-size: 26px;
                color: #fff
            }

            .brand-tagline {
                font-family: 'Sora', sans-serif;
                font-size: 32px;
                font-weight: 800;
                color: #fff;
                line-height: 1.3;
                margin-bottom: 20px;
                position: relative;
                z-index: 2
            }

            .brand-desc {
                font-size: 15px;
                color: var(--text-muted);
                line-height: 1.7;
                max-width: 380px;
                position: relative;
                z-index: 2
            }

            .perks {
                margin-top: 40px;
                display: flex;
                flex-direction: column;
                gap: 20px;
                position: relative;
                z-index: 2
            }

            .perk {
                display: flex;
                align-items: flex-start;
                gap: 14px
            }

            .perk-icon {
                width: 40px;
                height: 40px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0
            }

            .perk-icon .material-symbols-outlined {
                font-size: 22px;
                color: #fff
            }

            .perk h4 {
                font-size: 14px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 2px
            }

            .perk p {
                font-size: 12px;
                color: var(--text-muted)
            }

            .back-link {
                position: absolute;
                top: 28px;
                left: 28px;
                display: flex;
                align-items: center;
                gap: 6px;
                color: var(--text-muted);
                text-decoration: none;
                font-size: 13px;
                font-weight: 600;
                transition: color .3s;
                z-index: 5
            }

            .back-link:hover {
                color: #fff
            }

            .auth-form {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px;
                overflow-y: auto
            }

            .form-card {
                width: 100%;
                max-width: 480px
            }

            .form-card h2 {
                font-family: 'Sora', sans-serif;
                font-size: 28px;
                font-weight: 800;
                color: #fff;
                margin-bottom: 8px
            }

            .form-card .sub {
                font-size: 14px;
                color: var(--text-muted);
                margin-bottom: 32px
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px
            }

            .form-group {
                margin-bottom: 20px
            }

            .form-label {
                display: block;
                font-size: 12px;
                font-weight: 700;
                color: var(--text-muted);
                text-transform: uppercase;
                letter-spacing: .5px;
                margin-bottom: 8px
            }

            .form-input {
                width: 100%;
                padding: 14px 16px;
                border: 2px solid var(--border);
                border-radius: 12px;
                background: var(--navy-light);
                color: #fff;
                font-size: 15px;
                font-family: 'DM Sans', sans-serif;
                transition: all .3s;
                outline: none
            }

            .form-input:focus {
                border-color: var(--blue);
                box-shadow: 0 0 0 4px var(--blue-glow)
            }

            .form-input::placeholder {
                color: #475569
            }

            .form-input.error {
                border-color: var(--red)
            }

            .form-hint {
                font-size: 11px;
                color: var(--text-muted);
                margin-top: 4px
            }

            .form-error {
                font-size: 11px;
                color: var(--red);
                margin-top: 4px;
                display: none
            }

            .strength-bar {
                height: 4px;
                border-radius: 2px;
                background: var(--border);
                margin-top: 8px;
                overflow: hidden
            }

            .strength-fill {
                height: 100%;
                border-radius: 2px;
                transition: all .3s;
                width: 0%
            }

            .btn {
                padding: 16px 32px;
                border-radius: 12px;
                font-size: 15px;
                font-weight: 700;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all .3s;
                cursor: pointer;
                border: none;
                font-family: 'DM Sans', sans-serif;
                width: 100%
            }

            .btn-primary {
                background: var(--blue);
                color: #fff;
                box-shadow: 0 4px 20px rgba(31, 31, 255, .3)
            }

            .btn-primary:hover {
                box-shadow: 0 8px 30px rgba(31, 31, 255, .5);
                transform: translateY(-2px)
            }

            .btn:disabled {
                opacity: .5;
                cursor: not-allowed;
                transform: none !important
            }

            .form-footer {
                text-align: center;
                margin-top: 24px;
                font-size: 14px;
                color: var(--text-muted)
            }

            .form-footer a {
                color: var(--blue);
                text-decoration: none;
                font-weight: 600
            }

            .terms {
                font-size: 12px;
                color: var(--text-muted);
                text-align: center;
                margin-top: 16px;
                line-height: 1.6
            }

            .terms a {
                color: var(--blue);
                text-decoration: none
            }

            .error-msg {
                padding: 12px 16px;
                border-radius: 10px;
                background: rgba(239, 68, 68, .1);
                border: 1px solid rgba(239, 68, 68, .2);
                color: var(--red);
                font-size: 13px;
                font-weight: 600;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 8px
            }

            @media(max-width:900px) {
                .auth-brand {
                    display: none
                }

                body {
                    display: block
                }

                .auth-form {
                    padding: 40px 24px
                }
            }
        </style>
    </head>

    <body>
        <div class="auth-brand">
            <a href="${pageContext.request.contextPath}/" class="back-link">
                <span class="material-symbols-outlined" style="font-size:18px">arrow_back</span> Home
            </a>
            <div class="brand-logo">
                <div class="brand-logo-icon">A</div>
                <span class="brand-logo-text">ACE Bank</span>
            </div>
            <div class="brand-tagline">Start Your Banking<br>Journey Today</div>
            <p class="brand-desc">Open a free account in under 5 minutes and unlock the full power of digital banking.
            </p>
            <div class="perks">
                <div class="perk">
                    <div class="perk-icon"
                        style="background:linear-gradient(135deg,rgba(31,31,255,.2),rgba(31,31,255,.05))"><span
                            class="material-symbols-outlined">payments</span></div>
                    <div>
                        <h4>Zero Balance Account</h4>
                        <p>No minimum balance requirement ever</p>
                    </div>
                </div>
                <div class="perk">
                    <div class="perk-icon"
                        style="background:linear-gradient(135deg,rgba(16,185,129,.2),rgba(16,185,129,.05))"><span
                            class="material-symbols-outlined">credit_card</span></div>
                    <div>
                        <h4>Free VISA Debit Card</h4>
                        <p>International card with zero annual fee</p>
                    </div>
                </div>
                <div class="perk">
                    <div class="perk-icon"
                        style="background:linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.05))"><span
                            class="material-symbols-outlined">stars</span></div>
                    <div>
                        <h4>5X Reward Points</h4>
                        <p>Earn on every transaction you make</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="auth-form">
            <div class="form-card">
                <h2>Create Account</h2>
                <p class="sub">Join thousands of users managing money smarter.</p>
                <% if (request.getParameter("error") !=null) { %>
                    <div class="error-msg">
                        <span class="material-symbols-outlined" style="font-size:18px">error</span>
                        Registration failed. Please try again.
                    </div>
                    <% } %>
                        <form id="signupForm">
                            <div class="form-row">
                                <div class="form-group">
                                    <label class="form-label">First Name *</label>
                                    <input type="text" name="firstName" class="form-input" placeholder="Arjun" required>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Last Name *</label>
                                    <input type="text" name="lastName" class="form-input" placeholder="Mehta" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Aadhaar Number *</label>
                                <input type="text" name="aadharNumber" class="form-input" placeholder="1234 5678 9012"
                                    maxlength="14" required oninput="formatAadhaar(this)">
                                <div class="form-hint">12-digit Aadhaar number</div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Email *</label>
                                <input type="email" name="email" class="form-input" placeholder="arjun@example.com"
                                    required>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Phone Number *</label>
                                <input type="tel" name="phone" class="form-input" placeholder="9876543210"
                                    maxlength="10" required>
                                <div class="form-hint">10-digit mobile number</div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Password *</label>
                                <input type="password" name="password" id="pwd" class="form-input"
                                    placeholder="Min 8 characters" required minlength="8"
                                    oninput="checkStrength(this.value)">
                                <div class="strength-bar">
                                    <div class="strength-fill" id="strengthFill"></div>
                                </div>
                                <div class="form-hint" id="strengthText">Must be at least 8 characters</div>
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirm Password *</label>
                                <input type="password" id="cpwd" class="form-input" placeholder="Re-enter your password"
                                    required>
                                <div class="form-error" id="matchErr">Passwords do not match</div>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <span class="material-symbols-outlined" style="font-size:20px">person_add</span> Create
                                Account
                            </button>
                        </form>
                        <div class="terms">By creating an account, you agree to ACE Bank's<br><a href="#">Terms of
                                Service</a> and <a href="#">Privacy Policy</a></div>
                        <div class="form-footer">
                            Already have an account? <a href="${pageContext.request.contextPath}/login.jsp">Sign In</a>
                        </div>
            </div>
        </div>
        <script src="js/ace-db.js"></script>
        <script>
            function formatAadhaar(el) { var v = el.value.replace(/\D/g, ''); var m = v.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/); if (m) el.value = !m[2] ? m[1] : m[1] + ' ' + m[2] + (m[3] ? ' ' + m[3] : '') }
            function checkStrength(v) { var s = 0, fill = document.getElementById('strengthFill'), txt = document.getElementById('strengthText'); if (v.length >= 8) s++; if (v.length >= 12) s++; if (/[A-Z]/.test(v)) s++; if (/[0-9]/.test(v)) s++; if (/[^A-Za-z0-9]/.test(v)) s++; var pct = [0, 20, 40, 60, 80, 100][s]; var colors = ['var(--red)', 'var(--red)', '#f59e0b', '#f59e0b', 'var(--green)', 'var(--green)']; var labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent']; fill.style.width = pct + '%'; fill.style.background = colors[s]; txt.textContent = labels[s] || 'Must be at least 8 characters'; txt.style.color = colors[s] || 'var(--text-muted)' }

            document.getElementById('signupForm').addEventListener('submit', async function (e) {
                e.preventDefault();
                var p = document.getElementById('pwd').value;
                var c = document.getElementById('cpwd').value;
                var err = document.getElementById('matchErr');
                if (p !== c) { err.style.display = 'block'; document.getElementById('cpwd').classList.add('error'); return; }
                err.style.display = 'none';

                var btn = this.querySelector('button[type="submit"]');
                btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px; animation: spin 1s linear infinite;">sync</span> Creating Account...';
                btn.style.opacity = '0.7';
                btn.disabled = true;

                try {
                    var formData = {
                        firstName: this.querySelector('[name="firstName"]').value,
                        lastName: this.querySelector('[name="lastName"]').value,
                        aadhaar: this.querySelector('[name="aadharNumber"]').value.replace(/\s/g, ''),
                        email: this.querySelector('[name="email"]').value,
                        phone: this.querySelector('[name="phone"]').value,
                        password: p
                    };
                    var result = await DB.createAccount(formData);
                    if (result.success) {
                        window.location.href = 'dashboard.html';
                    } else {
                        throw new Error(result.error || 'Registration failed.');
                    }
                } catch (error) {
                    // Show error inline
                    var errBox = document.querySelector('.error-msg');
                    if (!errBox) {
                        errBox = document.createElement('div');
                        errBox.className = 'error-msg';
                        errBox.innerHTML = '<span class="material-symbols-outlined" style="font-size:18px">error</span> <span class="err-text"></span>';
                        this.parentNode.insertBefore(errBox, this);
                    }
                    errBox.style.display = 'flex';
                    var errText = errBox.querySelector('.err-text') || errBox.querySelector('span:last-child');
                    if (errText) errText.textContent = error.message;
                    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">person_add</span> Create Account';
                    btn.style.opacity = '1';
                    btn.disabled = false;
                }
            });

            // Add spin keyframe
            var style = document.createElement('style');
            style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
            document.head.appendChild(style);
        </script>
    </body>

    </html>
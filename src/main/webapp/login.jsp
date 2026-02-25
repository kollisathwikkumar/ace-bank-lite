<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login — ACE Bank</title>
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
                width: 45%;
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
                top: 20%;
                left: -20%;
                width: 140%;
                height: 140%;
                background: radial-gradient(circle at 50% 50%, rgba(31, 31, 255, .08), transparent 60%);
                animation: brandFloat 15s ease-in-out infinite
            }

            @keyframes brandFloat {

                0%,
                100% {
                    transform: translate(0, 0) scale(1)
                }

                50% {
                    transform: translate(20px, -20px) scale(1.05)
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

            .brand-features {
                margin-top: 40px;
                display: flex;
                flex-direction: column;
                gap: 16px;
                position: relative;
                z-index: 2
            }

            .brand-feat {
                display: flex;
                align-items: center;
                gap: 12px;
                font-size: 14px;
                color: var(--text-muted)
            }

            .brand-feat .material-symbols-outlined {
                font-size: 20px;
                color: var(--green)
            }

            .auth-form {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px
            }

            .form-card {
                width: 100%;
                max-width: 420px
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
                margin-bottom: 36px
            }

            .form-group {
                margin-bottom: 24px
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

            .form-footer {
                text-align: center;
                margin-top: 28px;
                font-size: 14px;
                color: var(--text-muted)
            }

            .form-footer a {
                color: var(--blue);
                text-decoration: none;
                font-weight: 600;
                transition: color .3s
            }

            .form-footer a:hover {
                color: #fff
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

            .error-msg .material-symbols-outlined {
                font-size: 18px
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
            <div class="brand-tagline">Welcome Back to<br>Smarter Banking</div>
            <p class="brand-desc">Access your dashboard, manage transactions, track goals, and monitor your credit score
                — all in one secure platform.</p>
            <div class="brand-features">
                <div class="brand-feat"><span class="material-symbols-outlined">check_circle</span>256-bit SSL Encrypted
                </div>
                <div class="brand-feat"><span class="material-symbols-outlined">check_circle</span>Two-Factor
                    Authentication</div>
                <div class="brand-feat"><span class="material-symbols-outlined">check_circle</span>RBI Regulated</div>
            </div>
        </div>
        <div class="auth-form">
            <div class="form-card">
                <h2>Sign In</h2>
                <p class="sub">Enter your credentials to access your account.</p>
                <div class="error-msg" id="login-error" style="display: none;">
                    <span class="material-symbols-outlined">error</span>
                    <span id="login-error-text">Invalid credentials. Please try again.</span>
                </div>
                <form id="login-form">
                    <div class="form-group" id="emailGroup">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="loginEmail" name="email" class="form-input"
                            placeholder="you@example.com" required autocomplete="email">
                    </div>
                    <div class="form-group" id="phoneGroup" style="display:none">
                        <label class="form-label">Phone Number</label>
                        <input type="tel" id="loginPhone" name="phone" class="form-input" placeholder="9876543210"
                            maxlength="10" autocomplete="tel">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="password" name="password" class="form-input"
                            placeholder="Enter your password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        <span class="material-symbols-outlined" style="font-size:20px">login</span> Sign In
                    </button>
                </form>
                <div style="text-align:center;margin-top:16px">
                    <a href="#" id="toggleLoginMode"
                        style="color:var(--blue);font-size:13px;font-weight:600;text-decoration:none">
                        <span class="material-symbols-outlined"
                            style="font-size:16px;vertical-align:middle">phone_iphone</span>
                        Login with Phone instead
                    </a>
                </div>
                <div style="text-align:center;margin-top:8px">
                    <a href="#" id="showOtpLogin"
                        style="color:#94a3b8;font-size:13px;font-weight:600;text-decoration:none">
                        <span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">key</span>
                        Forgot Password? Login with OTP
                    </a>
                </div>
                <div class="form-footer">
                    New to ACE Bank? <a href="${pageContext.request.contextPath}/sign-up.jsp">Create an
                        account</a>
                </div>
            </div>

            <!-- OTP Login Form -->
            <div class="form-card" id="otpFormCard" style="display:none">
                <h2>Login with OTP</h2>
                <p class="sub">We'll send a 6-digit code to your registered email.</p>
                <div class="error-msg" id="otp-error" style="display: none;">
                    <span class="material-symbols-outlined">error</span>
                    <span id="otp-error-text"></span>
                </div>
                <div class="error-msg" id="otp-success"
                    style="display:none;background:rgba(16,185,129,0.1);border-color:#10b981;color:#10b981">
                    <span class="material-symbols-outlined">check_circle</span>
                    <span id="otp-success-text"></span>
                </div>

                <!-- Step 1: Enter email -->
                <div id="otpStep1">
                    <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <input type="email" id="otpEmail" class="form-input" placeholder="you@example.com" required
                            autocomplete="email">
                    </div>
                    <button type="button" class="btn btn-primary" id="sendOtpBtn">
                        <span class="material-symbols-outlined" style="font-size:20px">mail</span> Send OTP
                    </button>
                </div>

                <!-- Step 2: Enter OTP -->
                <div id="otpStep2" style="display:none">
                    <div class="form-group">
                        <label class="form-label">Enter 6-digit OTP</label>
                        <input type="text" id="otpCode" class="form-input" placeholder="123456" maxlength="6"
                            style="letter-spacing:0.5em;text-align:center;font-size:1.5rem;font-weight:700">
                    </div>
                    <button type="button" class="btn btn-primary" id="verifyOtpBtn">
                        <span class="material-symbols-outlined" style="font-size:20px">verified</span> Verify & Login
                    </button>
                    <div style="text-align:center;margin-top:12px">
                        <a href="#" id="resendOtpBtn"
                            style="color:#94a3b8;font-size:13px;font-weight:600;text-decoration:none">
                            Didn't receive? Resend OTP
                        </a>
                    </div>
                </div>

                <div style="text-align:center;margin-top:16px">
                    <a href="#" id="backToLogin"
                        style="color:var(--blue);font-size:13px;font-weight:600;text-decoration:none">
                        <span class="material-symbols-outlined"
                            style="font-size:16px;vertical-align:middle">arrow_back</span>
                        Back to Sign In
                    </a>
                </div>
            </div>
        </div>

        <!-- Import ACE Backend JS -->
        <script src="js/ace-db.js?v=3"></script>
        <script>
            // Toggle between email and phone login
            let usePhone = false;
            document.getElementById('toggleLoginMode').addEventListener('click', function (e) {
                e.preventDefault();
                usePhone = !usePhone;
                const emailGroup = document.getElementById('emailGroup');
                const phoneGroup = document.getElementById('phoneGroup');
                const emailInput = document.getElementById('loginEmail');
                const phoneInput = document.getElementById('loginPhone');

                if (usePhone) {
                    emailGroup.style.display = 'none';
                    phoneGroup.style.display = 'block';
                    emailInput.removeAttribute('required');
                    phoneInput.setAttribute('required', '');
                    this.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">email</span> Login with Email instead';
                } else {
                    emailGroup.style.display = 'block';
                    phoneGroup.style.display = 'none';
                    emailInput.setAttribute('required', '');
                    phoneInput.removeAttribute('required');
                    this.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle">phone_iphone</span> Login with Phone instead';
                }
            });

            // Login form submit
            document.getElementById('login-form').addEventListener('submit', async function (e) {
                e.preventDefault();

                const password = document.getElementById('password').value;
                const errBox = document.getElementById('login-error');
                const errText = document.getElementById('login-error-text');
                const btn = this.querySelector('button[type="submit"]');

                errBox.style.display = 'none';

                let identifier;
                if (usePhone) {
                    identifier = document.getElementById('loginPhone').value.trim();
                    if (!identifier) { errText.textContent = 'Please enter your phone number.'; errBox.style.display = 'flex'; return; }
                } else {
                    identifier = document.getElementById('loginEmail').value.trim();
                    if (!identifier) { errText.textContent = 'Please enter your email.'; errBox.style.display = 'flex'; return; }
                }

                if (!password) { errText.textContent = 'Please enter your password.'; errBox.style.display = 'flex'; return; }

                btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px; animation: spin 1s linear infinite;">sync</span> Signing In...';
                btn.style.opacity = '0.7';

                try {
                    const result = usePhone
                        ? await DB.loginWithPhone(identifier, password)
                        : await DB.login(identifier, password);

                    if (result.success) {
                        window.location.href = 'dashboard.html';
                    } else {
                        throw new Error(result.error || 'Invalid credentials.');
                    }
                } catch (error) {
                    errText.textContent = error.message;
                    errBox.style.display = 'flex';
                    btn.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">login</span> Sign In';
                    btn.style.opacity = '1';
                }
            });

            const style = document.createElement('style');
            style.textContent = '@keyframes spin { 100% { transform: rotate(360deg); } }';
            document.head.appendChild(style);

            // ── OTP Login Flow ──
            const loginCard = document.querySelector('.form-card');
            const otpCard = document.getElementById('otpFormCard');

            document.getElementById('showOtpLogin').addEventListener('click', function (e) {
                e.preventDefault();
                loginCard.style.display = 'none';
                otpCard.style.display = 'block';
            });

            document.getElementById('backToLogin').addEventListener('click', function (e) {
                e.preventDefault();
                otpCard.style.display = 'none';
                loginCard.style.display = 'block';
                // Reset OTP form
                document.getElementById('otpStep1').style.display = 'block';
                document.getElementById('otpStep2').style.display = 'none';
                document.getElementById('otp-error').style.display = 'none';
                document.getElementById('otp-success').style.display = 'none';
            });

            let otpEmailAddr = '';

            document.getElementById('sendOtpBtn').addEventListener('click', async function () {
                const email = document.getElementById('otpEmail').value.trim();
                const errBox = document.getElementById('otp-error');
                const errText = document.getElementById('otp-error-text');
                const successBox = document.getElementById('otp-success');
                const successText = document.getElementById('otp-success-text');
                errBox.style.display = 'none';
                successBox.style.display = 'none';

                if (!email) { errText.textContent = 'Please enter your email.'; errBox.style.display = 'flex'; return; }

                this.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;animation:spin 1s linear infinite">sync</span> Sending OTP...';
                this.style.opacity = '0.7';

                const result = await DB.sendOtp(email);

                if (result.success) {
                    otpEmailAddr = email;
                    successText.textContent = result.message || 'OTP sent to your email!';
                    successBox.style.display = 'flex';
                    document.getElementById('otpStep1').style.display = 'none';
                    document.getElementById('otpStep2').style.display = 'block';
                    document.getElementById('otpCode').focus();
                } else {
                    errText.textContent = result.message || result.error || 'Failed to send OTP.';
                    errBox.style.display = 'flex';
                }

                this.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">mail</span> Send OTP';
                this.style.opacity = '1';
            });

            document.getElementById('verifyOtpBtn').addEventListener('click', async function () {
                const otp = document.getElementById('otpCode').value.trim();
                const errBox = document.getElementById('otp-error');
                const errText = document.getElementById('otp-error-text');
                errBox.style.display = 'none';

                if (!otp || otp.length !== 6) { errText.textContent = 'Please enter the 6-digit OTP.'; errBox.style.display = 'flex'; return; }

                this.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px;animation:spin 1s linear infinite">sync</span> Verifying...';
                this.style.opacity = '0.7';

                const result = await DB.verifyOtp(otpEmailAddr, otp);

                if (result.success) {
                    window.location.href = 'dashboard.html';
                } else {
                    errText.textContent = result.message || result.error || 'Invalid OTP.';
                    errBox.style.display = 'flex';
                    this.innerHTML = '<span class="material-symbols-outlined" style="font-size:20px">verified</span> Verify & Login';
                    this.style.opacity = '1';
                }
            });

            document.getElementById('resendOtpBtn').addEventListener('click', async function (e) {
                e.preventDefault();
                const successBox = document.getElementById('otp-success');
                const successText = document.getElementById('otp-success-text');
                successBox.style.display = 'none';

                const result = await DB.sendOtp(otpEmailAddr);
                if (result.success) {
                    successText.textContent = 'New OTP sent!';
                    successBox.style.display = 'flex';
                }
            });
        </script>
    </body>

    </html>
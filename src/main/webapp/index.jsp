<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ACE Bank — Digital Banking Reimagined</title>
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
                --gold: #f59e0b;
                --red: #ef4444;
                --text: #e2e8f0;
                --text-muted: #94a3b8;
                --border: rgba(255, 255, 255, .08);
            }

            body {
                font-family: 'DM Sans', sans-serif;
                background: var(--navy);
                color: var(--text);
                overflow-x: hidden;
                min-height: 100vh
            }

            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                z-index: 100;
                padding: 0 60px;
                height: 72px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: rgba(10, 14, 39, .85);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid var(--border);
                transition: all .3s
            }

            .navbar.scrolled {
                height: 60px;
                background: rgba(10, 14, 39, .95)
            }

            .nav-brand {
                display: flex;
                align-items: center;
                gap: 12px;
                text-decoration: none
            }

            .nav-logo {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, var(--blue), var(--purple));
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Sora', sans-serif;
                font-weight: 800;
                font-size: 18px;
                color: #fff
            }

            .nav-name {
                font-family: 'Sora', sans-serif;
                font-weight: 700;
                font-size: 20px;
                color: #fff
            }

            .nav-links {
                display: flex;
                align-items: center;
                gap: 8px
            }

            .btn {
                padding: 12px 28px;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 700;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: all .3s;
                cursor: pointer;
                border: none;
                font-family: 'DM Sans', sans-serif
            }

            .btn:hover {
                transform: translateY(-2px)
            }

            .btn-outline {
                color: #fff;
                border: 2px solid var(--border);
                background: transparent
            }

            .btn-outline:hover {
                border-color: var(--blue);
                background: var(--blue-glow)
            }

            .btn-primary {
                background: var(--blue);
                color: #fff;
                box-shadow: 0 4px 20px rgba(31, 31, 255, .3)
            }

            .btn-primary:hover {
                box-shadow: 0 8px 30px rgba(31, 31, 255, .5)
            }

            .hero {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 120px 60px 80px;
                position: relative;
                overflow: hidden
            }

            .hero::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle at 30% 40%, rgba(31, 31, 255, .12) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(139, 92, 246, .08) 0%, transparent 50%);
                animation: heroFloat 20s ease-in-out infinite
            }

            @keyframes heroFloat {

                0%,
                100% {
                    transform: translate(0, 0)
                }

                50% {
                    transform: translate(-30px, 20px)
                }
            }

            .hero-content {
                position: relative;
                z-index: 2;
                max-width: 800px
            }

            .hero-badge {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 8px 20px;
                border-radius: 40px;
                background: rgba(31, 31, 255, .1);
                border: 1px solid rgba(31, 31, 255, .2);
                font-size: 13px;
                font-weight: 600;
                color: var(--blue);
                margin-bottom: 32px;
                animation: fadeUp .8s ease
            }

            .hero-badge .dot {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--green);
                animation: pulse 2s infinite
            }

            @keyframes pulse {

                0%,
                100% {
                    opacity: 1
                }

                50% {
                    opacity: .4
                }
            }

            .hero h1 {
                font-family: 'Sora', sans-serif;
                font-size: 72px;
                font-weight: 800;
                line-height: 1.05;
                margin-bottom: 24px;
                background: linear-gradient(135deg, #fff 0%, #e2e8f0 50%, var(--blue) 100%);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: fadeUp .8s ease .1s both
            }

            .hero p {
                font-size: 20px;
                color: var(--text-muted);
                max-width: 560px;
                margin: 0 auto 40px;
                line-height: 1.7;
                animation: fadeUp .8s ease .2s both
            }

            .hero-buttons {
                display: flex;
                gap: 16px;
                justify-content: center;
                animation: fadeUp .8s ease .3s both
            }

            .hero-buttons .btn {
                padding: 16px 36px;
                font-size: 16px;
                border-radius: 14px
            }

            @keyframes fadeUp {
                from {
                    opacity: 0;
                    transform: translateY(24px)
                }

                to {
                    opacity: 1;
                    transform: translateY(0)
                }
            }

            .hero-stats {
                display: flex;
                gap: 48px;
                justify-content: center;
                margin-top: 72px;
                animation: fadeUp .8s ease .4s both
            }

            .hero-stat {
                text-align: center
            }

            .hero-stat .num {
                font-family: 'Sora', sans-serif;
                font-size: 36px;
                font-weight: 800;
                color: #fff
            }

            .hero-stat .label {
                font-size: 13px;
                color: var(--text-muted);
                margin-top: 4px
            }

            .features {
                padding: 100px 60px;
                position: relative
            }

            .section-header {
                text-align: center;
                margin-bottom: 64px
            }

            .section-header h2 {
                font-family: 'Sora', sans-serif;
                font-size: 40px;
                font-weight: 800;
                color: #fff;
                margin-bottom: 12px
            }

            .section-header p {
                font-size: 16px;
                color: var(--text-muted);
                max-width: 500px;
                margin: 0 auto
            }

            .features-grid {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 24px;
                max-width: 1100px;
                margin: 0 auto
            }

            .feature-card {
                padding: 36px;
                border-radius: 20px;
                background: var(--navy-light);
                border: 1px solid var(--border);
                transition: all .4s;
                position: relative;
                overflow: hidden
            }

            .feature-card:hover {
                transform: translateY(-6px);
                border-color: rgba(31, 31, 255, .2);
                box-shadow: 0 20px 60px rgba(0, 0, 0, .3)
            }

            .feature-card::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 3px;
                background: linear-gradient(90deg, var(--blue), var(--purple));
                opacity: 0;
                transition: opacity .3s
            }

            .feature-card:hover::after {
                opacity: 1
            }

            .feature-icon {
                width: 56px;
                height: 56px;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 20px
            }

            .feature-icon .material-symbols-outlined {
                font-size: 28px;
                color: #fff
            }

            .feature-card h3 {
                font-family: 'Sora', sans-serif;
                font-size: 18px;
                font-weight: 700;
                color: #fff;
                margin-bottom: 8px
            }

            .feature-card p {
                font-size: 14px;
                color: var(--text-muted);
                line-height: 1.6
            }

            .cta {
                padding: 100px 60px;
                text-align: center
            }

            .cta-box {
                max-width: 800px;
                margin: 0 auto;
                padding: 72px;
                border-radius: 28px;
                background: linear-gradient(135deg, rgba(31, 31, 255, .15), rgba(139, 92, 246, .1));
                border: 1px solid rgba(31, 31, 255, .15);
                position: relative;
                overflow: hidden
            }

            .cta-box::before {
                content: '';
                position: absolute;
                top: -100px;
                right: -100px;
                width: 300px;
                height: 300px;
                background: radial-gradient(circle, rgba(31, 31, 255, .2), transparent 70%);
                border-radius: 50%
            }

            .cta-box h2 {
                font-family: 'Sora', sans-serif;
                font-size: 36px;
                font-weight: 800;
                color: #fff;
                margin-bottom: 16px;
                position: relative
            }

            .cta-box p {
                font-size: 16px;
                color: var(--text-muted);
                margin-bottom: 36px;
                position: relative
            }

            .cta-box .btn {
                position: relative
            }

            .footer {
                padding: 48px 60px;
                border-top: 1px solid var(--border);
                display: flex;
                justify-content: space-between;
                align-items: center
            }

            .footer-text {
                font-size: 13px;
                color: var(--text-muted)
            }

            .footer-links {
                display: flex;
                gap: 24px
            }

            .footer-links a {
                font-size: 13px;
                color: var(--text-muted);
                text-decoration: none;
                transition: color .3s
            }

            .footer-links a:hover {
                color: #fff
            }

            .toast-bar {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 28px;
                border-radius: 12px;
                background: rgba(16, 185, 129, .15);
                border: 1px solid rgba(16, 185, 129, .3);
                color: var(--green);
                font-size: 14px;
                font-weight: 600;
                display: none;
                z-index: 200;
                backdrop-filter: blur(10px);
                animation: fadeUp .4s ease
            }

            @media(max-width:768px) {
                .navbar {
                    padding: 0 20px
                }

                .hero {
                    padding: 100px 20px 60px
                }

                .hero h1 {
                    font-size: 40px
                }

                .hero p {
                    font-size: 16px
                }

                .hero-stats {
                    flex-direction: column;
                    gap: 24px
                }

                .features,
                .cta {
                    padding: 60px 20px
                }

                .features-grid {
                    grid-template-columns: 1fr
                }

                .footer {
                    flex-direction: column;
                    gap: 16px;
                    text-align: center
                }

                .hero-buttons {
                    flex-direction: column;
                    align-items: center
                }
            }
        </style>
    </head>

    <body>
        <% if ("logged_out".equals(request.getParameter("msg"))) { %>
            <div class="toast-bar" id="logoutToast" style="display:flex">
                <span class="material-symbols-outlined" style="font-size:18px;margin-right:8px">check_circle</span>
                You have been logged out successfully
            </div>
            <% } %>
                <nav class="navbar" id="navbar">
                    <a href="${pageContext.request.contextPath}/" class="nav-brand">
                        <div class="nav-logo">A</div>
                        <span class="nav-name">ACE Bank</span>
                    </a>
                    <div class="nav-links">
                        <a href="${pageContext.request.contextPath}/login.jsp" class="btn btn-outline">
                            <span class="material-symbols-outlined" style="font-size:18px">login</span> Login
                        </a>
                        <a href="${pageContext.request.contextPath}/sign-up.jsp" class="btn btn-primary">
                            <span class="material-symbols-outlined" style="font-size:18px">person_add</span> Sign Up
                        </a>
                    </div>
                </nav>
                <section class="hero">
                    <div class="hero-content">
                        <div class="hero-badge"><span class="dot"></span> RBI Regulated &middot; DICGC Insured</div>
                        <h1>Banking Reimagined for the Digital Age</h1>
                        <p>Experience next-generation banking with zero fees, instant transfers, smart savings goals,
                            and real-time insights — all in one beautiful platform.</p>
                        <div class="hero-buttons">
                            <a href="${pageContext.request.contextPath}/sign-up.jsp" class="btn btn-primary">
                                <span class="material-symbols-outlined" style="font-size:20px">rocket_launch</span> Open
                                Free Account
                            </a>
                            <a href="#features" class="btn btn-outline">
                                <span class="material-symbols-outlined" style="font-size:20px">explore</span> Explore
                                Features
                            </a>
                        </div>
                        <div class="hero-stats">
                            <div class="hero-stat">
                                <div class="num">40K+</div>
                                <div class="label">Active Users</div>
                            </div>
                            <div class="hero-stat">
                                <div class="num">&#x20B9;500Cr+</div>
                                <div class="label">Transactions Processed</div>
                            </div>
                            <div class="hero-stat">
                                <div class="num">99.9%</div>
                                <div class="label">Uptime SLA</div>
                            </div>
                            <div class="hero-stat">
                                <div class="num">4.8&#9733;</div>
                                <div class="label">App Rating</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="features" id="features">
                    <div class="section-header">
                        <h2>Why Choose ACE Bank?</h2>
                        <p>Built for modern India — powerful features that make banking effortless</p>
                    </div>
                    <div class="features-grid">
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(31,31,255,.2),rgba(31,31,255,.05))"><span
                                    class="material-symbols-outlined">payments</span></div>
                            <h3>Zero Fee Banking</h3>
                            <p>No minimum balance, no maintenance charges, no hidden fees. Banking that respects your
                                wallet.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(16,185,129,.2),rgba(16,185,129,.05))">
                                <span class="material-symbols-outlined">bolt</span></div>
                            <h3>Instant Transfers</h3>
                            <p>Send money via UPI, NEFT, RTGS, or IMPS instantly. 24/7 availability, even on holidays.
                            </p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(139,92,246,.2),rgba(139,92,246,.05))">
                                <span class="material-symbols-outlined">savings</span></div>
                            <h3>Smart Goals</h3>
                            <p>Set savings goals with auto-debit, track progress visually, and celebrate milestones with
                                confetti.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(245,158,11,.2),rgba(245,158,11,.05))">
                                <span class="material-symbols-outlined">credit_score</span></div>
                            <h3>Credit Score Hub</h3>
                            <p>Real-time credit score monitoring, factor analysis, score simulator, and personalized
                                improvement tips.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(6,182,212,.2),rgba(6,182,212,.05))"><span
                                    class="material-symbols-outlined">credit_card</span></div>
                            <h3>Card Control Center</h3>
                            <p>Freeze/unfreeze your card, set transaction limits, toggle channels, and manage PIN — all
                                in one place.</p>
                        </div>
                        <div class="feature-card">
                            <div class="feature-icon"
                                style="background:linear-gradient(135deg,rgba(239,68,68,.2),rgba(239,68,68,.05))"><span
                                    class="material-symbols-outlined">shield</span></div>
                            <h3>Bank-Grade Security</h3>
                            <p>256-bit SSL encryption, 2FA, biometric login, real-time alerts, and PCI-DSS compliance.
                            </p>
                        </div>
                    </div>
                </section>
                <section class="cta">
                    <div class="cta-box">
                        <h2>Ready to Bank Smarter?</h2>
                        <p>Join 40,000+ Indians who've switched to ACE Bank. Open your account in under 5 minutes.</p>
                        <a href="${pageContext.request.contextPath}/sign-up.jsp" class="btn btn-primary"
                            style="padding:18px 48px;font-size:16px;border-radius:16px">
                            <span class="material-symbols-outlined">account_balance</span> Get Started — It's Free
                        </a>
                    </div>
                </section>
                <footer class="footer">
                    <div class="footer-text">&copy; 2025 ACE Bank Ltd. &middot; RBI Regulated &middot; CIN:
                        L65910MH2025PLC000001</div>
                    <div class="footer-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Grievance Redressal</a>
                    </div>
                </footer>
                <script>
                    window.addEventListener('scroll', function () { document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40) });
                    var toast = document.getElementById('logoutToast');
                    if (toast) { setTimeout(function () { toast.style.opacity = '0'; setTimeout(function () { toast.style.display = 'none' }, 400) }, 4000) }
                    document.querySelectorAll('a[href^="#"]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); var t = document.querySelector(this.getAttribute('href')); if (t) t.scrollIntoView({ behavior: 'smooth' }) }) });
                </script>
    </body>

    </html>
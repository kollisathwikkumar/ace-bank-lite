/* ===== ACE BANK V2 — CORE ENGINE ===== */
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

const App = {
    route: 'dashboard',
    user: { name: 'Arjun Mehta', firstName: 'Arjun', acc: '****  ****  4521', accType: 'Premium Savings', balance: 124530, creditScore: 768, creditScoreHistory: [701, 712, 708, 724, 735, 742, 748, 751, 761, 768, 768, 768], netWorth: 892400, goalsSavings: 45000, tier: 'Gold' },
    formStep: 1, formData: {}, cardFrozen: false,
    cardLimits: { international: true, contactless: true, online: true, atm: true, pos: true, recurring: true, dailyATM: 10000, dailyOnline: 25000, dailyIntl: 5000 },
    goals: [
        { id: 1, name: 'Europe Vacation', emoji: '✈️', target: 150000, saved: 42000, deadline: '2025-12-01', color: '#1f1fff', auto: 12000 },
        { id: 2, name: 'Emergency Fund', emoji: '🛡️', target: 100000, saved: 95000, deadline: '2025-06-01', color: '#10b981', auto: 2500 },
        { id: 3, name: 'MacBook Pro', emoji: '💻', target: 200000, saved: 0, deadline: '2025-09-01', color: '#8b5cf6', auto: 25000 },
        { id: 4, name: 'Down Payment', emoji: '🏠', target: 500000, saved: 80000, deadline: '2026-06-01', color: '#f59e0b', auto: 18000 }
    ],
    sessions: [
        { device: 'Chrome on MacOS', location: 'Mumbai, Maharashtra', ip: '103.xx.xx.xx', lastActive: '2 mins ago', current: true },
        { device: 'ACE Bank App (iOS)', location: 'Mumbai, Maharashtra', ip: '157.xx.xx.xx', lastActive: '1 hour ago', current: false },
        { device: 'Firefox on Windows', location: 'Pune, Maharashtra', ip: '49.xx.xx.xx', lastActive: '3 days ago', current: false }
    ]
};

const txns = [
    { id: 'TXN001', merchant: 'HDFC Bank EMI', category: 'Loan', type: 'debit', amount: 12500, date: '23 Feb 2025', icon: 'account_balance', color: '#6366f1' },
    { id: 'TXN002', merchant: 'Salary - Infosys Ltd', category: 'Income', type: 'credit', amount: 95000, date: '22 Feb 2025', icon: 'work', color: '#10b981' },
    { id: 'TXN003', merchant: 'SBI Mutual Fund SIP', category: 'Investment', type: 'debit', amount: 5000, date: '20 Feb 2025', icon: 'trending_up', color: '#8b5cf6' },
    { id: 'TXN004', merchant: 'ACE Bank FD Interest', category: 'Interest', type: 'credit', amount: 1250, date: '18 Feb 2025', icon: 'savings', color: '#f59e0b' },
    { id: 'TXN005', merchant: 'ATM Withdrawal', category: 'Cash', type: 'debit', amount: 10000, date: '17 Feb 2025', icon: 'local_atm', color: '#64748b' },
    { id: 'TXN006', merchant: 'NEFT - Rahul Sharma', category: 'Transfer', type: 'debit', amount: 8000, date: '15 Feb 2025', icon: 'send', color: '#ef4444' },
    { id: 'TXN007', merchant: 'NACH - LIC Premium', category: 'Insurance', type: 'debit', amount: 3200, date: '14 Feb 2025', icon: 'security', color: '#06b6d4' },
    { id: 'TXN008', merchant: 'Cheque Deposit', category: 'Income', type: 'credit', amount: 25000, date: '10 Feb 2025', icon: 'receipt', color: '#10b981' },
    { id: 'TXN009', merchant: 'Amazon Shopping', category: 'Shopping', type: 'debit', amount: 2499, date: '8 Feb 2025', icon: 'shopping_cart', color: '#f97316' },
    { id: 'TXN010', merchant: 'RTGS - Property Adv', category: 'Transfer', type: 'debit', amount: 50000, date: '5 Feb 2025', icon: 'send', color: '#ef4444' },
    { id: 'TXN011', merchant: 'IMPS - Mom', category: 'Transfer', type: 'debit', amount: 15000, date: '3 Feb 2025', icon: 'send', color: '#ef4444' },
    { id: 'TXN012', merchant: 'Dividend - HDFC MF', category: 'Income', type: 'credit', amount: 3800, date: '1 Feb 2025', icon: 'trending_up', color: '#10b981' },
    { id: 'TXN013', merchant: 'Electricity Bill', category: 'Bills', type: 'debit', amount: 1850, date: '28 Jan 2025', icon: 'bolt', color: '#f59e0b' },
    { id: 'TXN014', merchant: 'Gas Bill - IGL', category: 'Bills', type: 'debit', amount: 620, date: '25 Jan 2025', icon: 'local_fire_department', color: '#f97316' },
    { id: 'TXN015', merchant: 'FD Renewal', category: 'Investment', type: 'debit', amount: 100000, date: '20 Jan 2025', icon: 'savings', color: '#8b5cf6' },
    { id: 'TXN016', merchant: 'NACH - Car EMI', category: 'Loan', type: 'debit', amount: 8500, date: '15 Jan 2025', icon: 'directions_car', color: '#6366f1' },
    { id: 'TXN017', merchant: 'Freelance Income', category: 'Income', type: 'credit', amount: 35000, date: '12 Jan 2025', icon: 'work', color: '#10b981' },
    { id: 'TXN018', merchant: 'Medical Insurance', category: 'Insurance', type: 'debit', amount: 4200, date: '10 Jan 2025', icon: 'health_and_safety', color: '#06b6d4' },
    { id: 'TXN019', merchant: 'SWP - Axis Bluechip', category: 'Income', type: 'credit', amount: 8000, date: '5 Jan 2025', icon: 'trending_up', color: '#10b981' },
    { id: 'TXN020', merchant: 'UPI - Zomato', category: 'Food', type: 'debit', amount: 450, date: '2 Jan 2025', icon: 'restaurant', color: '#ef4444' }
];

const scoreFactors = [
    { name: 'Payment History', impact: 'High', score: 92, status: 'Excellent', icon: 'check_circle', color: '#10b981', tip: 'All payments made on time for 18 months. Keep it up!' },
    { name: 'Credit Utilization', impact: 'High', score: 34, status: 'Good', icon: 'donut_large', color: '#10b981', tip: 'Reduce utilization from 34% to under 30% to gain +15 points.' },
    { name: 'Credit Age', impact: 'Medium', score: 58, status: 'Fair', icon: 'schedule', color: '#f59e0b', tip: 'Your oldest account is 4 years old. Time will improve this factor naturally.' },
    { name: 'Credit Mix', impact: 'Medium', score: 71, status: 'Good', icon: 'category', color: '#10b981', tip: 'Good mix of secured and unsecured credit. Consider adding an FD-backed loan.' },
    { name: 'New Inquiries', impact: 'Low', score: 88, status: 'Excellent', icon: 'search', color: '#10b981', tip: 'Only 1 hard inquiry in last 6 months. Avoid applying for new credit.' },
    { name: 'Total Accounts', impact: 'Low', score: 65, status: 'Good', icon: 'account_balance', color: '#10b981', tip: '5 active accounts is healthy. Keep inactive cards active with small transactions.' }
];

const loanProducts = [
    { type: 'Home Loan', icon: 'home', color: '#1f1fff', rate: '8.40%', max: '₹5 Crore', tenure: 'Up to 30 yrs', fee: '0.5%', features: ['No prepayment penalty', 'Balance transfer available', 'Tax benefit u/s 80C & 24B', 'Doorstep service'] },
    { type: 'Personal Loan', icon: 'person', color: '#8b5cf6', rate: '10.99%', max: '₹25 Lakh', tenure: 'Up to 5 yrs', fee: '1%', features: ['Instant disbursal', 'No collateral', 'Flexible EMI', 'Pre-approved offers'] },
    { type: 'Car Loan', icon: 'directions_car', color: '#06b6d4', rate: '8.75%', max: '₹1 Crore', tenure: 'Up to 7 yrs', fee: '0.5%', features: ['100% on-road funding', 'New & used cars', 'Quick approval', '24-hr disbursal'] },
    { type: 'Education Loan', icon: 'school', color: '#f59e0b', rate: '9.50%', max: '₹1.5 Crore', tenure: 'Up to 15 yrs', fee: '0%', features: ['Covers all expenses', 'Moratorium period', 'Tax benefit u/s 80E', 'Global coverage'] }
];

const assets = [
    { cat: 'Bank Balance', amount: 124530, icon: 'account_balance', color: '#10b981' },
    { cat: 'Fixed Deposits', amount: 250000, icon: 'savings', color: '#10b981' },
    { cat: 'Mutual Funds', amount: 380000, icon: 'trending_up', color: '#8b5cf6' },
    { cat: 'Provident Fund', amount: 220000, icon: 'security', color: '#06b6d4' },
    { cat: 'Gold', amount: 85000, icon: 'diamond', color: '#f59e0b' },
    { cat: 'Vehicle', amount: 180000, icon: 'directions_car', color: '#64748b' }
];
const liabilities = [
    { cat: 'Home Loan', amount: 250000, icon: 'home', color: '#ef4444' },
    { cat: 'Car Loan', amount: 62000, icon: 'directions_car', color: '#ef4444' },
    { cat: 'Credit Card Due', amount: 35130, icon: 'credit_card', color: '#ef4444' }
];

const pinDB = { '110001': { city: 'New Delhi', state: 'Delhi' }, '400001': { city: 'Mumbai', state: 'Maharashtra' }, '560001': { city: 'Bengaluru', state: 'Karnataka' }, '600001': { city: 'Chennai', state: 'Tamil Nadu' }, '500001': { city: 'Hyderabad', state: 'Telangana' }, '700001': { city: 'Kolkata', state: 'West Bengal' }, '380001': { city: 'Ahmedabad', state: 'Gujarat' }, '411001': { city: 'Pune', state: 'Maharashtra' }, '302001': { city: 'Jaipur', state: 'Rajasthan' }, '226001': { city: 'Lucknow', state: 'Uttar Pradesh' } };

const branches = { Mumbai: ['Bandra West', 'Andheri East', 'Powai', 'Churchgate', 'Thane'], Delhi: ['Connaught Place', 'Saket', 'Dwarka', 'Rohini', 'Lajpat Nagar'], Bengaluru: ['Koramangala', 'Indiranagar', 'Whitefield', 'HSR Layout', 'Jayanagar'], Chennai: ['Anna Nagar', 'T Nagar', 'Velachery', 'Adyar', 'OMR'], Hyderabad: ['Banjara Hills', 'Jubilee Hills', 'Madhapur', 'Secunderabad', 'Kukatpally'] };

const states = ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Puducherry', 'Jammu & Kashmir', 'Ladakh'];

/* ===== UTILITIES ===== */
function formatINR(n) { return '₹' + Math.abs(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }
function formatINRShort(n) { if (n >= 10000000) return '₹' + (n / 10000000).toFixed(2) + 'Cr'; if (n >= 100000) return '₹' + (n / 100000).toFixed(2) + 'L'; return '₹' + n.toLocaleString('en-IN') }

function animateCounter(el, to, dur = 1500, prefix = '', suffix = '') {
    const start = performance.now(); const from = 0;
    function tick(now) {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 4);
        const v = Math.round(from + (to - from) * ease);
        el.textContent = prefix + v.toLocaleString('en-IN') + suffix;
        if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
}

function calculateAge(dob) { const t = new Date(), b = new Date(dob); let a = t.getFullYear() - b.getFullYear(); const m = t.getMonth() - b.getMonth(); if (m < 0 || (m === 0 && t.getDate() < b.getDate())) a--; return a }

function calculateEMI(P, R, N) { const r = R / 12 / 100, n = N * 12; if (r === 0) return { emi: Math.round(P / n), total: P, interest: 0 }; const e = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1); return { emi: Math.round(e), total: Math.round(e * n), interest: Math.round(e * n - P) } }

function copyClip(text, btn) { navigator.clipboard.writeText(text).then(() => { const o = btn.innerHTML; btn.innerHTML = '<span class="material-symbols-outlined">check</span> Copied!'; btn.style.color = 'var(--ace-green)'; setTimeout(() => { btn.innerHTML = o; btn.style.color = '' }, 2000) }) }

/* ===== TOAST ===== */
let toastCount = 0;
function showToast(msg, type = 'success', dur = 3500) {
    if (toastCount >= 4) return; toastCount++;
    const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
    const t = document.createElement('div'); t.className = `toast toast-${type}`;
    t.innerHTML = `<span class="material-symbols-outlined">${icons[type] || 'info'}</span><span>${msg}</span><button class="toast-close" onclick="this.parentElement.classList.add('out');setTimeout(()=>{this.parentElement.remove();toastCount--},300)"><span class="material-symbols-outlined">close</span></button>`;
    $('#toastContainer').appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => { t.remove(); toastCount-- }, 300) }, dur);
}

/* ===== MODAL ===== */
function openModal(title, body, footer = '') {
    const m = $('#modalContent');
    m.innerHTML = `<div class="modal-header"><h3>${title}</h3><button class="modal-close" onclick="closeModal()"><span class="material-symbols-outlined">close</span></button></div><div class="modal-body">${body}</div>${footer ? `<div class="modal-footer">${footer}</div>` : ''}`;
    $('#modalOverlay').classList.add('active');
}
function closeModal() { $('#modalOverlay').classList.remove('active') }

/* ===== SIDEBAR ===== */
function toggleSidebar() { $('#sidebar').classList.toggle('open'); $('#sidebarBackdrop').classList.toggle('show') }

/* ===== QUICK ACTIONS ===== */
function openQuickActions() {
    openModal('Quick Actions', `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">${[{ i: 'send', l: 'Transfer', r: 'transactions' }, { i: 'savings', l: 'Book FD', r: 'loans' }, { i: 'report', l: 'Dispute', r: 'card-control' }, { i: 'flag', l: 'New Goal', r: 'goals' }].map(a => `<div class="card" style="cursor:pointer;text-align:center;padding:20px" onclick="closeModal();navigate('${a.r}')"><span class="material-symbols-outlined" style="font-size:32px;color:var(--ace-blue)">${a.i}</span><p style="font-weight:600;margin-top:8px;font-size:13px">${a.l}</p></div>`).join('')}</div>`);
}

/* ===== CONFETTI ===== */
function launchConfetti(dur = 3500) {
    const cv = $('#confetti-canvas'), ctx = cv.getContext('2d');
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const colors = ['#1f1fff', '#f59e0b', '#10b981', '#8b5cf6', '#ffffff', '#ef4444'];
    const ps = []; for (let i = 0; i < 180; i++)ps.push({ x: cv.width / 2, y: cv.height / 2, vx: (Math.random() - .5) * 12, vy: Math.random() * -14 - 4, r: Math.random() * 6 + 2, c: colors[Math.floor(Math.random() * colors.length)], rot: Math.random() * 360, rs: (Math.random() - .5) * 8, shape: Math.random() > .5 ? 'rect' : 'circle' });
    const start = performance.now();
    function draw() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        const t = performance.now() - start; if (t > dur) { ctx.clearRect(0, 0, cv.width, cv.height); return }
        ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .3; p.vx *= .99; p.rot += p.rs; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot * Math.PI / 180); ctx.fillStyle = p.c; ctx.globalAlpha = Math.max(0, 1 - t / dur); if (p.shape === 'rect') { ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r) } else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill() } ctx.restore() });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ===== CANVAS CHARTS ===== */
function drawSparkline(cvs, data, color = '#1f1fff') {
    if (!cvs) return; const ctx = cvs.getContext('2d'), w = cvs.offsetWidth, h = cvs.offsetHeight;
    cvs.width = w * 2; cvs.height = h * 2; ctx.scale(2, 2);
    const mn = Math.min(...data), mx = Math.max(...data), rng = mx - mn || 1;
    const pts = data.map((v, i) => ({ x: i / (data.length - 1) * w, y: h - ((v - mn) / rng) * (h * .8) - .1 * h }));
    // gradient fill
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
    const grd = ctx.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, color + '33'); grd.addColorStop(1, color + '00');
    ctx.fillStyle = grd; ctx.fill();
    // line
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = color; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; ctx.stroke();
}

function drawDonut(cvs, segments, size = 220) {
    if (!cvs) return; const ctx = cvs.getContext('2d');
    cvs.width = size * 2; cvs.height = size * 2; ctx.scale(2, 2);
    const cx = size / 2, cy = size / 2, r = size / 2 - 20, total = segments.reduce((s, v) => s + v.value, 0);
    let angle = -Math.PI / 2;
    segments.forEach((seg, i) => {
        const sweep = seg.value / total * Math.PI * 2;
        setTimeout(() => {
            ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r, angle, angle + sweep); ctx.closePath();
            ctx.fillStyle = seg.color; ctx.fill(); angle += sweep;
            // center hole
            ctx.beginPath(); ctx.arc(cx, cy, r * .6, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
            // center text
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = '600 12px DM Sans'; ctx.fillStyle = '#64748b'; ctx.fillText('Total Spent', cx, cy - 8);
            ctx.font = '800 16px Sora'; ctx.fillStyle = '#0f172a'; ctx.fillText('₹' + Math.round(total / 1000) + 'K', cx, cy + 10);
        }, i * 200);
    });
}

function drawLineChart(cvs, data, labels, color = '#1f1fff', w = 600, h = 200) {
    if (!cvs) return; const ctx = cvs.getContext('2d');
    cvs.width = w * 2; cvs.height = h * 2; ctx.scale(2, 2);
    const mn = Math.min(...data) - 20, mx = Math.max(...data) + 20, rng = mx - mn;
    const padL = 40, padB = 24, cw = w - padL - 10, ch = h - padB - 10;
    // grid
    ctx.strokeStyle = '#e2e8f044'; ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) { const y = 10 + ch * i / 4; ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(w - 10, y); ctx.stroke(); ctx.fillStyle = '#94a3b8'; ctx.font = '10px DM Sans'; ctx.textAlign = 'right'; ctx.fillText(Math.round(mx - rng * i / 4), padL - 6, y + 4) }
    // x labels
    ctx.textAlign = 'center'; labels.forEach((l, i) => { const x = padL + i / (labels.length - 1) * cw; ctx.fillStyle = '#94a3b8'; ctx.font = '10px DM Sans'; ctx.fillText(l, x, h - 4) });
    // gradient
    const pts = data.map((v, i) => ({ x: padL + i / (data.length - 1) * cw, y: 10 + ch * (1 - (v - mn) / rng) }));
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.lineTo(pts[pts.length - 1].x, 10 + ch); ctx.lineTo(pts[0].x, 10 + ch); ctx.closePath();
    const grd = ctx.createLinearGradient(0, 0, 0, h); grd.addColorStop(0, color + '30'); grd.addColorStop(1, color + '00'); ctx.fillStyle = grd; ctx.fill();
    // line
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y); pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.strokeStyle = color; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
    // dots
    pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 3, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill(); ctx.beginPath(); ctx.arc(p.x, p.y, 5, 0, Math.PI * 2); ctx.fillStyle = color + '20'; ctx.fill() });
}

function drawScoreGauge(svgEl, score) {
    const pct = (score - 300) / 600;
    svgEl.innerHTML = `<svg viewBox="0 0 300 170" style="width:100%;max-width:300px">
    <defs><linearGradient id="sg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#ef4444"/><stop offset="40%" stop-color="#f59e0b"/><stop offset="65%" stop-color="#f59e0b"/><stop offset="85%" stop-color="#10b981"/><stop offset="100%" stop-color="#059669"/></linearGradient></defs>
    <path d="M30 150 A120 120 0 0 1 270 150" fill="none" stroke="#e2e8f0" stroke-width="18" stroke-linecap="round"/>
    <path d="M30 150 A120 120 0 0 1 270 150" fill="none" stroke="url(#sg)" stroke-width="18" stroke-linecap="round" stroke-dasharray="${Math.PI * 120}" stroke-dashoffset="${Math.PI * 120 * (1 - pct)}" style="transition:stroke-dashoffset 1.5s ease-out"/>
    <text x="150" y="120" text-anchor="middle" font-family="Sora" font-size="48" font-weight="800" fill="#0f172a">${score}</text>
    <text x="150" y="145" text-anchor="middle" font-family="DM Sans" font-size="13" fill="#64748b">${score >= 750 ? 'Excellent' : score >= 700 ? 'Good' : score >= 650 ? 'Fair' : 'Poor'}</text>
    <text x="30" y="168" text-anchor="middle" font-family="DM Sans" font-size="10" fill="#94a3b8">300</text>
    <text x="270" y="168" text-anchor="middle" font-family="DM Sans" font-size="10" fill="#94a3b8">900</text>
  </svg>`;
}

/* ===== ROUTER ===== */
const routes = { dashboard: renderDashboard, account: renderAccount, 'credit-score': renderCreditScore, 'card-control': renderCardControl, loans: renderLoans, goals: renderGoals, 'net-worth': renderNetWorth, transactions: renderTransactions, profile: renderProfile, security: renderSecurity };

function navigate(route) {
    App.route = route;
    $$('.nav-item').forEach(el => el.classList.toggle('active', el.dataset.route === route));
    $$('.bottom-nav-item').forEach(el => el.classList.toggle('active', el.dataset.route === route));
    const c = $('#content'); c.style.opacity = '0'; c.style.transform = 'translateY(8px)';
    setTimeout(() => { c.innerHTML = ''; if (routes[route]) routes[route](c); c.style.transition = 'opacity .25s ease,transform .25s ease'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; window.scrollTo(0, 0) }, 150);
    if (window.innerWidth < 1200) { $('#sidebar').classList.remove('open'); $('#sidebarBackdrop').classList.remove('show') }
}

/* ===== NAVBAR SCROLL ===== */
window.addEventListener('scroll', () => { const tb = $('#topbar'); if (window.scrollY > 20) tb.classList.add('compact'); else tb.classList.remove('compact') });
window.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal() });

/* ===== BALANCE CARD TILT ===== */
function initTilt(el) {
    el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5; const y = (e.clientY - r.top) / r.height - .5; el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)` });
    el.addEventListener('mouseleave', () => { el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)' });
}

/* ===== ACE BANK V2 — DASHBOARD ===== */
function renderDashboard(c) {
  c.innerHTML = `
  <div class="balance-hero" id="balanceHero">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
      <span class="chip chip-purple" style="background:rgba(255,255,255,.15);color:#fff;border:none">${App.user.accType}</span>
      <span style="font-family:var(--font-display);font-weight:800;font-size:20px;opacity:.3">VISA</span>
    </div>
    <div class="acc-no">${App.user.acc}</div>
    <div class="label">Available Balance</div>
    <div class="balance" id="heroBalance">₹ 0</div>
    <div style="font-size:11px;opacity:.5;margin-bottom:20px">Last updated: Just now 🟢</div>
    <div class="hero-actions">
      <button class="hero-pill" onclick="openTransferModal()"><span class="material-symbols-outlined">send</span>Transfer</button>
      <button class="hero-pill" onclick="navigate('transactions')"><span class="material-symbols-outlined">receipt_long</span>Statement</button>
      <button class="hero-pill" onclick="navigate('loans')"><span class="material-symbols-outlined">savings</span>FD/RD</button>
      <button class="hero-pill" onclick="openQuickActions()"><span class="material-symbols-outlined">more_horiz</span>More</button>
    </div>
  </div>
  <div class="stats-grid" id="statsGrid">
    ${[{ l: 'Monthly Spent', v: '₹18,240', trend: '↑ 12% vs last month', up: false, data: [12, 15, 14, 18, 16, 20, 18, 22] },
    { l: 'Monthly Earned', v: '₹95,000', trend: '↑ Salary credited', up: true, data: [80, 85, 85, 90, 95, 95, 92, 95] },
    { l: 'Credit Score', v: '768 / 900', trend: '↑ +7 this month', up: true, data: [712, 724, 735, 748, 761, 768] },
    { l: 'Net Worth', v: '₹8.92L', trend: '↑ 3.2%', up: true, data: [780, 800, 820, 850, 870, 892] }
    ].map(function (s, i) { return '<div class="stat-card"><div class="stat-label">' + s.l + '</div><div class="stat-value">' + s.v + '</div><div class="stat-trend ' + (s.up ? 'up' : 'down') + '"><span class="material-symbols-outlined" style="font-size:14px">' + (s.up ? 'trending_up' : 'trending_down') + '</span>' + s.trend + '</div><canvas id="spark' + i + '"></canvas></div>' }).join('')}
  </div>
  <div class="dash-grid">
    <div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-title"><span class="material-symbols-outlined">receipt_long</span>Recent Transactions<a href="#" onclick="event.preventDefault();navigate('transactions')" style="margin-left:auto;font-size:12px;color:var(--ace-blue);font-weight:600">View All →</a></div>
        <div class="txn-list" id="dashTxnList"></div>
      </div>
      <div class="card">
        <div class="card-title"><span class="material-symbols-outlined">send</span>Quick Transfer</div>
        <div style="display:flex;gap:16px;margin-bottom:16px;overflow-x:auto;padding-bottom:8px" id="qtAvatars"></div>
        <input class="form-control" id="qtName" placeholder="Beneficiary name" style="margin-bottom:12px">
        <input class="form-control" id="qtAmt" type="number" placeholder="₹ Amount" style="margin-bottom:12px">
        <button class="btn btn-primary btn-block" onclick="doQuickTransfer()">Send Now</button>
      </div>
    </div>
    <div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-title"><span class="material-symbols-outlined">donut_large</span>Spending Breakdown</div>
        <canvas id="dashDonut" style="width:100%;max-width:220px;margin:0 auto;display:block"></canvas>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:16px;justify-content:center" id="donutLegend"></div>
      </div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-title"><span class="material-symbols-outlined">trending_up</span>Credit Score<a href="#" onclick="event.preventDefault();navigate('credit-score')" style="margin-left:auto;font-size:12px;color:var(--ace-blue);font-weight:600">Full Report →</a></div>
        <div id="miniGauge" style="text-align:center"></div>
        <p style="font-size:12px;color:var(--text-muted);text-align:center;margin-top:8px">Pay your HDFC EMI on time to reach 800+</p>
      </div>
      <div class="card">
        <div class="card-title"><span class="material-symbols-outlined">flag</span>Active Goals<a href="#" onclick="event.preventDefault();navigate('goals')" style="margin-left:auto;font-size:12px;color:var(--ace-blue);font-weight:600">+ New Goal</a></div>
        <div id="dashGoals"></div>
      </div>
    </div>
  </div>`;

  // Populate transactions safely
  var txnHtml = '';
  txns.slice(0, 8).forEach(function (t) {
    txnHtml += '<div class="txn-item" data-txn-id="' + t.id + '">';
    txnHtml += '<div class="txn-icon" style="background:' + t.color + '15"><span class="material-symbols-outlined" style="color:' + t.color + '">' + t.icon + '</span></div>';
    txnHtml += '<div class="txn-info"><div class="txn-name">' + t.merchant + '</div><div class="txn-cat"><span class="chip" style="font-size:9px;padding:1px 6px;background:' + t.color + '15;color:' + t.color + '">' + t.category + '</span> · ' + t.date + '</div></div>';
    txnHtml += '<div class="txn-right"><div class="txn-amount ' + t.type + '">' + (t.type === 'debit' ? '−' : '+') + ' ' + formatINR(t.amount) + '</div></div>';
    txnHtml += '</div>';
  });
  $('#dashTxnList').innerHTML = txnHtml;
  // Bind clicks
  $$('#dashTxnList .txn-item').forEach(function (el) {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function () {
      var tid = el.getAttribute('data-txn-id');
      var t = txns.find(function (x) { return x.id === tid });
      if (t) openTxnDetail(t);
    });
  });

  // Quick transfer avatars
  var avatarHtml = '';
  var names = ['Rahul S', 'Priya M', 'Mom', 'Dad', 'Neha K'];
  var colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#06b6d4'];
  names.forEach(function (n, i) {
    avatarHtml += '<div style="text-align:center;cursor:pointer;flex-shrink:0" data-name="' + n + '">';
    avatarHtml += '<div style="width:48px;height:48px;border-radius:50%;background:' + colors[i] + ';display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:16px;margin:0 auto 4px">' + n[0] + '</div>';
    avatarHtml += '<div style="font-size:10px;font-weight:600;color:var(--text-muted)">' + n + '</div></div>';
  });
  $('#qtAvatars').innerHTML = avatarHtml;
  $$('#qtAvatars > div').forEach(function (el) {
    el.addEventListener('click', function () { $('#qtName').value = el.getAttribute('data-name') });
  });

  // Donut legend
  var legend = [{ l: 'Loans', c: '#6366f1', v: 35 }, { l: 'Investments', c: '#8b5cf6', v: 20 }, { l: 'Insurance', c: '#06b6d4', v: 12 }, { l: 'Cash', c: '#64748b', v: 18 }, { l: 'Transfers', c: '#ef4444', v: 15 }];
  var lHtml = ''; legend.forEach(function (s) { lHtml += '<div style="display:flex;align-items:center;gap:4px;font-size:11px"><div style="width:8px;height:8px;border-radius:50%;background:' + s.c + '"></div>' + s.l + ' ' + s.v + '%</div>' });
  $('#donutLegend').innerHTML = lHtml;

  // Goals
  var gHtml = '';
  App.goals.slice(0, 3).forEach(function (g) {
    var pct = Math.round(g.saved / g.target * 100);
    gHtml += '<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><span style="font-weight:600;font-size:13px">' + g.emoji + ' ' + g.name + '</span><span style="font-size:12px;color:var(--text-faint)">' + pct + '%</span></div><div class="progress-bar"><div class="progress-fill" style="width:' + pct + '%;background:' + g.color + '"></div></div><div style="font-size:11px;color:var(--text-faint);margin-top:4px">₹' + g.saved.toLocaleString('en-IN') + ' / ₹' + g.target.toLocaleString('en-IN') + '</div></div>';
  });
  $('#dashGoals').innerHTML = gHtml;

  // Animate
  setTimeout(function () {
    animateCounter($('#heroBalance'), App.user.balance, 1500, '₹ ');
    initTilt($('#balanceHero'));
    [[12, 15, 14, 18, 16, 20, 18, 22], [80, 85, 85, 90, 95, 95, 92, 95], [712, 724, 735, 748, 761, 768], [780, 800, 820, 850, 870, 892]].forEach(function (d, i) { drawSparkline($('#spark' + i), d, i === 0 ? '#ef4444' : '#10b981') });
    drawDonut($('#dashDonut'), [{ label: 'Loans', value: 35, color: '#6366f1' }, { label: 'Investments', value: 20, color: '#8b5cf6' }, { label: 'Insurance', value: 12, color: '#06b6d4' }, { label: 'Cash', value: 18, color: '#64748b' }, { label: 'Transfers', value: 15, color: '#ef4444' }]);
    drawScoreGauge($('#miniGauge'), App.user.creditScore);
  }, 200);
}

function openTxnDetail(t) {
  var amtColor = t.type === 'debit' ? 'var(--ace-red)' : 'var(--ace-green)';
  var sign = t.type === 'debit' ? '−' : '+';
  var rows = '';
  [['Reference', t.id], ['Type', t.type.toUpperCase()], ['Mode', 'NEFT'], ['Status', 'Completed ✓'], ['Time', '14:32:18 IST']].forEach(function (pair) {
    rows += '<div class="profile-row"><span class="label">' + pair[0] + '</span><span class="value">' + pair[1] + '</span></div>';
  });
  openModal('Transaction Details',
    '<div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">' +
    '<div style="width:48px;height:48px;border-radius:var(--r-md);background:' + t.color + '15;display:flex;align-items:center;justify-content:center"><span class="material-symbols-outlined" style="color:' + t.color + ';font-size:24px">' + t.icon + '</span></div>' +
    '<div><div style="font-weight:700;font-size:16px">' + t.merchant + '</div><div style="font-size:12px;color:var(--text-faint)">' + t.category + ' · ' + t.date + '</div></div></div>' +
    '<div style="font-size:28px;font-weight:800;font-family:var(--font-display);color:' + amtColor + ';margin-bottom:24px">' + sign + ' ' + formatINR(t.amount) + '</div>' +
    rows +
    '<div style="margin-top:20px;display:flex;gap:8px">' +
    '<button class="btn btn-ghost btn-sm" onclick="copyClip(\'' + t.id + '\',this)"><span class="material-symbols-outlined" style="font-size:14px">content_copy</span>Copy Ref</button>' +
    '<button class="btn btn-ghost btn-sm" onclick="showToast(\'Issue reported for ' + t.id + '\',\'info\')"><span class="material-symbols-outlined" style="font-size:14px">flag</span>Report Issue</button></div>'
  );
}

function openTransferModal() {
  openModal('Quick Transfer',
    '<div class="form-group"><label class="form-label">Send To</label><select class="form-control"><option>UPI ID</option><option>Bank Account</option><option>Mobile Number</option></select></div>' +
    '<div class="form-group"><label class="form-label">UPI ID / Account No.</label><input class="form-control" placeholder="name@upi"></div>' +
    '<div class="form-group"><label class="form-label">Amount (₹)</label><input class="form-control" type="number" id="tfAmt" placeholder="0.00" style="font-size:28px;font-weight:800;text-align:center;padding:20px;font-family:var(--font-display)"></div>' +
    '<div class="form-group"><label class="form-label">Remark</label><input class="form-control" placeholder="Optional note"></div>',
    '<button class="btn btn-secondary" onclick="closeModal()">Cancel</button> ' +
    '<button class="btn btn-success" onclick="closeModal();showToast(\'Transfer successful!\',\'success\')">Send Money</button>'
  );
}

function doQuickTransfer() {
  var name = $('#qtName').value, amt = $('#qtAmt').value;
  if (!name || !amt) { showToast('Enter beneficiary and amount', 'error'); return }
  showToast('₹' + parseInt(amt).toLocaleString('en-IN') + ' sent to ' + name + '!', 'success');
  $('#qtName').value = ''; $('#qtAmt').value = '';
}

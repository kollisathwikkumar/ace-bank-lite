/* ===== ACE BANK V2 — GOALS, NET WORTH, TRANSACTIONS, PROFILE, SECURITY ===== */

// ===== GOAL SAVINGS =====
function renderGoals(c) {
  var totalSaved = App.goals.reduce(function (s, g) { return s + g.saved }, 0);
  var totalTarget = App.goals.reduce(function (s, g) { return s + g.target }, 0);
  var html = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px"><h2 style="font-size:28px;font-weight:800">Goal-Based Savings</h2><button class="btn btn-primary" onclick="openNewGoalModal()"><span class="material-symbols-outlined" style="font-size:18px">add</span>Create New Goal</button></div>';
  html += '<div class="card" style="margin-bottom:24px"><div style="display:flex;gap:32px;align-items:center;flex-wrap:wrap">';
  html += '<div><div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px">Total Saved</div><div style="font-size:32px;font-weight:800;font-family:var(--font-display);color:var(--ace-blue)">' + formatINRShort(totalSaved) + '</div></div>';
  html += '<div><div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px">Total Targets</div><div style="font-size:32px;font-weight:800;font-family:var(--font-display)">' + formatINRShort(totalTarget) + '</div></div>';
  var pctTotal = Math.round(totalSaved / totalTarget * 100);
  html += '<div style="flex:1;min-width:200px"><div style="display:flex;justify-content:space-between;font-size:12px;margin-bottom:4px"><span>Overall Progress</span><span style="font-weight:700">' + pctTotal + '%</span></div><div class="progress-bar" style="height:10px"><div class="progress-fill" style="width:' + pctTotal + '%;background:linear-gradient(90deg,var(--ace-blue),var(--ace-purple))"></div></div></div>';
  html += '</div></div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px" id="goalsGrid">';
  App.goals.forEach(function (g, i) {
    var pct = Math.round(g.saved / g.target * 100);
    var status = pct >= 100 ? 'completed' : pct >= 50 ? 'on-track' : 'behind';
    var statusBg = status === 'completed' ? 'var(--ace-green-light)' : status === 'on-track' ? 'var(--ace-blue-light)' : '#fffbeb';
    var statusColor = status === 'completed' ? '#065f46' : status === 'on-track' ? 'var(--ace-blue)' : '#92400e';
    var statusLabel = status === 'completed' ? '🎉 Completed' : status === 'on-track' ? '✓ On Track' : '⚠ Behind';
    html += '<div class="goal-card card ' + (pct >= 100 ? 'goal-completed' : '') + '" style="animation:pageIn .3s ease ' + (i * 80) + 'ms both">';
    html += '<div style="display:flex;justify-content:space-between;align-items:flex-start"><div class="goal-emoji">' + g.emoji + '</div><button class="btn btn-ghost btn-sm" onclick="openGoalMenu(' + g.id + ')"><span class="material-symbols-outlined">more_vert</span></button></div>';
    html += '<div class="goal-name">' + g.name + '</div>';
    html += '<div style="font-size:13px;margin-bottom:12px"><strong>' + formatINRShort(g.saved) + '</strong> <span style="color:var(--text-faint)">of ' + formatINRShort(g.target) + '</span></div>';
    html += '<div class="progress-bar" style="height:8px;margin-bottom:8px"><div class="progress-fill" style="width:' + Math.min(pct, 100) + '%;background:' + g.color + '"></div></div>';
    html += '<div style="display:flex;justify-content:space-between;align-items:center"><span class="badge" style="background:' + statusBg + ';color:' + statusColor + '">' + statusLabel + '</span><span style="font-size:11px;color:var(--text-faint)">' + g.deadline + '</span></div>';
    html += '<div class="goal-meta">Need ' + formatINRShort(g.auto) + '/month</div>';
    html += '<div style="display:flex;gap:8px;margin-top:8px"><button class="btn btn-primary btn-sm" onclick="addMoneyToGoal(' + g.id + ')"><span class="material-symbols-outlined" style="font-size:14px">add</span>Add Money</button><button class="btn btn-ghost btn-sm" onclick="showGoalDetail(' + g.id + ')">View Details</button></div>';
    html += '</div>';
  });
  html += '</div>';
  c.innerHTML = html;
}

function openNewGoalModal() {
  var emojis = ['✈️', '🏠', '💻', '🎓', '🚗', '💍', '🛡️', '🎉', '📱', '💰', '🏖️', '🎸', '🏋️', '📚', '🎮', '🌍', '👶', '🐕', '🧳', '🎯', '🏆', '💎', '🎁', '⭐'];
  var emojiHtml = '';
  emojis.forEach(function (e) {
    emojiHtml += '<div style="font-size:24px;cursor:pointer;padding:4px;border-radius:8px;transition:all .2s" data-emoji="' + e + '">' + e + '</div>';
  });
  openModal('Create New Goal',
    '<div class="form-group"><label class="form-label">Goal Name</label><input class="form-control" id="ngName" placeholder="e.g. New Car"></div>' +
    '<div class="form-group"><label class="form-label">Pick an Emoji</label><div style="display:flex;gap:8px;flex-wrap:wrap" id="emojiGrid">' + emojiHtml + '</div><input type="hidden" id="ngEmoji" value="🎯"></div>' +
    '<div class="form-grid form-grid-2"><div class="form-group"><label class="form-label">Target Amount (₹)</label><input class="form-control" id="ngTarget" type="number" placeholder="100000"></div><div class="form-group"><label class="form-label">Target Date</label><input class="form-control" id="ngDate" type="date"></div></div>' +
    '<div style="padding:12px;background:var(--bg-body);border-radius:var(--r-sm);font-size:13px;margin-top:8px"><span class="material-symbols-outlined" style="font-size:16px;vertical-align:middle;color:var(--ace-blue)">info</span> Auto-calculation will appear after you set amount & date</div>' +
    '<div class="form-group" style="margin-top:16px"><label class="form-label">Funding Preference</label><div class="radio-pills"><div class="radio-pill selected" onclick="selectPill(this,\'_\')">Manual</div><div class="radio-pill" onclick="selectPill(this,\'_\')">Auto-save Monthly</div><div class="radio-pill" onclick="selectPill(this,\'_\')">Round-up</div></div></div>',
    '<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-success" onclick="createGoal()">Create Goal</button>');
  // bind emoji clicks safely
  setTimeout(function () {
    var grid = document.getElementById('emojiGrid');
    if (grid) {
      grid.querySelectorAll('div').forEach(function (d) {
        d.addEventListener('click', function () {
          grid.querySelectorAll('div').forEach(function (x) { x.style.background = '' });
          d.style.background = 'var(--ace-blue-light)';
          document.getElementById('ngEmoji').value = d.getAttribute('data-emoji');
        });
      })
    }
  }, 100);
}

function createGoal() {
  var name = $('#ngName').value || 'New Goal';
  var emoji = $('#ngEmoji').value;
  var target = +($('#ngTarget').value || 50000);
  App.goals.push({ id: Date.now(), name: name, emoji: emoji, target: target, saved: 0, deadline: $('#ngDate').value || '2026-01-01', color: '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'), auto: Math.round(target / 12) });
  closeModal(); showToast('Goal "' + name + '" created!', 'success'); launchConfetti(1500); navigate('goals');
}

function addMoneyToGoal(id) {
  openModal('Add Money',
    '<div class="form-group"><label class="form-label">Amount to Add (₹)</label><input class="form-control" id="addGoalAmt" type="number" value="5000" style="font-size:24px;font-weight:800;text-align:center;padding:20px;font-family:var(--font-display)"></div>',
    '<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-success" onclick="doAddToGoal(' + id + ')">Add Money</button>');
}
function doAddToGoal(id) { var amt = +$('#addGoalAmt').value; var g = App.goals.find(function (x) { return x.id === id }); if (g) { g.saved += amt; closeModal(); showToast(formatINRShort(amt) + ' added to ' + g.name + '!', 'success'); navigate('goals') } }

function openGoalMenu(id) {
  openModal('Goal Options',
    '<div style="display:flex;flex-direction:column;gap:8px">' +
    '<button class="btn btn-ghost" onclick="closeModal();showToast(\'Edit Goal action noted\',\'info\')"><span class="material-symbols-outlined" style="font-size:18px">edit</span>Edit Goal</button>' +
    '<button class="btn btn-ghost" onclick="closeModal();showToast(\'Pause Auto-save action noted\',\'info\')"><span class="material-symbols-outlined" style="font-size:18px">pause</span>Pause Auto-save</button>' +
    '<button class="btn btn-ghost" onclick="closeModal();showToast(\'Withdraw action noted\',\'info\')"><span class="material-symbols-outlined" style="font-size:18px">money_off</span>Withdraw</button>' +
    '<button class="btn btn-ghost" onclick="closeModal();showToast(\'Delete Goal action noted\',\'info\')"><span class="material-symbols-outlined" style="font-size:18px">delete</span>Delete Goal</button>' +
    '</div>');
}

function showGoalDetail(id) {
  var g = App.goals.find(function (x) { return x.id === id }); if (!g) return;
  var pct = Math.round(g.saved / g.target * 100);
  var body = '<div style="text-align:center;margin-bottom:24px"><div style="position:relative;width:120px;height:120px;margin:0 auto">';
  body += '<svg viewBox="0 0 120 120" style="transform:rotate(-90deg)"><circle cx="60" cy="60" r="50" fill="none" stroke="var(--border)" stroke-width="10"/><circle cx="60" cy="60" r="50" fill="none" stroke="' + g.color + '" stroke-width="10" stroke-dasharray="' + Math.PI * 100 + '" stroke-dashoffset="' + Math.PI * 100 * (1 - pct / 100) + '" stroke-linecap="round" style="transition:stroke-dashoffset 1s ease"/></svg>';
  body += '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800">' + pct + '%</div></div></div>';
  var pairs = [['Saved', formatINRShort(g.saved)], ['Target', formatINRShort(g.target)], ['Monthly', formatINRShort(g.auto)], ['Deadline', g.deadline]];
  body += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">';
  pairs.forEach(function (p) { body += '<div style="text-align:center;padding:12px;background:var(--bg-body);border-radius:var(--r-sm)"><div style="font-size:10px;color:var(--text-faint);text-transform:uppercase">' + p[0] + '</div><div style="font-weight:700">' + p[1] + '</div></div>' });
  body += '</div>';
  openModal(g.emoji + ' ' + g.name, body, '<button class="btn btn-secondary" onclick="closeModal()">Close</button><button class="btn btn-primary" onclick="closeModal();addMoneyToGoal(' + g.id + ')">Add Money</button>');
}

// ===== NET WORTH =====
function renderNetWorth(c) {
  var totalA = assets.reduce(function (s, a) { return s + a.amount }, 0);
  var totalL = liabilities.reduce(function (s, l) { return s + l.amount }, 0);
  var nw = totalA - totalL;
  var html = '<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Net Worth Tracker</h2>';
  html += '<div class="card" style="margin-bottom:24px;text-align:center;padding:40px"><div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">Your Net Worth</div><div style="font-size:56px;font-weight:800;font-family:var(--font-display);color:var(--ace-blue)" id="nwCounter">₹0</div><div style="font-size:14px;color:var(--ace-green);font-weight:600;margin-top:8px">↑ +3.2% this month (+₹27,800)</div><div style="font-size:11px;color:var(--text-faint);margin-top:4px">Last updated: Just now</div></div>';
  // Split
  html += '<div class="nw-split" style="margin-bottom:24px"><div class="nw-col assets"><h3>Assets — ' + formatINRShort(totalA) + '</h3>';
  assets.forEach(function (a) { html += '<div class="nw-row"><div class="nw-icon" style="background:' + a.color + '15"><span class="material-symbols-outlined" style="color:' + a.color + '">' + a.icon + '</span></div><div class="nw-label">' + a.cat + '</div><div class="nw-val" style="color:var(--ace-green)">' + formatINRShort(a.amount) + '</div></div>' });
  html += '</div><div class="nw-col liabilities"><h3>Liabilities — ' + formatINRShort(totalL) + '</h3>';
  liabilities.forEach(function (l) { html += '<div class="nw-row"><div class="nw-icon" style="background:' + l.color + '15"><span class="material-symbols-outlined" style="color:' + l.color + '">' + l.icon + '</span></div><div class="nw-label">' + l.cat + '</div><div class="nw-val" style="color:var(--ace-red)">' + formatINRShort(l.amount) + '</div></div>' });
  html += '</div></div>';
  // Charts
  html += '<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:24px"><div class="card"><div class="card-title"><span class="material-symbols-outlined">show_chart</span>Net Worth Trend (12 Months)</div><canvas id="nwChart" style="width:100%;height:200px"></canvas></div>';
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">donut_large</span>Asset Allocation</div><canvas id="nwDonut" style="width:100%;max-width:200px;margin:0 auto;display:block"></canvas>';
  var legHtml = ''; assets.forEach(function (a) { legHtml += '<span style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:' + a.color + '"></span>' + a.cat + '</span>' });
  html += '<div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:16px;justify-content:center">' + legHtml + '</div></div></div>';
  // Insights
  var ratio = Math.round(totalL / totalA * 100);
  html += '<div class="card" style="margin-top:24px"><div class="card-title"><span class="material-symbols-outlined">tips_and_updates</span>Insights</div>';
  [['savings', 'Your FD allocation (20%) is above recommended 15% — consider diversifying to equities.', '#8b5cf6'], ['shield', 'Emergency fund covers only 1.3 months of expenses — target 6 months.', '#f59e0b'], ['check_circle', 'Debt-to-Asset ratio: ' + ratio + '% — Healthy ✓', '#10b981']].forEach(function (item) {
    html += '<div style="display:flex;gap:12px;align-items:flex-start;padding:12px 0;border-bottom:1px solid var(--border)"><span class="material-symbols-outlined" style="color:' + item[2] + ';font-size:20px">' + item[0] + '</span><p style="font-size:13px">' + item[1] + '</p></div>';
  });
  html += '<button class="btn btn-ghost" style="margin-top:12px" onclick="openAddAssetModal()"><span class="material-symbols-outlined" style="font-size:16px">add</span>Add Asset</button></div>';
  c.innerHTML = html;
  setTimeout(function () {
    animateCounter($('#nwCounter'), nw, 1500, '₹');
    drawLineChart($('#nwChart'), [780000, 800000, 820000, 835000, 850000, 855000, 860000, 870000, 875000, 880000, 890000, 892400], ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'], '#1f1fff');
    drawDonut($('#nwDonut'), assets.map(function (a) { return { label: a.cat, value: a.amount, color: a.color } }), 200);
  }, 200);
}

function openAddAssetModal() {
  openModal('Add Asset',
    '<div class="form-group"><label class="form-label">Asset Type</label><select class="form-control"><option>Bank Balance</option><option>Fixed Deposit</option><option>Mutual Fund</option><option>Gold</option><option>Real Estate</option><option>Vehicle</option><option>Other</option></select></div>' +
    '<div class="form-group"><label class="form-label">Current Value (₹)</label><input class="form-control" type="number" placeholder="Enter amount"></div>',
    '<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-success" onclick="closeModal();showToast(\'Asset added!\',\'success\');navigate(\'net-worth\')">Add Asset</button>');
}

// ===== TRANSACTIONS =====
function renderTransactions(c) {
  var html = '<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Transaction Statement</h2>';
  html += '<div class="card" style="margin-bottom:24px">';
  html += '<div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:16px"><div style="flex:1;min-width:200px;position:relative"><span class="material-symbols-outlined" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:18px;color:var(--text-faint)">search</span><input class="form-control" id="txnSearch" placeholder="Search merchant, category, amount..." style="padding-left:40px" oninput="filterTxns()"></div><select class="form-control" id="txnPeriod" style="max-width:150px"><option>This Month</option><option>Last 3 Months</option><option>Last 6 Months</option><option>Custom</option></select></div>';
  // Filter chips
  var chips = ['All', 'Credit', 'Debit', 'Loan', 'Investment', 'Insurance', 'Transfer', 'Income'];
  html += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px">';
  chips.forEach(function (f) { html += '<div class="chip chip-primary ' + (f === 'All' ? 'active' : '') + '" onclick="filterTxnCat(\'' + f + '\',this)">' + f + '</div>' });
  html += '</div>';
  // Summary stats
  html += '<div class="stats-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">';
  [['Opening', '₹1,24,530'], ['Credits', '+₹1,60,050'], ['Debits', '-₹1,19,319'], ['Closing', '₹1,65,261']].forEach(function (s) {
    html += '<div class="stat-card" style="padding:12px"><div class="stat-label">' + s[0] + '</div><div class="stat-value" style="font-size:16px">' + s[1] + '</div></div>';
  });
  html += '</div>';
  // Table
  html += '<div style="overflow-x:auto"><table class="txn-table"><thead><tr>';
  ['Date', 'Description', 'Ref No', 'Category', 'Debit', 'Credit', 'Balance'].forEach(function (h) { html += '<th>' + h + '</th>' });
  html += '</tr></thead><tbody id="txnBody">';
  txns.forEach(function (t) {
    html += '<tr data-txn-id="' + t.id + '" style="cursor:pointer">';
    html += '<td>' + t.date + '</td>';
    html += '<td style="font-weight:600">' + t.merchant + '</td>';
    html += '<td style="font-family:var(--font-mono);font-size:11px">' + t.id + '</td>';
    html += '<td><span class="chip" style="font-size:9px;padding:1px 6px;background:' + t.color + '15;color:' + t.color + '">' + t.category + '</span></td>';
    html += '<td style="color:var(--ace-red);font-weight:600;font-family:var(--font-mono)">' + (t.type === 'debit' ? formatINR(t.amount) : '') + '</td>';
    html += '<td style="color:var(--ace-green);font-weight:600;font-family:var(--font-mono)">' + (t.type === 'credit' ? formatINR(t.amount) : '') + '</td>';
    html += '<td style="font-weight:700;font-family:var(--font-mono)">₹1,24,530</td></tr>';
  });
  html += '</tbody></table></div></div>';
  // Export
  html += '<div style="display:flex;gap:8px;justify-content:center;padding:16px">';
  [['description', 'PDF'], ['table_chart', 'Excel'], ['content_copy', 'CSV'], ['email', 'Email']].forEach(function (b) {
    html += '<button class="btn btn-secondary btn-sm" onclick="exportTxn(\'' + b[1] + '\')"><span class="material-symbols-outlined" style="font-size:16px">' + b[0] + '</span>' + b[1] + '</button>';
  });
  html += '</div>';
  c.innerHTML = html;
  // Bind row clicks safely
  $$('#txnBody tr').forEach(function (row) {
    row.addEventListener('click', function () {
      var tid = row.getAttribute('data-txn-id');
      var t = txns.find(function (x) { return x.id === tid });
      if (t) openTxnDetail(t);
    });
  });
}

function filterTxns() { var q = $('#txnSearch').value.toLowerCase(); $$('#txnBody tr').forEach(function (r) { r.style.display = r.textContent.toLowerCase().includes(q) ? '' : 'none' }) }

function filterTxnCat(cat, el) {
  el.parentElement.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active') });
  el.classList.add('active');
  $$('#txnBody tr').forEach(function (r) {
    if (cat === 'All') { r.style.display = '' }
    else if (cat === 'Credit') { r.style.display = r.querySelector('td:nth-child(6)').textContent ? '' : 'none' }
    else if (cat === 'Debit') { r.style.display = r.querySelector('td:nth-child(5)').textContent ? '' : 'none' }
    else { r.style.display = r.textContent.includes(cat) ? '' : 'none' }
  });
}

function exportTxn(fmt) {
  if (fmt === 'PDF') { window.print() }
  else if (fmt === 'Email') { showToast('Statement sent to your email', 'success') }
  else {
    var csv = 'Date,Description,Ref,Category,Debit,Credit\n';
    txns.forEach(function (t) { csv += t.date + ',' + t.merchant + ',' + t.id + ',' + t.category + ',' + (t.type === 'debit' ? t.amount : '') + ',' + (t.type === 'credit' ? t.amount : '') + '\n' });
    var blob = new Blob([csv], { type: 'text/csv' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'ace_statement.' + fmt.toLowerCase(); a.click();
    showToast(fmt + ' downloaded!', 'success');
  }
}

// ===== PROFILE =====
function renderProfile(c) {
  var html = '<div class="profile-header"><div class="profile-avatar-lg">AM</div><div><h2 style="font-size:28px;font-weight:800">' + App.user.name + '</h2><p style="color:var(--text-muted)">' + App.user.accType + ' · ' + App.user.acc + '</p><div style="margin-top:8px"><span class="badge" style="background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff">' + App.user.tier + ' Tier 🏆</span><span class="badge" style="background:var(--ace-blue-light);color:var(--ace-blue);margin-left:8px">Score: ' + App.user.creditScore + '</span></div></div></div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">';
  // Personal
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">person</span>Personal Information</div>';
  [['Full Name', 'Arjun Mehta'], ['Date of Birth', '15 Aug 1992'], ['Gender', 'Male'], ['Email', 'arjun.mehta@email.com'], ['Mobile', '+91 98765 43210'], ['PAN', 'ABCDE1234F']].forEach(function (p) { html += '<div class="profile-row"><span class="label">' + p[0] + '</span><span class="value">' + p[1] + '</span></div>' });
  html += '<button class="btn btn-ghost btn-sm" style="margin-top:16px" onclick="showToast(\'Edit mode activated\',\'info\')"><span class="material-symbols-outlined" style="font-size:14px">edit</span>Edit Profile</button></div>';
  // Account
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">account_balance</span>Account Details</div>';
  [['Account No.', '2547 8910 4521'], ['Account Type', 'Premium Savings'], ['Branch', 'Mumbai — Nariman Point'], ['IFSC', 'ACEB0001234'], ['Balance', formatINR(App.user.balance)], ['Status', 'Active ✓']].forEach(function (p) { html += '<div class="profile-row"><span class="label">' + p[0] + '</span><span class="value">' + p[1] + '</span></div>' });
  html += '</div>';
  // Cards
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">credit_card</span>Linked Cards</div><div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--r-md);display:flex;align-items:center;gap:12px"><div style="width:48px;height:32px;background:linear-gradient(135deg,#0f172a,#1f1fff);border-radius:4px"></div><div><div style="font-size:13px;font-weight:600">VISA Platinum ****4521</div><div style="font-size:11px;color:var(--text-faint)">Expires 08/28</div></div><span class="badge" style="background:var(--ace-green-light);color:#065f46;margin-left:auto">Active</span></div></div>';
  // Preferences
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">settings</span>Preferences</div>';
  ['Push Notifications', 'Email Alerts', 'SMS Alerts', 'Biometric Login', 'Auto-save Goals'].forEach(function (l) {
    html += '<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(226,232,240,.5)"><span style="font-size:13px">' + l + '</span><div class="toggle on" onclick="this.classList.toggle(\'on\');showToast(this.classList.contains(\'on\')?\'' + l + ' enabled\':\'' + l + ' disabled\',\'info\')"></div></div>';
  });
  html += '</div></div>';
  c.innerHTML = html;
}

// ===== SECURITY =====
function renderSecurity(c) {
  var html = '<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Security Center</h2>';
  html += '<div class="card" style="margin-bottom:24px"><div class="card-title"><span class="material-symbols-outlined">devices</span>Active Sessions</div>';
  html += '<button class="btn btn-danger btn-sm" style="margin-bottom:16px" onclick="showToast(\'All other sessions logged out\',\'success\')"><span class="material-symbols-outlined" style="font-size:16px">logout</span>Logout All Other Devices</button>';
  App.sessions.forEach(function (s) {
    html += '<div class="session-card ' + (s.current ? 'current' : '') + '">';
    var icon = s.device.includes('iOS') ? 'phone_iphone' : s.device.includes('Chrome') ? 'computer' : 'devices';
    html += '<span class="material-symbols-outlined" style="font-size:28px;color:var(--text-faint)">' + icon + '</span>';
    html += '<div style="flex:1"><div style="font-weight:600;font-size:14px">' + s.device + (s.current ? ' <span class="badge" style="background:var(--ace-green-light);color:#065f46;margin-left:8px">Current</span>' : '') + '</div>';
    html += '<div style="font-size:12px;color:var(--text-faint)">' + s.location + ' · IP: ' + s.ip + ' · ' + s.lastActive + '</div></div>';
    if (!s.current) html += '<button class="btn btn-ghost btn-sm" onclick="this.closest(\'.session-card\').remove();showToast(\'Session terminated\',\'success\')"><span class="material-symbols-outlined" style="font-size:16px">logout</span></button>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">';
  // Security settings
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">lock</span>Security Settings</div>';
  [['Two-Factor Authentication', 'Enabled', 'var(--ace-green)'], ['Login Alerts', 'SMS + Email', 'var(--ace-blue)'], ['Transaction Alerts', 'All Transactions', 'var(--ace-blue)'], ['Biometric Login', 'Enabled', 'var(--ace-green)']].forEach(function (r) {
    html += '<div class="profile-row"><span class="label">' + r[0] + '</span><span class="value" style="color:' + r[2] + '">' + r[1] + '</span></div>';
  });
  html += '<div style="display:flex;gap:8px;margin-top:16px"><button class="btn btn-secondary btn-sm" onclick="showToast(\'Password reset link sent to email\',\'info\')"><span class="material-symbols-outlined" style="font-size:14px">key</span>Change Password</button><button class="btn btn-secondary btn-sm" onclick="openPINModal()"><span class="material-symbols-outlined" style="font-size:14px">pin</span>Change PIN</button></div></div>';
  // Login history
  html += '<div class="card"><div class="card-title"><span class="material-symbols-outlined">history</span>Login History</div>';
  [['Today, 1:28 AM', 'Chrome on MacOS', 'Mumbai', '✓ Success'], ['Yesterday, 11:45 PM', 'ACE Bank App', 'Mumbai', '✓ Success'], ['22 Feb, 6:12 PM', 'Firefox on Windows', 'Pune', '✓ Success'], ['20 Feb, 9:30 AM', 'Unknown Device', 'Delhi', '✗ Failed']].forEach(function (r) {
    var clr = r[3].includes('Success') ? 'var(--ace-green)' : 'var(--ace-red)';
    html += '<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid var(--border);font-size:12px"><span style="min-width:120px;color:var(--text-faint)">' + r[0] + '</span><span style="flex:1;font-weight:500">' + r[1] + '</span><span style="color:var(--text-faint)">' + r[2] + '</span><span style="font-weight:600;color:' + clr + '">' + r[3] + '</span></div>';
  });
  html += '</div></div>';
  c.innerHTML = html;
}

// ===== INIT =====
navigate('dashboard');

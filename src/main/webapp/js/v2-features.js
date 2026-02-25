/* ===== ACE BANK V2 — CREDIT SCORE, CARD CONTROL, LOAN CENTER ===== */

// ===== CREDIT SCORE =====
function renderCreditScore(c) {
    c.innerHTML = `<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Credit Score Hub</h2>
  <div class="card" style="margin-bottom:24px"><div style="display:flex;flex-wrap:wrap;gap:32px;align-items:center;justify-content:center">
    <div id="scoreGaugeMain" style="flex-shrink:0"></div>
    <div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px"><span class="badge" style="background:var(--ace-green-light);color:#065f46">GOOD</span><span class="badge" style="background:var(--ace-blue-light);color:var(--ace-blue)">Top 23% of users</span><span class="badge" style="background:var(--ace-green-light);color:#065f46">↑ +7 this month</span></div><p style="font-size:13px;color:var(--text-muted)">Your credit score is healthy. Keep paying EMIs on time to reach 800+.</p></div>
  </div></div>
  <div class="card" style="margin-bottom:24px"><div class="card-title"><span class="material-symbols-outlined">analytics</span>Score Factors</div>
  ${scoreFactors.map((f, i) => `<div class="factor-card" onclick="this.classList.toggle('expanded')">
    <div class="factor-header"><span class="material-symbols-outlined" style="color:${f.color}">${f.icon}</span><div style="flex:1"><div style="display:flex;justify-content:space-between"><strong style="font-size:14px">${f.name}</strong><span class="badge" style="background:${f.impact === 'High' ? 'var(--ace-red-light)' : f.impact === 'Medium' ? '#fffbeb' : 'var(--ace-green-light)'};color:${f.impact === 'High' ? '#991b1b' : f.impact === 'Medium' ? '#92400e' : '#065f46'}">${f.impact} Impact</span></div></div><span style="font-weight:700;font-size:14px">${f.score}%</span><span style="font-size:12px;color:${f.color};font-weight:600;min-width:60px;text-align:right">${f.status}</span></div>
    <div class="factor-bar"><div class="factor-fill" id="fb${i}" style="width:0%;background:${f.color}"></div></div>
    <div class="factor-detail"><p style="margin-bottom:8px">💡 <strong>Tip:</strong> ${f.tip}</p></div>
  </div>`).join('')}</div>
  <div class="card" style="margin-bottom:24px"><div class="card-title"><span class="material-symbols-outlined">show_chart</span>Score History (12 Months)</div><canvas id="scoreChart" style="width:100%;height:200px"></canvas></div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
  <div class="card"><div class="card-title"><span class="material-symbols-outlined">tips_and_updates</span>Smart Recommendations</div>
  ${[{ t: 'Reduce credit card utilization from 34% to under 30%', boost: '+15 to +25 pts', impact: 'High', btn: 'Take Action →' }, { t: 'Your HDFC credit card has been inactive for 6 months. Make a small purchase.', boost: '+8 to +12 pts', impact: 'Medium', btn: 'Remind Me' }, { t: 'Set up auto-pay for your HDFC EMI to ensure zero missed payments.', boost: '+5 pts', impact: 'Low', btn: 'Setup Auto-pay →' }].map(r => `<div style="padding:16px;border:1.5px solid var(--border);border-radius:var(--r-md);margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px"><span class="badge" style="background:var(--ace-blue-light);color:var(--ace-blue)">${r.impact} Impact</span><span style="font-size:11px;color:var(--ace-green);font-weight:600">${r.boost}</span></div>
    <p style="font-size:13px;margin-bottom:12px">${r.t}</p>
    <button class="btn btn-ghost btn-sm" onclick="showToast('Action noted!','success')">${r.btn}</button>
  </div>`).join('')}</div>
  <div class="card"><div class="card-title"><span class="material-symbols-outlined">account_balance</span>Active Credit Lines</div>
    <table style="width:100%;font-size:12px;border-collapse:collapse">${[['HDFC Credit Card', 'HDFC Bank', '₹2,00,000', '₹68,000', '34%', 'Active ✓'], ['Home Loan', 'SBI', '₹45,00,000', '₹38,20,000', '84%', 'Active ✓'], ['Personal Loan', 'ACE Bank', '₹5,00,000', '₹0', '0%', 'Closed']].map(r => `<tr style="border-bottom:1px solid var(--border)"><td style="padding:10px;font-weight:600">${r[0]}</td><td style="padding:10px;color:var(--text-faint)">${r[1]}</td><td style="padding:10px">${r[2]}</td><td style="padding:10px">${r[3]}</td><td style="padding:10px"><span class="badge" style="background:${parseInt(r[4]) > 50 ? 'var(--ace-red-light)' : 'var(--ace-green-light)'};color:${parseInt(r[4]) > 50 ? '#991b1b' : '#065f46'}">${r[4]}</span></td><td style="padding:10px;font-weight:600">${r[5]}</td></tr>`).join('')}</table>
  </div></div>
  <div class="card" style="margin-top:24px"><div class="card-title"><span class="material-symbols-outlined">tune</span>Credit Score Simulator</div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px">
      <div class="range-wrap"><label>Credit Utilization<span id="simUtil">34%</span></label><input type="range" min="0" max="100" value="34" oninput="$('#simUtil').textContent=this.value+'%';simScore()"></div>
      <div style="text-align:center"><label class="custom-check" style="margin-bottom:12px;justify-content:center"><input type="checkbox" id="simNewCard" onchange="simScore()"><div class="check-box"></div>Open new credit card?</label></div>
      <div style="text-align:center"><label class="custom-check" style="justify-content:center"><input type="checkbox" id="simCloseOld" onchange="simScore()"><div class="check-box"></div>Close oldest account?</label></div>
    </div>
    <div id="simResult" style="text-align:center;padding:20px;background:var(--bg-body);border-radius:var(--r-md);margin-top:16px"><span style="font-size:13px;color:var(--text-faint)">Adjust parameters above to see projected score</span></div>
    <p style="text-align:center;font-size:11px;color:var(--text-faint);margin-top:8px">⚠ This is a simulation only — not a guarantee</p>
  </div>`;
    setTimeout(() => {
        drawScoreGauge($('#scoreGaugeMain'), App.user.creditScore);
        scoreFactors.forEach((f, i) => setTimeout(() => { $('#fb' + i).style.width = f.score + '%' }, i * 100));
        drawLineChart($('#scoreChart'), App.user.creditScoreHistory, ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb']);
    }, 200);
}
function simScore() { const u = parseInt($('.range-wrap input[type=range]').value); const nc = $('#simNewCard').checked; const co = $('#simCloseOld').checked; let s = App.user.creditScore; if (u < 30) s += 15; if (u > 50) s -= 25; if (nc) s -= 5; if (co) s -= 20; s = Math.max(300, Math.min(900, s)); $('#simResult').innerHTML = `<div style="font-size:36px;font-weight:800;font-family:var(--font-display);color:${s > App.user.creditScore ? 'var(--ace-green)' : 'var(--ace-red)'}">${s}</div><div style="font-size:13px;color:var(--text-muted)">${s > App.user.creditScore ? '↑' : '↓'} ${Math.abs(s - App.user.creditScore)} points from current</div>` }

// ===== CARD CONTROL =====
function renderCardControl(c) {
    const ctrls = [{ id: 'international', label: 'International Transactions', icon: 'public', desc: 'Online & POS transactions outside India' }, { id: 'contactless', label: 'Contactless / NFC', icon: 'contactless', desc: 'Tap-to-pay at terminals' }, { id: 'online', label: 'Online Transactions', icon: 'shopping_cart', desc: 'E-commerce & subscription payments' }, { id: 'atm', label: 'ATM Withdrawals', icon: 'local_atm', desc: 'Cash withdrawals from ATMs' }, { id: 'pos', label: 'POS / Swipe Transactions', icon: 'point_of_sale', desc: 'Physical store card swipes' }, { id: 'recurring', label: 'Recurring Payments', icon: 'autorenew', desc: 'Standing instructions & subscriptions' }];
    c.innerHTML = `<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Card Control Center</h2>
  <div style="display:flex;gap:32px;flex-wrap:wrap;margin-bottom:32px;align-items:flex-start">
    <div class="cc-card ${App.cardFrozen ? 'frozen' : ''}" id="cardVis" onclick="flipCard()">
      <div class="card-type">VISA</div>
      <div class="card-chip"></div>
      <div class="card-number">****  ****  ****  4521</div>
      <div class="card-holder">ARJUN MEHTA</div>
      <div class="card-expiry">08/28</div>
    </div>
    <div style="flex:1;min-width:280px">
      <div class="card" style="margin-bottom:16px"><div style="display:flex;align-items:center;justify-content:space-between">
        <div><div style="font-weight:700;font-size:16px">🔒 Card Status</div><div style="font-size:12px;color:var(--text-faint)">${App.cardFrozen ? 'Card is frozen — all transactions declined' : 'Card is active — all transactions enabled'}</div></div>
        <div class="toggle ${App.cardFrozen ? '' : 'on'}" id="freezeToggle" onclick="toggleFreeze()"></div>
      </div></div>
      <button class="btn btn-secondary btn-block" style="margin-bottom:8px" onclick="openPINModal()"><span class="material-symbols-outlined" style="font-size:18px">pin</span>Change Card PIN</button>
      <button class="btn btn-ghost btn-block" onclick="openDisputeModal()"><span class="material-symbols-outlined" style="font-size:18px">report</span>Report a Transaction</button>
    </div>
  </div>
  <div class="card" style="margin-bottom:24px"><div class="card-title"><span class="material-symbols-outlined">toggle_on</span>Transaction Controls</div>
  ${ctrls.map(ct => `<div class="control-row"><div class="control-icon" style="background:var(--ace-blue-light)"><span class="material-symbols-outlined" style="color:var(--ace-blue)">${ct.icon}</span></div><div class="control-info"><div class="ctrl-label">${ct.label}</div><div class="ctrl-desc">${ct.desc}</div></div><div class="toggle ${App.cardLimits[ct.id] ? 'on' : ''} ${App.cardFrozen ? 'disabled' : ''}" onclick="if(!App.cardFrozen){this.classList.toggle('on');App.cardLimits['${ct.id}']=this.classList.contains('on');showToast(this.classList.contains('on')?'${ct.label} enabled':'${ct.label} disabled','info')}"></div></div>`).join('')}</div>
  <div class="card"><div class="card-title"><span class="material-symbols-outlined">speed</span>Spending Limits</div>
  ${[{ l: 'ATM Withdrawal Limit', k: 'dailyATM', max: 50000 }, { l: 'Online Transaction Limit', k: 'dailyOnline', max: 100000 }, { l: 'International Transaction Limit', k: 'dailyIntl', max: 200000 }].map(s => `<div class="range-wrap"><label>${s.l}<span id="lim_${s.k}">${formatINRShort(App.cardLimits[s.k])}</span></label><input type="range" min="0" max="${s.max}" step="1000" value="${App.cardLimits[s.k]}" oninput="App.cardLimits['${s.k}']=+this.value;$('#lim_${s.k}').textContent=formatINRShort(this.value)"></div>`).join('')}
  <button class="btn btn-primary" onclick="showToast('Spending limits saved!','success')"><span class="material-symbols-outlined" style="font-size:16px">save</span>Save Limits</button>
  <p style="font-size:11px;color:var(--text-faint);margin-top:8px">Limits reset to default at midnight</p>
  </div>`;
}
function toggleFreeze() {
    if (!App.cardFrozen) {
        openModal('Freeze Card?', '<p style="font-size:14px;margin-bottom:16px">All transactions will be declined until you reactivate your card.</p><p style="font-size:13px;color:var(--ace-red)">⚠ This will affect all online, ATM, and POS transactions.</p>', `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="doFreeze(true);closeModal()">Freeze Card</button>`);
    } else { doFreeze(false) }
}
function doFreeze(freeze) { App.cardFrozen = freeze; $('#cardVis').classList.toggle('frozen', freeze); $('#freezeToggle').classList.toggle('on', !freeze); $$('.control-row .toggle').forEach(t => t.classList.toggle('disabled', freeze)); showToast(freeze ? '🔒 Card frozen' : '✅ Card activated', 'success') }
function flipCard() { const card = $('#cardVis'); card.style.transform = card.style.transform.includes('180') ? 'perspective(1000px) rotateY(0)' : 'perspective(1000px) rotateY(180deg)' }
function openPINModal() {
    openModal('Change Card PIN', `<p style="font-size:13px;color:var(--text-muted);margin-bottom:20px">Enter your current PIN followed by the new PIN</p>
  <div class="form-group"><label class="form-label">Current PIN</label><div class="otp-boxes">${[1, 2, 3, 4, 5, 6].map(i => `<input class="otp-box" type="password" maxlength="1" style="width:40px;height:44px" oninput="if(this.value.length===1&&this.nextElementSibling)this.nextElementSibling.focus()">`).join('')}</div></div>
  <div class="form-group"><label class="form-label">New PIN</label><div class="otp-boxes">${[1, 2, 3, 4, 5, 6].map(i => `<input class="otp-box" type="password" maxlength="1" style="width:40px;height:44px" oninput="if(this.value.length===1&&this.nextElementSibling)this.nextElementSibling.focus()">`).join('')}</div></div>
  <div class="form-group"><label class="form-label">Confirm New PIN</label><div class="otp-boxes">${[1, 2, 3, 4, 5, 6].map(i => `<input class="otp-box" type="password" maxlength="1" style="width:40px;height:44px" oninput="if(this.value.length===1&&this.nextElementSibling)this.nextElementSibling.focus()">`).join('')}</div></div>`,
        `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-success" onclick="closeModal();showToast('✅ PIN changed successfully!','success')">Update PIN</button>`);
}
function openDisputeModal() {
    openModal('Report a Transaction', `
  <div class="form-group"><label class="form-label">Select Transaction</label><select class="form-control">${txns.slice(0, 8).map(t => `<option>${t.date} — ${t.merchant} (${t.type === 'debit' ? '-' : '+'} ₹${t.amount.toLocaleString('en-IN')})</option>`).join('')}</select></div>
  <div class="form-group"><label class="form-label">Reason</label>${['Unauthorized Transaction', 'Wrong Amount Charged', 'Merchant Issue', 'Duplicate Charge', 'Item Not Received'].map(r => `<label class="custom-check" style="margin-bottom:8px"><input type="radio" name="disputeReason" style="display:none"><div class="check-box"></div>${r}</label>`).join('')}</div>
  <div class="form-group"><label class="form-label">Additional Details</label><textarea class="form-control" rows="3" placeholder="Describe the issue..."></textarea></div>`,
        `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-danger" onclick="closeModal();showToast('Dispute #ACE-D-'+Math.floor(Math.random()*99999)+' registered. Resolution in 5-7 working days.','success')">Submit Dispute</button>`);
}

// ===== LOAN CENTER =====
function renderLoans(c) {
    c.innerHTML = `<h2 style="font-size:28px;font-weight:800;margin-bottom:24px">Loan Center</h2>
  <div class="loan-grid" style="margin-bottom:32px">${loanProducts.map(lp => `<div class="loan-card" style="--lc:${lp.color}"><div style="position:absolute;top:0;left:0;right:0;height:4px;background:${lp.color};border-radius:20px 20px 0 0"></div><div class="loan-icon" style="background:${lp.color}"><span class="material-symbols-outlined">${lp.icon}</span></div><h3 style="font-size:18px;font-weight:700;margin-bottom:4px">${lp.type}</h3><div style="display:flex;gap:16px;margin-bottom:12px"><div><div style="font-size:11px;color:var(--text-faint)">Rate</div><div style="font-weight:800;color:${lp.color}">${lp.rate} p.a.</div></div><div><div style="font-size:11px;color:var(--text-faint)">Max Amount</div><div style="font-weight:700">${lp.max}</div></div></div><ul style="font-size:12px;color:var(--text-muted);margin-bottom:16px">${lp.features.map(f => `<li style="margin-bottom:4px;display:flex;gap:6px"><span class="material-symbols-outlined" style="font-size:14px;color:var(--ace-green)">check</span>${f}</li>`).join('')}</ul><div style="display:flex;gap:8px"><button class="btn btn-secondary btn-sm" onclick="showEligibility('${lp.type}')">Check Eligibility</button><button class="btn btn-primary btn-sm" onclick="showToast('Application started for ${lp.type}','info')">Apply Now</button></div></div>`).join('')}</div>
  <div class="card" style="margin-bottom:24px"><div class="card-title"><span class="material-symbols-outlined">calculate</span>EMI Calculator</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px">
      <div>
        <div class="range-wrap"><label>Loan Amount<span id="emiAmt">₹10,00,000</span></label><input type="range" id="emiAmtR" min="50000" max="5000000" step="50000" value="1000000" oninput="updateEMI()"></div>
        <div class="range-wrap"><label>Interest Rate<span id="emiRate">10.99%</span></label><input type="range" id="emiRateR" min="5" max="20" step="0.25" value="10.99" oninput="updateEMI()"></div>
        <div class="range-wrap"><label>Tenure<span id="emiTen">5 years</span></label><input type="range" id="emiTenR" min="1" max="30" value="5" oninput="updateEMI()"></div>
      </div>
      <div id="emiResult" style="background:var(--bg-body);border-radius:var(--r-md);padding:24px;text-align:center"></div>
    </div>
    <div id="amorTable" style="margin-top:16px;display:none"></div>
  </div>
  <div class="card"><div class="card-title"><span class="material-symbols-outlined">receipt_long</span>My Active Loans</div>
  <div style="padding:20px;border:1.5px solid var(--border);border-radius:var(--r-md);margin-bottom:12px">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px"><div><h4 style="font-size:16px;font-weight:700">Home Loan (SBI)</h4><span class="badge" style="background:var(--ace-green-light);color:#065f46">Active</span></div><div style="text-align:right;font-size:12px;color:var(--text-faint)">EMI: ₹38,500/month<br>Next due: 5 Mar 2025</div></div>
    <div style="display:flex;gap:16px;margin-bottom:12px;font-size:12px"><span>Original: ₹45,00,000</span><span>Outstanding: ₹38,20,000</span><span>Rate: 8.4% p.a.</span><span>Left: 18 yrs</span></div>
    <div class="progress-bar" style="height:8px"><div class="progress-fill" style="width:15%;background:var(--ace-blue)"></div></div><span style="font-size:11px;color:var(--text-faint)">15% paid</span>
    <div style="display:flex;gap:8px;margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="showToast('Schedule view coming soon','info')">View Schedule</button><button class="btn btn-ghost btn-sm" onclick="showToast('Prepayment option coming soon','info')">Prepay</button></div>
  </div></div>`;
    setTimeout(updateEMI, 100);
}
function updateEMI() {
    const P = +$('#emiAmtR').value, R = +$('#emiRateR').value, N = +$('#emiTenR').value;
    $('#emiAmt').textContent = formatINRShort(P); $('#emiRate').textContent = R + '%'; $('#emiTen').textContent = N + ' year' + (N > 1 ? 's' : '');
    const e = calculateEMI(P, R, N);
    $('#emiResult').innerHTML = `<div style="margin-bottom:16px"><div style="font-size:12px;color:var(--text-faint)">Monthly EMI</div><div style="font-size:36px;font-weight:800;font-family:var(--font-display);color:var(--ace-blue)">${formatINR(e.emi)}</div></div>
    <div style="display:flex;justify-content:space-around"><div><div style="font-size:11px;color:var(--text-faint)">Total Interest</div><div style="font-weight:700;color:var(--ace-red)">${formatINR(e.interest)}</div></div><div><div style="font-size:11px;color:var(--text-faint)">Total Payment</div><div style="font-weight:700">${formatINR(e.total)}</div></div></div>
    <div style="margin-top:16px"><canvas id="emiDonut" style="width:120px;height:120px;margin:0 auto"></canvas></div>`;
    setTimeout(() => { drawDonut($('#emiDonut'), [{ label: 'Principal', value: P, color: 'var(--ace-blue)' }, { label: 'Interest', value: e.interest, color: 'var(--ace-red)' }], 120) }, 50);
}
function showEligibility(type) {
    openModal('Check Eligibility — ' + type, `
  <div class="form-grid form-grid-2">
    <div class="form-group"><label class="form-label">Monthly Net Income</label><input class="form-control" id="elIncome" type="number" placeholder="₹" value="85000"></div>
    <div class="form-group"><label class="form-label">Existing EMIs/month</label><input class="form-control" id="elEMI" type="number" placeholder="₹" value="12500"></div>
    <div class="form-group"><label class="form-label">Employment Type</label><select class="form-control"><option>Salaried</option><option>Self-Employed</option></select></div>
    <div class="form-group"><label class="form-label">Loan Amount Needed</label><input class="form-control" id="elAmt" type="number" placeholder="₹" value="1000000"></div>
  </div>`,
        `<button class="btn btn-secondary" onclick="closeModal()">Cancel</button><button class="btn btn-primary" onclick="calcEligibility()">Check Eligibility</button>`);
}
function calcEligibility() {
    const inc = +$('#elIncome').value, emi = +$('#elEMI').value, amt = +$('#elAmt').value;
    const avail = inc * .5 - emi; const maxLoan = avail > 0 ? avail * 60 : 0;
    closeModal();
    if (maxLoan >= amt) { openModal('✅ Pre-Approved!', `<div class="success-screen" style="padding:24px"><div class="success-check"><span class="material-symbols-outlined">check_circle</span></div><h2 style="font-size:24px;font-weight:800;margin-bottom:16px">You're Pre-Approved!</h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;text-align:left;max-width:360px;margin:0 auto">${[['Max Eligible', formatINRShort(maxLoan)], ['Best Rate', '10.99% p.a.'], ['EMI (5 yrs)', formatINR(calculateEMI(amt, 10.99, 5).emi) + '/mo'], ['FOIR', Math.round((emi / inc) * 100) + '% (Healthy ✓)']].map(([l, v]) => `<div><div style="font-size:11px;color:var(--text-faint)">${l}</div><div style="font-weight:700">${v}</div></div>`).join('')}</div></div>`, `<button class="btn btn-primary" onclick="closeModal();showToast('Loan application started!','success')">Apply Now →</button>`) }
    else { openModal('⚠️ Limited Eligibility', `<div style="text-align:center;padding:20px"><p style="font-size:16px;font-weight:700;margin-bottom:8px">Max Eligible: ${formatINRShort(Math.max(0, maxLoan))}</p><p style="color:var(--text-muted);margin-bottom:16px">High existing EMI obligations limit your eligibility.</p><div style="text-align:left;padding:16px;background:var(--bg-body);border-radius:var(--r-md)"><h4 style="font-size:13px;margin-bottom:8px">Tips to improve:</h4><ul style="font-size:12px;color:var(--text-muted)">${['Close existing loan first', 'Add a co-applicant with income', 'Provide collateral for better terms'].map(t => `<li style="margin-bottom:4px">• ${t}</li>`).join('')}</ul></div></div>`, `<button class="btn btn-secondary" onclick="closeModal()">Close</button><button class="btn btn-primary" onclick="closeModal();showToast('Advisor will contact you','info')">Speak to Advisor</button>`) }
}

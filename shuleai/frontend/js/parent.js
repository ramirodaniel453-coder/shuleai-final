// ==================== PARENT DASHBOARD FUNCTIONS ====================

// Load parent dashboard
function loadParentDashboard() {
    if (currentSchool) {
        document.getElementById('parent-school-name').textContent = currentSchool.name;
    }
    
    // Get children from demo data
    currentChildren = [
        { id: 'STU001', elimuid: 'ELIMU-2026-001', schoolCode: 'GRN001', name: 'Emma Smith', grade: '10A' },
        { id: 'STU002', elimuid: 'ELIMU-2026-002', schoolCode: 'GRN001', name: 'James Smith', grade: '8B' }
    ];
    
    if (currentChildren.length > 0) {
        activeChildId = currentChildren[0].id;
    }
    
    renderParentMenu();
    loadParentChildren();
    switchParentTab('dashboard');
    
    // Show popup after 2 seconds
    setTimeout(() => {
        if (parentPopupEnabled) showParentPopup();
    }, 2000);
}

// Render parent menu
function renderParentMenu() {
    const menuContainer = document.getElementById('parent-menu');
    if (!menuContainer) return;
    
    const menus = {
        parent: [
            { section: 'CHILDREN', items: [] }, // Will be populated dynamically
            { section: 'OVERVIEW', items: [
                { name: 'Dashboard', icon: 'fa-home', tab: 'dashboard' },
                { name: 'Progress', icon: 'fa-chart-line', tab: 'progress' }
            ]},
            { section: 'ACADEMICS', items: [
                { name: 'Grades', icon: 'fa-star', tab: 'grades' },
                { name: 'Attendance', icon: 'fa-calendar-check', tab: 'attendance' },
                { name: 'Subject View', icon: 'fa-book', tab: 'subjects' },
                { name: 'Reports', icon: 'fa-file-alt', tab: 'reports' }
            ]},
            { section: 'ALERTS', items: [
                { name: 'Academic Alerts', icon: 'fa-exclamation-triangle', tab: 'academic-alerts' },
                { name: 'Attendance Alerts', icon: 'fa-calendar-times', tab: 'attendance-alerts' },
                { name: 'Fee Alerts', icon: 'fa-credit-card', tab: 'fee-alerts' },
                { name: 'Admin Messages', icon: 'fa-envelope', tab: 'messages' }
            ]},
            { section: 'FINANCE', items: [
                { name: 'Fee Statement', icon: 'fa-file-invoice', tab: 'fee-statement' },
                { name: 'Payment History', icon: 'fa-history', tab: 'payment-history' }
            ]},
            { section: 'GUIDANCE', items: [
                { name: 'Did You Know', icon: 'fa-lightbulb', tab: 'tips' },
                { name: 'AI Recommendations', icon: 'fa-robot', tab: 'ai-recommendations' }
            ]},
            { section: 'PERSONAL', items: [
                { name: 'Profile', icon: 'fa-user-circle', tab: 'profile' },
                { name: 'Settings', icon: 'fa-cog', tab: 'settings' }
            ]}
        ]
    };
    
    let html = '';
    
    // Add children section dynamically
    html += `<div class="menu-section"><h4>MY CHILDREN</h4>`;
    currentChildren.forEach(child => {
        html += `<a class="menu-item ${child.id === activeChildId ? 'active' : ''}" onclick="switchChild('${child.id}')">
            <i class="fas fa-child"></i> ${child.name} <small>Gr ${child.grade}</small>
        </a>`;
    });
    html += `</div>`;
    
    // Add other sections
    menus.parent.forEach(section => {
        if (section.section !== 'CHILDREN') {
            html += `<div class="menu-section"><h4>${section.section}</h4>`;
            section.items.forEach(item => {
                html += `<a class="menu-item" onclick="switchParentTab('${item.tab}')">
                    <i class="fas ${item.icon}"></i> ${item.name}
                </a>`;
            });
            html += `</div>`;
        }
    });
    
    menuContainer.innerHTML = html;
}

// Load parent children list
function loadParentChildren() {
    const container = document.getElementById('children-list');
    if (!container) return;
    
    container.innerHTML = currentChildren.map(child => `
        <div class="child-card ${child.id === activeChildId ? 'active' : ''}" onclick="switchChild('${child.id}')">
            <strong>${child.name}</strong>
            <br><small>Grade ${child.grade}</small>
            <br><small>ELIMU: ${child.elimuid}</small>
        </div>
    `).join('');
}

// Switch active child
function switchChild(childId) {
    activeChildId = childId;
    const child = currentChildren.find(s => s.id === childId);
    if (child) {
        document.getElementById('active-child-name').textContent = child.name;
        currentSchool = { id: 'GRN001', name: 'Greenwood High', code: 'GRN001', system: '844' };
        document.getElementById('parent-school-name').textContent = currentSchool.name;
    }
    renderParentMenu();
    switchParentTab('dashboard');
    showToast(`Now viewing: ${child?.name}`);
}

// Switch parent tabs
function switchParentTab(tab) {
    const child = currentChildren.find(s => s.id === activeChildId);
    if (!child) return;
    
    document.getElementById('active-child-name').textContent = child.name;
    
    let content = '';
    
    switch(tab) {
        case 'dashboard':
            content = getParentDashboardContent(child);
            setTimeout(() => initParentDashboardChart(child), 100);
            break;
        case 'grades':
            content = getParentGradesContent(child);
            break;
        case 'attendance':
            content = getParentAttendanceContent(child);
            setTimeout(() => initParentAttendanceChart(), 100);
            break;
        case 'fee-statement':
            content = getParentFeeStatementContent(child);
            break;
        case 'tips':
            content = getParentTipsContent();
            break;
        default:
            content = `<h3>${tab.replace(/-/g, ' ')}</h3><div class="card"><p>Content for ${tab} would appear here.</p></div>`;
    }
    
    document.getElementById('parent-content').innerHTML = content;
    updateActiveMenu('parent-sidebar', tab);
}

// Get parent dashboard content
function getParentDashboardContent(child) {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-star"></i></div>
                <div class="stat-info"><h3>79%</h3><p>Average</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-info"><h3>95%</h3><p>Attendance</p></div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h3><i class="fas fa-chart-line"></i> ${child.name}'s Performance</h3>
                <button class="btn-primary" onclick="printReport('${child.id}')" style="width:auto; padding:0.5rem 1rem;">
                    <i class="fas fa-print"></i> Print
                </button>
            </div>
            <canvas id="parentChart"></canvas>
        </div>
        <div class="card">
            <h4>Fee Status</h4>
            <div class="flex-between">
                <span>Term 1: KSh 45,000</span>
                <span class="status-badge status-partial">partial</span>
            </div>
            <div class="fee-progress">
                <div class="fee-progress-bar" style="width: 67%;"></div>
            </div>
            <p>Paid: KSh 30,000 | Balance: KSh 15,000</p>
            <p><small>Due: 2024-04-15</small></p>
        </div>
    `;
}

// Initialize parent dashboard chart
function initParentDashboardChart(child) {
    destroyCharts();
    const ctx = document.getElementById('parentChart')?.getContext('2d');
    if (ctx) {
        activeCharts.push(new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mathematics', 'English', 'Science', 'History'],
                datasets: [{
                    label: 'Scores',
                    data: [85, 78, 82, 71],
                    borderColor: '#eab308',
                    tension: 0.4
                }]
            }
        }));
    }
}

// Get parent grades content
function getParentGradesContent(child) {
    return `
        <h3>Grades - ${child.name}</h3>
        <div class="table-responsive">
            <table class="data-table">
                <tr>
                    <th>Subject</th>
                    <th>Score</th>
                    <th>Grade</th>
                    <th>Teacher</th>
                    <th>Comment</th>
                </tr>
                <tr>
                    <td>Mathematics</td>
                    <td>85%</td>
                    <td><span class="status-badge status-excelling">A-</span></td>
                    <td>Mr. Doe</td>
                    <td>Good progress</td>
                </tr>
                <tr>
                    <td>English</td>
                    <td>78%</td>
                    <td><span class="status-badge status-average">B+</span></td>
                    <td>Ms. Smith</td>
                    <td>Needs more reading</td>
                </tr>
                <tr>
                    <td>Science</td>
                    <td>82%</td>
                    <td><span class="status-badge status-excelling">A-</span></td>
                    <td>Mr. Johnson</td>
                    <td>Excellent in practicals</td>
                </tr>
                <tr>
                    <td>History</td>
                    <td>71%</td>
                    <td><span class="status-badge status-average">B</span></td>
                    <td>Mrs. Davis</td>
                    <td>Good effort</td>
                </tr>
            </table>
        </div>
    `;
}

// Get parent attendance content
function getParentAttendanceContent(child) {
    return `
        <h3>Attendance - ${child.name}</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-check"></i></div>
                <div class="stat-info"><h3>15</h3><p>Present</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-times"></i></div>
                <div class="stat-info"><h3>1</h3><p>Absent</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-clock"></i></div>
                <div class="stat-info"><h3>2</h3><p>Late</p></div>
            </div>
        </div>
        <div class="card">
            <canvas id="attendancePie"></canvas>
        </div>
        <div class="table-responsive">
            <table class="data-table">
                <tr><th>Date</th><th>Status</th><th>Reason</th></tr>
                <tr><td>2024-03-18</td><td><span class="status-badge status-present">present</span></td><td>-</td></tr>
                <tr><td>2024-03-17</td><td><span class="status-badge status-present">present</span></td><td>-</td></tr>
                <tr><td>2024-03-16</td><td><span class="status-badge status-late">late</span></td><td>Traffic</td></tr>
            </table>
        </div>
    `;
}

// Initialize parent attendance chart
function initParentAttendanceChart() {
    destroyCharts();
    const ctx = document.getElementById('attendancePie')?.getContext('2d');
    if (ctx) {
        activeCharts.push(new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    data: [15, 1, 2],
                    backgroundColor: ['#3b82f6', '#ef4444', '#eab308']
                }]
            }
        }));
    }
}

// Get parent fee statement content
function getParentFeeStatementContent(child) {
    return `
        <h3>Fee Statement - ${child.name}</h3>
        <div class="card">
            <h4>Term 1, 2024</h4>
            <table class="data-table">
                <tr><td>Total Fees:</td><td><strong>KSh 45,000</strong></td></tr>
                <tr><td>Paid:</td><td>KSh 30,000</td></tr>
                <tr><td>Balance:</td><td class="status-struggling">KSh 15,000</td></tr>
                <tr><td>Due Date:</td><td>2024-04-15</td></tr>
                <tr><td>Status:</td><td><span class="status-badge status-partial">partial</span></td></tr>
            </table>
            <div class="fee-progress">
                <div class="fee-progress-bar" style="width: 67%;"></div>
            </div>
            <h4 style="margin-top:1.5rem;">Payment History</h4>
            <table class="data-table">
                <tr><th>Date</th><th>Amount</th><th>Method</th></tr>
                <tr><td>2024-01-15</td><td>KSh 30,000</td><td>MPesa</td></tr>
            </table>
        </div>
    `;
}

// Get parent tips content
function getParentTipsContent() {
    return `
        <h3>Did You Know?</h3>
        <div class="card">
            <p id="current-tip">${educationTips[currentTipIndex]}</p>
            <button class="btn-primary" onclick="nextTip()">Next Tip</button>
        </div>
    `;
}

// Print report
function printReport(childId) {
    const child = currentChildren.find(s => s.id === childId);
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>${child.name} - Report</title>
            <style>
                body { font-family: Arial; padding: 20px; }
                h1 { color: #eab308; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #f5f5f5; }
                .status-badge { padding: 3px 10px; border-radius: 20px; font-size: 12px; }
                .status-present { background: #dcfce7; color: #166534; }
            </style>
        </head>
        <body>
            <h1>${child.name} - Academic Report</h1>
            <p>School: Greenwood High</p>
            <p>Grade: ${child.grade} | ELIMUID: ${child.elimuid}</p>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            
            <h2>Grades</h2>
            <table>
                <tr><th>Subject</th><th>Score</th><th>Grade</th><th>Comment</th></tr>
                <tr><td>Mathematics</td><td>85%</td><td>A-</td><td>Good progress</td></tr>
                <tr><td>English</td><td>78%</td><td>B+</td><td>Needs more reading</td></tr>
                <tr><td>Science</td><td>82%</td><td>A-</td><td>Excellent in practicals</td></tr>
                <tr><td>History</td><td>71%</td><td>B</td><td>Good effort</td></tr>
            </table>
            
            <h2>Attendance</h2>
            <p>Present: 15</p>
            <p>Absent: 1</p>
            <p>Late: 2</p>
            
            <h2>Fee Status</h2>
            <p>Total: KSh 45,000 | Paid: KSh 30,000 | Balance: KSh 15,000</p>
            
            <p><em>Generated by ShuleAI</em></p>
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Parent popup functions
let parentPopupEnabled = true;

function showParentPopup() {
    if (!parentPopupEnabled) return;
    document.getElementById('parent-popup').style.display = 'block';
    document.getElementById('education-tip').textContent = educationTips[currentTipIndex];
}

function closeParentPopup() {
    document.getElementById('parent-popup').style.display = 'none';
}

function toggleParentPopup() {
    parentPopupEnabled = document.getElementById('popup-toggle').checked;
    if (!parentPopupEnabled) closeParentPopup();
}

function nextTip() {
    currentTipIndex = (currentTipIndex + 1) % educationTips.length;
    document.getElementById('education-tip').textContent = educationTips[currentTipIndex];
    if (document.getElementById('current-tip')) {
        document.getElementById('current-tip').textContent = educationTips[currentTipIndex];
    }
}

// Show parent profile
function showParentProfile() {
    showToast('Parent profile');
}

// Make functions globally available
window.switchParentTab = switchParentTab;
window.switchChild = switchChild;
window.printReport = printReport;
window.showParentPopup = showParentPopup;
window.closeParentPopup = closeParentPopup;
window.toggleParentPopup = toggleParentPopup;
window.nextTip = nextTip;
window.showParentProfile = showParentProfile;
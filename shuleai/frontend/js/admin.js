// ==================== ADMIN DASHBOARD FUNCTIONS ====================

// Load admin dashboard
function loadAdminDashboard() {
    if (currentSchool) {
        document.getElementById('admin-school-name').textContent = currentSchool.name;
        document.getElementById('admin-system-info').textContent = 
            currentSchool.system === '844' ? '8-4-4 System' : 
            currentSchool.system === 'cbc' ? 'CBC System' : 'Other System';
    }
    renderAdminMenu();
    switchAdminTab('dashboard');
}

// Render admin menu
function renderAdminMenu() {
    const menuContainer = document.getElementById('admin-menu');
    if (!menuContainer) return;
    
    const menus = {
        admin: [
            { section: 'DASHBOARD', items: [
                { name: 'Overview', icon: 'fa-home', tab: 'dashboard' },
                { name: 'School Overview', icon: 'fa-school', tab: 'school' }
            ]},
            { section: 'ANALYTICS', items: [
                { name: 'Performance Analytics', icon: 'fa-chart-line', tab: 'analytics' },
                { name: 'Subject Analysis', icon: 'fa-chart-pie', tab: 'subject-analysis' },
                { name: 'Teacher Performance', icon: 'fa-chart-bar', tab: 'teacher-performance' },
                { name: 'Student Progress', icon: 'fa-chart-simple', tab: 'student-progress' },
                { name: 'Trend Analysis', icon: 'fa-chart-gantt', tab: 'trends' },
                { name: 'Comparative Reports', icon: 'fa-chart-scatter', tab: 'comparative' }
            ]},
            { section: 'MONITORING', items: [
                { name: 'All Students', icon: 'fa-user-graduate', tab: 'students' },
                { name: 'All Teachers', icon: 'fa-chalkboard-teacher', tab: 'teachers' },
                { name: 'Classes', icon: 'fa-users', tab: 'classes' },
                { name: 'Departments', icon: 'fa-building', tab: 'departments' },
                { name: 'Attendance Overview', icon: 'fa-calendar-check', tab: 'attendance' }
            ]},
            { section: 'ACADEMICS', items: [
                { name: 'Grade Distribution', icon: 'fa-chart-simple', tab: 'grades' },
                { name: 'Subject Performance', icon: 'fa-chart-line', tab: 'subject-performance' },
                { name: 'Exam Results', icon: 'fa-file-lines', tab: 'exams' },
                { name: 'Academic Reports', icon: 'fa-file-alt', tab: 'academic-reports' },
                { name: 'Struggling Students', icon: 'fa-exclamation-triangle', tab: 'struggling' },
                { name: 'Excelling Students', icon: 'fa-star', tab: 'excelling' }
            ]},
            { section: 'FINANCE', items: [
                { name: 'Fee Collection', icon: 'fa-money-bill-wave', tab: 'fees' },
                { name: 'Payment Reports', icon: 'fa-file-invoice', tab: 'payments' },
                { name: 'Outstanding Balances', icon: 'fa-credit-card', tab: 'outstanding' },
                { name: 'Financial Summary', icon: 'fa-chart-pie', tab: 'financial' }
            ]},
            { section: 'COMMUNICATION', items: [
                { name: 'Send Messages', icon: 'fa-envelope', tab: 'messages' },
                { name: 'Broadcast Alerts', icon: 'fa-bullhorn', tab: 'alerts' },
                { name: 'Announcements', icon: 'fa-megaphone', tab: 'announcements' },
                { name: 'Bullying Reports', icon: 'fa-shield-alt', tab: 'bullying' },
                { name: 'Feedback', icon: 'fa-comment', tab: 'feedback' }
            ]},
            { section: 'SETTINGS', items: [
                { name: 'School Settings', icon: 'fa-cog', tab: 'settings' },
                { name: 'Curriculum', icon: 'fa-book', tab: 'curriculum' },
                { name: 'User Management', icon: 'fa-users-cog', tab: 'users' },
                { name: 'Audit Logs', icon: 'fa-history', tab: 'audit' },
                { name: 'Backup & Restore', icon: 'fa-database', tab: 'backup' }
            ]}
        ]
    };
    
    let html = '';
    menus.admin.forEach(section => {
        html += `<div class="menu-section"><h4>${section.section}</h4>`;
        section.items.forEach(item => {
            html += `<a class="menu-item" onclick="switchAdminTab('${item.tab}')">
                <i class="fas ${item.icon}"></i> ${item.name}
            </a>`;
        });
        html += `</div>`;
    });
    menuContainer.innerHTML = html;
}

// Switch admin tabs
function switchAdminTab(tab) {
    let content = '';
    
    switch(tab) {
        case 'dashboard':
            content = getAdminDashboardContent();
            break;
        case 'analytics':
            content = getAdminAnalyticsContent();
            break;
        case 'subject-analysis':
            content = getAdminSubjectAnalysisContent();
            break;
        case 'teacher-performance':
            content = getAdminTeacherPerformanceContent();
            break;
        case 'student-progress':
            content = getAdminStudentProgressContent();
            break;
        case 'trends':
            content = getAdminTrendsContent();
            break;
        case 'students':
            content = getAdminStudentsContent();
            break;
        case 'teachers':
            content = getAdminTeachersContent();
            break;
        case 'classes':
            content = getAdminClassesContent();
            break;
        case 'fees':
            content = getAdminFeesContent();
            break;
        case 'messages':
            content = getAdminMessagesContent();
            break;
        case 'bullying':
            content = getAdminBullyingContent();
            break;
        case 'audit':
            content = getAdminAuditContent();
            break;
        case 'settings':
            content = getAdminSettingsContent();
            break;
        default:
            content = `<h3>${tab.replace(/-/g, ' ')}</h3><div class="card"><p>Content for ${tab} would appear here.</p></div>`;
    }
    
    document.getElementById('admin-content').innerHTML = content;
    updateActiveMenu('admin-sidebar', tab);
    
    // Initialize charts if needed
    setTimeout(() => {
        if (tab === 'dashboard') initAdminDashboardCharts();
        if (tab === 'analytics') initAdminAnalyticsCharts();
        if (tab === 'subject-analysis') initAdminSubjectCharts();
    }, 100);
}

// Get admin dashboard content
function getAdminDashboardContent() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-school"></i></div>
                <div class="stat-info"><h3>${currentSchool?.name || 'Greenwood High'}</h3><p>${currentSchool?.system === '844' ? '8-4-4 System' : 'CBC System'}</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-user-graduate"></i></div>
                <div class="stat-info"><h3>1245</h3><p>Students</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-chalkboard-teacher"></i></div>
                <div class="stat-info"><h3>68</h3><p>Teachers</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-user-friends"></i></div>
                <div class="stat-info"><h3>892</h3><p>Parents</p></div>
            </div>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#8b5cf6;"><i class="fas fa-chart-line"></i></div>
                <div class="stat-info"><h3>76%</h3><p>Avg Performance</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-star"></i></div>
                <div class="stat-info"><h3>245</h3><p>Excelling</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-info"><h3>156</h3><p>Struggling</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-info"><h3>92%</h3><p>Attendance</p></div>
            </div>
        </div>

        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4><i class="fas fa-chart-pie"></i> Performance Distribution</h4>
                <canvas id="performanceChart" style="height: 200px;"></canvas>
            </div>
            <div class="card">
                <h4><i class="fas fa-chart-line"></i> Weekly Attendance</h4>
                <canvas id="attendanceChart" style="height: 200px;"></canvas>
            </div>
        </div>

        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4><i class="fas fa-chart-bar"></i> Subject Performance</h4>
                <canvas id="subjectPerfChart" style="height: 200px;"></canvas>
            </div>
            <div class="card">
                <h4><i class="fas fa-chart-pie"></i> Fee Collection</h4>
                <canvas id="feeChart" style="height: 200px;"></canvas>
            </div>
        </div>

        <div class="card">
            <h4><i class="fas fa-bell"></i> Critical Alerts</h4>
            <div class="grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 1rem;">
                <div class="stat-card" style="background: #fee2e2;">
                    <div class="stat-info"><h3>8</h3><p>Critical</p></div>
                </div>
                <div class="stat-card" style="background: #fef9c3;">
                    <div class="stat-info"><h3>15</h3><p>Warnings</p></div>
                </div>
                <div class="stat-card" style="background: #dbeafe;">
                    <div class="stat-info"><h3>23</h3><p>Info</p></div>
                </div>
            </div>
            <div class="alert-item">
                <i class="fas fa-exclamation-triangle alert-icon"></i>
                <div><strong>Fee balance of KSh 45,000 for 12 students</strong><br><small>2024-03-18 · critical</small></div>
            </div>
            <div class="alert-item">
                <i class="fas fa-exclamation-triangle alert-icon"></i>
                <div><strong>5 students with attendance below 80%</strong><br><small>2024-03-18 · warning</small></div>
            </div>
            <div class="alert-item">
                <i class="fas fa-exclamation-triangle alert-icon"></i>
                <div><strong>New bullying report received</strong><br><small>2024-03-18 · info</small></div>
            </div>
        </div>
    `;
}

// Initialize admin dashboard charts
function initAdminDashboardCharts() {
    destroyCharts();
    createPerformanceChart('performanceChart', 245, 844, 156);
    createAttendanceChart('attendanceChart');
    createSubjectChart('subjectPerfChart');
    createFeeChart('feeChart', 450, 320, 75);
}

// Get admin analytics content
function getAdminAnalyticsContent() {
    return `
        <h3>Performance Analytics</h3>
        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4>Overall Performance Trend</h4>
                <canvas id="trendChart"></canvas>
            </div>
            <div class="card">
                <h4>Grade Distribution</h4>
                <canvas id="gradeChart"></canvas>
            </div>
        </div>
        <div class="card">
            <h4>Performance by Class</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Class</th><th>Average</th><th>Excelling</th><th>Struggling</th><th>Trend</th></tr>
                    <tr><td>10A</td><td>78%</td><td>15</td><td>5</td><td><span class="status-badge status-success">↑ +5%</span></td></tr>
                    <tr><td>10B</td><td>72%</td><td>10</td><td>8</td><td><span class="status-badge status-warning">→ 0%</span></td></tr>
                    <tr><td>9A</td><td>81%</td><td>18</td><td>3</td><td><span class="status-badge status-success">↑ +8%</span></td></tr>
                    <tr><td>9B</td><td>68%</td><td>8</td><td>12</td><td><span class="status-badge status-critical">↓ -3%</span></td></tr>
                </table>
            </div>
        </div>
    `;
}

// Initialize admin analytics charts
function initAdminAnalyticsCharts() {
    destroyCharts();
    createTrendChart('trendChart', ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'], [72, 74, 78, 75, 79, 82]);
    createGradeChart('gradeChart');
}

// Get admin subject analysis content
function getAdminSubjectAnalysisContent() {
    return `
        <h3>Subject Analysis</h3>
        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4>Mathematics Performance</h4>
                <canvas id="mathChart"></canvas>
            </div>
            <div class="card">
                <h4>English Performance</h4>
                <canvas id="englishChart"></canvas>
            </div>
        </div>
        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4>Science Performance</h4>
                <canvas id="scienceChart"></canvas>
            </div>
            <div class="card">
                <h4>History Performance</h4>
                <canvas id="historyChart"></canvas>
            </div>
        </div>
        <div class="card">
            <h4>Subject Comparison</h4>
            <canvas id="compareChart"></canvas>
        </div>
    `;
}

// Initialize admin subject charts
function initAdminSubjectCharts() {
    destroyCharts();
    
    // Create distribution charts for each subject
    ['mathChart', 'englishChart', 'scienceChart', 'historyChart'].forEach((id, index) => {
        const ctx = document.getElementById(id)?.getContext('2d');
        if (ctx) {
            activeCharts.push(new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['0-40', '41-60', '61-80', '81-100'],
                    datasets: [{
                        data: [15, 45, 120, 65],
                        backgroundColor: '#8b5cf6'
                    }]
                }
            }));
        }
    });
    
    createRadarChart('compareChart');
}

// Get admin teacher performance content
function getAdminTeacherPerformanceContent() {
    return `
        <h3>Teacher Performance Analysis</h3>
        <div class="card">
            <h4>Teacher Rankings</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Teacher</th><th>Subject</th><th>Class Avg</th><th>Student Progress</th><th>Rating</th></tr>
                    <tr><td>Mr. Doe</td><td>Mathematics</td><td>78%</td><td><span class="status-badge status-success">↑ +5%</span></td><td>⭐⭐⭐⭐</td></tr>
                    <tr><td>Ms. Smith</td><td>English</td><td>82%</td><td><span class="status-badge status-success">↑ +8%</span></td><td>⭐⭐⭐⭐⭐</td></tr>
                    <tr><td>Mr. Johnson</td><td>Science</td><td>75%</td><td><span class="status-badge status-warning">→ 0%</span></td><td>⭐⭐⭐</td></tr>
                    <tr><td>Mrs. Davis</td><td>History</td><td>71%</td><td><span class="status-badge status-critical">↓ -2%</span></td><td>⭐⭐</td></tr>
                </table>
            </div>
        </div>
        <div class="card">
            <h4>Teacher Activity</h4>
            <canvas id="teacherActivityChart"></canvas>
        </div>
    `;
}

// Get admin student progress content
function getAdminStudentProgressContent() {
    return `
        <h3>Student Progress Tracking</h3>
        <div class="card">
            <h4>Overall Progress</h4>
            <canvas id="progressTrendChart"></canvas>
        </div>
        <div class="card">
            <h4>Top 10 Students</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Rank</th><th>Name</th><th>Grade</th><th>Average</th><th>Trend</th></tr>
                    <tr><td>1</td><td>James Wilson</td><td>10A</td><td>92%</td><td><span class="status-badge status-success">↑ +5%</span></td></tr>
                    <tr><td>2</td><td>Emma Smith</td><td>10A</td><td>79%</td><td><span class="status-badge status-success">↑ +3%</span></td></tr>
                    <tr><td>3</td><td>Sarah Johnson</td><td>10B</td><td>76%</td><td><span class="status-badge status-warning">→ 0%</span></td></tr>
                </table>
            </div>
        </div>
    `;
}

// Get admin trends content
function getAdminTrendsContent() {
    return `
        <h3>Trend Analysis</h3>
        <div class="grid" style="grid-template-columns: repeat(2, 1fr);">
            <div class="card">
                <h4>Year-over-Year Performance</h4>
                <canvas id="yearlyChart"></canvas>
            </div>
            <div class="card">
                <h4>Term Comparison</h4>
                <canvas id="termChart"></canvas>
            </div>
        </div>
        <div class="card">
            <h4>Predictive Analytics</h4>
            <p>Projected end-term average: <strong>81%</strong> (↑ +3% from current)</p>
            <p>Students at risk: <strong>12</strong> (↓ -2 from last term)</p>
            <div class="fee-progress">
                <div class="fee-progress-bar" style="width: 75%;"></div>
            </div>
            <p>Performance confidence: 85%</p>
        </div>
    `;
}

// Get admin students content
function getAdminStudentsContent() {
    return `
        <h3>Student Management</h3>
        <div class="card">
            <div class="flex-between">
                <h4>All Students</h4>
                <button class="btn-primary" onclick="showToast('Add student form')" style="width: auto;">+ Add Student</button>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Name</th><th>ELIMUID</th><th>Grade</th><th>Average</th><th>Status</th><th>Attendance</th><th>Actions</th></tr>
                    <tr><td>Emma Smith</td><td>ELIMU-2026-001</td><td>10A</td><td><strong>79%</strong></td><td><span class="status-badge status-average">Average</span></td><td>95%</td><td><button class="btn-small" onclick="showToast('Viewing Emma')">View</button> <button class="btn-small" onclick="showToast('Messaging Emma')">Message</button></td></tr>
                    <tr><td>James Smith</td><td>ELIMU-2026-002</td><td>8B</td><td><strong>92%</strong></td><td><span class="status-badge status-excelling">Excelling</span></td><td>98%</td><td><button class="btn-small" onclick="showToast('Viewing James')">View</button> <button class="btn-small" onclick="showToast('Messaging James')">Message</button></td></tr>
                </table>
            </div>
        </div>
    `;
}

// Get admin teachers content
function getAdminTeachersContent() {
    return `
        <h3>Teacher Management</h3>
        <div class="card">
            <div class="flex-between">
                <h4>All Teachers</h4>
                <button class="btn-primary" onclick="showToast('Add teacher form')" style="width: auto;">+ Add Teacher</button>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Name</th><th>Subject</th><th>Class</th><th>Students</th><th>Avg Score</th><th>Actions</th></tr>
                    <tr><td>John Doe</td><td>Mathematics</td><td>10A</td><td>35</td><td>78%</td><td><button class="btn-small" onclick="showToast('Viewing John')">View</button> <button class="btn-small" onclick="showToast('Messaging John')">Message</button></td></tr>
                    <tr><td>Ms. Smith</td><td>English</td><td>10A</td><td>35</td><td>82%</td><td><button class="btn-small" onclick="showToast('Viewing Ms. Smith')">View</button> <button class="btn-small" onclick="showToast('Messaging Ms. Smith')">Message</button></td></tr>
                </table>
            </div>
        </div>
    `;
}

// Get admin classes content
function getAdminClassesContent() {
    return `
        <h3>Class Overview</h3>
        <div class="grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="card">
                <h4>10A</h4>
                <p>Students: 35</p>
                <p>Avg: 78%</p>
                <p>Teacher: Mr. Doe</p>
                <button class="btn-small" onclick="showToast('Viewing class')">View Details</button>
            </div>
            <div class="card">
                <h4>10B</h4>
                <p>Students: 32</p>
                <p>Avg: 72%</p>
                <p>Teacher: Ms. Smith</p>
                <button class="btn-small" onclick="showToast('Viewing class')">View Details</button>
            </div>
            <div class="card">
                <h4>9A</h4>
                <p>Students: 38</p>
                <p>Avg: 81%</p>
                <p>Teacher: Mr. Johnson</p>
                <button class="btn-small" onclick="showToast('Viewing class')">View Details</button>
            </div>
        </div>
    `;
}

// Get admin fees content
function getAdminFeesContent() {
    return `
        <h3>Fee Collection</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-money-bill"></i></div>
                <div class="stat-info"><h3>KSh 56,025,000</h3><p>Total Fees</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>KSh 48,200,000</h3><p>Collected</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-info"><h3>KSh 7,825,000</h3><p>Outstanding</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-percent"></i></div>
                <div class="stat-info"><h3>86%</h3><p>Collection Rate</p></div>
            </div>
        </div>
        
        <div class="card">
            <h4>Collection Progress</h4>
            <div class="fee-progress">
                <div class="fee-progress-bar" style="width: 86%;"></div>
            </div>
        </div>
        
        <div class="card">
            <h4>Outstanding Balances</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Student</th><th>Term</th><th>Amount</th><th>Paid</th><th>Balance</th><th>Status</th><th>Actions</th></tr>
                    <tr>
                        <td>Emma Smith</td>
                        <td>Term 1, 2024</td>
                        <td>KSh 45,000</td>
                        <td>KSh 30,000</td>
                        <td class="status-struggling">KSh 15,000</td>
                        <td><span class="status-badge status-partial">partial</span></td>
                        <td><button class="btn-small" onclick="showToast('Sending reminder')">Remind</button></td>
                    </tr>
                </table>
            </div>
            <button class="btn-primary" style="margin-top: 1rem;" onclick="showToast('Sending reminders to all')">Send Payment Reminders</button>
        </div>
    `;
}

// Get admin messages content
function getAdminMessagesContent() {
    return `
        <h3>Send Messages</h3>
        <div class="card">
            <div class="form-group">
                <label>Send to:</label>
                <select class="form-control">
                    <option>All Teachers</option>
                    <option>All Parents</option>
                    <option>All Students</option>
                    <option>Specific Class</option>
                    <option>Specific Student</option>
                </select>
            </div>
            <div class="form-group">
                <label>Subject</label>
                <input type="text" id="message-subject" class="form-control" placeholder="Enter subject">
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea id="message-content" class="form-control" rows="5" placeholder="Type your message..."></textarea>
            </div>
            <button class="btn-primary" onclick="sendAdminMessage()">Send Message</button>
        </div>
        
        <div class="card">
            <h4>Recent Messages</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Date</th><th>To</th><th>Subject</th><th>Status</th></tr>
                    <tr><td>2024-03-18</td><td>All Teachers</td><td>Staff Meeting</td><td><span class="status-badge status-paid">sent</span></td></tr>
                    <tr><td>2024-03-18</td><td>All Parents</td><td>Fee Reminder</td><td><span class="status-badge status-paid">sent</span></td></tr>
                </table>
            </div>
        </div>
    `;
}

// Send admin message
function sendAdminMessage() {
    const subject = document.getElementById('message-subject')?.value;
    const content = document.getElementById('message-content')?.value;
    if (!subject || !content) {
        showToast('Fill all fields', 'warning');
        return;
    }
    showToast('Message sent successfully');
    document.getElementById('message-subject').value = '';
    document.getElementById('message-content').value = '';
}

// Get admin bullying content
function getAdminBullyingContent() {
    return `
        <h3>Bullying Reports</h3>
        <div class="card">
            <h4>Pending Reports</h4>
            <div class="alert-item">
                <i class="fas fa-shield-alt alert-icon"></i>
                <div>
                    <strong>Report #1</strong>
                    <p>Feeling uncomfortable in class</p>
                    <small>From: Student STU001 · 2024-03-17</small>
                    <div style="margin-top: 0.5rem;">
                        <button class="btn-small" onclick="showToast('Investigating report')">Investigate</button>
                        <button class="btn-small" onclick="showToast('Report resolved')">Mark Resolved</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="card">
            <h4>Anonymous Reporting Settings</h4>
            <p>Students can report issues anonymously. All reports are confidential.</p>
            <div class="toggle-switch">
                <span>Enable Anonymous Reports</span>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `;
}

// Get admin audit content
function getAdminAuditContent() {
    return `
        <h3>Audit Logs</h3>
        <div class="card">
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>Timestamp</th><th>User</th><th>Action</th><th>IP Address</th></tr>
                    <tr><td>2024-03-18 08:00:00</td><td>ADMIN001</td><td>Login</td><td>192.168.1.100</td></tr>
                    <tr><td>2024-03-18 09:15:00</td><td>TCH001</td><td>Login</td><td>192.168.1.101</td></tr>
                    <tr><td>2024-03-18 10:30:00</td><td>ADMIN001</td><td>Updated Settings</td><td>192.168.1.100</td></tr>
                </table>
            </div>
        </div>
    `;
}

// Get admin settings content
function getAdminSettingsContent() {
    return `
        <h3>School Settings</h3>
        <div class="card">
            <h4>School Information</h4>
            <div class="form-group">
                <label>School Name</label>
                <input type="text" id="school-name-input" value="${currentSchool?.name || 'Greenwood High'}" onchange="updateSchoolName(this.value)">
            </div>
            <div class="form-group">
                <label>School Code</label>
                <input type="text" value="GRN001" disabled>
            </div>
            <div class="form-group">
                <label>Curriculum System</label>
                <select id="curriculum-select" onchange="updateCurriculum(this.value)">
                    <option value="844" ${currentSchool?.system === '844' ? 'selected' : ''}>8-4-4 (Kenya)</option>
                    <option value="cbc" ${currentSchool?.system === 'cbc' ? 'selected' : ''}>CBC (Kenya)</option>
                    <option value="british">British</option>
                    <option value="american">American</option>
                </select>
            </div>
            <button class="btn-primary" onclick="saveSchoolSettings()">Save Changes</button>
        </div>
        
        <div class="card">
            <h4>Fee Structure</h4>
            <div class="form-group">
                <label>Term 1 Fees</label>
                <input type="number" value="45000">
            </div>
            <div class="form-group">
                <label>Term 2 Fees</label>
                <input type="number" value="45000">
            </div>
            <div class="form-group">
                <label>Term 3 Fees</label>
                <input type="number" value="45000">
            </div>
            <button class="btn-primary" onclick="showToast('Fee structure updated')">Update Fees</button>
        </div>
    `;
}

// Update school name
function updateSchoolName(name) {
    if (currentSchool) {
        currentSchool.name = name;
        ['admin-school-name', 'teacher-school-name', 'parent-school-name', 'student-school-name'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = name;
        });
        showToast('School name updated');
    }
}

// Update curriculum
function updateCurriculum(val) {
    if (currentSchool) {
        currentSchool.system = val;
        document.getElementById('admin-system-info').textContent = 
            val === '844' ? '8-4-4 System' : val === 'cbc' ? 'CBC System' : 'Other System';
        showToast(`Curriculum updated to ${val}`);
    }
}

// Save school settings
function saveSchoolSettings() {
    showToast('Settings saved');
}

// Show admin profile
function showAdminProfile() {
    openModal('admin-profile-modal');
}

// Update admin profile
function updateAdminProfile() {
    showToast('Profile updated');
    closeModal('admin-profile-modal');
}

// Make functions globally available
window.switchAdminTab = switchAdminTab;
window.sendAdminMessage = sendAdminMessage;
window.updateSchoolName = updateSchoolName;
window.updateCurriculum = updateCurriculum;
window.saveSchoolSettings = saveSchoolSettings;
window.showAdminProfile = showAdminProfile;
window.updateAdminProfile = updateAdminProfile;
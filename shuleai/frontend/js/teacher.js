// ==================== TEACHER DASHBOARD FUNCTIONS ====================

// Load teacher dashboard
function loadTeacherDashboard() {
    if (currentSchool) {
        document.getElementById('teacher-school-name').textContent = currentSchool.name;
    }
    if (currentUser) {
        document.getElementById('teacher-info').textContent = `${currentUser.name} · ${currentUser.subject}`;
        document.getElementById('teacher-class-info').innerHTML = `<i class="fas fa-users"></i> <span>${currentUser.class} · 35 Students</span>`;
    }
    renderTeacherMenu();
    switchTeacherTab('dashboard');
}

// Render teacher menu
function renderTeacherMenu() {
    const menuContainer = document.getElementById('teacher-menu');
    if (!menuContainer) return;
    
    const menus = {
        teacher: [
            { section: 'CLASS MANAGEMENT', items: [
                { name: 'Dashboard', icon: 'fa-home', tab: 'dashboard' },
                { name: 'My Students', icon: 'fa-users', tab: 'students' },
                { name: 'Enter Marks', icon: 'fa-pen', tab: 'marks' },
                { name: 'Attendance', icon: 'fa-calendar-check', tab: 'attendance' },
                { name: 'Comments', icon: 'fa-comment', tab: 'comments' }
            ]},
            { section: 'ANALYTICS', items: [
                { name: 'Class Analytics', icon: 'fa-chart-bar', tab: 'class-analytics' },
                { name: 'Subject Analytics', icon: 'fa-chart-pie', tab: 'subject-analytics' },
                { name: 'Struggling Students', icon: 'fa-exclamation-triangle', tab: 'struggling' }
            ]},
            { section: 'ASSIGNMENTS', items: [
                { name: 'Manage Assignments', icon: 'fa-tasks', tab: 'assignments' },
                { name: 'Give Alerts', icon: 'fa-bell', tab: 'alerts' }
            ]},
            { section: 'PERSONAL', items: [
                { name: 'Timetable', icon: 'fa-clock', tab: 'timetable' },
                { name: 'Reminders', icon: 'fa-calendar-plus', tab: 'reminders' },
                { name: 'Messages', icon: 'fa-envelope', tab: 'messages' },
                { name: 'Profile', icon: 'fa-user-circle', tab: 'profile' },
                { name: 'Settings', icon: 'fa-cog', tab: 'settings' }
            ]},
            { section: 'DATA', items: [
                { name: 'Upload Data', icon: 'fa-upload', tab: 'upload' },
                { name: 'Export Data', icon: 'fa-download', tab: 'export' }
            ]}
        ]
    };
    
    let html = '';
    menus.teacher.forEach(section => {
        html += `<div class="menu-section"><h4>${section.section}</h4>`;
        section.items.forEach(item => {
            html += `<a class="menu-item" onclick="switchTeacherTab('${item.tab}')">
                <i class="fas ${item.icon}"></i> ${item.name}
            </a>`;
        });
        html += `</div>`;
    });
    menuContainer.innerHTML = html;
}

// Switch teacher tabs
function switchTeacherTab(tab) {
    let content = '';
    
    switch(tab) {
        case 'dashboard':
            content = getTeacherDashboardContent();
            break;
        case 'marks':
            content = getTeacherMarksContent();
            break;
        case 'attendance':
            content = getTeacherAttendanceContent();
            break;
        case 'subject-analytics':
            content = getTeacherSubjectAnalyticsContent();
            setTimeout(() => initTeacherSubjectAnalytics(), 100);
            return; // Return early because we already set content
        default:
            content = `<h3>${tab.replace(/-/g, ' ')}</h3><div class="card"><p>Content for ${tab} would appear here.</p></div>`;
    }
    
    document.getElementById('teacher-content').innerHTML = content;
    updateActiveMenu('teacher-sidebar', tab);
}

// Get teacher dashboard content
function getTeacherDashboardContent() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-users"></i></div>
                <div class="stat-info"><h3>35</h3><p>Students</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-star"></i></div>
                <div class="stat-info"><h3>8</h3><p>Excelling</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-exclamation-triangle"></i></div>
                <div class="stat-info"><h3>5</h3><p>Need Help</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-info"><h3>32/35</h3><p>Present Today</p></div>
            </div>
        </div>
        <div class="card">
            <h4>Quick Actions</h4>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn-primary" onclick="switchTeacherTab('marks')">Enter Marks</button>
                <button class="btn-primary" onclick="switchTeacherTab('attendance')">Take Attendance</button>
                <button class="btn-primary" onclick="switchTeacherTab('comments')">Add Comments</button>
            </div>
        </div>
    `;
}

// Get teacher marks content
function getTeacherMarksContent() {
    return `
        <h3>Enter Marks - ${currentUser?.subject || 'Mathematics'}</h3>
        <div class="card">
            <div class="form-group">
                <label>Assessment Type</label>
                <select>
                    <option>End Term Exam</option>
                    <option>Mid Term Test</option>
                    <option>Assignment</option>
                </select>
            </div>
            <div class="form-group">
                <label>Pass Mark: 50% (Auto-calculates grades based on ${currentSchool?.system || '844'})</label>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <tr>
                        <th>Student</th>
                        <th>Current</th>
                        <th>New Score</th>
                        <th>Grade</th>
                        <th>Comment</th>
                    </tr>
                    <tr>
                        <td>Emma Smith</td>
                        <td>85%</td>
                        <td><input type="number" min="0" max="100" id="score-STU001" style="width:70px;" onchange="previewGrade('STU001', this.value)"></td>
                        <td id="grade-STU001">-</td>
                        <td><input type="text" id="comment-STU001" placeholder="Optional" style="width:100%;"></td>
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        <td>78%</td>
                        <td><input type="number" min="0" max="100" id="score-STU002" style="width:70px;" onchange="previewGrade('STU002', this.value)"></td>
                        <td id="grade-STU002">-</td>
                        <td><input type="text" id="comment-STU002" placeholder="Optional" style="width:100%;"></td>
                    </tr>
                </table>
            </div>
            <button class="btn-primary" onclick="saveTeacherMarks()" style="margin-top:1rem;">Save Marks</button>
        </div>
    `;
}

// Preview grade when entering marks
function previewGrade(studentId, score) {
    if (!score) return;
    const gradeInfo = calculateGrade(parseInt(score), currentSchool?.system || '844');
    document.getElementById(`grade-${studentId}`).textContent = gradeInfo.grade;
}

// Save teacher marks
function saveTeacherMarks() {
    showToast('Marks saved successfully');
    switchTeacherTab('dashboard');
}

// Get teacher attendance content
function getTeacherAttendanceContent() {
    const today = new Date().toISOString().split('T')[0];
    
    return `
        <h3>Take Attendance - ${today}</h3>
        <div class="card">
            <div class="table-responsive">
                <table class="data-table">
                    <tr>
                        <th>Student</th>
                        <th>Status</th>
                        <th>Reason</th>
                        <th>Actions</th>
                    </tr>
                    <tr>
                        <td>Emma Smith</td>
                        <td><span class="status-badge status-present" id="status-STU001">present</span></td>
                        <td><input type="text" id="reason-STU001" style="width:100%;"></td>
                        <td>
                            <button class="btn-small" onclick="markAttendance('STU001','present')">P</button>
                            <button class="btn-small" onclick="markAttendance('STU001','absent')">A</button>
                            <button class="btn-small" onclick="markAttendance('STU001','late')">L</button>
                        </td>
                    </tr>
                    <tr>
                        <td>John Doe</td>
                        <td><span class="status-badge status-present" id="status-STU002">present</span></td>
                        <td><input type="text" id="reason-STU002" style="width:100%;"></td>
                        <td>
                            <button class="btn-small" onclick="markAttendance('STU002','present')">P</button>
                            <button class="btn-small" onclick="markAttendance('STU002','absent')">A</button>
                            <button class="btn-small" onclick="markAttendance('STU002','late')">L</button>
                        </td>
                    </tr>
                </table>
            </div>
            <button class="btn-primary" onclick="saveAttendance()" style="margin-top:1rem;">Save Attendance</button>
        </div>
    `;
}

// Mark attendance for a student
function markAttendance(studentId, status) {
    const span = document.getElementById(`status-${studentId}`);
    if (span) {
        span.className = `status-badge status-${status}`;
        span.textContent = status;
    }
    showToast(`Marked as ${status}`);
}

// Save attendance
function saveAttendance() {
    showToast('Attendance saved');
}

// Get teacher subject analytics content
function getTeacherSubjectAnalyticsContent() {
    return `
        <h3>${currentUser?.subject || 'Mathematics'} Analytics</h3>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-chart-line"></i></div>
                <div class="stat-info"><h3>78%</h3><p>Average</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-check-circle"></i></div>
                <div class="stat-info"><h3>28</h3><p>Passed</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#ef4444;"><i class="fas fa-times-circle"></i></div>
                <div class="stat-info"><h3>7</h3><p>Failed</p></div>
            </div>
        </div>
        <div class="card">
            <h4>Score Distribution</h4>
            <canvas id="subjectChart"></canvas>
        </div>
    `;
}

// Initialize teacher subject analytics chart
function initTeacherSubjectAnalytics() {
    destroyCharts();
    const ctx = document.getElementById('subjectChart')?.getContext('2d');
    if (ctx) {
        activeCharts.push(new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
                datasets: [{
                    data: [2, 5, 8, 12, 15, 10, 3],
                    backgroundColor: '#3b82f6'
                }]
            }
        }));
    }
}

// Show teacher profile
function showTeacherProfile() {
    showToast('Teacher profile');
}

// Make functions globally available
window.switchTeacherTab = switchTeacherTab;
window.previewGrade = previewGrade;
window.saveTeacherMarks = saveTeacherMarks;
window.markAttendance = markAttendance;
window.saveAttendance = saveAttendance;
window.showTeacherProfile = showTeacherProfile;
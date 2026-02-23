// ==================== STUDENT DASHBOARD FUNCTIONS ====================

// Load student dashboard
function loadStudentDashboard() {
    if (currentSchool) {
        document.getElementById('student-school-name').textContent = currentSchool.name;
    }
    if (currentUser) {
        document.getElementById('student-info').textContent = `${currentUser.name} · Grade ${currentUser.grade}`;
        document.getElementById('student-achievement').innerHTML = `<i class="fas fa-star" style="color: #eab308;"></i> <span>Average: 79%</span>`;
    }
    renderStudentMenu();
    switchStudentTab('dashboard');
}

// Render student menu
function renderStudentMenu() {
    const menuContainer = document.getElementById('student-menu');
    if (!menuContainer) return;
    
    const menus = {
        student: [
            { section: 'DASHBOARD', items: [
                { name: 'My Dashboard', icon: 'fa-home', tab: 'dashboard' },
                { name: 'Progress', icon: 'fa-chart-line', tab: 'progress' },
                { name: 'Achievements', icon: 'fa-trophy', tab: 'achievements' }
            ]},
            { section: 'ACADEMICS', items: [
                { name: 'My Grades', icon: 'fa-star', tab: 'grades' },
                { name: 'Attendance', icon: 'fa-calendar-check', tab: 'attendance' },
                { name: 'Subject Performance', icon: 'fa-book', tab: 'subjects' },
                { name: 'Progress Report', icon: 'fa-file-alt', tab: 'report' }
            ]},
            { section: 'LEARNING', items: [
                { name: 'Learning Materials', icon: 'fa-book-open', tab: 'materials' },
                { name: 'Assignments', icon: 'fa-tasks', tab: 'assignments' },
                { name: 'AI Study Sessions', icon: 'fa-robot', tab: 'study-ai' },
                { name: 'Guided Study', icon: 'fa-graduation-cap', tab: 'study-guided' }
            ]},
            { section: 'INTERACTION', items: [
                { name: 'AI Chat', icon: 'fa-comment-dots', tab: 'ai-chat' },
                { name: 'Private Chat', icon: 'fa-user-friends', tab: 'private-chat' },
                { name: 'Group Chat', icon: 'fa-users', tab: 'group-chat' }
            ]},
            { section: 'ALERTS', items: [
                { name: 'Teacher Alerts', icon: 'fa-bell', tab: 'alerts' },
                { name: 'Recommendations', icon: 'fa-lightbulb', tab: 'recommendations' }
            ]},
            { section: 'PERSONAL', items: [
                { name: 'Timetable', icon: 'fa-clock', tab: 'timetable' },
                { name: 'Reminders', icon: 'fa-calendar-plus', tab: 'reminders' },
                { name: 'Profile', icon: 'fa-user-circle', tab: 'profile' },
                { name: 'Customize', icon: 'fa-cog', tab: 'settings' }
            ]}
        ]
    };
    
    let html = '';
    menus.student.forEach(section => {
        html += `<div class="menu-section"><h4>${section.section}</h4>`;
        section.items.forEach(item => {
            html += `<a class="menu-item" onclick="switchStudentTab('${item.tab}')">
                <i class="fas ${item.icon}"></i> ${item.name}
            </a>`;
        });
        html += `</div>`;
    });
    menuContainer.innerHTML = html;
}

// Switch student tabs
function switchStudentTab(tab) {
    const student = currentUser;
    if (!student) return;
    
    let content = '';
    
    switch(tab) {
        case 'dashboard':
            content = getStudentDashboardContent(student);
            setTimeout(() => initStudentDashboardChart(), 100);
            break;
        case 'materials':
            content = getStudentMaterialsContent();
            break;
        case 'study-ai':
            content = getStudentStudyAIContent();
            break;
        case 'ai-chat':
            content = getStudentAIChatContent();
            break;
        case 'reminders':
            content = getStudentRemindersContent();
            break;
        case 'profile':
            content = getStudentProfileContent(student);
            break;
        case 'settings':
            content = getStudentSettingsContent();
            break;
        default:
            content = `<h3>${tab.replace(/-/g, ' ')}</h3><div class="card"><p>Content for ${tab} would appear here.</p></div>`;
    }
    
    document.getElementById('student-content').innerHTML = content;
    updateActiveMenu('student-sidebar', tab);
}

// Get student dashboard content
function getStudentDashboardContent(student) {
    const achievements = 3; // Demo achievements count
    
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#10b981;"><i class="fas fa-star"></i></div>
                <div class="stat-info"><h3>79%</h3><p>Average</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#3b82f6;"><i class="fas fa-calendar-check"></i></div>
                <div class="stat-info"><h3>95%</h3><p>Attendance</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#eab308;"><i class="fas fa-trophy"></i></div>
                <div class="stat-info"><h3>${achievements}</h3><p>Achievements</p></div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h3><i class="fas fa-chart-line"></i> My Performance</h3>
                <button class="btn-small" onclick="switchStudentTab('progress')">View All</button>
            </div>
            <canvas id="studentChart"></canvas>
        </div>
        <div class="ai-recommendations">
            <div class="recommendation-card" onclick="switchStudentTab('study-ai')">
                <i class="fas fa-robot"></i>
                <h4>AI Study</h4>
                <p>Start a session</p>
            </div>
            <div class="recommendation-card" onclick="switchStudentTab('materials')" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
                <i class="fas fa-book"></i>
                <h4>Materials</h4>
                <p>Access resources</p>
            </div>
        </div>
    `;
}

// Initialize student dashboard chart
function initStudentDashboardChart() {
    destroyCharts();
    const ctx = document.getElementById('studentChart')?.getContext('2d');
    if (ctx) {
        activeCharts.push(new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Mathematics', 'English', 'Science', 'History'],
                datasets: [{
                    label: 'Scores',
                    data: [85, 78, 82, 71],
                    backgroundColor: '#10b981'
                }]
            },
            options: {
                scales: {
                    y: { beginAtZero: true, max: 100 }
                }
            }
        }));
    }
}

// Get student materials content
function getStudentMaterialsContent() {
    return `
        <h3>Learning Materials</h3>
        <div class="card">
            <h4>Mathematics</h4>
            <div class="materials-grid">
                <div class="material-item" onclick="showToast('Opening Algebra Basics')">
                    <i class="fas fa-play-circle"></i>
                    <div><strong>Algebra Basics</strong><br><small>video</small></div>
                </div>
                <div class="material-item" onclick="showToast('Opening Formula Sheet')">
                    <i class="fas fa-file-pdf"></i>
                    <div><strong>Formula Sheet</strong><br><small>pdf</small></div>
                </div>
            </div>
        </div>
        <div class="card">
            <h4>Science</h4>
            <div class="materials-grid">
                <div class="material-item" onclick="showToast('Opening Cell Biology')">
                    <i class="fas fa-book"></i>
                    <div><strong>Cell Biology</strong><br><small>notes</small></div>
                </div>
            </div>
        </div>
    `;
}

// Get student study AI content
function getStudentStudyAIContent() {
    return `
        <h3>AI Study Sessions</h3>
        <div class="study-session-card" onclick="showToast('Starting Math session')">
            <i class="fas fa-calculator"></i>
            <h4>Mathematics Review</h4>
            <p>30 min · Algebra focus</p>
        </div>
        <div class="study-session-card" onclick="showToast('Starting Science session')" style="background: linear-gradient(135deg, #3b82f6, #2563eb);">
            <i class="fas fa-flask"></i>
            <h4>Science Practice</h4>
            <p>20 min · Biology</p>
        </div>
    `;
}

// Get student AI chat content
function getStudentAIChatContent() {
    return `
        <div class="card" style="text-align:center;padding:3rem;">
            <i class="fas fa-robot" style="font-size:4rem; color:#10b981;"></i>
            <h4>AI Chat</h4>
            <p>Ask me anything!</p>
            <button class="btn-primary" onclick="toggleChat(); switchChatTab('ai')">Open Chat</button>
        </div>
    `;
}

// Get student reminders content
function getStudentRemindersContent() {
    return `
        <h3>My Reminders</h3>
        <div class="card">
            <h4>Set Reminder</h4>
            <div class="form-group">
                <input type="text" id="reminder-title" placeholder="e.g., Math homework">
            </div>
            <div class="form-group">
                <input type="datetime-local" id="reminder-time">
            </div>
            <button class="btn-primary" onclick="setStudentReminder()">Add</button>
        </div>
        <div class="timetable-grid">
            <div class="reminder-item">
                <div>
                    <strong>Math homework</strong>
                    <br><small>${new Date().toLocaleString()}</small>
                </div>
                <button class="btn-small" onclick="deleteReminder(1)">Delete</button>
            </div>
        </div>
    `;
}

// Set student reminder
function setStudentReminder() {
    const title = document.getElementById('reminder-title')?.value;
    const time = document.getElementById('reminder-time')?.value;
    
    if (!title || !time) {
        showToast('Please fill all fields', 'warning');
        return;
    }
    
    showToast('Reminder set');
    document.getElementById('reminder-title').value = '';
    document.getElementById('reminder-time').value = '';
    switchStudentTab('reminders');
}

// Delete reminder
function deleteReminder(id) {
    showToast('Reminder deleted');
    switchStudentTab('reminders');
}

// Get student profile content
function getStudentProfileContent(student) {
    return `
        <h3>My Profile</h3>
        <div class="card">
            <div style="text-align:center;">
                <img src="https://ui-avatars.com/api/?name=${student.name.replace(' ', '+')}&size=80&background=10b981&color=fff" style="border-radius:50%;">
                <h4>${student.name}</h4>
                <p>Grade ${student.grade} · ELIMUID: ${student.elimuid}</p>
            </div>
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="student-name" value="${student.name}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" id="student-email" value="student@school.edu">
            </div>
            <button class="btn-primary" onclick="updateStudentProfile()">Update</button>
        </div>
    `;
}

// Update student profile
function updateStudentProfile() {
    const name = document.getElementById('student-name')?.value;
    if (name && currentUser) {
        currentUser.name = name;
        document.getElementById('student-info').textContent = `${name} · Grade ${currentUser.grade}`;
    }
    showToast('Profile updated');
}

// Get student settings content
function getStudentSettingsContent() {
    return `
        <h3>Customize</h3>
        <div class="card">
            <h4>Theme</h4>
            <select onchange="changeStudentTheme(this.value)">
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="blue">Blue</option>
            </select>
        </div>
        <div class="card">
            <h4>Notifications</h4>
            <div class="toggle-switch">
                <span>Push Notifications</span>
                <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider"></span>
                </label>
            </div>
        </div>
    `;
}

// Change student theme
function changeStudentTheme(theme) {
    document.body.className = theme === 'light' ? '' : `theme-${theme}`;
    showToast(`Theme: ${theme}`);
}

// Show student profile
function showStudentProfile() {
    showToast('Student profile');
}

// Make functions globally available
window.switchStudentTab = switchStudentTab;
window.setStudentReminder = setStudentReminder;
window.deleteReminder = deleteReminder;
window.updateStudentProfile = updateStudentProfile;
window.changeStudentTheme = changeStudentTheme;
window.showStudentProfile = showStudentProfile;
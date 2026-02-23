// ==================== UTILITY FUNCTIONS ====================

// Show toast notification
function showToast(msg, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Hide all main sections
function hideAll() {
    const sections = [
        'landing-page', 'admin-login', 'teacher-login', 'parent-login', 'student-login', 'super-login',
        'admin-signup', 'teacher-signup', 'parent-signup', 'student-signup',
        'admin-dashboard', 'teacher-dashboard', 'parent-dashboard', 'student-dashboard', 'super-dashboard'
    ];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = 'none';
    });
}

// Show landing page
function showLanding() {
    hideAll();
    document.getElementById('landing-page').style.display = 'block';
    document.getElementById('chat-widget').style.display = 'none';
    document.getElementById('chat-toggle').style.display = 'none';
    closeAllModals();
}

// Show login page
function showLogin(role) {
    hideAll();
    document.getElementById(`${role}-login`).style.display = 'block';
}

// Show signup page
function showSignup(role) {
    hideAll();
    document.getElementById(`${role}-signup`).style.display = 'block';
}

// Toggle sidebar on mobile
function toggleSidebar(id) {
    document.getElementById(id).classList.toggle('active');
}

// Close all modals
function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.style.display = 'none');
}

// Open modal
function openModal(id) {
    closeAllModals();
    document.getElementById(id).style.display = 'flex';
}

// Close modal
function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

// Format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Calculate grade based on score and system
function calculateGrade(score, system = '844') {
    if (system === '844') {
        if (score >= 80) return { grade: 'A', points: 12, remark: 'Excellent' };
        if (score >= 75) return { grade: 'A-', points: 11, remark: 'Very Good' };
        if (score >= 70) return { grade: 'B+', points: 10, remark: 'Good' };
        if (score >= 65) return { grade: 'B', points: 9, remark: 'Above Average' };
        if (score >= 60) return { grade: 'B-', points: 8, remark: 'Average' };
        if (score >= 55) return { grade: 'C+', points: 7, remark: 'Below Average' };
        if (score >= 50) return { grade: 'C', points: 6, remark: 'Fair' };
        if (score >= 45) return { grade: 'C-', points: 5, remark: 'Poor' };
        if (score >= 40) return { grade: 'D+', points: 4, remark: 'Very Poor' };
        return { grade: 'E', points: 0, remark: 'Fail' };
    } else if (system === 'cbc') {
        if (score >= 80) return { grade: 'Exceeds Expectations', remark: 'Outstanding' };
        if (score >= 60) return { grade: 'Meets Expectations', remark: 'Good' };
        if (score >= 40) return { grade: 'Approaching Expectations', remark: 'Fair' };
        return { grade: 'Below Expectations', remark: 'Needs Improvement' };
    }
    return { grade: score >= 50 ? 'Pass' : 'Fail', remark: '' };
}

// Education tips
const educationTips = [
    "Regular communication with teachers improves student performance by 40%.",
    "Students who study 30 minutes daily score 20% higher on average.",
    "The 8-4-4 system emphasizes exams while CBC focuses on competencies.",
    "Attendance below 80% significantly impacts academic performance.",
    "Parental involvement increases student motivation by 50%.",
    "Setting a regular study schedule improves time management.",
    "AI-powered study sessions can improve retention by 35%.",
    "Fee payment deadlines: Term 1 - April 15, Term 2 - August 15, Term 3 - December 15."
];

// Update active menu item
function updateActiveMenu(sidebarId, activeTab) {
    const sidebar = document.getElementById(sidebarId);
    if (!sidebar) return;
    sidebar.querySelectorAll('.menu-item').forEach(item => item.classList.remove('active'));
    const activeItem = Array.from(sidebar.querySelectorAll('.menu-item')).find(item => item.getAttribute('onclick')?.includes(activeTab));
    if (activeItem) activeItem.classList.add('active');
}

// Destroy all charts
let activeCharts = [];
function destroyCharts() {
    activeCharts.forEach(chart => chart.destroy());
    activeCharts = [];
}

// Global variables
let demoMode = true;
let currentUser = null;
let currentSchool = null;
let currentChildren = [];
let activeChildId = null;

// Make functions globally available
window.showToast = showToast;
window.hideAll = hideAll;
window.showLanding = showLanding;
window.showLogin = showLogin;
window.showSignup = showSignup;
window.toggleSidebar = toggleSidebar;
window.closeAllModals = closeAllModals;
window.openModal = openModal;
window.closeModal = closeModal;
window.calculateGrade = calculateGrade;
window.educationTips = educationTips;
window.updateActiveMenu = updateActiveMenu;
window.destroyCharts = destroyCharts;
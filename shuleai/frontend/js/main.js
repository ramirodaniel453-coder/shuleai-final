// ==================== MAIN INITIALIZATION ====================

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeLandingPage();
    initializeLoginPages();
    initializeSignupPages();
    initializeDashboards();
    initializeModals();
    initializeChat();
    initializeParentPopup();
    
    // Show landing page
    showLanding();
});

// Initialize landing page
function initializeLandingPage() {
    const landingPage = document.getElementById('landing-page');
    if (!landingPage) return;
    
    landingPage.innerHTML = `
        <div class="landing-container">
            <header class="landing-header">
                <div class="landing-logo">
                    <i class="fas fa-graduation-cap"></i>
                    <h1>Shule<span class="ai">AI</span></h1>
                    <p class="landing-tagline">Complete School Intelligence System</p>
                </div>
            </header>
            <div class="hero-card">
                <h2>Welcome to the Future of Education</h2>
                <p class="hero-description">An integrated platform where administrators supervise, teachers teach effectively, parents stay informed, and students learn with AI-powered assistance.</p>
                <div class="role-grid">
                    <div class="role-card admin" onclick="showLogin('admin')">
                        <i class="fas fa-user-shield"></i>
                        <h4>Administrator</h4>
                        <p>Full School Oversight</p>
                    </div>
                    <div class="role-card teacher" onclick="showLogin('teacher')">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <h4>Teacher</h4>
                        <p>Teach & Assess</p>
                    </div>
                    <div class="role-card parent" onclick="showLogin('parent')">
                        <i class="fas fa-user-friends"></i>
                        <h4>Parent</h4>
                        <p>Monitor & Guide</p>
                    </div>
                    <div class="role-card student" onclick="showLogin('student')">
                        <i class="fas fa-user-graduate"></i>
                        <h4>Student</h4>
                        <p>Learn with AI</p>
                    </div>
                    <div class="role-card super" onclick="showLogin('super')" id="super-admin-link" style="display: none;">
                        <i class="fas fa-crown"></i>
                        <h4>Super Admin</h4>
                        <p>Platform Control</p>
                    </div>
                </div>
            </div>
            <div class="landing-footer" ondblclick="document.getElementById('super-admin-link').style.display='block'; showToast('Super admin unlocked','info')">
                Double-tap for advanced options
            </div>
        </div>
    `;
}

// Initialize login pages
function initializeLoginPages() {
    // Admin login
    const adminLogin = document.getElementById('admin-login');
    if (adminLogin) {
        adminLogin.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-shield" style="color: #ef4444;"></i>
                    <h1>Administrator Portal</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-lock" style="color: #ef4444;"></i> Admin Login</h2>
                        <form onsubmit="handleLogin(event, 'admin')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Code</label>
                                <input type="text" id="admin-school" value="GRN001" placeholder="Enter school code">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-id-card"></i> Admin ID</label>
                                <input type="text" id="admin-id" value="ADMIN001" placeholder="Enter admin ID">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="admin-pass" value="admin123" placeholder="Enter password">
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Don't have an account? <a href="#" onclick="showSignup('admin')">Sign up</a></p>
                        <div class="demo-credentials">
                            <h4>Demo Credentials</h4>
                            <p><strong>School:</strong> GRN001 | <strong>ID:</strong> ADMIN001 | <strong>Password:</strong> admin123</p>
                        </div>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Admin Capabilities</h3>
                        <p>Monitor all students & teachers</p>
                        <p>View comprehensive analytics</p>
                        <p>Track fee collection</p>
                        <p>Send messages & alerts</p>
                        <p>Receive audit logs</p>
                        <p>Handle bullying reports</p>
                        <p style="color: #ef4444; margin-top: 1rem;"><i class="fas fa-info-circle"></i> Admin supervises, does NOT teach</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Teacher login
    const teacherLogin = document.getElementById('teacher-login');
    if (teacherLogin) {
        teacherLogin.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-chalkboard-teacher" style="color: #3b82f6;"></i>
                    <h1>Teacher Portal</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-lock" style="color: #3b82f6;"></i> Teacher Login</h2>
                        <form onsubmit="handleLogin(event, 'teacher')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Code</label>
                                <input type="text" id="teacher-school" value="GRN001">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-id-card"></i> Teacher ID</label>
                                <input type="text" id="teacher-id" value="TCH001">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="teacher-pass" value="teacher123">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-book"></i> Subject</label>
                                <select id="teacher-subject">
                                    <option>Mathematics</option>
                                    <option>Science</option>
                                    <option>English</option>
                                    <option>History</option>
                                </select>
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Don't have an account? <a href="#" onclick="showSignup('teacher')">Sign up</a></p>
                        <div class="demo-credentials">
                            <h4>Demo Credentials</h4>
                            <p><strong>School:</strong> GRN001 | <strong>ID:</strong> TCH001 | <strong>Password:</strong> teacher123</p>
                        </div>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Teacher Capabilities</h3>
                        <p>Enter marks with auto-grade calculation</p>
                        <p>Take attendance with alerts</p>
                        <p>Add comments & feedback</p>
                        <p>View class & subject analytics</p>
                        <p>Identify struggling students</p>
                        <p>Manage assignments</p>
                        <p>Set reminders & timetable</p>
                        <p>Upload & export data</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Parent login
    const parentLogin = document.getElementById('parent-login');
    if (parentLogin) {
        parentLogin.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-friends" style="color: #eab308;"></i>
                    <h1>Parent Portal</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-lock" style="color: #eab308;"></i> Parent Login</h2>
                        <form onsubmit="handleLogin(event, 'parent')">
                            <div class="form-group">
                                <label><i class="fas fa-id-card"></i> Parent ID</label>
                                <input type="text" id="parent-id" value="PAR001">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="parent-pass" value="parent123">
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Don't have an account? <a href="#" onclick="showSignup('parent')">Sign up</a></p>
                        <div class="demo-credentials">
                            <h4>Demo Credentials</h4>
                            <p><strong>ID:</strong> PAR001 | <strong>Password:</strong> parent123</p>
                            <p><small>Access to multiple children: Emma (Grade 10A) & James (Grade 8B)</small></p>
                        </div>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Parent Capabilities</h3>
                        <p>Track multiple children</p>
                        <p>Real-time progress monitoring</p>
                        <p>View grades & attendance</p>
                        <p>Receive smart alerts</p>
                        <p>Fee statements & history</p>
                        <p>Educational tips & guidance</p>
                        <p>AI recommendations</p>
                        <p>Print/download reports</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Student login
    const studentLogin = document.getElementById('student-login');
    if (studentLogin) {
        studentLogin.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-graduate" style="color: #10b981;"></i>
                    <h1>Student Portal</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-lock" style="color: #10b981;"></i> Student Login</h2>
                        <form onsubmit="handleLogin(event, 'student')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Code</label>
                                <input type="text" id="student-school" value="GRN001">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-qrcode"></i> ELIMUID</label>
                                <input type="text" id="student-id" value="ELIMU-2026-001">
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="student-pass" value="student123">
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-sign-in-alt"></i> Login
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Don't have an account? <a href="#" onclick="showSignup('student')">Sign up</a></p>
                        <div class="demo-credentials">
                            <h4>Demo Credentials</h4>
                            <p><strong>School:</strong> GRN001 | <strong>ELIMUID:</strong> ELIMU-2026-001 | <strong>Password:</strong> student123</p>
                        </div>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Student Capabilities</h3>
                        <p>Access learning materials</p>
                        <p>AI-powered study sessions</p>
                        <p>Track grades & progress</p>
                        <p>View attendance</p>
                        <p>Chat with AI tutor</p>
                        <p>Peer interaction (private/group)</p>
                        <p>Receive teacher alerts</p>
                        <p>Customizable dashboard</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Super admin login
    const superLogin = document.getElementById('super-login');
    if (superLogin) {
        superLogin.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-crown" style="color: #8b5cf6;"></i>
                    <h1>Super Admin</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-lock" style="color: #8b5cf6;"></i> Platform Access</h2>
                        <form onsubmit="handleLogin(event, 'super')">
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Secret Key</label>
                                <input type="password" id="super-key" value="SUPER_SECRET_2024">
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-sign-in-alt"></i> Access Platform
                            </button>
                        </form>
                        <div class="demo-credentials">
                            <h4>Access Key</h4>
                            <p><strong>Key:</strong> SUPER_SECRET_2024</p>
                        </div>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Super Admin</h3>
                        <p>Manage multiple schools</p>
                        <p>Control demo data</p>
                        <p>Platform governance</p>
                        <p>System-wide analytics</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize signup pages
function initializeSignupPages() {
    // Admin signup
    const adminSignup = document.getElementById('admin-signup');
    if (adminSignup) {
        adminSignup.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-shield" style="color: #ef4444;"></i>
                    <h1>Admin Signup</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-user-plus" style="color: #ef4444;"></i> Create Admin Account</h2>
                        <form onsubmit="handleSignup(event, 'admin')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Name</label>
                                <input type="text" id="admin-school-name" placeholder="Enter school name" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-code"></i> School Code</label>
                                <input type="text" id="admin-school-code" placeholder="Enter school code" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-user"></i> Admin Name</label>
                                <input type="text" id="admin-name" placeholder="Enter your name" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-envelope"></i> Email</label>
                                <input type="email" id="admin-email" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-phone"></i> Phone</label>
                                <input type="tel" id="admin-phone" placeholder="Enter phone number" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="admin-pass" placeholder="Enter password" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Confirm Password</label>
                                <input type="password" id="admin-confirm-pass" placeholder="Confirm password" required>
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-user-plus"></i> Sign Up
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Already have an account? <a href="#" onclick="showLogin('admin')">Login</a></p>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Admin Benefits</h3>
                        <p>Complete school management</p>
                        <p>Real-time analytics</p>
                        <p>Fee tracking system</p>
                        <p>Communication tools</p>
                        <p>Audit logs</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Teacher signup
    const teacherSignup = document.getElementById('teacher-signup');
    if (teacherSignup) {
        teacherSignup.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-chalkboard-teacher" style="color: #3b82f6;"></i>
                    <h1>Teacher Signup</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-user-plus" style="color: #3b82f6;"></i> Create Teacher Account</h2>
                        <form onsubmit="handleSignup(event, 'teacher')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Code</label>
                                <input type="text" id="teacher-school-code" placeholder="Enter school code" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-user"></i> Teacher Name</label>
                                <input type="text" id="teacher-name" placeholder="Enter your name" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-id-card"></i> Teacher ID</label>
                                <input type="text" id="teacher-id" placeholder="Enter teacher ID" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-book"></i> Subject</label>
                                <select id="teacher-subject" required>
                                    <option value="">Select Subject</option>
                                    <option>Mathematics</option>
                                    <option>Science</option>
                                    <option>English</option>
                                    <option>History</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-users"></i> Class</label>
                                <input type="text" id="teacher-class" placeholder="e.g., 10A" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-envelope"></i> Email</label>
                                <input type="email" id="teacher-email" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-phone"></i> Phone</label>
                                <input type="tel" id="teacher-phone" placeholder="Enter phone number" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="teacher-pass" placeholder="Enter password" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Confirm Password</label>
                                <input type="password" id="teacher-confirm-pass" placeholder="Confirm password" required>
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-user-plus"></i> Sign Up
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Already have an account? <a href="#" onclick="showLogin('teacher')">Login</a></p>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Teacher Benefits</h3>
                        <p>Easy mark entry</p>
                        <p>Attendance tracking</p>
                        <p>Student analytics</p>
                        <p>Assignment management</p>
                        <p>Data export tools</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Parent signup
    const parentSignup = document.getElementById('parent-signup');
    if (parentSignup) {
        parentSignup.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-friends" style="color: #eab308;"></i>
                    <h1>Parent Signup</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-user-plus" style="color: #eab308;"></i> Create Parent Account</h2>
                        <form onsubmit="handleSignup(event, 'parent')">
                            <div class="form-group">
                                <label><i class="fas fa-user"></i> Parent Name</label>
                                <input type="text" id="parent-name" placeholder="Enter your name" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-id-card"></i> Parent ID</label>
                                <input type="text" id="parent-id" placeholder="Enter parent ID" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-envelope"></i> Email</label>
                                <input type="email" id="parent-email" placeholder="Enter email" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-phone"></i> Phone</label>
                                <input type="tel" id="parent-phone" placeholder="Enter phone number" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-child"></i> Child IDs (comma separated)</label>
                                <input type="text" id="parent-children" placeholder="e.g., STU001, STU002" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="parent-pass" placeholder="Enter password" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Confirm Password</label>
                                <input type="password" id="parent-confirm-pass" placeholder="Confirm password" required>
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-user-plus"></i> Sign Up
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Already have an account? <a href="#" onclick="showLogin('parent')">Login</a></p>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Parent Benefits</h3>
                        <p>Track multiple children</p>
                        <p>Real-time updates</p>
                        <p>Fee management</p>
                        <p>Educational tips</p>
                        <p>Print reports</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Student signup
    const studentSignup = document.getElementById('student-signup');
    if (studentSignup) {
        studentSignup.innerHTML = `
            <div class="login-container">
                <div class="login-header">
                    <i class="fas fa-user-graduate" style="color: #10b981;"></i>
                    <h1>Student Signup</h1>
                </div>
                <div class="login-box">
                    <div class="login-card">
                        <h2><i class="fas fa-user-plus" style="color: #10b981;"></i> Create Student Account</h2>
                        <form onsubmit="handleSignup(event, 'student')">
                            <div class="form-group">
                                <label><i class="fas fa-school"></i> School Code</label>
                                <input type="text" id="student-school-code" placeholder="Enter school code" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-user"></i> Student Name</label>
                                <input type="text" id="student-name" placeholder="Enter your name" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-qrcode"></i> ELIMUID</label>
                                <input type="text" id="student-elimuid" placeholder="Enter ELIMUID" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-layer-group"></i> Grade</label>
                                <input type="text" id="student-grade" placeholder="e.g., 10A" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-user-friends"></i> Parent ID</label>
                                <input type="text" id="student-parent-id" placeholder="Enter parent ID" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Password</label>
                                <input type="password" id="student-pass" placeholder="Enter password" required>
                            </div>
                            <div class="form-group">
                                <label><i class="fas fa-key"></i> Confirm Password</label>
                                <input type="password" id="student-confirm-pass" placeholder="Confirm password" required>
                            </div>
                            <button type="submit" class="btn-login">
                                <i class="fas fa-user-plus"></i> Sign Up
                            </button>
                        </form>
                        <p style="text-align: center; margin: 1rem 0;">Already have an account? <a href="#" onclick="showLogin('student')">Login</a></p>
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-arrow-left"></i> Back to Home
                        </a>
                    </div>
                    <div class="login-info">
                        <h3>Student Benefits</h3>
                        <p>Learning materials</p>
                        <p>AI study sessions</p>
                        <p>Progress tracking</p>
                        <p>Chat with AI tutor</p>
                        <p>Customizable dashboard</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize dashboards
function initializeDashboards() {
    // Admin dashboard
    const adminDashboard = document.getElementById('admin-dashboard');
    if (adminDashboard) {
        adminDashboard.innerHTML = `
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo">
                        <i class="fas fa-user-shield" style="color: #ef4444;"></i>
                        <div>
                            <h2 id="admin-school-name">Greenwood High</h2>
                            <p class="role-tag">Administrator · <span id="admin-system-info">8-4-4 System</span></p>
                        </div>
                    </div>
                </div>
                <div class="nav-center">
                    <div class="info">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Term 1, 2024</span>
                    </div>
                </div>
                <div class="nav-right">
                    <div class="profile" onclick="showAdminProfile()">
                        <img src="https://ui-avatars.com/api/?name=Admin&background=ef4444&color=fff&size=40" alt="Admin">
                        <div class="profile-info">
                            <span class="profile-name" id="admin-name">Admin</span>
                            <span class="profile-detail">Supervisor</span>
                        </div>
                    </div>
                    <button class="btn-icon" onclick="logout()" style="background: rgba(239,68,68,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                        <i class="fas fa-sign-out-alt" style="color: #ef4444;"></i>
                    </button>
                </div>
            </nav>
            <div class="dashboard-container">
                <aside class="sidebar" id="admin-sidebar">
                    <div class="sidebar-menu" id="admin-menu"></div>
                    <div class="sidebar-footer">
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </div>
                </aside>
                <main class="main-content" id="admin-content"></main>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleSidebar('admin-sidebar')">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }
    
    // Teacher dashboard
    const teacherDashboard = document.getElementById('teacher-dashboard');
    if (teacherDashboard) {
        teacherDashboard.innerHTML = `
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo">
                        <i class="fas fa-chalkboard-teacher" style="color: #3b82f6;"></i>
                        <div>
                            <h2 id="teacher-school-name">Greenwood High</h2>
                            <p class="role-tag" id="teacher-info">John Doe · Mathematics</p>
                        </div>
                    </div>
                </div>
                <div class="nav-center">
                    <div class="info" id="teacher-class-info">
                        <i class="fas fa-users"></i>
                        <span>Grade 10A · 35 Students</span>
                    </div>
                </div>
                <div class="nav-right">
                    <div class="profile" onclick="showTeacherProfile()">
                        <img src="https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=40" alt="Teacher">
                        <div class="profile-info">
                            <span class="profile-name" id="teacher-name">John Doe</span>
                            <span class="profile-detail">Mathematics</span>
                        </div>
                    </div>
                    <button class="btn-icon" onclick="logout()" style="background: rgba(59,130,246,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                        <i class="fas fa-sign-out-alt" style="color: #3b82f6;"></i>
                    </button>
                </div>
            </nav>
            <div class="dashboard-container">
                <aside class="sidebar" id="teacher-sidebar">
                    <div class="sidebar-menu" id="teacher-menu"></div>
                    <div class="sidebar-footer">
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </div>
                </aside>
                <main class="main-content" id="teacher-content"></main>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleSidebar('teacher-sidebar')">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }
    
    // Parent dashboard
    const parentDashboard = document.getElementById('parent-dashboard');
    if (parentDashboard) {
        parentDashboard.innerHTML = `
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo">
                        <i class="fas fa-user-friends" style="color: #eab308;"></i>
                        <div>
                            <h2 id="parent-school-name">Greenwood High</h2>
                            <p class="role-tag" id="parent-name">Parent Portal</p>
                        </div>
                    </div>
                </div>
                <div class="nav-center">
                    <div class="info" id="active-child-info">
                        <i class="fas fa-child"></i>
                        <span>Viewing: <span id="active-child-name">Emma Smith</span></span>
                    </div>
                </div>
                <div class="nav-right">
                    <button class="btn-icon" onclick="showParentPopup()" style="background: rgba(234,179,8,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; margin-right: 0.5rem; cursor: pointer;">
                        <i class="fas fa-info-circle" style="color: #eab308;"></i>
                    </button>
                    <div class="profile" onclick="showParentProfile()">
                        <img src="https://ui-avatars.com/api/?name=Parent&background=eab308&color=333&size=40" alt="Parent">
                        <div class="profile-info">
                            <span class="profile-name">Parent</span>
                            <span class="profile-detail">John Smith</span>
                        </div>
                    </div>
                    <button class="btn-icon" onclick="logout()" style="background: rgba(234,179,8,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                        <i class="fas fa-sign-out-alt" style="color: #eab308;"></i>
                    </button>
                </div>
            </nav>
            <div class="dashboard-container">
                <aside class="sidebar" id="parent-sidebar">
                    <div class="sidebar-menu" id="parent-menu"></div>
                    <div class="sidebar-footer">
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </div>
                </aside>
                <main class="main-content" id="parent-content"></main>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleSidebar('parent-sidebar')">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }
    
    // Student dashboard
    const studentDashboard = document.getElementById('student-dashboard');
    if (studentDashboard) {
        studentDashboard.innerHTML = `
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo">
                        <i class="fas fa-user-graduate" style="color: #10b981;"></i>
                        <div>
                            <h2 id="student-school-name">Greenwood High</h2>
                            <p class="role-tag" id="student-info">Emma Smith · Grade 10A</p>
                        </div>
                    </div>
                </div>
                <div class="nav-center">
                    <div class="info" id="student-achievement">
                        <i class="fas fa-star" style="color: #eab308;"></i>
                        <span>Average: 79%</span>
                    </div>
                </div>
                <div class="nav-right">
                    <button class="btn-icon" onclick="toggleChat()" style="background: rgba(16,185,129,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; margin-right: 0.5rem; cursor: pointer;">
                        <i class="fas fa-comment" style="color: #10b981;"></i>
                    </button>
                    <div class="profile" onclick="showStudentProfile()">
                        <img src="https://ui-avatars.com/api/?name=Emma+Smith&background=10b981&color=fff&size=40" alt="Student">
                        <div class="profile-info">
                            <span class="profile-name">Emma</span>
                            <span class="profile-detail">Student</span>
                        </div>
                    </div>
                    <button class="btn-icon" onclick="logout()" style="background: rgba(16,185,129,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                        <i class="fas fa-sign-out-alt" style="color: #10b981;"></i>
                    </button>
                </div>
            </nav>
            <div class="dashboard-container">
                <aside class="sidebar" id="student-sidebar">
                    <div class="sidebar-menu" id="student-menu"></div>
                    <div class="sidebar-footer">
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </div>
                </aside>
                <main class="main-content" id="student-content"></main>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleSidebar('student-sidebar')">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }
    
    // Super admin dashboard
    const superDashboard = document.getElementById('super-dashboard');
    if (superDashboard) {
        superDashboard.innerHTML = `
            <nav class="dashboard-nav">
                <div class="nav-left">
                    <div class="logo">
                        <i class="fas fa-crown" style="color: #8b5cf6;"></i>
                        <div>
                            <h2>Super Admin</h2>
                            <p class="role-tag">Platform Governance</p>
                        </div>
                    </div>
                </div>
                <div class="nav-right">
                    <button class="btn-icon" onclick="logout()" style="background: rgba(139,92,246,0.1); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;">
                        <i class="fas fa-sign-out-alt" style="color: #8b5cf6;"></i>
                    </button>
                </div>
            </nav>
            <div class="dashboard-container">
                <aside class="sidebar" id="super-sidebar">
                    <div class="sidebar-menu" id="super-menu"></div>
                    <div class="sidebar-footer">
                        <a class="back-link" onclick="showLanding()">
                            <i class="fas fa-home"></i> Back to Home
                        </a>
                    </div>
                </aside>
                <main class="main-content" id="super-content"></main>
            </div>
            <button class="mobile-menu-toggle" onclick="toggleSidebar('super-sidebar')">
                <i class="fas fa-bars"></i>
            </button>
        `;
    }
}

// Initialize modals
function initializeModals() {
    // Admin profile modal
    const adminProfileModal = document.getElementById('admin-profile-modal');
    if (adminProfileModal) {
        adminProfileModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Admin Profile</h3>
                    <button class="modal-close" onclick="closeModal('admin-profile-modal')">&times;</button>
                </div>
                <div class="modal-body">
                    <div style="text-align: center; margin-bottom: 1.5rem;">
                        <img src="https://ui-avatars.com/api/?name=Admin&size=80&background=ef4444&color=fff" style="border-radius: 50%;">
                        <h4 id="modal-admin-name">Admin</h4>
                        <p>Administrator · Greenwood High</p>
                    </div>
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="admin-profile-name" value="Admin">
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" value="admin@greenwood.edu">
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" value="+254 700 123456">
                    </div>
                    <button class="btn-primary" onclick="updateAdminProfile()">Update Profile</button>
                </div>
            </div>
        `;
    }
}

// Initialize chat
function initializeChat() {
    const chatWidget = document.getElementById('chat-widget');
    if (chatWidget) {
        chatWidget.innerHTML = `
            <div class="chat-header" id="chat-header">
                <span><i class="fas fa-robot"></i> ShuleAI Assistant</span>
                <button onclick="minimizeChat()" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">
                    <i class="fas fa-minus"></i>
                </button>
            </div>
            <div class="chat-tabs">
                <div class="chat-tab active" onclick="switchChatTab('ai')">AI Tutor</div>
                <div class="chat-tab" onclick="switchChatTab('private')">Private</div>
                <div class="chat-tab" onclick="switchChatTab('group')">Group</div>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input-area">
                <input type="text" id="chat-input" placeholder="Type a message...">
                <button onclick="sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;
    }
}

// Initialize parent popup
function initializeParentPopup() {
    const parentPopup = document.getElementById('parent-popup');
    if (parentPopup) {
        parentPopup.innerHTML = `
            <div class="popup-header">
                <h3><i class="fas fa-graduation-cap" style="color: #eab308;"></i> Did You Know?</h3>
                <button onclick="closeParentPopup()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer;">&times;</button>
            </div>
            <div id="popup-content">
                <p id="education-tip">Regular communication with teachers improves student performance by 40%.</p>
            </div>
            <div class="toggle-switch">
                <span>Show these tips</span>
                <label class="switch">
                    <input type="checkbox" id="popup-toggle" checked onchange="toggleParentPopup()">
                    <span class="slider"></span>
                </label>
            </div>
            <button class="btn-primary" onclick="nextTip()" style="margin-top: 1rem;">Next Tip</button>
        `;
    }
}

// Load dashboard based on role
function loadDashboard(role) {
    switch(role) {
        case 'admin':
            loadAdminDashboard();
            break;
        case 'teacher':
            loadTeacherDashboard();
            break;
        case 'parent':
            loadParentDashboard();
            break;
        case 'student':
            loadStudentDashboard();
            break;
        case 'super':
            loadSuperDashboard();
            break;
    }
}

// Make loadDashboard globally available
window.loadDashboard = loadDashboard;
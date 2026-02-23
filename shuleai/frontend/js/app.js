// ==================== MAIN APPLICATION CONTROLLER ====================

// Application state
const App = {
    initialized: false,
    currentRole: null,
    currentUser: null,
    currentSchool: null,
    currentChildren: [],
    activeChildId: null,
    demoMode: true,
    chatVisible: false,
    parentPopupEnabled: true,
    currentTipIndex: 0,
    activeCharts: [],
    
    // Initialize the application
    init: function() {
        if (this.initialized) return;
        
        console.log('ShuleAI Application Initializing...');
        
        // Load all page templates
        this.loadTemplates();
        
        // Initialize event listeners
        this.initEventListeners();
        
        // Show landing page
        this.showLanding();
        
        this.initialized = true;
        console.log('ShuleAI Application Ready');
    },
    
    // Load HTML templates
    loadTemplates: function() {
        // Templates are already in index.html
        // This method ensures they're properly set up
        this.initLandingPage();
        this.initLoginPages();
        this.initSignupPages();
        this.initDashboards();
        this.initModals();
        this.initChat();
        this.initParentPopup();
    },
    
    // Initialize landing page
    initLandingPage: function() {
        const landingPage = document.getElementById('landing-page');
        if (!landingPage || landingPage.children.length > 0) return;
        
        landingPage.innerHTML = Templates.landing;
    },
    
    // Initialize login pages
    initLoginPages: function() {
        const pages = ['admin', 'teacher', 'parent', 'student', 'super'];
        pages.forEach(role => {
            const element = document.getElementById(`${role}-login`);
            if (element && element.children.length === 0) {
                element.innerHTML = Templates[`${role}Login`];
            }
        });
    },
    
    // Initialize signup pages
    initSignupPages: function() {
        const pages = ['admin', 'teacher', 'parent', 'student'];
        pages.forEach(role => {
            const element = document.getElementById(`${role}-signup`);
            if (element && element.children.length === 0) {
                element.innerHTML = Templates[`${role}Signup`];
            }
        });
    },
    
    // Initialize dashboards
    initDashboards: function() {
        const dashboards = ['admin', 'teacher', 'parent', 'student', 'super'];
        dashboards.forEach(role => {
            const element = document.getElementById(`${role}-dashboard`);
            if (element && element.children.length === 0) {
                element.innerHTML = Templates[`${role}Dashboard`];
            }
        });
    },
    
    // Initialize modals
    initModals: function() {
        const modal = document.getElementById('admin-profile-modal');
        if (modal && modal.children.length === 0) {
            modal.innerHTML = Templates.adminProfileModal;
        }
    },
    
    // Initialize chat
    initChat: function() {
        const chat = document.getElementById('chat-widget');
        if (chat && chat.children.length === 0) {
            chat.innerHTML = Templates.chatWidget;
        }
        
        const toggle = document.getElementById('chat-toggle');
        if (toggle) {
            toggle.onclick = () => this.toggleChat();
        }
    },
    
    // Initialize parent popup
    initParentPopup: function() {
        const popup = document.getElementById('parent-popup');
        if (popup && popup.children.length === 0) {
            popup.innerHTML = Templates.parentPopup;
            
            // Add event listeners
            const toggle = document.getElementById('popup-toggle');
            if (toggle) {
                toggle.onchange = () => this.toggleParentPopup();
            }
        }
    },
    
    // Initialize event listeners
    initEventListeners: function() {
        // Handle window resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Handle before unload
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));
        
        // Handle online/offline
        window.addEventListener('online', () => this.showToast('Back online', 'success'));
        window.addEventListener('offline', () => this.showToast('You are offline', 'warning'));
    },
    
    // Handle window resize
    handleResize: function() {
        const chatWidget = document.getElementById('chat-widget');
        if (!chatWidget) return;
        
        if (window.innerWidth <= 768) {
            chatWidget.classList.remove('draggable');
            chatWidget.style.left = 'auto';
            chatWidget.style.right = 'auto';
            chatWidget.style.top = 'auto';
            chatWidget.style.bottom = '0';
        } else {
            chatWidget.classList.add('draggable');
            this.initDraggableChat();
        }
    },
    
    // Handle before unload
    handleBeforeUnload: function() {
        // Clean up any active connections
        if (this.activeCharts.length > 0) {
            this.destroyCharts();
        }
    },
    
    // Show landing page
    showLanding: function() {
        hideAll();
        document.getElementById('landing-page').style.display = 'block';
        document.getElementById('chat-widget').style.display = 'none';
        document.getElementById('chat-toggle').style.display = 'none';
        closeAllModals();
        this.currentRole = null;
    },
    
    // Show login page
    showLogin: function(role) {
        hideAll();
        document.getElementById(`${role}-login`).style.display = 'block';
        this.currentRole = role;
    },
    
    // Show signup page
    showSignup: function(role) {
        hideAll();
        document.getElementById(`${role}-signup`).style.display = 'block';
        this.currentRole = role;
    },
    
    // Handle login
    handleLogin: async function(e, role) {
        e.preventDefault();
        
        const credentials = this.getLoginCredentials(role);
        
        // For demo mode, use mock authentication
        if (this.demoMode) {
            if (this.validateDemoCredentials(role, credentials)) {
                this.setDemoUser(role, credentials);
                this.showToast('Login successful!', 'success');
                
                setTimeout(() => {
                    hideAll();
                    document.getElementById(`${role}-dashboard`).style.display = 'block';
                    this.loadDashboard(role);
                    
                    if (role === 'student') {
                        document.getElementById('chat-toggle').style.display = 'flex';
                        this.initDraggableChat();
                    }
                }, 500);
            } else {
                this.showToast('Invalid credentials', 'error');
            }
            return;
        }
        
        // Real API authentication
        try {
            const response = await fetch(authAPI[`${role}Login`], {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });
            
            if (response.ok) {
                const data = await response.json();
                setAuthToken(data.token, data.refreshToken);
                this.currentUser = data.user;
                this.currentSchool = data.school;
                
                this.showToast('Login successful!', 'success');
                setTimeout(() => {
                    hideAll();
                    document.getElementById(`${role}-dashboard`).style.display = 'block';
                    this.loadDashboard(role);
                }, 500);
            } else {
                this.showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            this.showToast('Login failed: ' + error.message, 'error');
        }
    },
    
    // Get login credentials from form
    getLoginCredentials: function(role) {
        switch(role) {
            case 'admin':
                return {
                    schoolCode: document.getElementById('admin-school')?.value,
                    adminId: document.getElementById('admin-id')?.value,
                    password: document.getElementById('admin-pass')?.value
                };
            case 'teacher':
                return {
                    schoolCode: document.getElementById('teacher-school')?.value,
                    teacherId: document.getElementById('teacher-id')?.value,
                    password: document.getElementById('teacher-pass')?.value,
                    subject: document.getElementById('teacher-subject')?.value
                };
            case 'parent':
                return {
                    parentId: document.getElementById('parent-id')?.value,
                    password: document.getElementById('parent-pass')?.value
                };
            case 'student':
                return {
                    schoolCode: document.getElementById('student-school')?.value,
                    elimuid: document.getElementById('student-id')?.value,
                    password: document.getElementById('student-pass')?.value
                };
            case 'super':
                return {
                    key: document.getElementById('super-key')?.value
                };
            default:
                return {};
        }
    },
    
    // Validate demo credentials
    validateDemoCredentials: function(role, credentials) {
        const demos = {
            admin: credentials.adminId === 'ADMIN001' && 
                    credentials.password === 'admin123' && 
                    credentials.schoolCode === 'GRN001',
            teacher: credentials.teacherId === 'TCH001' && 
                     credentials.password === 'teacher123' && 
                     credentials.schoolCode === 'GRN001',
            parent: credentials.parentId === 'PAR001' && 
                    credentials.password === 'parent123',
            student: credentials.elimuid === 'ELIMU-2026-001' && 
                     credentials.password === 'student123' && 
                     credentials.schoolCode === 'GRN001',
            super: credentials.key === 'SUPER_SECRET_2024'
        };
        return demos[role] || false;
    },
    
    // Set demo user data
    setDemoUser: function(role, credentials) {
        const demoData = {
            admin: {
                id: 'ADMIN001',
                schoolCode: 'GRN001',
                name: 'Admin',
                role: 'admin',
                email: 'admin@greenwood.edu',
                phone: '+254700123456'
            },
            teacher: {
                id: 'TCH001',
                schoolCode: 'GRN001',
                name: 'John Doe',
                subject: 'Mathematics',
                class: '10A',
                email: 'j.doe@greenwood.edu',
                phone: '+254700123456'
            },
            parent: {
                id: 'PAR001',
                name: 'John Smith',
                email: 'john.smith@email.com',
                phone: '+254711223344',
                children: ['STU001', 'STU002']
            },
            student: {
                id: 'STU001',
                elimuid: 'ELIMU-2026-001',
                schoolCode: 'GRN001',
                name: 'Emma Smith',
                grade: '10A',
                parentId: 'PAR001',
                status: 'average',
                preferences: { theme: 'light', notifications: true }
            },
            super: {
                id: 'SUPER',
                role: 'super',
                name: 'Super Admin'
            }
        };
        
        this.currentUser = demoData[role];
        this.currentSchool = { 
            id: 'GRN001', 
            name: 'Greenwood High', 
            code: 'GRN001', 
            system: '844',
            feeStructure: { term1: 45000, term2: 45000, term3: 45000 }
        };
        
        if (role === 'parent') {
            this.currentChildren = [
                { id: 'STU001', name: 'Emma Smith', grade: '10A', elimuid: 'ELIMU-2026-001' },
                { id: 'STU002', name: 'James Smith', grade: '8B', elimuid: 'ELIMU-2026-002' }
            ];
            this.activeChildId = 'STU001';
        }
    },
    
    // Load dashboard based on role
    loadDashboard: function(role) {
        switch(role) {
            case 'admin':
                Admin.loadDashboard();
                break;
            case 'teacher':
                Teacher.loadDashboard();
                break;
            case 'parent':
                Parent.loadDashboard();
                break;
            case 'student':
                Student.loadDashboard();
                break;
            case 'super':
                Super.loadDashboard();
                break;
        }
    },
    
    // Show toast notification
    showToast: function(msg, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = msg;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },
    
    // Toggle chat visibility
    toggleChat: function() {
        this.chatVisible = !this.chatVisible;
        document.getElementById('chat-widget').style.display = this.chatVisible ? 'flex' : 'none';
        if (this.chatVisible) Chat.loadMessages();
    },
    
    // Initialize draggable chat
    initDraggableChat: function() {
        const chatWidget = document.getElementById('chat-widget');
        const chatHeader = document.getElementById('chat-header');
        
        if (!chatWidget || !chatHeader || window.innerWidth <= 768) return;
        
        let isDragging = false;
        let offsetX, offsetY;
        
        chatWidget.classList.add('draggable');
        
        const startDragging = (e) => {
            if (window.innerWidth <= 768) return;
            isDragging = true;
            const rect = chatWidget.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            chatWidget.style.transition = 'none';
        };
        
        const drag = (e) => {
            if (!isDragging || window.innerWidth <= 768) return;
            e.preventDefault();
            
            const x = Math.min(Math.max(e.clientX - offsetX, 0), window.innerWidth - chatWidget.offsetWidth);
            const y = Math.min(Math.max(e.clientY - offsetY, 0), window.innerHeight - chatWidget.offsetHeight);
            
            chatWidget.style.left = x + 'px';
            chatWidget.style.top = y + 'px';
            chatWidget.style.right = 'auto';
            chatWidget.style.bottom = 'auto';
        };
        
        const stopDragging = () => {
            if (window.innerWidth <= 768) return;
            isDragging = false;
            chatWidget.style.transition = '';
        };
        
        chatHeader.addEventListener('mousedown', startDragging);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDragging);
    },
    
    // Destroy all charts
    destroyCharts: function() {
        this.activeCharts.forEach(chart => chart.destroy());
        this.activeCharts = [];
    },
    
    // Logout
    logout: function() {
        clearAuthToken();
        this.showToast('Logged out successfully', 'info');
        this.showLanding();
        document.getElementById('chat-widget').style.display = 'none';
        document.getElementById('chat-toggle').style.display = 'none';
        this.destroyCharts();
        this.currentUser = null;
        this.currentSchool = null;
        this.currentChildren = [];
        this.activeChildId = null;
    }
};

// ==================== TEMPLATES ====================

const Templates = {
    landing: `
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
                    <div class="role-card admin" onclick="App.showLogin('admin')">
                        <i class="fas fa-user-shield"></i>
                        <h4>Administrator</h4>
                        <p>Full School Oversight</p>
                    </div>
                    <div class="role-card teacher" onclick="App.showLogin('teacher')">
                        <i class="fas fa-chalkboard-teacher"></i>
                        <h4>Teacher</h4>
                        <p>Teach & Assess</p>
                    </div>
                    <div class="role-card parent" onclick="App.showLogin('parent')">
                        <i class="fas fa-user-friends"></i>
                        <h4>Parent</h4>
                        <p>Monitor & Guide</p>
                    </div>
                    <div class="role-card student" onclick="App.showLogin('student')">
                        <i class="fas fa-user-graduate"></i>
                        <h4>Student</h4>
                        <p>Learn with AI</p>
                    </div>
                    <div class="role-card super" onclick="App.showLogin('super')" id="super-admin-link" style="display: none;">
                        <i class="fas fa-crown"></i>
                        <h4>Super Admin</h4>
                        <p>Platform Control</p>
                    </div>
                </div>
            </div>
            <div class="landing-footer" ondblclick="document.getElementById('super-admin-link').style.display='block'; App.showToast('Super admin unlocked','info')">
                Double-tap for advanced options
            </div>
        </div>
    `,
    
    adminLogin: `
        <div class="login-container">
            <div class="login-header">
                <i class="fas fa-user-shield" style="color: #ef4444;"></i>
                <h1>Administrator Portal</h1>
            </div>
            <div class="login-box">
                <div class="login-card">
                    <h2><i class="fas fa-lock" style="color: #ef4444;"></i> Admin Login</h2>
                    <form onsubmit="App.handleLogin(event, 'admin')">
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
                    <p style="text-align: center; margin: 1rem 0;">Don't have an account? <a href="#" onclick="App.showSignup('admin')">Sign up</a></p>
                    <div class="demo-credentials">
                        <h4>Demo Credentials</h4>
                        <p><strong>School:</strong> GRN001 | <strong>ID:</strong> ADMIN001 | <strong>Password:</strong> admin123</p>
                    </div>
                    <a class="back-link" onclick="App.showLanding()">
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
    `,
    
    // Add other templates as needed (teacherLogin, parentLogin, etc.)
};

// ==================== MODULES ====================

// Admin module
const Admin = {
    loadDashboard: function() {
        if (App.currentSchool) {
            document.getElementById('admin-school-name').textContent = App.currentSchool.name;
            document.getElementById('admin-system-info').textContent = 
                App.currentSchool.system === '844' ? '8-4-4 System' : 'CBC System';
        }
        this.renderMenu();
        this.switchTab('dashboard');
    },
    
    renderMenu: function() {
        // Menu rendering logic
    },
    
    switchTab: function(tab) {
        // Tab switching logic
    }
};

// Teacher module
const Teacher = {
    loadDashboard: function() {
        // Teacher dashboard logic
    }
};

// Parent module
const Parent = {
    loadDashboard: function() {
        // Parent dashboard logic
    }
};

// Student module
const Student = {
    loadDashboard: function() {
        // Student dashboard logic
    }
};

// Super module
const Super = {
    loadDashboard: function() {
        // Super admin logic
    }
};

// Chat module
const Chat = {
    messages: {
        ai: [{ id: 1, sender: 'AI', text: 'Hi! I\'m your AI tutor. How can I help you today?', time: '10:00 AM', avatar: 'AI' }],
        private: [],
        group: []
    },
    
    loadMessages: function() {
        // Load chat messages
    }
};

// ==================== INITIALIZE APPLICATION ====================

// Create global App instance
window.App = App;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
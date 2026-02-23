// ==================== AUTHENTICATION FUNCTIONS ====================

// Store auth token
let authToken = localStorage.getItem('shuleai_token') || null;
let refreshToken = localStorage.getItem('shuleai_refresh_token') || null;

// Set auth token
function setAuthToken(token, refresh) {
    authToken = token;
    refreshToken = refresh;
    localStorage.setItem('shuleai_token', token);
    localStorage.setItem('shuleai_refresh_token', refresh);
}

// Clear auth token
function clearAuthToken() {
    authToken = null;
    refreshToken = null;
    localStorage.removeItem('shuleai_token');
    localStorage.removeItem('shuleai_refresh_token');
}

// Get auth headers for API requests
function getAuthHeaders() {
    return {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
    };
}

// Handle login for all roles
async function handleLogin(e, role) {
    e.preventDefault();
    
    let endpoint, credentials = {};
    
    switch(role) {
        case 'admin':
            endpoint = authAPI.adminLogin;
            credentials = {
                schoolCode: document.getElementById('admin-school').value,
                adminId: document.getElementById('admin-id').value,
                password: document.getElementById('admin-pass').value
            };
            break;
        case 'teacher':
            endpoint = authAPI.teacherLogin;
            credentials = {
                schoolCode: document.getElementById('teacher-school').value,
                teacherId: document.getElementById('teacher-id').value,
                password: document.getElementById('teacher-pass').value,
                subject: document.getElementById('teacher-subject').value
            };
            break;
        case 'parent':
            endpoint = authAPI.parentLogin;
            credentials = {
                parentId: document.getElementById('parent-id').value,
                password: document.getElementById('parent-pass').value
            };
            break;
        case 'student':
            endpoint = authAPI.studentLogin;
            credentials = {
                schoolCode: document.getElementById('student-school').value,
                elimuid: document.getElementById('student-id').value,
                password: document.getElementById('student-pass').value
            };
            break;
        case 'super':
            endpoint = authAPI.superLogin;
            credentials = {
                key: document.getElementById('super-key').value
            };
            break;
    }
    
    try {
        // In a real app, this would be an actual API call
        // const response = await fetch(endpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(credentials)
        // });
        // const data = await response.json();
        
        // For demo purposes, simulate successful login
        if (validateCredentials(role, credentials)) {
            // setAuthToken(data.token, data.refreshToken);
            
            // Set current user based on role
            setCurrentUser(role, credentials);
            
            showToast('Login successful!', 'success');
            
            setTimeout(() => {
                hideAll();
                document.getElementById(`${role}-dashboard`).style.display = 'block';
                loadDashboard(role);
                
                if (role === 'student') {
                    document.getElementById('chat-toggle').style.display = 'flex';
                    initDraggableChat();
                } else {
                    document.getElementById('chat-toggle').style.display = 'none';
                    document.getElementById('chat-widget').style.display = 'none';
                }
            }, 500);
        } else {
            showToast('Invalid credentials', 'error');
        }
    } catch (error) {
        showToast('Login failed: ' + error.message, 'error');
    }
}

// Validate credentials (demo mode)
function validateCredentials(role, credentials) {
    switch(role) {
        case 'admin':
            return credentials.adminId === 'ADMIN001' && 
                   credentials.password === 'admin123' && 
                   credentials.schoolCode === 'GRN001';
        case 'teacher':
            return credentials.teacherId === 'TCH001' && 
                   credentials.password === 'teacher123' && 
                   credentials.schoolCode === 'GRN001';
        case 'parent':
            return credentials.parentId === 'PAR001' && 
                   credentials.password === 'parent123';
        case 'student':
            return credentials.elimuid === 'ELIMU-2026-001' && 
                   credentials.password === 'student123' && 
                   credentials.schoolCode === 'GRN001';
        case 'super':
            return credentials.key === 'SUPER_SECRET_2024';
        default:
            return false;
    }
}

// Set current user based on role
function setCurrentUser(role, credentials) {
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
    
    currentUser = demoData[role];
    
    if (role === 'parent') {
        currentChildren = demoData.student ? [demoData.student] : [];
        if (currentChildren.length > 0) {
            activeChildId = currentChildren[0].id;
            currentSchool = { id: 'GRN001', name: 'Greenwood High', code: 'GRN001', system: '844' };
        }
    } else if (role === 'student') {
        currentSchool = { id: 'GRN001', name: 'Greenwood High', code: 'GRN001', system: '844' };
    } else if (role === 'admin' || role === 'teacher') {
        currentSchool = { id: 'GRN001', name: 'Greenwood High', code: 'GRN001', system: '844' };
    }
}

// Handle signup
async function handleSignup(e, role) {
    e.preventDefault();
    
    let endpoint, userData = {};
    
    switch(role) {
        case 'admin':
            endpoint = authAPI.adminSignup;
            userData = {
                schoolName: document.getElementById('admin-school-name').value,
                schoolCode: document.getElementById('admin-school-code').value,
                adminName: document.getElementById('admin-name').value,
                adminEmail: document.getElementById('admin-email').value,
                adminPhone: document.getElementById('admin-phone').value,
                password: document.getElementById('admin-pass').value,
                confirmPassword: document.getElementById('admin-confirm-pass').value
            };
            break;
        case 'teacher':
            endpoint = authAPI.teacherSignup;
            userData = {
                schoolCode: document.getElementById('teacher-school-code').value,
                teacherName: document.getElementById('teacher-name').value,
                teacherId: document.getElementById('teacher-id').value,
                subject: document.getElementById('teacher-subject').value,
                class: document.getElementById('teacher-class').value,
                email: document.getElementById('teacher-email').value,
                phone: document.getElementById('teacher-phone').value,
                password: document.getElementById('teacher-pass').value,
                confirmPassword: document.getElementById('teacher-confirm-pass').value
            };
            break;
        case 'parent':
            endpoint = authAPI.parentSignup;
            userData = {
                parentName: document.getElementById('parent-name').value,
                parentId: document.getElementById('parent-id').value,
                email: document.getElementById('parent-email').value,
                phone: document.getElementById('parent-phone').value,
                childIds: document.getElementById('parent-children').value.split(','),
                password: document.getElementById('parent-pass').value,
                confirmPassword: document.getElementById('parent-confirm-pass').value
            };
            break;
        case 'student':
            endpoint = authAPI.studentSignup;
            userData = {
                schoolCode: document.getElementById('student-school-code').value,
                studentName: document.getElementById('student-name').value,
                elimuid: document.getElementById('student-elimuid').value,
                grade: document.getElementById('student-grade').value,
                parentId: document.getElementById('student-parent-id').value,
                password: document.getElementById('student-pass').value,
                confirmPassword: document.getElementById('student-confirm-pass').value
            };
            break;
    }
    
    // Validate passwords match
    if (userData.password !== userData.confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    try {
        // In a real app, this would be an actual API call
        // const response = await fetch(endpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(userData)
        // });
        // const data = await response.json();
        
        showToast('Signup successful! Please login.', 'success');
        setTimeout(() => showLogin(role), 2000);
    } catch (error) {
        showToast('Signup failed: ' + error.message, 'error');
    }
}

// Logout
async function logout() {
    try {
        // In a real app, this would call the logout endpoint
        // await fetch(authAPI.logout, {
        //     method: 'POST',
        //     headers: getAuthHeaders()
        // });
        
        clearAuthToken();
        showToast('Logged out successfully', 'info');
        showLanding();
        document.getElementById('chat-widget').style.display = 'none';
        document.getElementById('chat-toggle').style.display = 'none';
        destroyCharts();
        currentUser = null;
        currentSchool = null;
        currentChildren = [];
        activeChildId = null;
    } catch (error) {
        showToast('Logout failed: ' + error.message, 'error');
    }
}

// Refresh token
async function refreshAuthToken() {
    if (!refreshToken) return false;
    
    try {
        const response = await fetch(authAPI.refreshToken, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken })
        });
        
        if (response.ok) {
            const data = await response.json();
            setAuthToken(data.token, data.refreshToken);
            return true;
        }
    } catch (error) {
        console.error('Token refresh failed:', error);
    }
    
    return false;
}

// Check if user is authenticated
function isAuthenticated() {
    return !!authToken;
}

// Make functions globally available
window.handleLogin = handleLogin;
window.handleSignup = handleSignup;
window.logout = logout;
window.refreshAuthToken = refreshAuthToken;
window.isAuthenticated = isAuthenticated;
window.getAuthHeaders = getAuthHeaders;
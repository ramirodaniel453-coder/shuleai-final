// ==================== API ENDPOINTS ====================

const API_BASE_URL = 'http://localhost:3000/api'; // Change this to your backend URL

// ==================== AUTH ENDPOINTS ====================

const authAPI = {
    // Admin login
    adminLogin: `${API_BASE_URL}/auth/admin/login`,
    
    // Teacher login
    teacherLogin: `${API_BASE_URL}/auth/teacher/login`,
    
    // Parent login
    parentLogin: `${API_BASE_URL}/auth/parent/login`,
    
    // Student login
    studentLogin: `${API_BASE_URL}/auth/student/login`,
    
    // Super admin login
    superLogin: `${API_BASE_URL}/auth/super/login`,
    
    // Admin signup
    adminSignup: `${API_BASE_URL}/auth/admin/signup`,
    
    // Teacher signup
    teacherSignup: `${API_BASE_URL}/auth/teacher/signup`,
    
    // Parent signup
    parentSignup: `${API_BASE_URL}/auth/parent/signup`,
    
    // Student signup
    studentSignup: `${API_BASE_URL}/auth/student/signup`,
    
    // Logout
    logout: `${API_BASE_URL}/auth/logout`,
    
    // Refresh token
    refreshToken: `${API_BASE_URL}/auth/refresh`,
    
    // Verify token
    verifyToken: `${API_BASE_URL}/auth/verify`
};

// ==================== ADMIN ENDPOINTS ====================

const adminAPI = {
    // Dashboard
    getDashboard: `${API_BASE_URL}/admin/dashboard`,
    
    // School management
    getSchool: `${API_BASE_URL}/admin/school`,
    updateSchool: `${API_BASE_URL}/admin/school`,
    
    // Student management
    getAllStudents: `${API_BASE_URL}/admin/students`,
    getStudent: (id) => `${API_BASE_URL}/admin/students/${id}`,
    addStudent: `${API_BASE_URL}/admin/students`,
    updateStudent: (id) => `${API_BASE_URL}/admin/students/${id}`,
    deleteStudent: (id) => `${API_BASE_URL}/admin/students/${id}`,
    bulkUploadStudents: `${API_BASE_URL}/admin/students/bulk`,
    
    // Teacher management
    getAllTeachers: `${API_BASE_URL}/admin/teachers`,
    getTeacher: (id) => `${API_BASE_URL}/admin/teachers/${id}`,
    addTeacher: `${API_BASE_URL}/admin/teachers`,
    updateTeacher: (id) => `${API_BASE_URL}/admin/teachers/${id}`,
    deleteTeacher: (id) => `${API_BASE_URL}/admin/teachers/${id}`,
    
    // Class management
    getAllClasses: `${API_BASE_URL}/admin/classes`,
    getClass: (id) => `${API_BASE_URL}/admin/classes/${id}`,
    addClass: `${API_BASE_URL}/admin/classes`,
    updateClass: (id) => `${API_BASE_URL}/admin/classes/${id}`,
    deleteClass: (id) => `${API_BASE_URL}/admin/classes/${id}`,
    
    // Analytics
    getPerformanceAnalytics: `${API_BASE_URL}/admin/analytics/performance`,
    getAttendanceAnalytics: `${API_BASE_URL}/admin/analytics/attendance`,
    getFeeAnalytics: `${API_BASE_URL}/admin/analytics/fees`,
    getTeacherPerformance: `${API_BASE_URL}/admin/analytics/teachers`,
    getSubjectAnalysis: `${API_BASE_URL}/admin/analytics/subjects`,
    getTrendAnalysis: `${API_BASE_URL}/admin/analytics/trends`,
    
    // Fee management
    getAllFees: `${API_BASE_URL}/admin/fees`,
    getFeeByStudent: (id) => `${API_BASE_URL}/admin/fees/student/${id}`,
    updateFee: (id) => `${API_BASE_URL}/admin/fees/${id}`,
    sendFeeReminders: `${API_BASE_URL}/admin/fees/reminders`,
    
    // Communication
    sendMessage: `${API_BASE_URL}/admin/messages`,
    getMessages: `${API_BASE_URL}/admin/messages`,
    sendAlert: `${API_BASE_URL}/admin/alerts`,
    getBullyingReports: `${API_BASE_URL}/admin/bullying-reports`,
    updateBullyingReport: (id) => `${API_BASE_URL}/admin/bullying-reports/${id}`,
    
    // Audit
    getAuditLogs: `${API_BASE_URL}/admin/audit-logs`,
    
    // Settings
    updateSettings: `${API_BASE_URL}/admin/settings`
};

// ==================== TEACHER ENDPOINTS ====================

const teacherAPI = {
    // Dashboard
    getDashboard: `${API_BASE_URL}/teacher/dashboard`,
    
    // Student management
    getMyStudents: `${API_BASE_URL}/teacher/students`,
    getStudent: (id) => `${API_BASE_URL}/teacher/students/${id}`,
    
    // Marks management
    getMarks: `${API_BASE_URL}/teacher/marks`,
    addMarks: `${API_BASE_URL}/teacher/marks`,
    updateMarks: (id) => `${API_BASE_URL}/teacher/marks/${id}`,
    bulkUploadMarks: `${API_BASE_URL}/teacher/marks/bulk`,
    
    // Attendance
    getAttendance: `${API_BASE_URL}/teacher/attendance`,
    markAttendance: `${API_BASE_URL}/teacher/attendance`,
    updateAttendance: (id) => `${API_BASE_URL}/teacher/attendance/${id}`,
    
    // Comments
    getComments: `${API_BASE_URL}/teacher/comments`,
    addComment: `${API_BASE_URL}/teacher/comments`,
    updateComment: (id) => `${API_BASE_URL}/teacher/comments/${id}`,
    
    // Analytics
    getClassAnalytics: `${API_BASE_URL}/teacher/analytics/class`,
    getSubjectAnalytics: `${API_BASE_URL}/teacher/analytics/subject`,
    getStrugglingStudents: `${API_BASE_URL}/teacher/analytics/struggling`,
    
    // Assignments
    getAssignments: `${API_BASE_URL}/teacher/assignments`,
    addAssignment: `${API_BASE_URL}/teacher/assignments`,
    updateAssignment: (id) => `${API_BASE_URL}/teacher/assignments/${id}`,
    deleteAssignment: (id) => `${API_BASE_URL}/teacher/assignments/${id}`,
    
    // Alerts
    sendAlert: `${API_BASE_URL}/teacher/alerts`,
    getAlerts: `${API_BASE_URL}/teacher/alerts`,
    
    // Timetable
    getTimetable: `${API_BASE_URL}/teacher/timetable`,
    
    // Reminders
    getReminders: `${API_BASE_URL}/teacher/reminders`,
    addReminder: `${API_BASE_URL}/teacher/reminders`,
    deleteReminder: (id) => `${API_BASE_URL}/teacher/reminders/${id}`,
    
    // Messages
    getMessages: `${API_BASE_URL}/teacher/messages`,
    sendMessage: `${API_BASE_URL}/teacher/messages`,
    
    // Profile
    getProfile: `${API_BASE_URL}/teacher/profile`,
    updateProfile: `${API_BASE_URL}/teacher/profile`,
    
    // Data export/import
    exportData: `${API_BASE_URL}/teacher/export`,
    uploadData: `${API_BASE_URL}/teacher/upload`
};

// ==================== PARENT ENDPOINTS ====================

const parentAPI = {
    // Dashboard
    getDashboard: `${API_BASE_URL}/parent/dashboard`,
    
    // Children management
    getChildren: `${API_BASE_URL}/parent/children`,
    switchChild: (id) => `${API_BASE_URL}/parent/children/${id}/switch`,
    
    // Academic
    getChildGrades: (id) => `${API_BASE_URL}/parent/children/${id}/grades`,
    getChildAttendance: (id) => `${API_BASE_URL}/parent/children/${id}/attendance`,
    getChildSubjects: (id) => `${API_BASE_URL}/parent/children/${id}/subjects`,
    getChildReports: (id) => `${API_BASE_URL}/parent/children/${id}/reports`,
    printReport: (id) => `${API_BASE_URL}/parent/children/${id}/reports/print`,
    
    // Alerts
    getAcademicAlerts: (id) => `${API_BASE_URL}/parent/children/${id}/alerts/academic`,
    getAttendanceAlerts: (id) => `${API_BASE_URL}/parent/children/${id}/alerts/attendance`,
    getFeeAlerts: (id) => `${API_BASE_URL}/parent/children/${id}/alerts/fees`,
    getMessages: `${API_BASE_URL}/parent/messages`,
    
    // Finance
    getFeeStatement: (id) => `${API_BASE_URL}/parent/children/${id}/fees/statement`,
    getPaymentHistory: (id) => `${API_BASE_URL}/parent/children/${id}/fees/history`,
    makePayment: `${API_BASE_URL}/parent/fees/pay`,
    
    // Guidance
    getTips: `${API_BASE_URL}/parent/tips`,
    getAIRecommendations: (id) => `${API_BASE_URL}/parent/children/${id}/recommendations`,
    
    // Profile
    getProfile: `${API_BASE_URL}/parent/profile`,
    updateProfile: `${API_BASE_URL}/parent/profile`,
    
    // Settings
    updateSettings: `${API_BASE_URL}/parent/settings`,
    
    // Notifications
    updateNotificationPreferences: `${API_BASE_URL}/parent/notifications/preferences`
};

// ==================== STUDENT ENDPOINTS ====================

const studentAPI = {
    // Dashboard
    getDashboard: `${API_BASE_URL}/student/dashboard`,
    
    // Progress
    getProgress: `${API_BASE_URL}/student/progress`,
    getAchievements: `${API_BASE_URL}/student/achievements`,
    
    // Academics
    getGrades: `${API_BASE_URL}/student/grades`,
    getAttendance: `${API_BASE_URL}/student/attendance`,
    getSubjects: `${API_BASE_URL}/student/subjects`,
    getReport: `${API_BASE_URL}/student/report`,
    
    // Learning
    getLearningMaterials: `${API_BASE_URL}/student/materials`,
    getAssignments: `${API_BASE_URL}/student/assignments`,
    submitAssignment: (id) => `${API_BASE_URL}/student/assignments/${id}/submit`,
    startStudySession: `${API_BASE_URL}/student/study-sessions`,
    getStudyHistory: `${API_BASE_URL}/student/study-sessions/history`,
    
    // AI Features
    askAITutor: `${API_BASE_URL}/student/ai/ask`,
    getAIRecommendations: `${API_BASE_URL}/student/ai/recommendations`,
    
    // Chat
    sendAIChat: `${API_BASE_URL}/student/chat/ai`,
    sendPrivateChat: `${API_BASE_URL}/student/chat/private`,
    sendGroupChat: `${API_BASE_URL}/student/chat/group`,
    getChatHistory: (type) => `${API_BASE_URL}/student/chat/${type}`,
    
    // Alerts
    getAlerts: `${API_BASE_URL}/student/alerts`,
    markAlertRead: (id) => `${API_BASE_URL}/student/alerts/${id}/read`,
    
    // Timetable
    getTimetable: `${API_BASE_URL}/student/timetable`,
    
    // Reminders
    getReminders: `${API_BASE_URL}/student/reminders`,
    addReminder: `${API_BASE_URL}/student/reminders`,
    deleteReminder: (id) => `${API_BASE_URL}/student/reminders/${id}`,
    
    // Profile
    getProfile: `${API_BASE_URL}/student/profile`,
    updateProfile: `${API_BASE_URL}/student/profile`,
    
    // Settings
    getSettings: `${API_BASE_URL}/student/settings`,
    updateSettings: `${API_BASE_URL}/student/settings`,
    updateTheme: `${API_BASE_URL}/student/settings/theme`,
    updateNotifications: `${API_BASE_URL}/student/settings/notifications`
};

// ==================== SUPER ADMIN ENDPOINTS ====================

const superAdminAPI = {
    // Dashboard
    getDashboard: `${API_BASE_URL}/super/dashboard`,
    
    // School management
    getAllSchools: `${API_BASE_URL}/super/schools`,
    getSchool: (id) => `${API_BASE_URL}/super/schools/${id}`,
    addSchool: `${API_BASE_URL}/super/schools`,
    updateSchool: (id) => `${API_BASE_URL}/super/schools/${id}`,
    deleteSchool: (id) => `${API_BASE_URL}/super/schools/${id}`,
    
    // User management
    getAllUsers: `${API_BASE_URL}/super/users`,
    getUser: (id) => `${API_BASE_URL}/super/users/${id}`,
    addUser: `${API_BASE_URL}/super/users`,
    updateUser: (id) => `${API_BASE_URL}/super/users/${id}`,
    deleteUser: (id) => `${API_BASE_URL}/super/users/${id}`,
    
    // Demo data
    getDemoStatus: `${API_BASE_URL}/super/demo/status`,
    toggleDemoData: `${API_BASE_URL}/super/demo/toggle`,
    resetDemoData: `${API_BASE_URL}/super/demo/reset`,
    
    // Analytics
    getPlatformAnalytics: `${API_BASE_URL}/super/analytics/platform`,
    getSystemHealth: `${API_BASE_URL}/super/analytics/health`,
    
    // Audit
    getAuditLogs: `${API_BASE_URL}/super/audit-logs`,
    
    // Settings
    getSystemSettings: `${API_BASE_URL}/super/settings`,
    updateSystemSettings: `${API_BASE_URL}/super/settings`
};

// ==================== COMMON ENDPOINTS ====================

const commonAPI = {
    // File upload
    uploadFile: `${API_BASE_URL}/upload`,
    
    // Notifications
    getNotifications: `${API_BASE_URL}/notifications`,
    markNotificationRead: (id) => `${API_BASE_URL}/notifications/${id}/read`,
    markAllRead: `${API_BASE_URL}/notifications/read-all`,
    
    // Search
    search: `${API_BASE_URL}/search`
};

// Export all API endpoints
window.authAPI = authAPI;
window.adminAPI = adminAPI;
window.teacherAPI = teacherAPI;
window.parentAPI = parentAPI;
window.studentAPI = studentAPI;
window.superAdminAPI = superAdminAPI;
window.commonAPI = commonAPI;
window.API_BASE_URL = API_BASE_URL;
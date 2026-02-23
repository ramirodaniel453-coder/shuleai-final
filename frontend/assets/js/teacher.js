// Teacher JavaScript - Core Module
(function() {
    'use strict';
    
    // Teacher Dashboard Module
    const TeacherDashboard = {
        // Configuration
        config: {
            sessionTimeout: 30 * 60 * 1000,
            autoSaveInterval: 30000,
            demoMode: true
        },
        
        // State management
        state: {
            initialized: false,
            currentStudent: null,
            marksData: {},
            attendanceData: {},
            commentsData: [],
            studentsData: []
        },
        
        // Initialize dashboard
        init: function() {
            if (this.state.initialized) return;
            
            this.checkAuth();
            this.loadTeacherData();
            this.setupEventListeners();
            this.loadStudentsData();
            this.renderDashboard();
            this.startAutoSave();
            this.startSessionTimer();
            
            this.state.initialized = true;
            console.log('Teacher Dashboard initialized');
        },
        
        // Check authentication
        checkAuth: function() {
            if (!localStorage.getItem('teacherLoggedIn')) {
                window.location.href = 'teacher.html';
                return false;
            }
            return true;
        },
        
        // Load teacher data
        loadTeacherData: function() {
            // Update UI with teacher info
            const teacherName = document.getElementById('teacherName');
            const classInfo = document.getElementById('classInfo');
            
            if (teacherName) {
                teacherName.textContent = localStorage.getItem('teacherName') || 'John Doe';
            }
            
            if (classInfo) {
                const subject = localStorage.getItem('teacherSubject') || 'Mathematics';
                const grade = localStorage.getItem('teacherGrade') || 'Grade 10A';
                classInfo.textContent = `${grade} - ${subject}`;
            }
        },
        
        // Setup event listeners
        setupEventListeners: function() {
            // Logout buttons
            const logoutBtn = document.getElementById('logoutBtn');
            const logoutOption = document.getElementById('logoutOption');
            
            if (logoutBtn) logoutBtn.addEventListener('click', this.logout.bind(this));
            if (logoutOption) logoutOption.addEventListener('click', this.logout.bind(this));
            
            // Profile dropdown
            const teacherProfile = document.getElementById('teacherProfile');
            if (teacherProfile) {
                teacherProfile.addEventListener('click', this.toggleProfileDropdown.bind(this));
            }
            
            // Action cards
            const enterMarksCard = document.getElementById('enterMarksCard');
            const takeAttendanceCard = document.getElementById('takeAttendanceCard');
            const addCommentsCard = document.getElementById('addCommentsCard');
            const viewReportsCard = document.getElementById('viewReportsCard');
            
            if (enterMarksCard) enterMarksCard.addEventListener('click', this.openMarksModal.bind(this));
            if (takeAttendanceCard) takeAttendanceCard.addEventListener('click', this.openAttendanceModal.bind(this));
            if (addCommentsCard) addCommentsCard.addEventListener('click', this.openCommentsModal.bind(this));
            if (viewReportsCard) viewReportsCard.addEventListener('click', this.openReportsModal.bind(this));
            
            // Modal close buttons
            const modalClose = document.getElementById('modalClose');
            const marksModalClose = document.getElementById('marksModalClose');
            const attendanceModalClose = document.getElementById('attendanceModalClose');
            const commentsModalClose = document.getElementById('commentsModalClose');
            
            if (modalClose) modalClose.addEventListener('click', this.closeModal.bind(this));
            if (marksModalClose) marksModalClose.addEventListener('click', this.closeMarksModal.bind(this));
            if (attendanceModalClose) attendanceModalClose.addEventListener('click', this.closeAttendanceModal.bind(this));
            if (commentsModalClose) commentsModalClose.addEventListener('click', this.closeCommentsModal.bind(this));
            
            // Menu items
            document.querySelectorAll('.menu-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = item.getAttribute('data-section');
                    this.handleMenuClick(section, item);
                });
            });
            
            // Add student button
            const addStudentBtn = document.getElementById('addStudent');
            if (addStudentBtn) addStudentBtn.addEventListener('click', this.openAddStudentModal.bind(this));
            
            // Export students button
            const exportStudentsBtn = document.getElementById('exportStudents');
            if (exportStudentsBtn) exportStudentsBtn.addEventListener('click', this.exportStudentList.bind(this));
            
            // Search functionality
            const searchInput = document.getElementById('searchStudents');
            if (searchInput) searchInput.addEventListener('input', this.searchStudents.bind(this));
            
            // Sort and filter
            const sortBy = document.getElementById('sortBy');
            const filterStatus = document.getElementById('filterStatus');
            
            if (sortBy) sortBy.addEventListener('change', this.sortStudents.bind(this));
            if (filterStatus) filterStatus.addEventListener('change', this.filterStudents.bind(this));
            
            // Select all checkbox
            const selectAll = document.getElementById('selectAll');
            if (selectAll) selectAll.addEventListener('change', this.toggleSelectAll.bind(this));
            
            // Marks modal buttons
            const saveDraftBtn = document.getElementById('saveDraft');
            const submitMarksBtn = document.getElementById('submitMarks');
            const cancelMarksBtn = document.getElementById('cancelMarks');
            
            if (saveDraftBtn) saveDraftBtn.addEventListener('click', this.saveMarksDraft.bind(this));
            if (submitMarksBtn) submitMarksBtn.addEventListener('click', this.submitMarks.bind(this));
            if (cancelMarksBtn) cancelMarksBtn.addEventListener('click', this.closeMarksModal.bind(this));
            
            // Attendance modal buttons
            const markAllPresentBtn = document.getElementById('markAllPresent');
            const saveAttendanceBtn = document.getElementById('saveAttendance');
            const submitAttendanceBtn = document.getElementById('submitAttendance');
            
            if (markAllPresentBtn) markAllPresentBtn.addEventListener('click', this.markAllPresent.bind(this));
            if (saveAttendanceBtn) saveAttendanceBtn.addEventListener('click', this.saveAttendanceDraft.bind(this));
            if (submitAttendanceBtn) submitAttendanceBtn.addEventListener('click', this.submitAttendance.bind(this));
            
            // Comments modal buttons
            const cancelCommentBtn = document.getElementById('cancelComment');
            const submitCommentBtn = document.getElementById('submitComment');
            
            if (cancelCommentBtn) cancelCommentBtn.addEventListener('click', this.closeCommentsModal.bind(this));
            if (submitCommentBtn) submitCommentBtn.addEventListener('click', this.submitComment.bind(this));
            
            // Character count for comments
            const commentText = document.getElementById('commentText');
            if (commentText) {
                commentText.addEventListener('input', () => {
                    const charCount = document.getElementById('charCount');
                    if (charCount) {
                        charCount.textContent = commentText.value.length;
                    }
                });
            }
            
            // Close dropdown on outside click
            document.addEventListener('click', (e) => {
                const dropdown = document.getElementById('profileDropdown');
                const profile = document.getElementById('teacherProfile');
                
                if (dropdown && profile && !profile.contains(e.target) && !dropdown.contains(e.target)) {
                    dropdown.style.display = 'none';
                }
            });
            
            // Close modals on outside click
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        if (modal.id === 'marksModal') this.closeMarksModal();
                        else if (modal.id === 'attendanceModal') this.closeAttendanceModal();
                        else if (modal.id === 'commentsModal') this.closeCommentsModal();
                        else this.closeModal();
                    }
                });
            });
        },
        
        // Load students data
        loadStudentsData: function() {
            // Check if we have demo data in localStorage
            let students = JSON.parse(localStorage.getItem('teacherStudentsData') || 'null');
            
            if (!students) {
                // Generate demo students data
                students = this.generateDemoStudents();
                localStorage.setItem('teacherStudentsData', JSON.stringify(students));
            }
            
            this.state.studentsData = students;
            this.renderStudentsTable();
            this.updateStudentStats();
        },
        
        // Generate demo students
        generateDemoStudents: function() {
            const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Jennifer', 'William', 'Lisa'];
            const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
            
            const students = [];
            
            for (let i = 1; i <= 35; i++) {
                const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
                const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
                const marks = Math.floor(Math.random() * 40) + 60; // 60-100
                const attendance = Math.floor(Math.random() * 10) + 90; // 90-100
                
                let status = 'average';
                if (marks >= 85) status = 'excelling';
                else if (marks < 70) status = 'struggling';
                
                students.push({
                    id: `STU${i.toString().padStart(3, '0')}`,
                    name: `${firstName} ${lastName}`,
                    marks: marks,
                    attendance: attendance,
                    status: status,
                    lastUpdated: new Date().toISOString(),
                    selected: false
                });
            }
            
            return students;
        },
        
        // Render students table
        renderStudentsTable: function() {
            const tbody = document.getElementById('studentsTableBody');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            this.state.studentsData.forEach(student => {
                const row = document.createElement('tr');
                row.dataset.id = student.id;
                row.dataset.status = student.status;
                
                const marksColor = this.getMarksColor(student.marks);
                const attendanceColor = this.getAttendanceColor(student.attendance);
                const statusClass = this.getStatusClass(student.status);
                
                row.innerHTML = `
                    <td>
                        <input type="checkbox" class="student-checkbox" ${student.selected ? 'checked' : ''}>
                    </td>
                    <td>
                        <div class="student-cell">
                            <div class="student-avatar">
                                ${student.name.charAt(0)}
                            </div>
                            <div class="student-info">
                                <div class="student-name">${student.name}</div>
                                <div class="student-email">${student.id.toLowerCase()}@school.edu</div>
                            </div>
                        </div>
                    </td>
                    <td>${student.id}</td>
                    <td>
                        <div class="marks-display">
                            <span class="marks-value" style="color: ${marksColor}">${student.marks}%</span>
                            <div class="marks-bar">
                                <div class="marks-fill" style="width: ${student.marks}%; background: ${marksColor}"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div class="attendance-display">
                            <span class="attendance-value" style="color: ${attendanceColor}">${student.attendance}%</span>
                            <div class="attendance-bar">
                                <div class="attendance-fill" style="width: ${student.attendance}%; background: ${attendanceColor}"></div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge ${statusClass}">
                            ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn-icon" title="View Details" onclick="TeacherDashboard.viewStudent('${student.id}')">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn-icon" title="Edit Marks" onclick="TeacherDashboard.editStudentMarks('${student.id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-icon" title="Add Comment" onclick="TeacherDashboard.addStudentComment('${student.id}')">
                                <i class="fas fa-comment"></i>
                            </button>
                        </div>
                    </td>
                `;
                
                tbody.appendChild(row);
            });
            
            // Update counts
            this.updateTableCounts();
        },
        
        // Update student statistics
        updateStudentStats: function() {
            const students = this.state.studentsData;
            
            // Calculate statistics
            const totalStudents = students.length;
            const avgScore = students.reduce((sum, student) => sum + student.marks, 0) / totalStudents;
            const avgAttendance = students.reduce((sum, student) => sum + student.attendance, 0) / totalStudents;
            const strugglingCount = students.filter(s => s.status === 'struggling').length;
            const excellingCount = students.filter(s => s.status === 'excelling').length;
            
            // Update quick stats
            this.updateStatValue('totalStudents', totalStudents);
            this.updateStatValue('avgScore', avgScore.toFixed(1) + '%');
            this.updateStatValue('attendanceRate', avgAttendance.toFixed(0) + '%');
            
            // Update badges
            this.updateBadge('studentCount', totalStudents);
            this.updateBadge('strugglingCount', strugglingCount);
            this.updateBadge('excellingCount', excellingCount);
            this.updateBadge('pendingMarks', 5); // Demo value
            this.updateBadge('alertCount', 2); // Demo value
        },
        
        // Update statistic value with animation
        updateStatValue: function(elementId, value) {
            const element = document.getElementById(elementId);
            if (element) {
                const current = parseFloat(element.textContent.replace('%', '')) || 0;
                const target = parseFloat(value) || 0;
                
                if (!isNaN(current) && !isNaN(target)) {
                    this.animateCounter(element, current, target, value.includes('%'));
                } else {
                    element.textContent = value;
                }
            }
        },
        
        // Update badge value
        updateBadge: function(elementId, value) {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = value;
            }
        },
        
        // Animate counter
        animateCounter: function(element, start, end, isPercent = false) {
            const duration = 1000;
            const startTime = Date.now();
            
            function update() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const current = start + progress * (end - start);
                element.textContent = isPercent ? 
                    current.toFixed(1) + '%' : 
                    Math.floor(current).toString();
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        },
        
        // Get marks color based on value
        getMarksColor: function(marks) {
            if (marks >= 85) return '#28a745'; // Green
            if (marks >= 70) return '#ffc107'; // Yellow
            return '#dc3545'; // Red
        },
        
        // Get attendance color based on value
        getAttendanceColor: function(attendance) {
            if (attendance >= 95) return '#28a745';
            if (attendance >= 85) return '#ffc107';
            return '#dc3545';
        },
        
        // Get status class
        getStatusClass: function(status) {
            const classes = {
                'excelling': 'success',
                'struggling': 'danger',
                'average': 'warning'
            };
            return classes[status] || 'info';
        },
        
        // Update table counts
        updateTableCounts: function() {
            const showing = document.getElementById('showingCount');
            const total = document.getElementById('totalCount');
            
            if (showing && total) {
                const totalStudents = this.state.studentsData.length;
                showing.textContent = Math.min(10, totalStudents);
                total.textContent = totalStudents;
            }
        },
        
        // Search students
        searchStudents: function() {
            const searchTerm = document.getElementById('searchStudents').value.toLowerCase();
            
            const rows = document.querySelectorAll('#studentsTableBody tr');
            rows.forEach(row => {
                const studentName = row.querySelector('.student-name').textContent.toLowerCase();
                const studentId = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                
                if (studentName.includes(searchTerm) || studentId.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        },
        
        // Sort students
        sortStudents: function() {
            const sortBy = document.getElementById('sortBy').value;
            
            this.state.studentsData.sort((a, b) => {
                switch (sortBy) {
                    case 'name':
                        return a.name.localeCompare(b.name);
                    case 'marks':
                        return b.marks - a.marks;
                    case 'attendance':
                        return b.attendance - a.attendance;
                    case 'recent':
                        return new Date(b.lastUpdated) - new Date(a.lastUpdated);
                    default:
                        return 0;
                }
            });
            
            this.renderStudentsTable();
        },
        
        // Filter students
        filterStudents: function() {
            const filterBy = document.getElementById('filterStatus').value;
            
            const rows = document.querySelectorAll('#studentsTableBody tr');
            rows.forEach(row => {
                if (filterBy === 'all') {
                    row.style.display = '';
                } else {
                    const status = row.dataset.status;
                    if (status === filterBy) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        },
        
        // Toggle select all
        toggleSelectAll: function() {
            const selectAll = document.getElementById('selectAll').checked;
            const checkboxes = document.querySelectorAll('.student-checkbox');
            
            checkboxes.forEach(checkbox => {
                checkbox.checked = selectAll;
                
                // Update data
                const row = checkbox.closest('tr');
                const studentId = row.dataset.id;
                const student = this.state.studentsData.find(s => s.id === studentId);
                if (student) {
                    student.selected = selectAll;
                }
            });
        },
        
        // View student details
        viewStudent: function(studentId) {
            const student = this.state.studentsData.find(s => s.id === studentId);
            if (!student) return;
            
            this.openModal('student-details', `${student.name} - Details`, 'fas fa-user-graduate');
            
            // Set modal content
            const modalContent = document.getElementById('modalContent');
            modalContent.innerHTML = `
                <div class="student-details">
                    <div class="student-header">
                        <div class="student-avatar large">
                            ${student.name.charAt(0)}
                        </div>
                        <div class="student-info">
                            <h4>${student.name}</h4>
                            <p>${student.id} • Grade 10A</p>
                        </div>
                    </div>
                    
                    <div class="student-stats">
                        <div class="stat-card">
                            <div class="stat-label">Latest Marks</div>
                            <div class="stat-value" style="color: ${this.getMarksColor(student.marks)}">
                                ${student.marks}%
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">Attendance</div>
                            <div class="stat-value" style="color: ${this.getAttendanceColor(student.attendance)}">
                                ${student.attendance}%
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-label">Status</div>
                            <div class="stat-value">
                                <span class="status-badge ${this.getStatusClass(student.status)}">
                                    ${student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="student-actions">
                        <button class="btn-primary" onclick="TeacherDashboard.editStudentMarks('${studentId}')">
                            <i class="fas fa-edit"></i> Update Marks
                        </button>
                        <button class="btn-secondary" onclick="TeacherDashboard.addStudentComment('${studentId}')">
                            <i class="fas fa-comment"></i> Add Comment
                        </button>
                    </div>
                </div>
            `;
        },
        
        // Edit student marks
        editStudentMarks: function(studentId) {
            const student = this.state.studentsData.find(s => s.id === studentId);
            if (!student) return;
            
            this.openMarksModal();
            
            // Focus on this student in marks modal
            setTimeout(() => {
                const marksTable = document.getElementById('marksTableBody');
                const rows = marksTable.querySelectorAll('tr');
                rows.forEach(row => {
                    if (row.querySelector('.student-name').textContent.includes(student.name)) {
                        row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        row.classList.add('highlighted');
                        setTimeout(() => row.classList.remove('highlighted'), 2000);
                    }
                });
            }, 500);
        },
        
        // Add student comment
        addStudentComment: function(studentId) {
            const student = this.state.studentsData.find(s => s.id === studentId);
            if (!student) return;
            
            this.openCommentsModal();
            
            // Pre-select the student
            setTimeout(() => {
                const studentSelect = document.getElementById('studentSelect');
                if (studentSelect) {
                    studentSelect.value = studentId;
                }
            }, 100);
        },
        
        // Open marks modal
        openMarksModal: function() {
            const modal = document.getElementById('marksModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Load marks data
                this.loadMarksData();
            }
        },
        
        // Close marks modal
        closeMarksModal: function() {
            const modal = document.getElementById('marksModal');
            if (modal) {
                modal.style.display = 'none';
            }
        },
        
        // Open attendance modal
        openAttendanceModal: function() {
            const modal = document.getElementById('attendanceModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Load attendance data
                this.loadAttendanceData();
            }
        },
        
        // Close attendance modal
        closeAttendanceModal: function() {
            const modal = document.getElementById('attendanceModal');
            if (modal) {
                modal.style.display = 'none';
            }
        },
        
        // Open comments modal
        openCommentsModal: function() {
            const modal = document.getElementById('commentsModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Load students into dropdown
                this.loadStudentDropdown();
            }
        },
        
        // Close comments modal
        closeCommentsModal: function() {
            const modal = document.getElementById('commentsModal');
            if (modal) {
                modal.style.display = 'none';
            }
        },
        
        // Open reports modal
        openReportsModal: function() {
            this.openModal('reports', 'Class Reports', 'fas fa-chart-bar');
            
            const modalContent = document.getElementById('modalContent');
            if (modalContent) {
                modalContent.innerHTML = `
                    <div class="reports-container">
                        <h4>Generate Class Reports</h4>
                        <p>Select a report type to generate and download.</p>
                        
                        <div class="reports-grid">
                            <div class="report-card" onclick="TeacherDashboard.generateReport('performance')">
                                <i class="fas fa-chart-line"></i>
                                <h5>Performance Report</h5>
                                <p>Student marks and grades analysis</p>
                            </div>
                            
                            <div class="report-card" onclick="TeacherDashboard.generateReport('attendance')">
                                <i class="fas fa-calendar-check"></i>
                                <h5>Attendance Report</h5>
                                <p>Attendance records and trends</p>
                            </div>
                            
                            <div class="report-card" onclick="TeacherDashboard.generateReport('progress')">
                                <i class="fas fa-trend-up"></i>
                                <h5>Progress Report</h5>
                                <p>Student improvement over time</p>
                            </div>
                            
                            <div class="report-card" onclick="TeacherDashboard.generateReport('summary')">
                                <i class="fas fa-file-alt"></i>
                                <h5>Class Summary</h5>
                                <p>Overall class performance</p>
                            </div>
                        </div>
                    </div>
                `;
            }
        },
        
        // Open add student modal
        openAddStudentModal: function() {
            this.openModal('add-student', 'Add New Student', 'fas fa-user-plus');
            
            const modalContent = document.getElementById('modalContent');
            if (modalContent) {
                modalContent.innerHTML = `
                    <div class="add-student-form">
                        <div class="form-group">
                            <label for="newStudentName">Full Name</label>
                            <input type="text" id="newStudentName" placeholder="Enter student name">
                        </div>
                        
                        <div class="form-group">
                            <label for="newStudentId">Student ID</label>
                            <input type="text" id="newStudentId" placeholder="Auto-generated" disabled>
                        </div>
                        
                        <div class="form-group">
                            <label for="newStudentEmail">Email</label>
                            <input type="email" id="newStudentEmail" placeholder="student@school.edu">
                        </div>
                        
                        <div class="form-group">
                            <label for="newStudentParent">Parent Email</label>
                            <input type="email" id="newStudentParent" placeholder="parent@email.com">
                        </div>
                        
                        <div class="form-actions">
                            <button class="btn-secondary" onclick="TeacherDashboard.closeModal()">
                                Cancel
                            </button>
                            <button class="btn-primary" onclick="TeacherDashboard.addNewStudent()">
                                <i class="fas fa-plus"></i> Add Student
                            </button>
                        </div>
                    </div>
                `;
                
                // Generate student ID
                const nextId = this.state.studentsData.length + 1;
                const newStudentId = document.getElementById('newStudentId');
                if (newStudentId) {
                    newStudentId.value = `STU${nextId.toString().padStart(3, '0')}`;
                }
            }
        },
        
        // Open modal
        openModal: function(section, title, icon) {
            const modal = document.getElementById('teacherModal');
            const modalTitle = document.getElementById('modalTitle');
            const modalIcon = document.getElementById('modalIcon');
            
            if (modal && modalTitle && modalIcon) {
                modalTitle.textContent = title;
                modalIcon.className = `fas ${icon}`;
                modal.style.display = 'flex';
            }
        },
        
        // Close modal
        closeModal: function() {
            const modal = document.getElementById('teacherModal');
            if (modal) {
                modal.style.display = 'none';
            }
        },
        
        // Toggle profile dropdown
        toggleProfileDropdown: function() {
            const dropdown = document.getElementById('profileDropdown');
            if (dropdown) {
                dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }
        },
        
        // Handle menu click
        handleMenuClick: function(section, element) {
            // Update active state
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            element.classList.add('active');
            
            // Handle different sections
            switch (section) {
                case 'enter-marks':
                    this.openMarksModal();
                    break;
                case 'attendance':
                    this.openAttendanceModal();
                    break;
                case 'comments':
                    this.openCommentsModal();
                    break;
                case 'all-students':
                    this.openModal('all-students', 'All Students', 'fas fa-users');
                    break;
                default:
                    this.openModal(section, section.replace('-', ' '), 'fas fa-cog');
                    break;
            }
        },
        
        // Load marks data
        loadMarksData: function() {
            const tbody = document.getElementById('marksTableBody');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            this.state.studentsData.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="student-cell">
                            <div class="student-avatar small">
                                ${student.name.charAt(0)}
                            </div>
                            <div class="student-info">
                                <div class="student-name">${student.name}</div>
                                <div class="student-id">${student.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <input type="number" class="marks-input" value="${student.marks}" min="0" max="100" step="0.5">
                    </td>
                    <td>
                        <span class="grade-display">${this.getGrade(student.marks)}</span>
                    </td>
                    <td>
                        <input type="text" class="comment-input" placeholder="Add comment...">
                    </td>
                    <td>
                        <span class="status-badge success">Saved</span>
                    </td>
                `;
                tbody.appendChild(row);
            });
        },
        
        // Load attendance data
        loadAttendanceData: function() {
            const tbody = document.getElementById('attendanceTableBody');
            if (!tbody) return;
            
            tbody.innerHTML = '';
            
            this.state.studentsData.forEach(student => {
                const status = Math.random() > 0.1 ? 'present' : (Math.random() > 0.5 ? 'absent' : 'late');
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>
                        <div class="student-cell">
                            <div class="student-avatar small">
                                ${student.name.charAt(0)}
                            </div>
                            <div class="student-info">
                                <div class="student-name">${student.name}</div>
                                <div class="student-id">${student.id}</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <select class="status-select" data-initial="${status}">
                            <option value="present" ${status === 'present' ? 'selected' : ''}>Present</option>
                            <option value="absent" ${status === 'absent' ? 'selected' : ''}>Absent</option>
                            <option value="late" ${status === 'late' ? 'selected' : ''}>Late</option>
                            <option value="excused">Excused</option>
                        </select>
                    </td>
                    <td>
                        <input type="time" class="time-input" value="08:30" ${status !== 'late' ? 'disabled' : ''}>
                    </td>
                    <td>
                        <input type="text" class="notes-input" placeholder="Add notes...">
                    </td>
                `;
                tbody.appendChild(row);
            });
            
            // Update attendance counts
            this.updateAttendanceCounts();
            
            // Add event listeners to status selects
            document.querySelectorAll('.status-select').forEach(select => {
                select.addEventListener('change', (e) => {
                    const timeInput = e.target.closest('tr').querySelector('.time-input');
                    if (e.target.value === 'late') {
                        timeInput.disabled = false;
                    } else {
                        timeInput.disabled = true;
                        timeInput.value = '08:30';
                    }
                    this.updateAttendanceCounts();
                });
            });
        },
        
        // Load student dropdown
        loadStudentDropdown: function() {
            const select = document.getElementById('studentSelect');
            if (!select) return;
            
            select.innerHTML = '<option value="">Choose a student...</option>';
            
            this.state.studentsData.forEach(student => {
                const option = document.createElement('option');
                option.value = student.id;
                option.textContent = `${student.name} (${student.id})`;
                select.appendChild(option);
            });
        },
        
        // Get grade from marks
        getGrade: function(marks) {
            if (marks >= 85) return 'A';
            if (marks >= 70) return 'B';
            if (marks >= 60) return 'C';
            if (marks >= 50) return 'D';
            return 'F';
        },
        
        // Update attendance counts
        updateAttendanceCounts: function() {
            let present = 0, absent = 0, late = 0;
            
            document.querySelectorAll('.status-select').forEach(select => {
                switch (select.value) {
                    case 'present': present++; break;
                    case 'absent': absent++; break;
                    case 'late': late++; break;
                }
            });
            
            const presentCount = document.getElementById('presentCount');
            const absentCount = document.getElementById('absentCount');
            const lateCount = document.getElementById('lateCount');
            
            if (presentCount) presentCount.textContent = present;
            if (absentCount) absentCount.textContent = absent;
            if (lateCount) lateCount.textContent = late;
        },
        
        // Mark all as present
        markAllPresent: function() {
            document.querySelectorAll('.status-select').forEach(select => {
                select.value = 'present';
                const timeInput = select.closest('tr').querySelector('.time-input');
                timeInput.disabled = true;
                timeInput.value = '08:30';
            });
            
            this.updateAttendanceCounts();
            this.showNotification('All students marked as present', 'success');
        },
        
        // Save marks draft
        saveMarksDraft: function() {
            this.showNotification('Marks draft saved successfully', 'success');
        },
        
        // Submit marks
        submitMarks: function() {
            // Get all marks inputs
            const marksInputs = document.querySelectorAll('.marks-input');
            let hasChanges = false;
            
            marksInputs.forEach((input, index) => {
                const newMarks = parseFloat(input.value);
                if (!isNaN(newMarks) && this.state.studentsData[index]) {
                    const oldMarks = this.state.studentsData[index].marks;
                    if (newMarks !== oldMarks) {
                        hasChanges = true;
                        this.state.studentsData[index].marks = newMarks;
                        
                        // Update status based on marks
                        let status = 'average';
                        if (newMarks >= 85) status = 'excelling';
                        else if (newMarks < 70) status = 'struggling';
                        this.state.studentsData[index].status = status;
                        
                        this.state.studentsData[index].lastUpdated = new Date().toISOString();
                    }
                }
            });
            
            if (hasChanges) {
                localStorage.setItem('teacherStudentsData', JSON.stringify(this.state.studentsData));
                this.renderStudentsTable();
                this.updateStudentStats();
                this.showNotification('Marks submitted successfully', 'success');
                this.closeMarksModal();
            } else {
                this.showNotification('No changes detected', 'info');
            }
        },
        
        // Save attendance draft
        saveAttendanceDraft: function() {
            this.showNotification('Attendance draft saved', 'info');
        },
        
        // Submit attendance
        submitAttendance: function() {
            this.showNotification('Attendance submitted successfully', 'success');
            this.closeAttendanceModal();
        },
        
        // Submit comment
        submitComment: function() {
            const studentSelect = document.getElementById('studentSelect');
            const commentType = document.getElementById('commentType');
            const commentText = document.getElementById('commentText');
            
            if (!studentSelect || !commentType || !commentText) return;
            
            const studentId = studentSelect.value;
            const type = commentType.value;
            const text = commentText.value;
            
            if (!studentId || !text.trim()) {
                this.showNotification('Please select a student and enter a comment', 'error');
                return;
            }
            
            if (text.length > 500) {
                this.showNotification('Comment must be 500 characters or less', 'error');
                return;
            }
            
            // Add comment to data
            this.state.commentsData.push({
                studentId: studentId,
                type: type,
                text: text,
                date: new Date().toISOString(),
                visibility: document.querySelector('input[name="visibility"]:checked')?.value || 'parent'
            });
            
            // Clear form
            commentText.value = '';
            document.getElementById('charCount').textContent = '0';
            
            this.showNotification('Comment added successfully', 'success');
            this.closeCommentsModal();
        },
        
        // Add new student
        addNewStudent: function() {
            const nameInput = document.getElementById('newStudentName');
            const idInput = document.getElementById('newStudentId');
            const emailInput = document.getElementById('newStudentEmail');
            
            if (!nameInput || !idInput || !emailInput) return;
            
            const name = nameInput.value.trim();
            const id = idInput.value.trim();
            const email = emailInput.value.trim();
            
            if (!name || !email) {
                this.showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            const newStudent = {
                id: id,
                name: name,
                marks: 0,
                attendance: 100,
                status: 'average',
                lastUpdated: new Date().toISOString(),
                selected: false
            };
            
            this.state.studentsData.push(newStudent);
            localStorage.setItem('teacherStudentsData', JSON.stringify(this.state.studentsData));
            
            this.renderStudentsTable();
            this.updateStudentStats();
            this.closeModal();
            
            this.showNotification(`Student ${name} added successfully`, 'success');
        },
        
        // Export student list
        exportStudentList: function() {
            const csvContent = this.generateStudentCSV();
            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `students-${new Date().toISOString().split('T')[0]}.csv`;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showNotification('Student list exported successfully', 'success');
        },
        
        // Generate student CSV
        generateStudentCSV: function() {
            const headers = ['Student ID', 'Name', 'Marks', 'Attendance', 'Status', 'Last Updated'];
            const rows = this.state.studentsData.map(student => [
                student.id,
                student.name,
                student.marks,
                student.attendance,
                student.status,
                new Date(student.lastUpdated).toLocaleDateString()
            ]);
            
            return [headers, ...rows].map(row => row.join(',')).join('\n');
        },
        
        // Generate report
        generateReport: function(type) {
            const reportTypes = {
                'performance': 'Performance Report',
                'attendance': 'Attendance Report',
                'progress': 'Progress Report',
                'summary': 'Class Summary Report'
            };
            
            const title = reportTypes[type] || 'Report';
            const content = `
${title} - Grade 10A Mathematics
Generated: ${new Date().toLocaleString()}
Teacher: ${localStorage.getItem('teacherName')}
========================================

Total Students: ${this.state.studentsData.length}
Average Marks: ${(this.state.studentsData.reduce((s, st) => s + st.marks, 0) / this.state.studentsData.length).toFixed(1)}%
Average Attendance: ${(this.state.studentsData.reduce((s, st) => s + st.attendance, 0) / this.state.studentsData.length).toFixed(1)}%

Top Students:
${this.state.studentsData.sort((a, b) => b.marks - a.marks).slice(0, 5).map((s, i) => `${i + 1}. ${s.name} - ${s.marks}%`).join('\n')}

This report was generated by ShuleAI Teacher Dashboard.
            `;
            
            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            
            URL.revokeObjectURL(url);
            this.showNotification(`${title} downloaded successfully`, 'success');
        },
        
        // Show notification
        showNotification: function(message, type = 'info') {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `teacher-notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 
                                   type === 'warning' ? 'exclamation-triangle' : 
                                   type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            `;
            
            // Add to document
            document.body.appendChild(notification);
            
            // Add styles if not already added
            if (!document.getElementById('teacher-notification-styles')) {
                const styles = document.createElement('style');
                styles.id = 'teacher-notification-styles';
                styles.textContent = `
                    .teacher-notification {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        padding: 15px 20px;
                        border-radius: 10px;
                        box-shadow: 0 5px 20px rgba(0,0,0,0.15);
                        display: flex;
                        align-items: center;
                        gap: 12px;
                        z-index: 10000;
                        animation: slideInUp 0.3s ease;
                        max-width: 350px;
                        font-weight: 500;
                        backdrop-filter: blur(10px);
                    }
                    
                    .teacher-notification.info {
                        background: rgba(23, 162, 184, 0.1);
                        color: #0c5460;
                        border-left: 4px solid #17a2b8;
                    }
                    
                    .teacher-notification.warning {
                        background: rgba(255, 193, 7, 0.1);
                        color: #856404;
                        border-left: 4px solid #ffc107;
                    }
                    
                    .teacher-notification.success {
                        background: rgba(40, 167, 69, 0.1);
                        color: #155724;
                        border-left: 4px solid #28a745;
                    }
                    
                    .teacher-notification.error {
                        background: rgba(220, 53, 69, 0.1);
                        color: #721c24;
                        border-left: 4px solid #dc3545;
                    }
                    
                    @keyframes slideInUp {
                        from { transform: translateY(100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                    
                    @keyframes slideOutDown {
                        from { transform: translateY(0); opacity: 1; }
                        to { transform: translateY(100%); opacity: 0; }
                    }
                `;
                document.head.appendChild(styles);
            }
            
            // Auto remove after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOutDown 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 5000);
        },
        
        // Start auto-save
        startAutoSave: function() {
            setInterval(() => {
                this.autoSaveData();
            }, this.config.autoSaveInterval);
        },
        
        // Auto-save data
        autoSaveData: function() {
            localStorage.setItem('teacherStudentsData', JSON.stringify(this.state.studentsData));
        },
        
        // Start session timer
        startSessionTimer: function() {
            setInterval(() => {
                this.checkSession();
            }, 60000);
        },
        
        // Check session
        checkSession: function() {
            const loginTime = localStorage.getItem('teacherLoginTime');
            if (loginTime) {
                const currentTime = Date.now();
                const sessionAge = currentTime - parseInt(loginTime);
                
                if (sessionAge > this.config.sessionTimeout) {
                    this.showNotification('Session expired. Redirecting to login...', 'warning');
                    setTimeout(() => {
                        this.logout();
                    }, 2000);
                }
            }
        },
        
        // Logout
        logout: function() {
            if (confirm('Are you sure you want to logout?')) {
                // Clear session data
                localStorage.removeItem('teacherLoggedIn');
                localStorage.removeItem('teacherId');
                localStorage.removeItem('teacherName');
                localStorage.removeItem('teacherSubject');
                localStorage.removeItem('teacherGrade');
                localStorage.removeItem('teacherLoginTime');
                
                // Redirect to login page
                window.location.href = 'teacher.html';
            }
        }
    };
    
    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            TeacherDashboard.init();
        });
    } else {
        TeacherDashboard.init();
    }
    
    // Export to global scope
    window.TeacherDashboard = TeacherDashboard;
})();
// ==================== CHART FUNCTIONS ====================

// Create performance distribution chart
function createPerformanceChart(canvasId, excelling, average, struggling) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Excelling (80-100)', 'Average (65-79)', 'Struggling (<65)'],
            datasets: [{
                data: [excelling, average, struggling],
                backgroundColor: ['#10b981', '#eab308', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create attendance trend chart
function createAttendanceChart(canvasId, data) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{
                label: 'Attendance %',
                data: data || [92, 94, 89, 91, 93],
                borderColor: '#3b82f6',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create subject performance chart
function createSubjectChart(canvasId, subjects, scores) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects || ['Math', 'English', 'Science', 'History'],
            datasets: [{
                label: 'Average Score',
                data: scores || [78, 82, 75, 71],
                backgroundColor: '#8b5cf6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create fee collection chart
function createFeeChart(canvasId, paid, partial, unpaid) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Paid', 'Partial', 'Unpaid'],
            datasets: [{
                data: [paid || 5, partial || 3, unpaid || 2],
                backgroundColor: ['#10b981', '#eab308', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create trend chart
function createTrendChart(canvasId, labels, data, label = 'Trend') {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels || ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [{
                label: label,
                data: data || [72, 74, 78, 75],
                borderColor: '#8b5cf6',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create grade distribution chart
function createGradeChart(canvasId, grades, counts) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: grades || ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'D', 'E'],
            datasets: [{
                label: 'Number of Students',
                data: counts || [25, 35, 45, 55, 40, 30, 25, 15, 10],
                backgroundColor: '#3b82f6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create radar chart for subject comparison
function createRadarChart(canvasId, subjects, scores) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: subjects || ['Mathematics', 'English', 'Science', 'History'],
            datasets: [{
                label: 'Average Scores',
                data: scores || [78, 82, 75, 71],
                backgroundColor: 'rgba(139,92,246,0.2)',
                borderColor: '#8b5cf6'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: { beginAtZero: true, max: 100 }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create student progress chart
function createStudentProgressChart(canvasId, subjects, scores) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: subjects || ['Math', 'English', 'Science', 'History'],
            datasets: [{
                label: 'Scores',
                data: scores || [85, 78, 82, 71],
                backgroundColor: '#10b981'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: { beginAtZero: true, max: 100 }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Create attendance pie chart
function createAttendancePieChart(canvasId, present, absent, late) {
    const ctx = document.getElementById(canvasId)?.getContext('2d');
    if (!ctx) return null;
    
    const chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Present', 'Absent', 'Late'],
            datasets: [{
                data: [present || 15, absent || 2, late || 3],
                backgroundColor: ['#3b82f6', '#ef4444', '#eab308']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
    
    activeCharts.push(chart);
    return chart;
}

// Make functions globally available
window.createPerformanceChart = createPerformanceChart;
window.createAttendanceChart = createAttendanceChart;
window.createSubjectChart = createSubjectChart;
window.createFeeChart = createFeeChart;
window.createTrendChart = createTrendChart;
window.createGradeChart = createGradeChart;
window.createRadarChart = createRadarChart;
window.createStudentProgressChart = createStudentProgressChart;
window.createAttendancePieChart = createAttendancePieChart;
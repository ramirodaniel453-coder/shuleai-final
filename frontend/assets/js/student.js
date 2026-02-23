// Student JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student portal loaded');
    
    // Check if we're on login page or dashboard
    const isLoginPage = document.querySelector('.student-login-page');
    const isDashboard = document.querySelector('.student-dashboard');
    
    // ===== LOGIN PAGE FUNCTIONALITY =====
    if (isLoginPage) {
        const loginForm = document.getElementById('studentLoginForm');
        const demoBtn1 = document.getElementById('demoBtn1');
        const demoBtn2 = document.getElementById('demoBtn2');
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const studentId = document.getElementById('studentId').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (!studentId || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showAlert('Logging in...', 'success');
            
            // Set login data
            localStorage.setItem('studentLoggedIn', 'true');
            localStorage.setItem('studentId', studentId);
            localStorage.setItem('studentName', 'Emma Smith');
            localStorage.setItem('studentGrade', 'Grade 10A');
            localStorage.setItem('studentLoginTime', Date.now().toString());
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'student-dashboard.html';
            }, 1500);
        });
        
        // Demo login 1
        demoBtn1.addEventListener('click', function() {
            document.getElementById('studentId').value = 'STU001';
            document.getElementById('password').value = 'student123';
            
            showAlert('Demo credentials filled. Click Login to continue.', 'info');
        });
        
        // Demo login 2
        demoBtn2.addEventListener('click', function() {
            document.getElementById('studentId').value = 'STU002';
            document.getElementById('password').value = 'student123';
            
            showAlert('Demo credentials filled. Click Login to continue.', 'info');
        });
        
        // Alert function
        function showAlert(message, type) {
            // Remove any existing alerts
            const existingAlert = document.querySelector('.login-alert');
            if (existingAlert) {
                existingAlert.remove();
            }
            
            // Create alert element
            const alertDiv = document.createElement('div');
            alertDiv.className = `login-alert alert-${type}`;
            alertDiv.innerHTML = `
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
                <span>${message}</span>
            `;
            
            // Add styles
            alertDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
                color: ${type === 'error' ? '#721c24' : '#155724'};
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideIn 0.3s ease;
            `;
            
            document.body.appendChild(alertDiv);
            
            // Remove alert after 3 seconds
            setTimeout(() => {
                alertDiv.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => alertDiv.remove(), 300);
            }, 3000);
        }
        
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===== DASHBOARD FUNCTIONALITY =====
    if (isDashboard) {
        // Dashboard functionality is handled in the inline script in student-dashboard.html
        console.log('Student dashboard loaded - functionality in inline script');
    }
});
// admin.js

document.addEventListener('DOMContentLoaded', () => {
    // ===== LOGIN FUNCTIONALITY =====
    const loginForm = document.getElementById('adminLoginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const adminId = document.getElementById('adminId').value;
            const password = document.getElementById('password').value;

            // Demo login check
            if (adminId === 'ADMIN001' && password === 'admin123') {
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminName', 'Admin User');
                localStorage.setItem('adminId', adminId);

                showMessage('Login successful! Redirecting...', 'success');
                setTimeout(() => window.location.href = 'admin-dashboard.html', 1000);
            } else {
                showMessage('Invalid credentials. Use demo credentials shown.', 'error');
            }
        });
    }

    // ===== DASHBOARD AUTH CHECK =====
    if (document.body.classList.contains('admin-dashboard')) {
        const loggedIn = localStorage.getItem('adminLoggedIn');
        if (!loggedIn) {
            window.location.href = 'admin.html';
        } else {
            // Fill admin info
            const adminNameEls = document.querySelectorAll('.admin-name');
            const adminIdEls = document.querySelectorAll('.admin-id');
            const adminName = localStorage.getItem('adminName');
            const adminId = localStorage.getItem('adminId');

            adminNameEls.forEach(el => el.textContent = adminName);
            adminIdEls.forEach(el => el.textContent = `ID: ${adminId}`);
        }
    }

    // ===== LOGOUT FUNCTION =====
    const logoutBtn = document.querySelector('.btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'admin.html';
        });
    }

    // ===== MODAL FUNCTION =====
    const modalOverlay = document.getElementById('adminModal');
    const modalClose = document.querySelector('.modal-close');
    const adminProfile = document.querySelector('.admin-profile');

    if (adminProfile && modalOverlay && modalClose) {
        adminProfile.addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });
        modalClose.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
        });
    }

    // ===== HERO COLLAPSE ON SCROLL =====
    const heroSection = document.querySelector('.admin-hero, .welcome-section');
    if (heroSection) {
        const heroContent = heroSection.querySelectorAll('*');

        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const maxShrink = 0.6; // minimum scale
            const threshold = 100; // scroll distance to reach max shrink

            let scale = 1 - (scrollY / threshold) * (1 - maxShrink);
            if (scale < maxShrink) scale = maxShrink;
            if (scale > 1) scale = 1;

            heroContent.forEach(el => {
                el.style.transform = `scale(${scale})`;
                el.style.transformOrigin = 'top left';
            });

            // optional: add class for CSS height collapse
            if (scrollY > threshold) {
                heroSection.classList.add('is-collapsed');
            } else {
                heroSection.classList.remove('is-collapsed');
            }
        });
    }
});

// ===== TOAST MESSAGES =====
function showMessage(message, type) {
    const existing = document.querySelector('.login-message');
    if (existing) existing.remove();

    const messageDiv = document.createElement('div');
    messageDiv.className = `login-message ${type}`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}"></i>
        ${message}
    `;

    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
        color: ${type === 'error' ? '#721c24' : '#155724'};
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(messageDiv);

    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => messageDiv.remove(), 300);
    }, 3000);
}

// ===== ANIMATION STYLES =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== SUPER ADMIN DASHBOARD FUNCTIONS ====================

// Load super admin dashboard
function loadSuperDashboard() {
    renderSuperMenu();
    switchSuperTab('overview');
}

// Render super admin menu
function renderSuperMenu() {
    const menuContainer = document.getElementById('super-menu');
    if (!menuContainer) return;
    
    const menus = {
        super: [
            { section: 'PLATFORM', items: [
                { name: 'Overview', icon: 'fa-globe', tab: 'overview' },
                { name: 'Demo Data', icon: 'fa-database', tab: 'demo' }
            ]}
        ]
    };
    
    let html = '';
    menus.super.forEach(section => {
        html += `<div class="menu-section"><h4>${section.section}</h4>`;
        section.items.forEach(item => {
            html += `<a class="menu-item" onclick="switchSuperTab('${item.tab}')">
                <i class="fas ${item.icon}"></i> ${item.name}
            </a>`;
        });
        html += `</div>`;
    });
    menuContainer.innerHTML = html;
}

// Switch super admin tabs
function switchSuperTab(tab) {
    let content = '';
    
    switch(tab) {
        case 'overview':
            content = getSuperOverviewContent();
            break;
        case 'demo':
            content = getSuperDemoContent();
            break;
        default:
            content = `<h3>${tab.replace(/-/g, ' ')}</h3><div class="card"><p>Content for ${tab} would appear here.</p></div>`;
    }
    
    document.getElementById('super-content').innerHTML = content;
    updateActiveMenu('super-sidebar', tab);
}

// Get super overview content
function getSuperOverviewContent() {
    return `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-icon" style="background:#8b5cf6;"><i class="fas fa-school"></i></div>
                <div class="stat-info"><h3>1</h3><p>Schools</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#a78bfa;"><i class="fas fa-users"></i></div>
                <div class="stat-info"><h3>1245</h3><p>Students</p></div>
            </div>
            <div class="stat-card">
                <div class="stat-icon" style="background:#c4b5fd;"><i class="fas fa-chalkboard-teacher"></i></div>
                <div class="stat-info"><h3>68</h3><p>Teachers</p></div>
            </div>
        </div>
        
        <div class="card">
            <h4>Schools</h4>
            <div class="table-responsive">
                <table class="data-table">
                    <tr><th>School Code</th><th>Name</th><th>Students</th><th>Teachers</th><th>System</th><th>Actions</th></tr>
                    <tr>
                        <td>GRN001</td>
                        <td>Greenwood High</td>
                        <td>1245</td>
                        <td>68</td>
                        <td>8-4-4</td>
                        <td><button class="btn-small" onclick="showToast('Viewing school')">View</button></td>
                    </tr>
                </table>
            </div>
        </div>
    `;
}

// Get super demo content
function getSuperDemoContent() {
    return `
        <div class="card">
            <h4>Demo Data Control</h4>
            <p>Current: <strong>${demoMode ? 'Demo Active' : 'Demo Off'}</strong></p>
            <button class="btn-primary" onclick="toggleDemoData()">
                ${demoMode ? 'Remove Demo Data' : 'Restore Demo Data'}
            </button>
        </div>
    `;
}

// Toggle demo data
function toggleDemoData() {
    demoMode = !demoMode;
    showToast(`Demo data ${demoMode ? 'restored' : 'removed'}`);
    switchSuperTab('demo');
}

// Make functions globally available
window.switchSuperTab = switchSuperTab;
window.toggleDemoData = toggleDemoData;
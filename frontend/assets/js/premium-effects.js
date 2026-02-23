// Premium Effects and Animations
document.addEventListener('DOMContentLoaded', function() {
    console.log('Premium effects loaded');
    
    // Initialize Particles
    initializeParticles();
    
    // Initialize Animated Counters
    initializeCounters();
    
    // Initialize Progress Rings
    initializeProgressRings();
    
    // Initialize Chart
    initializePerformanceChart();
    
    // Premium Scroll Effects
    initializeScrollEffects();
    
    // Premium Hover Effects
    initializeHoverEffects();
    
    // AI Assistant
    initializeAIAssistant();
    
    // Sound Effects (optional)
    initializeSoundEffects();
});

// Particle System
function initializeParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    // Create more particles
    for (let i = 9; i <= 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            --i: ${i};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(255, 209, 102, ${Math.random() * 0.3});
        `;
        container.appendChild(particle);
    }
}

// Animated Counters
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const speed = 2000; // 2 seconds
        const increment = target / (speed / 16); // 60fps
        
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = current.toFixed(1);
                setTimeout(updateCounter, 16);
            } else {
                counter.textContent = target.toFixed(1);
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// Progress Rings
function initializeProgressRings() {
    const progressRings = document.querySelectorAll('.progress-ring[data-progress]');
    
    progressRings.forEach(ring => {
        const progress = ring.dataset.progress;
        const circle = ring.querySelector('.progress-ring-circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        // Animate progress
        setTimeout(() => {
            const offset = circumference - (progress / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }, 500);
    });
    
    // Score circles
    const scoreCircles = document.querySelectorAll('.score-circle[data-percent]');
    
    scoreCircles.forEach(circle => {
        const percent = circle.dataset.percent;
        const radius = 28;
        const circumference = radius * 2 * Math.PI;
        const svgNS = "http://www.w3.org/2000/svg";
        
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "60");
        svg.setAttribute("height", "60");
        svg.setAttribute("viewBox", "0 0 60 60");
        
        const backgroundCircle = document.createElementNS(svgNS, "circle");
        backgroundCircle.setAttribute("cx", "30");
        backgroundCircle.setAttribute("cy", "30");
        backgroundCircle.setAttribute("r", radius.toString());
        backgroundCircle.setAttribute("fill", "none");
        backgroundCircle.setAttribute("stroke", "rgba(255, 255, 255, 0.1)");
        backgroundCircle.setAttribute("stroke-width", "3");
        
        const progressCircle = document.createElementNS(svgNS, "circle");
        progressCircle.setAttribute("cx", "30");
        progressCircle.setAttribute("cy", "30");
        progressCircle.setAttribute("r", radius.toString());
        progressCircle.setAttribute("fill", "none");
        progressCircle.setAttribute("stroke", "currentColor");
        progressCircle.setAttribute("stroke-width", "3");
        progressCircle.setAttribute("stroke-linecap", "round");
        progressCircle.setAttribute("transform", "rotate(-90 30 30)");
        progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        progressCircle.style.strokeDashoffset = circumference;
        
        svg.appendChild(backgroundCircle);
        svg.appendChild(progressCircle);
        circle.insertBefore(svg, circle.firstChild);
        
        // Animate progress
        setTimeout(() => {
            const offset = circumference - (percent / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
        }, 800);
    });
}

// Performance Chart
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;
    
    const chart = new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
            datasets: [{
                label: 'Mathematics',
                data: [70, 68, 65, 63, 62, 65],
                borderColor: '#FFD166',
                backgroundColor: 'rgba(255, 209, 102, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#FFD166',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }, {
                label: 'English',
                data: [80, 82, 85, 88, 90, 92],
                borderColor: '#06D6A0',
                backgroundColor: 'rgba(6, 214, 160, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#06D6A0',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#94a3b8',
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    titleColor: '#e2e8f0',
                    bodyColor: '#cbd5e1',
                    borderColor: 'rgba(255, 209, 102, 0.3)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#94a3b8',
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    min: 50,
                    max: 100
                }
            }
        }
    });
}

// Scroll Effects
function initializeScrollEffects() {
    let lastScroll = 0;
    const heroSection = document.getElementById('heroSection');
    const nav = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Parallax effect for background blurs
        const scrolled = currentScroll / (document.body.scrollHeight - window.innerHeight);
        document.querySelectorAll('.bg-blur-1, .bg-blur-2, .bg-blur-3').forEach((blur, index) => {
            blur.style.transform = `translateY(${currentScroll * (0.3 + index * 0.1)}px)`;
        });
        
        // Hero section collapse
        if (heroSection) {
            if (currentScroll > 100) {
                heroSection.classList.add('collapsed');
            } else {
                heroSection.classList.remove('collapsed');
            }
        }
        
        // Navbar hide/show on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        // Fade in elements on scroll
        const fadeElements = document.querySelectorAll('.glass-card, .section-header');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
        
        lastScroll = currentScroll;
    });
    
    // Initial fade in for elements
    const fadeElements = document.querySelectorAll('.glass-card, .section-header');
    fadeElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Hover Effects
function initializeHoverEffects() {
    // Glass card hover effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
        
        // Add CSS for gradient follow effect
        if (!document.querySelector('#hover-styles')) {
            const style = document.createElement('style');
            style.id = 'hover-styles';
            style.textContent = `
                .glass-card {
                    position: relative;
                    overflow: hidden;
                }
                
                .glass-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: radial-gradient(
                        600px circle at var(--mouse-x) var(--mouse-y),
                        rgba(255, 209, 102, 0.1),
                        transparent 40%
                    );
                    opacity: 0;
                    transition: opacity 0.3s;
                    pointer-events: none;
                }
                
                .glass-card:hover::before {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        }
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.premium-btn, .glass-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add ripple animation
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });
}

// AI Assistant
function initializeAIAssistant() {
    const aiModal = document.getElementById('aiAssistant');
    const aiClose = document.querySelector('.ai-modal-close');
    
    // Show AI assistant after 3 seconds
    setTimeout(() => {
        if (aiModal) {
            aiModal.style.display = 'block';
        }
    }, 3000);
    
    // Close AI assistant
    if (aiClose) {
        aiClose.addEventListener('click', () => {
            aiModal.style.display = 'none';
        });
    }
    
    // AI typing effect
    const aiMessages = [
        "Analyzing Sarah's performance trends...",
        "Mathematics improvement detected!",
        "Recommendation: Focus on algebra exercises",
        "Science project deadline approaching",
        "Attendance pattern: Excellent on Mondays"
    ];
    
    let currentMessage = 0;
    const aiBubble = document.querySelector('.ai-message-bubble p');
    
    if (aiBubble) {
        setInterval(() => {
            currentMessage = (currentMessage + 1) % aiMessages.length;
            
            // Typing effect
            const message = aiMessages[currentMessage];
            let i = 0;
            
            aiBubble.textContent = '';
            const typeWriter = () => {
                if (i < message.length) {
                    aiBubble.textContent += message.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            typeWriter();
        }, 8000);
    }
}

// Sound Effects (Optional)
function initializeSoundEffects() {
    // Only enable if user hasn't disabled sounds
    if (localStorage.getItem('soundEnabled') !== 'false') {
        const buttons = document.querySelectorAll('.premium-btn, .glass-btn, .btn-action');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Create subtle click sound
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.value = 800;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            });
        });
    }
}

// Premium Notification System
function showPremiumNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `premium-toast toast-${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type]}"></i>
        </div>
        <div class="toast-content">
            <h6>${title}</h6>
            <p>${message}</p>
        </div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .premium-toast {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px 20px;
                display: flex;
                align-items: center;
                gap: 15px;
                z-index: 9999;
                max-width: 400px;
                animation: toastSlideIn 0.3s ease;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            }
            
            @keyframes toastSlideIn {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .toast-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .toast-success .toast-icon {
                background: rgba(6, 214, 160, 0.2);
                color: #06D6A0;
            }
            
            .toast-error .toast-icon {
                background: rgba(239, 71, 111, 0.2);
                color: #ef476f;
            }
            
            .toast-warning .toast-icon {
                background: rgba(255, 209, 102, 0.2);
                color: #FFD166;
            }
            
            .toast-info .toast-icon {
                background: rgba(17, 138, 178, 0.2);
                color: #118AB2;
            }
            
            .toast-content h6 {
                margin: 0 0 5px;
                font-size: 14px;
                color: #ffffff;
            }
            
            .toast-content p {
                margin: 0;
                font-size: 12px;
                color: #94a3b8;
            }
            
            .toast-close {
                background: transparent;
                border: none;
                color: #64748b;
                cursor: pointer;
                padding: 5px;
                margin-left: auto;
                transition: color 0.3s;
            }
            
            .toast-close:hover {
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Close button
    const closeBtn = notification.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'toastSlideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'toastSlideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Add slide out animation
    if (!document.querySelector('#toast-slide-out')) {
        const style = document.createElement('style');
        style.id = 'toast-slide-out';
        style.textContent = `
            @keyframes toastSlideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Export premium functions to window
window.showPremiumNotification = showPremiumNotification;
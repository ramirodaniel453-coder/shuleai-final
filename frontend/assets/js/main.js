// Main JavaScript for landing page
document.addEventListener('DOMContentLoaded', function() {
    console.log('ShuleAI School Monitoring System loaded');
    
    // Add animation to role cards
    const roleCards = document.querySelectorAll('.role-card');
    roleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Display welcome message
    const welcomeMessages = [
        "Welcome to ShuleAI - Empowering Education",
        "Teachers input data → System interprets data → Parents receive insights",
        "Students learn, interact, and grow in a supportive environment",
        "Admins oversee everything for optimal school performance"
    ];
    
    let currentMessage = 0;
    const tagline = document.querySelector('.tagline');
    
    if (tagline) {
        setInterval(() => {
            tagline.style.opacity = '0';
            setTimeout(() => {
                tagline.textContent = welcomeMessages[currentMessage];
                tagline.style.opacity = '1';
                currentMessage = (currentMessage + 1) % welcomeMessages.length;
            }, 500);
        }, 5000);
    }
});
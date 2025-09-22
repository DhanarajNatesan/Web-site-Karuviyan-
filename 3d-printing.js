/* ==========================================
   3D PRINTING SERVICES - INTERACTIVE JAVASCRIPT
   Modern animations with GSAP and smooth interactions
   ========================================== */

// Global variables
let isAnimationInitialized = false;
let tl = null;

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeInteractions();
    initializeScrollAnimations();
    initializeFormHandling();
    initializePrinterAnimation();
    
    console.log('3D Printing Services - All systems initialized');
});

/* ==========================================
   GSAP ANIMATIONS INITIALIZATION
   ========================================== */

function initializeAnimations() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Set initial states
    gsap.set('.hero-text', { opacity: 0, y: 50 });
    gsap.set('.category-card', { opacity: 0, y: 30, rotationY: -15 });
    gsap.set('.feature-item', { opacity: 0, scale: 0.8 });
    gsap.set('.printer-animation', { opacity: 0, scale: 0.8, rotation: -10 });
    
    // Hero animation timeline
    const heroTl = gsap.timeline({ delay: 0.5 });
    heroTl
        .to('.hero-text', { 
            duration: 1, 
            opacity: 1, 
            y: 0, 
            ease: 'power3.out' 
        })
        .to('.printer-animation', { 
            duration: 1.2, 
            opacity: 1, 
            scale: 1, 
            rotation: 0, 
            ease: 'back.out(1.7)' 
        }, '-=0.5');
    
    // Category cards staggered animation
    gsap.to('.category-card', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        rotationY: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.subcategories-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Features animation
    gsap.to('.feature-item', {
        duration: 0.6,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    isAnimationInitialized = true;
}

/* ==========================================
   3D PRINTER ANIMATION
   ========================================== */

function initializePrinterAnimation() {
    const printerTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    
    // Nozzle movement animation
    printerTl
        .to('.printer-nozzle', {
            duration: 2,
            x: 50,
            ease: 'power2.inOut'
        })
        .to('.printer-nozzle', {
            duration: 0.5,
            y: 5,
            ease: 'power2.out'
        })
        .to('.printer-nozzle', {
            duration: 2,
            x: 100,
            ease: 'power2.inOut'
        })
        .to('.printer-nozzle', {
            duration: 0.5,
            y: 0,
            ease: 'power2.out'
        })
        .to('.printer-nozzle', {
            duration: 3,
            x: 0,
            ease: 'power2.inOut'
        });
    
    // Layer building animation
    gsap.to('.print-layers', {
        duration: 8,
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power2.out',
        repeat: -1,
        repeatDelay: 2
    });
    
    // Floating printer animation
    gsap.to('.printer-animation', {
        duration: 4,
        y: -10,
        rotation: 2,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true
    });
}

/* ==========================================
   INTERACTIVE CARD ANIMATIONS
   ========================================== */

function initializeInteractions() {
    const cards = document.querySelectorAll('.category-card');
    
    cards.forEach((card, index) => {
        // Mouse enter animation
        card.addEventListener('mouseenter', function(e) {
            const cardTl = gsap.timeline();
            
            // Main card animation
            cardTl
                .to(card, {
                    duration: 0.4,
                    y: -15,
                    rotationX: 5,
                    rotationY: 5,
                    scale: 1.02,
                    ease: 'power3.out'
                })
                .to(card.querySelector('.card-icon'), {
                    duration: 0.6,
                    rotation: 360,
                    scale: 1.1,
                    ease: 'back.out(1.7)'
                }, '-=0.2')
                .to(card.querySelectorAll('.card-features li'), {
                    duration: 0.3,
                    opacity: 1,
                    x: 0,
                    stagger: 0.1,
                    ease: 'power2.out'
                }, '-=0.4')
                .to(card.querySelector('.card-arrow'), {
                    duration: 0.3,
                    scale: 1,
                    rotation: 360,
                    ease: 'back.out(1.7)'
                }, '-=0.2');
            
            // Specific card type animations
            animateCardType(card, index);
            
            // Particle effect
            createParticleEffect(card);
        });
        
        // Mouse leave animation
        card.addEventListener('mouseleave', function(e) {
            gsap.to(card, {
                duration: 0.4,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: 'power3.out'
            });
            
            gsap.to(card.querySelector('.card-icon'), {
                duration: 0.4,
                rotation: 0,
                scale: 1,
                ease: 'power3.out'
            });
            
            gsap.to(card.querySelectorAll('.card-features li'), {
                duration: 0.2,
                opacity: 0,
                x: -20,
                ease: 'power2.out'
            });
            
            gsap.to(card.querySelector('.card-arrow'), {
                duration: 0.2,
                scale: 0,
                ease: 'power2.out'
            });
        });
        
        // Click animation with ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(e, card);
            
            // Navigation delay for smooth transition
            setTimeout(() => {
                if (card.onclick) {
                    card.onclick();
                }
            }, 300);
        });
        
        // Touch support for mobile
        card.addEventListener('touchstart', function(e) {
            card.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function(e) {
            setTimeout(() => {
                card.classList.remove('touch-active');
            }, 300);
        });
    });
    
    // Button interactions
    initializeButtonAnimations();
}

/* ==========================================
   CARD TYPE SPECIFIC ANIMATIONS
   ========================================== */

function animateCardType(card, index) {
    const icon = card.querySelector('.card-icon');
    
    switch(index) {
        case 0: // Filaments
            gsap.to(icon, {
                duration: 1,
                background: 'linear-gradient(135deg, #6C55F9, #8B7CF6, #A855F7)',
                backgroundSize: '200% 200%',
                ease: 'power2.out'
            });
            
            // Filament flow effect
            gsap.to(icon, {
                duration: 2,
                backgroundPosition: '100% 50%',
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
            break;
            
        case 1: // Printer Parts
            // Gear rotation effect
            gsap.to(icon.querySelector('i'), {
                duration: 2,
                rotation: 720,
                ease: 'power2.out',
                repeat: -1
            });
            break;
            
        case 2: // Resins
            // Liquid glow effect
            gsap.to(icon, {
                duration: 1.5,
                boxShadow: '0 0 30px rgba(108, 85, 249, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
            break;
    }
}

/* ==========================================
   BUTTON ANIMATIONS
   ========================================== */

function initializeButtonAnimations() {
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                y: -3,
                ease: 'power3.out'
            });
            
            // Glow effect
            gsap.to(this, {
                duration: 1,
                boxShadow: '0 15px 45px rgba(108, 85, 249, 0.4)',
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                y: 0,
                boxShadow: '0 8px 32px rgba(108, 85, 249, 0.3)',
                ease: 'power3.out'
            });
        });
        
        button.addEventListener('click', function(e) {
            createButtonRipple(e, this);
            
            // Click animation
            gsap.to(this, {
                duration: 0.1,
                scale: 0.95,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(this, {
                        duration: 0.2,
                        scale: 1.05,
                        ease: 'back.out(1.7)'
                    });
                }
            });
        });
    });
}

/* ==========================================
   SCROLL ANIMATIONS
   ========================================== */

function initializeScrollAnimations() {
    // Parallax effect for hero section
    gsap.to('.printer-animation', {
        y: -100,
        scrollTrigger: {
            trigger: '.hero-3d',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
    
    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const finalValue = stat.textContent;
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/[\d\s]/g, '');
        
        stat.textContent = '0' + suffix;
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 80%',
            onEnter: () => animateCounter(stat, numericValue, suffix)
        });
    });
    
    // Navbar scroll effect
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: '.navbar' }
    });
    
    // Section reveals
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

/* ==========================================
   PARTICLE EFFECTS
   ========================================== */

function createParticleEffect(card) {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        border-radius: 24px;
        z-index: 1;
    `;
    
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #6C55F9, #A855F7);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: 0;
        `;
        
        particleContainer.appendChild(particle);
        
        gsap.to(particle, {
            duration: 1 + Math.random(),
            opacity: 1,
            y: -50 - Math.random() * 50,
            x: (Math.random() - 0.5) * 100,
            ease: 'power2.out',
            onComplete: () => particle.remove()
        });
    }
    
    card.appendChild(particleContainer);
    
    setTimeout(() => {
        if (particleContainer.parentNode) {
            particleContainer.remove();
        }
    }, 2000);
}

/* ==========================================
   RIPPLE EFFECTS
   ========================================== */

function createRippleEffect(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(108, 85, 249, 0.3);
        width: 20px;
        height: 20px;
        left: ${x - 10}px;
        top: ${y - 10}px;
        transform: scale(0);
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    gsap.to(ripple, {
        duration: 0.6,
        scale: 20,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
    });
}

function createButtonRipple(e, button) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    gsap.to(ripple, {
        duration: 0.6,
        scale: 1,
        opacity: 0,
        ease: 'power2.out',
        onComplete: () => ripple.remove()
    });
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

function animateCounter(element, target, suffix) {
    const obj = { value: 0 };
    
    gsap.to(obj, {
        duration: 2,
        value: target,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value) + suffix;
        }
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        gsap.to(window, {
            duration: 1,
            scrollTo: { y: section, offsetY: 100 },
            ease: 'power2.inOut'
        });
    }
}

function navigateToCategory(url) {
    // Page transition animation
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6C55F9, #8B7CF6);
        z-index: 10000;
        transform: translateY(100%);
    `;
    
    document.body.appendChild(overlay);
    
    gsap.to(overlay, {
        duration: 0.5,
        y: 0,
        ease: 'power3.inOut',
        onComplete: () => {
            window.location.href = url;
        }
    });
}

/* ==========================================
   FORM HANDLING
   ========================================== */

function initializeFormHandling() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.innerHTML;
        
        // Loading animation
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });
    
    // Form field animations
    const formFields = form.querySelectorAll('input, textarea, select');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.02,
                ease: 'power2.out'
            });
        });
        
        field.addEventListener('blur', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
}

/* ==========================================
   RESPONSIVE BEHAVIOR
   ========================================== */

function handleResponsiveAnimations() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Disable complex animations on mobile
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.animation) {
                trigger.animation.duration(0.5);
            }
        });
    }
}

window.addEventListener('resize', gsap.utils.throttle(handleResponsiveAnimations, 250));

/* ==========================================
   ACCESSIBILITY & PERFORMANCE
   ========================================== */

// Respect reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0.01);
    ScrollTrigger.config({ ignoreMobileResize: true });
}

// Intersection Observer for performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const performanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe elements for performance optimizations
document.querySelectorAll('.category-card, .feature-item').forEach(el => {
    performanceObserver.observe(el);
});

/* ==========================================
   KEYBOARD NAVIGATION SUPPORT
   ========================================== */

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
    
    if (e.key === 'Enter' && e.target.classList.contains('category-card')) {
        e.target.click();
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

/* ==========================================
   ERROR HANDLING & FALLBACKS
   ========================================== */

window.addEventListener('error', function(e) {
    console.warn('Animation error caught:', e.error);
    // Fallback to CSS animations if GSAP fails
    document.body.classList.add('fallback-animations');
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.navigateToCategory = navigateToCategory;

console.log('3D Printing Services JavaScript loaded successfully!');

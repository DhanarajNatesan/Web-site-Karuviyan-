// Theme Management
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.body = document.body;
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }

    init() {
        // Apply theme immediately to prevent flash
        this.setTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Add transition after initial load
        setTimeout(() => {
            this.body.style.transition = 'all 0.3s ease';
        }, 100);
    }

    setTheme(theme) {
        // Use data-theme attribute instead of className to match CSS selectors
        if (theme === 'dark') {
            this.body.setAttribute('data-theme', 'dark');
        } else {
            this.body.removeAttribute('data-theme');
        }
        
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        
        // Update meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#ffffff');
        }
        
        // Trigger custom event for other components
        window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
        
        // Add subtle animation to the toggle button
        this.themeToggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    }
}

// Mobile Menu Management
class MobileMenu {
    constructor() {
        this.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.dropdowns = document.querySelectorAll('.dropdown');
        
        this.init();
    }

    init() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMenu());
        }
        
        // Close menu when clicking on non-dropdown links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('dropdown-toggle') || window.innerWidth > 768) {
                    this.closeMenu();
                }
            });
        });

        // Handle mobile dropdown toggles
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        dropdown.classList.toggle('active');
                        
                        // Close other dropdowns
                        this.dropdowns.forEach(otherDropdown => {
                            if (otherDropdown !== dropdown) {
                                otherDropdown.classList.remove('active');
                            }
                        });
                    }
                });
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMenu();
                this.closeAllDropdowns();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
                this.closeAllDropdowns();
            }
        });
    }

    toggleMenu() {
        if (this.navMenu && this.mobileToggle) {
            this.navMenu.classList.toggle('active');
            this.mobileToggle.classList.toggle('active');
        }
    }

    closeMenu() {
        if (this.navMenu && this.mobileToggle) {
            this.navMenu.classList.remove('active');
            this.mobileToggle.classList.remove('active');
        }
    }

    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section, .hero-section');
        
        this.init();
    }

    init() {
        // Smooth scrolling for navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                
                // Only prevent default for internal anchor links (starting with #)
                if (targetId && targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // For external links like blog.html, let the default behavior happen
            });
        });

        // Active link highlighting on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }

    updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Interactive Canvas for Hero Section
class InteractiveCanvas {
    constructor() {
        this.canvas = document.getElementById('interactiveCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isHovering = false;
        
        this.init();
    }

    init() {
        this.resize();
        this.createParticles();
        this.addEventListeners();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                color: Math.random() > 0.5 ? '#6C55F9' : '#898798'
            });
        }
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.isHovering = true;
        });

        this.canvas.addEventListener('mouseleave', () => {
            this.isHovering = false;
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Mouse interaction
            if (this.isHovering) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.x -= dx * force * 0.01;
                    particle.y -= dy * force * 0.01;
                    particle.opacity = Math.min(1, particle.opacity + force * 0.1);
                }
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 150) * 0.3 * 255).toString(16).padStart(2, '0')}`;
                        this.ctx.lineWidth = 0.5;
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Mechanical Parts Animation
class MechanicalParts {
    constructor() {
        this.parts = [];
        this.init();
    }

    init() {
        this.createParts();
        this.animate();
    }

    createParts() {
        const partCount = 8;
        
        for (let i = 0; i < partCount; i++) {
            this.parts.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotation: Math.random() * 360,
                speed: Math.random() * 2 + 1,
                size: Math.random() * 20 + 10,
                type: Math.floor(Math.random() * 3), // 0: gear, 1: piston, 2: spring
                opacity: Math.random() * 0.3 + 0.1
            });
        }
    }

    drawGear(ctx, x, y, size, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = '#6C55F9';
        ctx.lineWidth = 2;
        
        // Draw gear teeth
        const teeth = 8;
        const innerRadius = size * 0.3;
        const outerRadius = size;
        
        for (let i = 0; i < teeth; i++) {
            const angle = (i * 2 * Math.PI) / teeth;
            const nextAngle = ((i + 1) * 2 * Math.PI) / teeth;
            
            ctx.beginPath();
            ctx.arc(0, 0, outerRadius, angle, nextAngle);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(0, 0, innerRadius, angle, nextAngle);
            ctx.stroke();
        }
        
        ctx.restore();
    }

    drawPiston(ctx, x, y, size, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = '#898798';
        ctx.lineWidth = 3;
        
        // Draw piston body
        ctx.beginPath();
        ctx.rect(-size/2, -size/4, size, size/2);
        ctx.stroke();
        
        // Draw piston rod
        ctx.beginPath();
        ctx.moveTo(size/2, 0);
        ctx.lineTo(size, 0);
        ctx.stroke();
        
        ctx.restore();
    }

    drawSpring(ctx, x, y, size, rotation, opacity) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = '#6C55F9';
        ctx.lineWidth = 2;
        
        // Draw spring coils
        const coils = 5;
        const coilHeight = size / coils;
        
        ctx.beginPath();
        for (let i = 0; i < coils; i++) {
            const y1 = i * coilHeight - size/2;
            const y2 = (i + 1) * coilHeight - size/2;
            
            ctx.moveTo(-size/4, y1);
            ctx.quadraticCurveTo(-size/2, (y1 + y2)/2, -size/4, y2);
            ctx.moveTo(size/4, y1);
            ctx.quadraticCurveTo(size/2, (y1 + y2)/2, size/4, y2);
        }
        ctx.stroke();
        
        ctx.restore();
    }

    animate() {
        this.parts.forEach(part => {
            part.rotation += part.speed;
            
            // Bounce off edges
            if (part.x < 0 || part.x > window.innerWidth) part.speed *= -1;
            if (part.y < 0 || part.y > window.innerHeight) part.speed *= -1;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Cursor Effects
class CursorEffects {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.init();
    }

    init() {
        this.cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #6C55F9 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(this.cursor);
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX - 10 + 'px';
            this.cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Add hover effects for buttons
        document.querySelectorAll('.cta-button').forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursor.style.background = 'radial-gradient(circle, #898798 0%, transparent 70%)';
            });
            
            button.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursor.style.background = 'radial-gradient(circle, #6C55F9 0%, transparent 70%)';
            });
        });
    }
}

// Parallax Effect
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-shape');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Form Handling
class FormHandler {
    constructor() {
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this.contactForm);
        const name = this.contactForm.querySelector('input[type="text"]').value;
        const email = this.contactForm.querySelector('input[type="email"]').value;
        const message = this.contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        this.showNotification('Message sent successfully!', 'success');
        this.contactForm.reset();
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Dropdown Management
class DropdownManager {
    constructor() {
        this.dropdownParents = document.querySelectorAll('.has-dropdown');
        this.mobileToggle = document.getElementById('mobile-menu-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        // Click to toggle on mobile
        this.dropdownParents.forEach(parent => {
            const trigger = parent.querySelector('.nav-link');
            if (!trigger) return;

            trigger.addEventListener('click', (e) => {
                // Only toggle as menu on mobile view where nav-menu is positioned fixed
                const isMobile = window.matchMedia('(max-width: 768px)').matches;
                if (isMobile) {
                    e.preventDefault();
                    const isOpen = parent.classList.toggle('open');
                    trigger.setAttribute('aria-expanded', String(isOpen));

                    // Close siblings
                    if (isOpen) {
                        this.dropdownParents.forEach(other => {
                            if (other !== parent) {
                                other.classList.remove('open');
                                const otherTrigger = other.querySelector('.nav-link');
                                if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
                            }
                        });
                    }
                }
            });
        });

        // Close all when menu closes
        const closeAll = () => {
            this.dropdownParents.forEach(parent => {
                parent.classList.remove('open');
                const trigger = parent.querySelector('.nav-link');
                if (trigger) trigger.setAttribute('aria-expanded', 'false');
            });
        };

        // Listen for mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                if (!this.navMenu.classList.contains('active')) {
                    // menu is closing
                    closeAll();
                }
            });
        }

        // Close on resize to desktop
        window.addEventListener('resize', () => {
            if (!window.matchMedia('(max-width: 768px)').matches) {
                closeAll();
            }
        });
    }
}

// Initialize all effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new MobileMenu();
    new NavigationManager();
    new InteractiveCanvas();
    new MechanicalParts();
    new CursorEffects();
    new ParallaxEffect();
    new FormHandler();
    new DropdownManager(); // Initialize DropdownManager after DOMContentLoaded init block
    
    // Add loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);

    // Sticky navbar on scroll
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 10) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Button click handlers
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
        
        // Handle button actions
        if (button.textContent.includes('Quote')) {
            console.log('Get Quote clicked');
            // Add your quote form logic here
        } else if (button.textContent.includes('Services')) {
            console.log('Explore Services clicked');
            // Scroll to services section
            const servicesSection = document.querySelector('#services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
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
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Customers page initialization
window.initCustomersPage = function initCustomersPage() {
    // Filters
    const filters = document.getElementById('customer-filters');
    const grid = document.getElementById('customers-grid');
    const cards = grid ? Array.from(grid.querySelectorAll('.customer-card')) : [];
    if (filters && cards.length) {
        filters.addEventListener('click', (e) => {
            const btn = e.target.closest('.filter-btn');
            if (!btn) return;
            filters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const cat = btn.getAttribute('data-filter');
            cards.forEach(card => {
                const show = cat === 'all' || card.getAttribute('data-category') === cat;
                card.style.display = show ? '' : 'none';
            });
        });
    }

    // Entrance animations
    if ('IntersectionObserver' in window && cards.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('inview');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        cards.forEach(card => io.observe(card));
    } else {
        cards.forEach(c => c.classList.add('inview'));
    }

    // Mobile carousel
    const carousel = document.getElementById('customers-carousel');
    if (!carousel) return;
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prev = document.getElementById('cust-prev');
    const next = document.getElementById('cust-next');
    const dotsWrap = document.getElementById('cust-dots');
    let index = 0;
    let auto;

    function go(i) {
        index = (i + slides.length) % slides.length;
        const offset = slides[index].offsetLeft;
        track.scrollTo({ left: offset, behavior: 'smooth' });
        if (dotsWrap) {
            dotsWrap.querySelectorAll('button').forEach((d, di) => d.classList.toggle('active', di === index));
        }
    }

    // dots
    if (dotsWrap) {
        dotsWrap.innerHTML = '';
        slides.forEach((_, i) => {
            const b = document.createElement('button');
            if (i === 0) b.classList.add('active');
            b.addEventListener('click', () => go(i));
            dotsWrap.appendChild(b);
        });
    }

    prev && prev.addEventListener('click', () => { go(index - 1); restart(); });
    next && next.addEventListener('click', () => { go(index + 1); restart(); });

    // autoplay
    function start() { auto = setInterval(() => go(index + 1), 4000); }
    function stop() { clearInterval(auto); }
    function restart() { stop(); start(); }
    start();

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);

    // swipe
    let startX = 0, isDown = false;
    track.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; isDown = true; stop(); }, { passive: true });
    track.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const dx = e.touches[0].clientX - startX;
        if (Math.abs(dx) > 40) {
            isDown = false;
            if (dx < 0) go(index + 1); else go(index - 1);
            restart();
        }
    }, { passive: true });
    track.addEventListener('touchend', () => { isDown = false; start(); });
};

// Blog page initialization
window.initBlogPage = function initBlogPage() {
    const grid = document.getElementById('blog-grid');
    const cards = grid ? Array.from(grid.querySelectorAll('.blog-card-page')) : [];
    const categories = document.getElementById('blog-categories');
    const searchInput = document.getElementById('blog-search');

    // Entrance animations
    if ('IntersectionObserver' in window && cards.length) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('inview');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        cards.forEach(card => io.observe(card));
    } else {
        cards.forEach(c => c.classList.add('inview'));
    }

    function applyFilters() {
        const activeBtn = categories?.querySelector('.cat-btn.active');
        const cat = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
        const query = (searchInput?.value || '').toLowerCase().trim();
        cards.forEach(card => {
            const inCat = cat === 'all' || card.getAttribute('data-category') === cat;
            const title = (card.getAttribute('data-title') || '').toLowerCase();
            const text = card.innerText.toLowerCase();
            const matches = !query || title.includes(query) || text.includes(query);
            card.style.display = (inCat && matches) ? '' : 'none';
        });
    }

    categories?.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-btn');
        if (!btn) return;
        categories.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilters();
    });
    searchInput?.addEventListener('input', () => {
        applyFilters();
    });
};

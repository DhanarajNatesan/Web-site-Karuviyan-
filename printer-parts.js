/* ==========================================
   PRINTER PARTS PAGE - JAVASCRIPT
   Clean & Professional Implementation
   ========================================== */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    initializeAnimations();
    console.log('Printer Parts page loaded successfully! 🚀');
});

/* ==========================================
   CONTACT FORM HANDLING
   ========================================== */

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearErrorState);
        });
    }
}

function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    const successMessage = document.getElementById('successMessage');
    
    // Clear any previous errors
    clearAllErrors(form);
    
    // Validate form
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    showLoadingState(submitBtn);
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        hideLoadingState(submitBtn);
        showSuccessMessage(form, successMessage);
        resetForm(form);
    }, 1500);
}

/* ==========================================
   FORM VALIDATION
   ========================================== */

function validateForm(form) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        showFieldError(form.name, 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError(form.name, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError(form.email, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError(form.email, 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showFieldError(form.message, 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError(form.message, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (field.name) {
        case 'name':
            if (value && value.length < 2) {
                showFieldError(field, 'Name must be at least 2 characters');
            }
            break;
        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Please enter a valid email address');
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                showFieldError(field, 'Message must be at least 10 characters');
            }
            break;
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/* ==========================================
   UI FEEDBACK FUNCTIONS
   ========================================== */

function showLoadingState(button) {
    button.disabled = true;
    button.classList.add('loading');
    
    const icon = button.querySelector('i');
    const text = button.lastChild;
    
    if (icon) {
        icon.className = 'fas fa-spinner fa-spin';
    }
    
    if (text && text.nodeType === Node.TEXT_NODE) {
        text.textContent = 'Sending...';
    }
}

function hideLoadingState(button) {
    button.disabled = false;
    button.classList.remove('loading');
    
    const icon = button.querySelector('i');
    const text = button.lastChild;
    
    if (icon) {
        icon.className = 'fas fa-paper-plane';
    }
    
    if (text && text.nodeType === Node.TEXT_NODE) {
        text.textContent = 'Send Message';
    }
}

function showSuccessMessage(form, successMessage) {
    // Hide form and show success message
    form.style.display = 'none';
    successMessage.style.display = 'flex';
    
    // Add animation
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        successMessage.style.transition = 'all 0.4s ease';
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
    }, 100);
    
    // Reset after 5 seconds
    setTimeout(() => {
        resetContactSection(form, successMessage);
    }, 5000);
}

function resetContactSection(form, successMessage) {
    successMessage.style.transition = 'all 0.4s ease';
    successMessage.style.opacity = '0';
    successMessage.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        successMessage.style.display = 'none';
        form.style.display = 'flex';
        form.style.opacity = '0';
        form.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            form.style.transition = 'all 0.4s ease';
            form.style.opacity = '1';
            form.style.transform = 'translateY(0)';
        }, 100);
    }, 400);
}

function resetForm(form) {
    form.reset();
    clearAllErrors(form);
}

/* ==========================================
   ERROR HANDLING
   ========================================== */

function showFieldError(field, message) {
    const formGroup = field.closest('.form-group');
    
    // Add error class
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Insert after the input
    field.parentNode.appendChild(errorElement);
    
    // Focus the field
    field.focus();
}

function clearFieldError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function clearErrorState(event) {
    const field = event.target;
    if (field.value.trim()) {
        clearFieldError(field);
    }
}

function clearAllErrors(form) {
    const errorElements = form.querySelectorAll('.error-message');
    errorElements.forEach(error => error.remove());
    
    const errorGroups = form.querySelectorAll('.form-group.error');
    errorGroups.forEach(group => group.classList.remove('error'));
}

/* ==========================================
   ANIMATIONS & INTERACTIONS
   ========================================== */

function initializeAnimations() {
    // Intersection Observer for scroll animations
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.section-header, .contact-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }
    
    // Add hover effects to part cards
    initializeCardInteractions();
}

function initializeCardInteractions() {
    const partCards = document.querySelectorAll('.part-card');
    
    partCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
}

/* ==========================================
   UTILITY FUNCTIONS
   ========================================== */

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize smooth scrolling
document.addEventListener('DOMContentLoaded', initializeSmoothScroll);

/* ==========================================
   ACCESSIBILITY ENHANCEMENTS
   ========================================== */

// Keyboard navigation for form
document.addEventListener('keydown', function(e) {
    // Submit form with Ctrl/Cmd + Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const form = document.getElementById('contactForm');
        if (form && document.activeElement && form.contains(document.activeElement)) {
            form.dispatchEvent(new Event('submit'));
        }
    }
});

// Focus management
function manageFocus() {
    const inputs = document.querySelectorAll('input, textarea, button');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        input.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

/* ==========================================
   PERFORMANCE OPTIMIZATIONS
   ========================================== */

// Lazy load non-critical resources
function lazyLoadResources() {
    // Preload critical images
    const criticalImages = [
        // Add any critical image URLs here
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadResources);

// Console message for developers
console.log(`
🔧 3D Printer Parts Page
📧 Contact form ready
✨ Animations loaded
🎯 All systems operational
`);

/* ==========================================
   FORM DATA HANDLING (FOR INTEGRATION)
   ========================================== */

// Function to handle actual form submission to server
function submitToServer(formData) {
    // Example implementation for actual server integration
    return fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .catch(error => {
        console.error('Error:', error);
        throw error;
    });
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        submitToServer
    };
}

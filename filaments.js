// Filaments Page JavaScript
class FilamentsManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentProperties = [];
        this.init();
    }

    init() {
        this.setupFilters();
        this.setupCardInteractions();
        this.setupAnimations();
        this.setupSearch();
    }

    // Setup filter functionality
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
    }

    // Handle filter button clicks
    handleFilterClick(button) {
        const filterType = button.dataset.filter;
        const propertyType = button.dataset.property;

        if (filterType) {
            // Handle category filters
            this.handleCategoryFilter(button, filterType);
        } else if (propertyType) {
            // Handle property filters
            this.handlePropertyFilter(button, propertyType);
        }
    }

    // Handle category filtering
    handleCategoryFilter(button, filterType) {
        // Remove active class from all category buttons
        const categoryButtons = document.querySelectorAll('.filter-btn[data-filter]');
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        this.currentFilter = filterType;
        this.applyFilters();
    }

    // Handle property filtering
    handlePropertyFilter(button, propertyType) {
        // Toggle property filter
        if (this.currentProperties.includes(propertyType)) {
            // Remove property
            this.currentProperties = this.currentProperties.filter(prop => prop !== propertyType);
            button.classList.remove('active');
        } else {
            // Add property
            this.currentProperties.push(propertyType);
            button.classList.add('active');
        }
        
        this.applyFilters();
    }

    // Apply current filters to cards
    applyFilters() {
        const cards = document.querySelectorAll('.filament-card');
        let visibleCount = 0;

        cards.forEach(card => {
            const shouldShow = this.shouldShowCard(card);
            
            if (shouldShow) {
                this.showCard(card, visibleCount);
                visibleCount++;
            } else {
                this.hideCard(card);
            }
        });

        // Update results count
        this.updateResultsCount(visibleCount);
    }

    // Check if card should be shown based on filters
    shouldShowCard(card) {
        const cardCategory = card.dataset.category;
        const cardProperties = card.dataset.properties ? card.dataset.properties.split(' ') : [];

        // Check category filter
        const categoryMatch = this.currentFilter === 'all' || cardCategory === this.currentFilter;

        // Check property filters
        const propertyMatch = this.currentProperties.length === 0 || 
            this.currentProperties.every(prop => cardProperties.includes(prop));

        return categoryMatch && propertyMatch;
    }

    // Show card with animation
    showCard(card, index) {
        card.style.display = 'block';
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
        
        // Staggered animation
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, index * 100);
    }

    // Hide card with animation
    hideCard(card) {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
        
        setTimeout(() => {
            card.style.display = 'none';
        }, 300);
    }

    // Update results count display
    updateResultsCount(count) {
        let resultsText = document.querySelector('.results-count');
        
        if (!resultsText) {
            resultsText = document.createElement('div');
            resultsText.className = 'results-count';
            resultsText.style.cssText = `
                text-align: center;
                margin: 2rem 0;
                font-size: 1.1rem;
                color: var(--text-secondary);
                font-weight: 500;
            `;
            
            const grid = document.querySelector('.filaments-grid');
            grid.parentNode.insertBefore(resultsText, grid);
        }
        
        resultsText.textContent = `Showing ${count} filament${count !== 1 ? 's' : ''}`;
    }

    // Setup card interactions
    setupCardInteractions() {
        const cards = document.querySelectorAll('.filament-card');
        
        cards.forEach(card => {
            // Enhanced hover effects
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });

            // Button interactions
            this.setupCardButtons(card);
        });
    }

    // Setup individual card button interactions
    setupCardButtons(card) {
        const primaryBtn = card.querySelector('.btn-primary');
        const secondaryBtn = card.querySelector('.btn-secondary');

        if (primaryBtn) {
            primaryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleViewDetails(card);
            });
        }

        if (secondaryBtn) {
            secondaryBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleRequestQuote(card);
            });
        }
    }

    // Handle view details action
    handleViewDetails(card) {
        const filamentName = card.querySelector('.card-title').textContent;
        
        // Create modal or navigate to detail page
        this.showFilamentDetails(filamentName, card);
    }

    // Handle request quote action
    handleRequestQuote(card) {
        const filamentName = card.querySelector('.card-title').textContent;
        
        // Create quote request modal
        this.showQuoteModal(filamentName);
    }

    // Show filament details modal
    showFilamentDetails(name, card) {
        const modal = this.createModal('filament-details');
        const specs = card.querySelector('.card-specs').cloneNode(true);
        const features = card.querySelector('.card-features').cloneNode(true);
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${name}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="detail-specs">
                        <h3>Technical Specifications</h3>
                        ${specs.outerHTML}
                    </div>
                    <div class="detail-features">
                        <h3>Key Features</h3>
                        ${features.outerHTML}
                    </div>
                    <div class="detail-applications">
                        <h3>Recommended Applications</h3>
                        <ul>
                            <li>Prototyping and concept models</li>
                            <li>Functional mechanical parts</li>
                            <li>Educational projects</li>
                            <li>Hobby and personal use</li>
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary">Request Sample</button>
                    <button class="btn-secondary">Download Datasheet</button>
                </div>
            </div>
        `;
        
        this.showModal(modal);
    }

    // Show quote request modal
    showQuoteModal(filamentName) {
        const modal = this.createModal('quote-modal');
        
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Request Quote - ${filamentName}</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="quote-form">
                        <div class="form-group">
                            <label>Quantity Required</label>
                            <select name="quantity">
                                <option value="1kg">1 kg</option>
                                <option value="5kg">5 kg</option>
                                <option value="10kg">10 kg</option>
                                <option value="custom">Custom quantity</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Color Preference</label>
                            <select name="color">
                                <option value="natural">Natural</option>
                                <option value="black">Black</option>
                                <option value="white">White</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="other">Other (specify in notes)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Project Details</label>
                            <textarea name="details" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <div class="form-group">
                            <label>Contact Information</label>
                            <input type="email" name="email" placeholder="Your email address" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn-primary">Submit Quote Request</button>
                    <button class="btn-secondary modal-close">Cancel</button>
                </div>
            </div>
        `;
        
        this.showModal(modal);
    }

    // Create modal element
    createModal(className) {
        const modal = document.createElement('div');
        modal.className = `modal ${className}`;
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        
        return modal;
    }

    // Show modal with animation
    showModal(modal) {
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Trigger animation
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.style.visibility = 'visible';
        }, 10);

        // Setup close functionality
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.closeModal(modal));
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal(modal);
            }
        });

        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeModal(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }

    // Close modal
    closeModal(modal) {
        modal.style.opacity = '0';
        modal.style.visibility = 'hidden';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
        }, 300);
    }

    // Animate card hover effects
    animateCardHover(card, isHover) {
        const sample = card.querySelector('.filament-sample');
        
        if (isHover) {
            // Enhanced hover animations
            card.style.transform = 'translateY(-15px) scale(1.02)';
            if (sample) {
                sample.style.transform = 'scale(1.1) rotate(45deg)';
                sample.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
            }
        } else {
            // Reset animations
            card.style.transform = '';
            if (sample) {
                sample.style.transform = '';
                sample.style.boxShadow = '';
            }
        }
    }

    // Setup page animations
    setupAnimations() {
        // Animate cards on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCardEntrance(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.filament-card').forEach(card => {
            observer.observe(card);
        });
    }

    // Animate card entrance
    animateCardEntrance(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, Math.random() * 200);
    }

    // Setup search functionality
    setupSearch() {
        // Create search input if it doesn't exist
        this.createSearchInput();
    }

    // Create search input
    createSearchInput() {
        const filterHeader = document.querySelector('.filter-header');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.style.cssText = `
            margin-top: 2rem;
            text-align: center;
        `;
        
        searchContainer.innerHTML = `
            <div class="search-input-wrapper" style="
                position: relative;
                display: inline-block;
                width: 100%;
                max-width: 400px;
            ">
                <input type="text" 
                       id="filament-search" 
                       placeholder="Search filaments..."
                       style="
                           width: 100%;
                           padding: 1rem 1.5rem 1rem 3rem;
                           border: 2px solid var(--border-light);
                           border-radius: 50px;
                           font-size: 1rem;
                           background: var(--bg-card);
                           color: var(--text-primary);
                           transition: all 0.3s ease;
                       ">
                <i class="fas fa-search" style="
                    position: absolute;
                    left: 1.25rem;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-secondary);
                "></i>
            </div>
        `;
        
        filterHeader.appendChild(searchContainer);
        
        // Add search functionality
        const searchInput = searchContainer.querySelector('#filament-search');
        searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });
    }

    // Handle search functionality
    handleSearch(query) {
        const cards = document.querySelectorAll('.filament-card');
        const searchTerm = query.toLowerCase().trim();
        
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const description = card.querySelector('.card-description').textContent.toLowerCase();
            const features = Array.from(card.querySelectorAll('.feature-tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           features.includes(searchTerm);
            
            if (matches || searchTerm === '') {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.opacity = '0.3';
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FilamentsManager();
});

// Add custom CSS for modals
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-content {
        background: var(--bg-card);
        border-radius: 20px;
        max-width: 600px;
        width: 90%;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        padding: 2rem 2rem 1rem;
        border-bottom: 1px solid var(--border-light);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    
    .modal-header h2 {
        color: var(--text-primary);
        margin: 0;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: var(--text-secondary);
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: var(--border-light);
        color: var(--text-primary);
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .modal-footer {
        padding: 1rem 2rem 2rem;
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
    }
    
    .detail-specs,
    .detail-features,
    .detail-applications {
        margin-bottom: 2rem;
    }
    
    .detail-specs h3,
    .detail-features h3,
    .detail-applications h3 {
        color: var(--text-primary);
        margin-bottom: 1rem;
        font-size: 1.25rem;
    }
    
    .detail-applications ul {
        list-style: none;
        padding: 0;
    }
    
    .detail-applications li {
        padding: 0.5rem 0;
        color: var(--text-secondary);
        position: relative;
        padding-left: 1.5rem;
    }
    
    .detail-applications li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--primary-3d);
        font-weight: bold;
    }
    
    .quote-form .form-group {
        margin-bottom: 1.5rem;
    }
    
    .quote-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
        color: var(--text-primary);
    }
    
    .quote-form input,
    .quote-form select,
    .quote-form textarea {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid var(--border-light);
        border-radius: 8px;
        background: var(--bg-light);
        color: var(--text-primary);
        font-family: inherit;
        transition: border-color 0.3s ease;
    }
    
    .quote-form input:focus,
    .quote-form select:focus,
    .quote-form textarea:focus {
        outline: none;
        border-color: var(--primary-3d);
    }
    
    .quote-form textarea {
        resize: vertical;
        min-height: 100px;
    }
`;

document.head.appendChild(modalStyles);

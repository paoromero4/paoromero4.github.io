class ImageGallery {
    constructor(galleryElement, options = {}) {
        this.gallery = galleryElement;
        this.container = this.gallery.querySelector('.gallery-container');
        this.slides = this.gallery.querySelectorAll('.gallery-slide');
        this.prevBtn = this.gallery.querySelector('.gallery-arrow.prev');
        this.nextBtn = this.gallery.querySelector('.gallery-arrow.next');
        this.dotsContainer = this.gallery.querySelector('.gallery-dots');

        // Options
        this.autoSlideInterval = options.autoSlideInterval || 3000;
        this.enableAutoSlide = options.enableAutoSlide !== false;

        // State
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideTimer = null;

        this.init();
    }

    init() {
        this.createDots();
        this.setupEventListeners();
        this.updateGallery();

        if (this.enableAutoSlide) {
            this.startAutoSlide();
        }
    }

    createDots() {
        if (!this.dotsContainer) return;

        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'gallery-dot';
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    setupEventListeners() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.nextSlide();
            });
        }

        // Pause auto-slide on hover
        this.gallery.addEventListener('mouseenter', () => this.pauseAutoSlide());
        this.gallery.addEventListener('mouseleave', () => this.resumeAutoSlide());
    }

    updateGallery() {
        const translateX = -this.currentSlide * 100;

        if (this.container) {
            this.container.style.transform = `translateX(${translateX}%)`;
        }

        // Update dots if they exist
        if (this.dotsContainer) {
            const dots = this.dotsContainer.querySelectorAll('.gallery-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentSlide);
            });
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateGallery();
        this.resetAutoSlide();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateGallery();
        this.resetAutoSlide();
    }

    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateGallery();
        this.resetAutoSlide();
    }

    startAutoSlide() {
        if (!this.enableAutoSlide) return;
        this.autoSlideTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoSlideInterval);
    }

    pauseAutoSlide() {
        if (this.autoSlideTimer) {
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }

    resumeAutoSlide() {
        if (this.enableAutoSlide && !this.autoSlideTimer) {
            this.startAutoSlide();
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        this.resumeAutoSlide();
    }

    destroy() {
        this.pauseAutoSlide();
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prevSlide);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.nextSlide);
        }
    }
}

// Function to initialize galleries (can be called multiple times)
function initializeGalleries() {
    const galleries = document.querySelectorAll('.image-gallery:not([data-gallery-initialized])');

    galleries.forEach((gallery) => {
        // Mark as initialized to prevent double-initialization
        gallery.setAttribute('data-gallery-initialized', 'true');

        new ImageGallery(gallery, {
            autoSlideInterval: 3000,
            enableAutoSlide: true
        });
    });
}

// Initialize galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGalleries();
});

// Also initialize galleries whenever new content is added to the page
// This handles dynamically loaded content
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if any of the added nodes contain galleries
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    // Check if the node itself is a gallery
                    if (node.classList && node.classList.contains('image-gallery')) {
                        initializeGalleries();
                    }
                    // Check if the node contains galleries
                    else if (node.querySelectorAll && node.querySelectorAll('.image-gallery').length > 0) {
                        initializeGalleries();
                    }
                }
            });
        }
    });
});

// Start observing changes to the document
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Make functions available globally
window.ImageGallery = ImageGallery;
window.initializeGalleries = initializeGalleries;

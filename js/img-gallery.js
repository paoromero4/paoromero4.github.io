// Debug version with console logs
console.log('Gallery script loaded!');

class ImageGallery {
    constructor(galleryElement, options = {}) {
        console.log('Creating gallery for element:', galleryElement);

        this.gallery = galleryElement;
        this.container = this.gallery.querySelector('.gallery-container');
        this.slides = this.gallery.querySelectorAll('.gallery-slide');
        this.prevBtn = this.gallery.querySelector('.gallery-arrow.prev');
        this.nextBtn = this.gallery.querySelector('.gallery-arrow.next');
        this.dotsContainer = this.gallery.querySelector('.gallery-dots');

        console.log('Found elements:', {
            container: this.container,
            slides: this.slides.length,
            prevBtn: this.prevBtn,
            nextBtn: this.nextBtn
        });

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
        console.log('Initializing gallery...');
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
        console.log('Setting up event listeners...');

        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', (e) => {
                console.log('Previous button clicked');
                e.preventDefault();
                this.prevSlide();
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', (e) => {
                console.log('Next button clicked');
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
        console.log(`Moving to slide ${this.currentSlide}, translateX: ${translateX}%`);

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
        console.log('Next slide called');
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateGallery();
        this.resetAutoSlide();
    }

    prevSlide() {
        console.log('Previous slide called');
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateGallery();
        this.resetAutoSlide();
    }

    goToSlide(slideIndex) {
        console.log(`Going to slide ${slideIndex}`);
        this.currentSlide = slideIndex;
        this.updateGallery();
        this.resetAutoSlide();
    }

    startAutoSlide() {
        console.log('Starting auto-slide');
        if (!this.enableAutoSlide) return;
        this.autoSlideTimer = setInterval(() => {
            console.log('Auto-slide triggered');
            this.nextSlide();
        }, this.autoSlideInterval);
    }

    pauseAutoSlide() {
        if (this.autoSlideTimer) {
            console.log('Pausing auto-slide');
            clearInterval(this.autoSlideTimer);
            this.autoSlideTimer = null;
        }
    }

    resumeAutoSlide() {
        if (this.enableAutoSlide && !this.autoSlideTimer) {
            console.log('Resuming auto-slide');
            this.startAutoSlide();
        }
    }

    resetAutoSlide() {
        this.pauseAutoSlide();
        this.resumeAutoSlide();
    }

    // Public methods for external control
    destroy() {
        this.pauseAutoSlide();
        if (this.prevBtn) {
            this.prevBtn.removeEventListener('click', this.prevSlide);
        }
        if (this.nextBtn) {
            this.nextBtn.removeEventListener('click', this.nextSlide);
        }
    }

    addSlide(imageUrl, altText = '') {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide';
        slide.innerHTML = `<img src="${imageUrl}" alt="${altText}">`;
        this.container.appendChild(slide);

        this.slides = this.gallery.querySelectorAll('.gallery-slide');
        this.totalSlides = this.slides.length;
        this.createDots();
    }

    removeSlide(index) {
        if (index >= 0 && index < this.totalSlides) {
            this.slides[index].remove();
            this.slides = this.gallery.querySelectorAll('.gallery-slide');
            this.totalSlides = this.slides.length;

            if (this.currentSlide >= this.totalSlides) {
                this.currentSlide = this.totalSlides - 1;
            }

            this.createDots();
            this.updateGallery();
        }
    }
}

// Initialize all galleries when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, looking for galleries...');
    const galleries = document.querySelectorAll('.image-gallery');
    console.log(`Found ${galleries.length} galleries`);

    galleries.forEach((gallery, index) => {
        console.log(`Initializing gallery ${index + 1}`);
        new ImageGallery(gallery, {
            autoSlideInterval: 3000,
            enableAutoSlide: true
        });
    });
});

// Make ImageGallery available globally if needed
window.ImageGallery = ImageGallery;

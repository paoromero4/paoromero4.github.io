// Gallery slider functionality
    const slides = document.querySelectorAll('.gallery-slide');
    const dotsContainer = document.getElementById('galleryDots');
    let currentSlide = 0;
    let autoSlideInterval;

    // Create dots
    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.classList.add('gallery-dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.gallery-dot');

    function goToSlide(n) {
      // Remove active class from current slide and dot
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');

      // Update current slide
      currentSlide = n;
      if (currentSlide >= slides.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slides.length - 1;

      // Add active class to new slide and dot
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');

      // Reset auto-slide timer
      resetAutoSlide();
    }

    function nextSlide() {
      goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 3000);
    }

    function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      startAutoSlide();
    }

    // Start auto-sliding
    startAutoSlide();

    // Pause auto-slide when user hovers over gallery
    const gallery = document.querySelector('.img-gallery');
    gallery.addEventListener('mouseenter', () => {
      clearInterval(autoSlideInterval);
    });
    gallery.addEventListener('mouseleave', () => {
      startAutoSlide();
    });

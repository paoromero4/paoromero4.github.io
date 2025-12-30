const garden = document.getElementById('garden');
const infoBox = document.getElementById('infoBox');
const infoTitle = document.getElementById('infoTitle');
const infoDate = document.getElementById('infoDate');
const infoSubtitle = document.getElementById('infoSubtitle');
const plants = document.querySelectorAll('.plant-container');

let currentPlant = null;

plants.forEach(plant => {
    plant.addEventListener('mouseenter', function(e) {
    currentPlant = this;

    // Update info box content
    infoTitle.textContent = this.dataset.blogTitle;
    infoDate.textContent = this.dataset.blogDate;
    infoSubtitle.textContent = this.dataset.blogSubtitle;

    // Show info box
    infoBox.classList.add('visible');

    // Dim other plants
    plants.forEach(p => {
        if (p !== this) {
        p.classList.add('dimmed');
        }
    });
    });

    plant.addEventListener('mouseleave', function() {
    currentPlant = null;
    infoBox.classList.remove('visible');

    // Remove dim from all plants
    plants.forEach(p => {
        p.classList.remove('dimmed');
    });
    });

    plant.addEventListener('mousemove', function(e) {
    // Position info box near cursor with offset
    const offset = 20;
    let x = e.clientX + offset;
    let y = e.clientY + offset;

    // Prevent box from going off screen
    const boxRect = infoBox.getBoundingClientRect();
    if (x + boxRect.width > window.innerWidth) {
        x = e.clientX - boxRect.width - offset;
    }
    if (y + boxRect.height > window.innerHeight) {
        y = e.clientY - boxRect.height - offset;
    }

    infoBox.style.left = x + 'px';
    infoBox.style.top = y + 'px';
    });

    plant.addEventListener('click', function() {
    // Navigate to blog post
    window.location.href = this.dataset.blogLink;
    });
});

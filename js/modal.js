// modal.js
// handles modal pop up
// also makes sure project filtering works

fetch('portfolio.html')
  .then(r => r.text())
  .then(html => {
    // 1️⃣ Inject your portfolio + templates
    document.getElementById('portfolio').innerHTML = html;

    // 2️⃣ Grab the grid container
    const isoContainer = document.querySelector('.iso-box-wrapper');

    // 3️⃣ Wait for images to load *then* init Isotope
    imagesLoaded(isoContainer, function() {
      const iso = new Isotope(isoContainer, {
        itemSelector: '.iso-box',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
        // Use each .iso-box’s own width as a column
        columnWidth: '.iso-box',
        }
      });

      // 4️⃣ Wire up filter links
      document.querySelectorAll('.filter-wrapper a')
        .forEach(link => {
          link.addEventListener('click', e => {
            e.preventDefault();                       // no more jump-to-top
            // toggle selected class
            document.querySelector('.filter-wrapper .selected')
                    .classList.remove('selected');
            link.classList.add('selected');
            // apply filter
            iso.arrange({ filter: link.dataset.filter });
          });
        });

      // 5️⃣ Wire up your modal logic
      const modal     = document.getElementById('customModal');
      const bodyEl    = modal.querySelector('.modal-body');
      const tplRoot   = document.getElementById('modal-templates');
      const closeBtn  = document.getElementById('closeModal');

      function showModal() {
        modal.classList.remove('show');
        void modal.offsetWidth;  // force reflow
        modal.classList.add('show');
      }

      document.querySelectorAll('.project-card')
        .forEach(card => {
          card.addEventListener('click', () => {
            const id  = card.dataset.projectId;
            const tpl = tplRoot.querySelector(
              `template[data-project-id="${id}"]`
            );
            bodyEl.innerHTML = tpl
              ? tpl.innerHTML
              : '<h2>Unknown project</h2><p>No info available.</p>';
            showModal();
          });
        });

      closeBtn.addEventListener('click',      () => modal.classList.remove('show'));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') modal.classList.remove('show');
      });
      window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
      });
    });
  });

// modal.js
// handles modal pop up
// also makes sure project filtering works

fetch('portfolio.html')
  .then(r => r.text())
  .then(html => {
    // Inject my portfolio + templates
    document.getElementById('portfolio').innerHTML = html;

    // Grab the grid container
    const isoContainer = document.querySelector('.iso-box-wrapper');

    // Wait for images to load *then* init Isotope
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

      // Wire up filter links
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

      // Wire up my modal logic
      const modal     = document.getElementById('customModal');
      const bodyEl    = modal.querySelector('.modal-body');
      const tplRoot   = document.getElementById('modal-templates');
      const closeBtn  = document.getElementById('closeModal');
      const bottomCloseBtn = document.getElementById('bottomCloseModal');

      function showModal() {
        document.body.classList.add('modal-open'); // lock background
        modal.classList.remove('show');
        void modal.offsetWidth;  // force reflow
        modal.classList.add('show');
      }

      function hideModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open'); // ← restore page scroll
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

      closeBtn.addEventListener('click',      hideModal);
      bottomCloseBtn.addEventListener('click', hideModal);

      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') hideModal();
      });
      window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
      });
    });
  });

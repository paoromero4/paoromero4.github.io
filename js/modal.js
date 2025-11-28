// modal.js
// handles modal pop up for both portfolio and teach sections

// =====================
// LOAD PORTFOLIO SECTION
// =====================
fetch('portfolio.html')
  .then(r => r.text())
  .then(html => {
    // Inject portfolio content
    document.getElementById('portfolio').innerHTML = html;

    // Grab the grid container
    const isoContainer = document.querySelector('#portfolio .iso-box-wrapper');

    // Wait for images to load *then* init Isotope
    imagesLoaded(isoContainer, function() {
      const iso = new Isotope(isoContainer, {
        itemSelector: '.iso-box',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.iso-box',
        }
      });

      // Wire up filter links for portfolio
      document.querySelectorAll('#portfolio .filter-wrapper a')
        .forEach(link => {
          link.addEventListener('click', e => {
            e.preventDefault();
            // toggle selected class
            document.querySelector('#portfolio .filter-wrapper .selected')
                    .classList.remove('selected');
            link.classList.add('selected');
            // apply filter
            iso.arrange({ filter: link.dataset.filter });
          });
        });

      // Wire up modal logic for PORTFOLIO
      setupModalHandlers('portfolio', '#modal-templates-portfolio');
    });
  });

// =====================
// LOAD TEACH SECTION
// =====================
fetch('teach.html')
  .then(r => r.text())
  .then(html => {
    // Inject teach content
    document.getElementById('teach').innerHTML = html;

    // Grab the grid container
    const isoContainer = document.querySelector('#teach .iso-box-wrapper');

    // Wait for images to load *then* init Isotope
    imagesLoaded(isoContainer, function() {
      const iso = new Isotope(isoContainer, {
        itemSelector: '.iso-box',
        layoutMode: 'masonry',
        percentPosition: true,
        masonry: {
          columnWidth: '.iso-box',
        }
      });

      // Wire up filter links for teach (if any exist)
      const filterWrapper = document.querySelector('#teach .filter-wrapper');
      if (filterWrapper) {
        filterWrapper.querySelectorAll('a')
          .forEach(link => {
            link.addEventListener('click', e => {
              e.preventDefault();
              document.querySelector('#teach .filter-wrapper .selected')
                      .classList.remove('selected');
              link.classList.add('selected');
              iso.arrange({ filter: link.dataset.filter });
            });
          });
      }

      // Wire up modal logic for TEACH
      setupModalHandlers('teach', '#modal-templates-teach');
    });
  });

// =====================
// SHARED MODAL HANDLER
// =====================
function setupModalHandlers(sectionId, templateSelector) {
  const modal     = document.getElementById('customModal');
  const bodyEl    = modal.querySelector('.modal-body');
  const tplRoot   = document.querySelector(templateSelector);
  const closeBtn  = document.getElementById('closeModal');
  const bottomCloseBtn = document.getElementById('bottomCloseModal');

  function showModal() {
    document.body.classList.add('modal-open');
    modal.classList.remove('show');
    void modal.offsetWidth;  // force reflow
    modal.classList.add('show');
  }

  function hideModal() {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
  }

  // Find all project cards in this specific section
  document.querySelectorAll(`#${sectionId} .project-card`)
    .forEach(card => {
      card.addEventListener('click', () => {
        const id  = card.dataset.projectId;
        const tpl = tplRoot.querySelector(
          `template[data-project-id="${id}"]`
        );
        bodyEl.innerHTML = tpl
          ? tpl.innerHTML
          : `<h2>Unknown project</h2><p>No info available for "${id}".</p>`;
        showModal();
      });
    });

  // Only attach close handlers once (not multiple times)
  if (!closeBtn.dataset.handlerAttached) {
    closeBtn.addEventListener('click', hideModal);
    closeBtn.dataset.handlerAttached = 'true';
  }
  if (!bottomCloseBtn.dataset.handlerAttached) {
    bottomCloseBtn.addEventListener('click', hideModal);
    bottomCloseBtn.dataset.handlerAttached = 'true';
  }

  // Global handlers (only attach once)
  if (!document.body.dataset.modalEscapeAttached) {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') hideModal();
    });
    document.body.dataset.modalEscapeAttached = 'true';
  }

  if (!document.body.dataset.modalClickOutsideAttached) {
    window.addEventListener('click', e => {
      if (e.target === modal) hideModal();
    });
    document.body.dataset.modalClickOutsideAttached = 'true';
  }
}

fetch('portfolio.html')
    .then(r => r.text())
    .then(html => {
      // 1. Inject the portfolio + templates
      document.getElementById('portfolio').innerHTML = html;

      // 2. Grab the modal + template root
      const modal     = document.getElementById('customModal');
      const contentEl = modal.querySelector('.modal-body');
      const tplRoot   = document.getElementById('modal-templates');
      const closeBtn  = document.getElementById('closeModal');

      // 3. Helper to show with reflow
      function showModal() {
        modal.classList.remove('show');
        void modal.offsetWidth;
        modal.classList.add('show');
      }

      // 4. Wire up every card to its template
      document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
          const id  = card.dataset.projectId;
          const tpl = tplRoot.querySelector(`template[data-project-id="${id}"]`);
          if (tpl) {
            // Inject *all* of the template’s markup, including that middle <h2>
            contentEl.innerHTML = tpl.innerHTML;
          } else {
            contentEl.innerHTML = '<h2>Unknown project</h2><p>No info available.</p>';
          }
          showModal();
        });
      });


      // 5. Close logic
      closeBtn.addEventListener('click', () => modal.classList.remove('show'));
      document.addEventListener('keydown', e => {
        if (e.key === 'Escape') modal.classList.remove('show');
      });
      window.addEventListener('click', e => {
        if (e.target === modal) modal.classList.remove('show');
      });
    });
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    const form = e.target;

    // Use fetch to submit the form via AJAX
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      if (response.ok) {
        form.style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
        localStorage.setItem('submittedTime', Date.now());
      } else {
        alert('You have already submitted this form once. If you would like to send another message please wait 5 minutes.');
      }
    })
    .catch(error => {
      console.error(error);
      alert('Something went wrong!');
    });
  });

  // Block form if submitted less than 5 minutes ago
  window.addEventListener('DOMContentLoaded', () => {
    const lastSubmit = localStorage.getItem('submittedTime');
    if (lastSubmit && Date.now() - lastSubmit < 5 * 60 * 1000) {
      document.getElementById('contact-form').style.display = 'none';
      document.getElementById('thank-you-message').style.display = 'block';
    }
  });
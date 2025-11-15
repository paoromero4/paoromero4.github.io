// document.getElementById('contact-form').addEventListener('submit', function (e) {
//     e.preventDefault();

//     // Check if submitted recently
//     const lastSubmit = localStorage.getItem('submittedTime');
//     if (lastSubmit && Date.now() - lastSubmit < 5 * 60 * 1000) {
//       alert('You have already submitted this form once. If you would like to send another message please wait 5 minutes.');
//       return; // Stop here
//     }

//     const form = e.target;

//     fetch(form.action, {
//       method: form.method,
//       body: new FormData(form),
//       headers: { 'Accept': 'application/json' }
//     })
//     .then(response => {
//       if (response.ok) {
//         form.style.display = 'none';
//         document.getElementById('thank-you-message').style.display = 'block';
//         localStorage.setItem('submittedTime', Date.now());
//       } else {
//         // More specific error handling
//         alert('There was a problem submitting your form. Please try again later.');
//       }
//     })
//     .catch(error => {
//       console.error(error);
//       alert('Something went wrong! Please check your internet connection and try again.');
//     });
//   });

//   // // Block form if submitted less than 5 minutes ago
//   // window.addEventListener('DOMContentLoaded', () => {
//   //   const lastSubmit = localStorage.getItem('submittedTime');
//   //   if (lastSubmit && Date.now() - lastSubmit < 5 * 60 * 1000) {
//   //     document.getElementById('contact-form').style.display = 'none';
//   //     document.getElementById('thank-you-message').style.display = 'block';
//   //   }
//   // });

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const lastSubmit = localStorage.getItem('submittedTime');

    if (lastSubmit && Date.now() - lastSubmit < 5 * 60 * 1000) {
      alert('You have already submitted this form once. If you would like to send another message please wait 5 minutes.');
      return;
    }

    const form = e.target;

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(async response => {
      console.log('Response status:', response.status);

      // Try to get response as text first
      const text = await response.text();
      console.log('Raw response text:', text);

      // Try to parse as JSON
      try {
        const data = JSON.parse(text);
        console.log('Parsed JSON:', data);
      } catch (e) {
        console.log('Not valid JSON');
      }

      if (response.ok) {
        form.style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
        localStorage.setItem('submittedTime', Date.now());
      } else {
        alert('Form submission blocked by Formspree (403 error)');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      alert('Something went wrong!');
    });
});

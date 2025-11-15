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

    // Check if submitted recently
    const lastSubmit = localStorage.getItem('submittedTime');
    console.log('lastSubmit value:', lastSubmit);
    console.log('Time difference:', Date.now() - lastSubmit);

    if (lastSubmit && Date.now() - lastSubmit < 5 * 60 * 1000) {
      alert('You have already submitted this form once. If you would like to send another message please wait 5 minutes.');
      return;
    }

    const form = e.target;
    console.log('About to fetch:', form.action);

    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(response => {
      console.log('Response status:', response.status);
      return response.json(); // Get the actual error message
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.ok || data.success) {
        form.style.display = 'none';
        document.getElementById('thank-you-message').style.display = 'block';
        localStorage.setItem('submittedTime', Date.now());
      } else {
        console.log('Error from Formspree:', data.error || data.errors);
        alert('There was a problem submitting your form. Please try again later.');
      }
    })
});

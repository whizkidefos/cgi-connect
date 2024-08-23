// Toggle navigation
document.querySelector('.mobile-toggle').addEventListener('click', () => {
    document.querySelector('nav').classList.toggle('active');
});


// Login Form & Registration form
// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// Chart
const ctx = document.getElementById('activitiesChart');
const dgt = document.getElementById('sidebarChart');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',  'November', 'December'],
    datasets: [{
      label: '# of logged in users',
      data: [12, 19, 30, 50, 27, 33, 40, 30, 20, 10, 15, 25],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
  }
});

// Sidebar Chart
new Chart(dgt, {
    type: 'polarArea',
    data: {
      labels: ['Income', 'Expenses', 'Profit'],
      datasets: [{
        label: '% income vs expenses vs profit',
        data: [120, 190, 30],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      responsive: true,
    }
  });
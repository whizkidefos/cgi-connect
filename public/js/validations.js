document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        let isValid = true;
        const firstname = document.getElementById('firstname').value.trim();
        const lastname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const purpose = document.getElementById('purpose').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!firstname || !lastname || !email || !purpose || !message) {
            isValid = false;
            alert('Please fill in all fields');
        }

        if (!validateEmail(email)) {
            isValid = false;
            alert('Please enter a valid email');
        }

        if (!isValid) {
            e.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

document.addEventListener('DOMContentLoaded', function() {
    function registerPageSetup() {
        const form = document.getElementById('registrationForm');
        if (!form) {
            console.error('Form with id "registrationForm" not found.');
            return;
        }

        const emailInput = document.getElementById('email');
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('password');
        const nameInput = document.getElementById('name');

        if (emailInput) {
            emailInput.onchange = function () {
                const email = emailInput.value;
                if (!(email.endsWith('.gr') || email.endsWith('.com')) || !email.includes('@')) {
                    emailInput.setCustomValidity('Το email που εισάγατε δεν είναι έγκυρο.');
                    return;
                } else {
                    emailInput.setCustomValidity('');
                }
            }
        }

        if (password) {
            password.onchange = function () {
                const passwordValue = password.value;
                if (passwordValue.length < 8 || !passwordValue.match(/[A-Z]/) || !passwordValue.match(/[0-9]/)) {
                    password.setCustomValidity('Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες, να περιέχει τουλάχιστον 1 κεφαλαίο γράμμα και 1 ψηφίο.');
                    return;
                } else {
                    password.setCustomValidity('');
                    confirmPassword.setCustomValidity('');
                }
            }
        }

        if (confirmPassword) {
            confirmPassword.onchange = function () {
                const passwordValue = password.value;
                if (passwordValue !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Οι κωδικοί δεν ταιριάζουν.');
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }
        }

        if (nameInput) {
            nameInput.onchange = function () {
                const name = nameInput.value;
                if (name.split(' ').length < 2) {
                    nameInput.setCustomValidity('Το όνομα πρέπει να περιέχει τουλάχιστον 2 λέξεις.');
                } else {
                    nameInput.setCustomValidity('');
                }
            }
        }

        form.onsubmit = function(event) {
            event.preventDefault();
            if (form.checkValidity()) {
                alert('Successful registration');
                window.location.href = 'index.html';
            }
        }
    }

    registerPageSetup();
});
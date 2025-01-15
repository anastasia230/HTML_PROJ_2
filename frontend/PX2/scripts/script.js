document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');
    let sessionId = null;

    // Διαχείριση φόρμας σύνδεσης
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                sessionId = data.sessionId;
                loginMessage.textContent = 'Σύνδεση επιτυχής!';
                loginMessage.style.color = 'green';
            } else {
                loginMessage.textContent = 'Λάθος όνομα χρήστη ή κωδικός.';
                loginMessage.style.color = 'red';
            }
        } catch (error) {
            console.error('Σφάλμα:', error);
            loginMessage.textContent = 'Αποτυχία σύνδεσης.';
            loginMessage.style.color = 'red';
        }
    });

    // Φόρτωση κατηγοριών
    async function loadCategories() {
        const categoriesList = document.getElementById('categories-list');
        categoriesList.innerHTML = '<li>Επιστήμη Υπολογιστών</li><li>Μαθηματικά</li><li>Φυσική</li>';
    }

    loadCategories();
});

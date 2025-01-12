document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('login-message').textContent = `Welcome, ${data.username}!`;
            // Store sessionId in localStorage or a cookie for future requests
            localStorage.setItem('sessionId', data.sessionId);
        } else {
            document.getElementById('login-message').textContent = 'Login failed. Please check your credentials.';
        }
    } catch (error) {
        console.error('Error during login:', error);
        document.getElementById('login-message').textContent = 'An error occurred. Please try again later.';
    }
});
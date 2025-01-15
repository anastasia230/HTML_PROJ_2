const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const validateCredentials = require('./login');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const sessions = {}; // Αποθηκεύει τα ενεργά session IDs

// Login Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (validateCredentials(username, password)) {
        const sessionId = uuidv4();
        sessions[sessionId] = username;
        res.json({ sessionId });
    } else {
        res.status(401).json({ error: 'Λάθος όνομα χρήστη ή κωδικός.' });
    }
});

// Υπηρεσία προσθήκης στο καλάθι (Cart Item Service - CIS)
app.post('/cart', (req, res) => {
    const { id, type, title, cost, username, sessionId } = req.body;

    if (sessions[sessionId] !== username) {
        return res.status(401).send('Unauthorized');
    }

    if (!carts[username]) {
        carts[username] = [];
    }

    const itemExists = carts[username].some(item => item.id === id);

    if (itemExists) {
        return res.status(400).send('Item already in cart');
    }

    carts[username].push({ id, type, title, cost });
    res.status(200).send('Item added to cart');
});

// Εκκίνηση του server
const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
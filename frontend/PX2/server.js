const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5500;

app.use(bodyParser.json());

let users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
];

let sessions = {};
let carts = {};

// Υπηρεσία ταυτοποίησης (Login Service - LS)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const sessionId = uuidv4();
        sessions[sessionId] = username;
        res.json({ sessionId, username });
    } else {
        res.status(401).send('Unauthorized');
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

// Εκκίνηση του διακομιστή
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
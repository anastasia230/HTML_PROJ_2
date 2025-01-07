const express = require('express');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const app = express();
const port = 5500;

app.use(express.json());

// Προσωρινή βάση δεδομένων (λίστες)
let categories = [];
let subcategories = [];
let learningItems = [];

// API Routes
app.get('/categories', (req, res) => {
    res.json(categories);
});

app.get('/categories/:id/subcategories', (req, res) => {
    const categoryId = parseInt(req.params.id);
    const subcategoryList = subcategories.filter(subcategory => subcategory.category_id === categoryId);
    res.json(subcategoryList);
});

app.get('/learning-items', (req, res) => {
    const { subcategory, category } = req.query;
    let items = learningItems;

    if (subcategory) {
        items = items.filter(item => item.subcategory_id === parseInt(subcategory));
    }
    if (category) {
        items = items.filter(item => item.category_id === parseInt(category));
    }

    res.json(items);
});

// Δημιουργία κατηγοριών, υποκατηγοριών και εκπαιδευτικού υλικού
app.post('/categories', (req, res) => {
    const newCategory = { id: uuidv4(), ...req.body };
    categories.push(newCategory);
    res.status(201).json(newCategory);
});

app.post('/subcategories', (req, res) => {
    const newSubcategory = { id: uuidv4(), ...req.body };
    subcategories.push(newSubcategory);
    res.status(201).json(newSubcategory);
});

app.post('/learning-items', (req, res) => {
    const newLearningItem = { id: uuidv4(), ...req.body };
    learningItems.push(newLearningItem);
    res.status(201).json(newLearningItem);
});
// Εκκίνηση του διακομιστή
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

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

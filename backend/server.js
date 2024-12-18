const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

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

// category.js

const LOCAL_BASE_URL = "./data";

// Συνάρτηση για φόρτωση στοιχείων εκπαιδευτικού υλικού
async function fetchLearningItems(categoryId) {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/learning-items.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση στοιχείων εκπαιδευτικού υλικού");

        const learningItems = await response.json();
        const filteredItems = learningItems.filter(item => item.category_id === parseInt(categoryId));
        displayLearningItems(filteredItems);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για φόρτωση τίτλου κατηγορίας
async function fetchCategoryTitle(categoryId) {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/categories.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση κατηγοριών");

        const categories = await response.json();
        const category = categories.find(cat => cat.id === parseInt(categoryId));
        if (category) {
            document.getElementById('category-title').textContent = category.title;
        } else {
            console.error("Category not found");
        }
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για εμφάνιση στοιχείων εκπαιδευτικού υλικού
function displayLearningItems(learningItems) {
    const templateSource = document.getElementById('learning-item-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ learningItems });
    document.getElementById('learning-items-section').innerHTML = html;
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", () => {
    const categoryId = new URLSearchParams(window.location.search).get('id');
    if (categoryId) {
        fetchCategoryTitle(categoryId);
        fetchLearningItems(categoryId);
    } else {
        console.error("Category ID is missing in the URL");
    }
});
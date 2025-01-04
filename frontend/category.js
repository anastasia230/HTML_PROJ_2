// category.js

const API_BASE_URL = "https://learning-hub-1whk.onrender.com";

// Συνάρτηση για φόρτωση στοιχείων εκπαιδευτικού υλικού
async function fetchLearningItems(categoryId) {
    try {
        const response = await fetch(`${API_BASE_URL}/learning-items?category=${categoryId}`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση στοιχείων εκπαιδευτικού υλικού");

        const learningItems = await response.json();
        displayLearningItems(learningItems);
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
        fetchLearningItems(categoryId);
    } else {
        console.error("Category ID is missing in the URL");
    }
});
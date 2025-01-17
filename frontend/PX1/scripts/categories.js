// categories.js

const LOCAL_BASE_URL = "./data"; // Directory where your JSON files are located

// Συνάρτηση για φόρτωση κατηγοριών
async function fetchCategories() {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/categories.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση κατηγοριών");
        
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για εμφάνιση κατηγοριών
function displayCategories(categories) {
    const templateSource = document.getElementById('category-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ categories });
    document.getElementById('category-section').innerHTML = html;
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", fetchCategories);
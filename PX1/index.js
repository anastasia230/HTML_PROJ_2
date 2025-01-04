// index.js

const API_BASE_URL = "https://learning-hub-1whk.onrender.com";

// Συνάρτηση για φόρτωση κατηγοριών
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση κατηγοριών");
        
        const categories = await response.json();
        for (const category of categories) {
            category.subcategories = await fetchSubcategories(category.id);
        }
        displayCategories(categories);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για φόρτωση υποκατηγοριών
async function fetchSubcategories(categoryId) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση υποκατηγοριών");

        return await response.json();
    } catch (error) {
        console.error(`Πρόβλημα με τις υποκατηγορίες για την κατηγορία ${categoryId}:`, error);
        return [];
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
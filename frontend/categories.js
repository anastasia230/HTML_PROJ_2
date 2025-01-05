// categories.js

const LOCAL_BASE_URL = "./data"; // Directory where your JSON files are located

// Συνάρτηση για φόρτωση κατηγοριών
async function fetchCategories() {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/categories.json`);
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
        const response = await fetch(`${LOCAL_BASE_URL}/subcategories.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση υποκατηγοριών");

        const subcategories = await response.json();
        return subcategories.filter(subcategory => subcategory.category_id === categoryId);
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

// Συνάρτηση για φόρτωση υποκατηγοριών
/*async function fetchSubcategories() {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/subcategories.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση υποκατηγοριών");

        const subcategories = await response.json();
        displaySubcategories(subcategories);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για εμφάνιση υποκατηγοριών
function displaySubcategories(subcategories) {
    const subcatPage = document.getElementById('subcat-page');
    subcategories.forEach(subcategory => {
        const link = document.createElement('a');
        link.href = `subcategory.html?id=${subcategory.id}`;
        link.textContent = subcategory.title;
        subcatPage.appendChild(link);
        subcatPage.appendChild(document.createElement('br')); // Προσθέτει νέα γραμμή μετά από κάθε λινκ
    });
}*/

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", fetchCategories);
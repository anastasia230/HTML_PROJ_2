// categories.js

// URL του LearningHub API
const API_BASE_URL = "index.html";

// Συνάρτηση για φόρτωση κατηγοριών
async function fetchCategories() {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση κατηγοριών");
        
        const categories = await response.json();
        displayCategories(categories);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για εμφάνιση κατηγοριών
function displayCategories(categories) {
    const categorySection = document.querySelector(".category-section");
    categorySection.innerHTML = ""; // Καθαρισμός αρχικού περιεχομένου

    categories.forEach(category => {
        // Δημιουργία άρθρου για κάθε κατηγορία
        const article = document.createElement("article");

        // HTML δυναμικά
        article.innerHTML = `
            <img src="${category.img_url}" alt="${category.title}">
            <h3>${category.title}</h3>
            <ul id="subcategories-${category.id}">
                <li>Φόρτωση υποκατηγοριών...</li>
            </ul>
        `;
        categorySection.appendChild(article);

        // Φόρτωση υποκατηγοριών για την κατηγορία
        fetchSubcategories(category.id);
    });
}

// Συνάρτηση για φόρτωση υποκατηγοριών
async function fetchSubcategories(categoryId) {
    try {
        const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/subcategories`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση υποκατηγοριών");

        const subcategories = await response.json();
        displaySubcategories(categoryId, subcategories);
    } catch (error) {
        console.error(`Πρόβλημα με τις υποκατηγορίες για την κατηγορία ${categoryId}:`, error);
    }
}

// Συνάρτηση για εμφάνιση υποκατηγοριών
function displaySubcategories(categoryId, subcategories) {
    const subcategoryList = document.getElementById(`subcategories-${categoryId}`);
    subcategoryList.innerHTML = ""; // Καθαρισμός placeholder

    subcategories.forEach(subcategory => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="subcategory.html?id=${subcategory.id}">${subcategory.title}</a>`;
        subcategoryList.appendChild(li);
    });
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", fetchCategories);

// category.js

const LOCAL_BASE_URL = "./data";

// Συνάρτηση για φόρτωση κατηγορίας και υποκατηγοριών
async function fetchCategoryAndSubcategories(categoryId) {
    try {
        const [categoriesResponse, subcategoriesResponse] = await Promise.all([
            fetch(`${LOCAL_BASE_URL}/categories.json`),
            fetch(`${LOCAL_BASE_URL}/subcategories.json`)
        ]);

        if (!categoriesResponse.ok || !subcategoriesResponse.ok) {
            throw new Error("Σφάλμα κατά τη φόρτωση δεδομένων");
        }

        const categories = await categoriesResponse.json();
        const subcategories = await subcategoriesResponse.json();

        const category = categories.find(cat => cat.id === parseInt(categoryId));
        if (category) {
            document.getElementById('category-title').textContent = category.title;
            const categoryImage = document.getElementById('category-image');
            categoryImage.src = category.img_url;
            categoryImage.style.display = 'block';
            const filteredSubcategories = subcategories.filter(subcat => subcat.category_id === parseInt(categoryId));
            displaySubcategories(filteredSubcategories);
        } else {
            console.error("Category not found");
        }
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για εμφάνιση υποκατηγοριών
function displaySubcategories(subcategories) {
    const templateSource = document.getElementById('subcategory-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    const html = template({ subcategories });
    document.getElementById('subcategory-section').innerHTML = html;
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", () => {
    const categoryId = new URLSearchParams(window.location.search).get('id');
    if (categoryId) {
        fetchCategoryAndSubcategories(categoryId);
    } else {
        console.error("Category ID is missing in the URL");
    }
});
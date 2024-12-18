// Fetch categories from API
async function fetchCategories() {
    try {
        const response = await fetch('https://learning-hub-1whk.onrender.com/categories');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const categories = await response.json();
        renderCategories(categories);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Render categories using Handlebars
function renderCategories(categories) {
    const templateSource = document.getElementById('categories-template').innerHTML;
    const template = Handlebars.compile(templateSource);

    const html = template({ categories });
    document.getElementById('categories').innerHTML = html;
}

// Initialize
document.addEventListener('DOMContentLoaded', fetchCategories);

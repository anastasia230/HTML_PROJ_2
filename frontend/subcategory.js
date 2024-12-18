document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://learning-hub-1whk.onrender.com';  // Αντικατάστησέ το με το σωστό URL της API σου
    const categoryId = new URLSearchParams(window.location.search).get('categoryId');  // Παίρνουμε το ID της κατηγορίας από τη διεύθυνση URL

    // Ελέγχουμε αν υπάρχει το categoryId στη διεύθυνση URL
    if (!categoryId) {
        alert('Category ID is missing!');
        return;
    }

    // Φορτώνουμε τις υποκατηγορίες για την κατηγορία
    fetch(`${apiUrl}/categories/${categoryId}/subcategories`)
        .then(response => response.json())
        .then(data => {
            const subcategoryTemplate = Handlebars.compile(document.getElementById('subcategory-template').innerHTML);
            const html = subcategoryTemplate({ subcategories: data });
            document.getElementById('subcategories-list').innerHTML = html;
        })
        .catch(error => console.error('Error loading subcategories:', error));
});

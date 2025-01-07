const LOCAL_BASE_URL = "./data";
let sessionId = null;

// Συνάρτηση για φόρτωση στοιχείων εκπαιδευτικού υλικού
async function fetchLearningItems(subcategoryId) {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/learning-items.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση στοιχείων εκπαιδευτικού υλικού");

        const learningItems = await response.json();
        const filteredItems = learningItems.filter(item => item.subcategory_id === parseInt(subcategoryId));
        displayLearningItems(filteredItems);
    } catch (error) {
        console.error("Πρόβλημα με τη λήψη δεδομένων:", error);
    }
}

// Συνάρτηση για φόρτωση τίτλου υποκατηγορίας
async function fetchSubcategoryTitle(subcategoryId) {
    try {
        const response = await fetch(`${LOCAL_BASE_URL}/subcategories.json`);
        if (!response.ok) throw new Error("Σφάλμα κατά τη φόρτωση υποκατηγοριών");

        const subcategories = await response.json();
        const subcategory = subcategories.find(subcat => subcat.id === parseInt(subcategoryId));
        if (subcategory) {
            document.getElementById('subcategory-title').textContent = subcategory.title;
        } else {
            console.error("Subcategory not found");
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

// Συνάρτηση για προσθήκη στο καλάθι
async function addToCart(id, type, title, cost) {
    if (!sessionId) {
        alert('Παρακαλώ συνδεθείτε για αγορά του εκπαιδευτικού υλικού');
        return;
    }

    const username = document.getElementById('username').value;

    try {
        const response = await fetch('/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, type, title, cost, username, sessionId })
        });

        if (response.ok) {
            alert('Το στοιχείο προστέθηκε στο καλάθι σας!');
        } else {
            alert('Το στοιχείο υπάρχει ήδη στο καλάθι σας.');
        }
    } catch (error) {
        console.error('Πρόβλημα με την προσθήκη στο καλάθι:', error);
        alert('Σφάλμα κατά την προσθήκη στο καλάθι. Παρακαλώ δοκιμάστε ξανά.');
    }
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", () => {
    const subcategoryId = new URLSearchParams(window.location.search).get('id');
    if (subcategoryId) {
        fetchSubcategoryTitle(subcategoryId);
        fetchLearningItems(subcategoryId);
    } else {
        console.error("Subcategory ID is missing in the URL");
    }
});
const LOCAL_BASE_URL = "./data";
let sessionId = null;
let username = null;

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

// Συνάρτηση για ταυτοποίηση χρήστη
async function loginUser(event) {
    event.preventDefault();
    const usernameInput = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usernameInput, password })
        });

        if (response.ok) {
            const data = await response.json();
            sessionId = data.sessionId;
            username = data.username;
            document.getElementById('login-message').textContent = 'Επιτυχής σύνδεση!';
            document.getElementById('welcome-message').textContent = `Καλώς ορίσατε, ${username}!`;
        } else {
            const errorText = await response.text();
            console.error('Αποτυχία σύνδεσης:', errorText);
            document.getElementById('login-message').textContent = 'Αποτυχία σύνδεσης. Παρακαλώ δοκιμάστε ξανά.';
        }
    } catch (error) {
        console.error('Πρόβλημα με τη σύνδεση:', error);
        document.getElementById('login-message').textContent = 'Σφάλμα κατά τη σύνδεση. Παρακαλώ δοκιμάστε ξανά.';
    }
}

// Συνάρτηση για προσθήκη στο καλάθι
async function addToCart(id, type, title, cost) {
    if (!sessionId) {
        alert('Παρακαλώ συνδεθείτε για αγορά του εκπαιδευτικού υλικού');
        return;
    }

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
            const errorText = await response.text();
            console.error('Πρόβλημα με την προσθήκη στο καλάθι:', errorText);
            alert('Το στοιχείο υπάρχει ήδη στο καλάθι σας.');
        }
    } catch (error) {
        console.error('Πρόβλημα με την προσθήκη στο καλάθι:', error);
        alert('Σφάλμα κατά την προσθήκη στο καλάθι. Παρακαλώ δοκιμάστε ξανά.');
    }
}

// Εκτέλεση κατά την έναρξη
document.addEventListener("DOMContentLoaded", () => {
    const categoryId = new URLSearchParams(window.location.search).get('id');
    if (categoryId) {
        fetchCategoryAndSubcategories(categoryId);
    } else {
        console.error("Category ID is missing in the URL");
    }

    document.getElementById('login-form').addEventListener('submit', loginUser);
});
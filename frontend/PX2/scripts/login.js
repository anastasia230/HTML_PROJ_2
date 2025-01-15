const fs = require('fs');

// Φόρτωση χρηστών από το users.json
const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

/**
 * Ελέγχει αν τα credentials είναι σωστά
 * @param {string} username 
 * @param {string} password 
 * @returns {boolean}
 */
function validateCredentials(username, password) {
    return users.some(user => user.username === username && user.password === password);
}

module.exports = validateCredentials;

window.addEventListener('DOMContentLoaded', function() {
    // Ha nincs bejelentkezve, visszairányítjuk az index.html oldalra
    if (!isLoggedInToAdmin) {
        window.location.href = 'index.html';
    } else {
document.getElementById('addItemForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Az alapértelmezett formál működés megakadályozása

    // Űrlap adatok gyűjtése
    const name = document.getElementById('itemName').value;
    const amount = document.getElementById('itemAmount').value;
    const price = document.getElementById('itemPrice').value;
    const category = document.getElementById('itemCategory').value;
    const color = document.getElementById('itemColor').value;

    // Az adatok elküldése a szervernek POST kéréssel
    fetch('/items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, amount, price, category, color }
        
        ) // Az adatok JSON formátumban
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add item');
        }
        return response.json();
    })
    .then(data => {
        console.log('Item added:', data);
        // Esetlegesen frissítheted a felhasználói felületet az új elem hozzáadása után
        // pl. újra lekérdezheted az összes elemet és megjelenítheted őket a felületen
    })
    .catch(error => console.error('Error adding item:', error));
});
}})
const nameInput = document.querySelector("#itemName");
const amountInput= document.querySelector("#itemAmount");
const priceInput= document.querySelector("#itemPrice");
const categoryInput= document.querySelector("#itemCategory");

document.addEventListener('DOMContentLoaded', function () {
    // A submit esemény figyelése a form elemen
    const form = document.getElementById('addItemForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Az alapértelmezett működés megakadályozása

    

        // Az űrlap adatokának gyűjtése
        const formData = new FormData(form);
        const newItem = {
            name: nameInput.value, // Módosítás: 'itemName' helyett 'name'
            amount: amountInput.value, // Módosítás: 'itemAmount' helyett 'amount'
            price: priceInput.value, // Módosítás: 'itemPrice' helyett 'price'
            category: categoryInput.value // Módosítás: 'itemCategory' helyett 'category'
        };

        // POST kérés küldése a szervernek
        fetch('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newItem)
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

    // Egyéb kód a megjelenítéshez vagy egyéb funkciókhoz
});

document.addEventListener('DOMContentLoaded', function () {
    // A submit esemény figyelése a form elemen
    const form = document.getElementById('addItemForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Az alapértelmezett működés megakadályozása

        // Az űrlap adatokának gyűjtése
        const formData = new FormData(form);
        const newItem = {
            name: formData.get('itemName'), // Módosítás: 'itemName' helyett 'name'
            amount: formData.get('itemAmount'), // Módosítás: 'itemAmount' helyett 'amount'
            price: formData.get('itemPrice'), // Módosítás: 'itemPrice' helyett 'price'
            category: formData.get('itemCategory') // Módosítás: 'itemCategory' helyett 'category'
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

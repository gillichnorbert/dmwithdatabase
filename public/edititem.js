document.addEventListener('DOMContentLoaded', async function() {
    try {
        const response = await fetch('/items');
        const items = await response.json();

        // Meghívjuk a renderItems függvényt a letöltött elemekkel
        renderItems(items);

        function renderItems(itemList) {    
            itemList.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.amount}</td>
                    <td>${item.price} Ft</td>
                    <td>${item.category}</td>
                    <td>
                        <button class="btn btn-primary" data-id="${item._id}" data-name="${item.name}" data-amount="${item.amount}" data-price="${item.price}" data-category="${item.category}" 
                        onclick="updateItemModal(this)">
                            Szerkesztés
                        </button>
                        <button class="btn btn-danger" onclick="deleteItem('${item._id}')">
                            Törlés
                        </button>
                    </td>
                `;
                const editItemBody = document.getElementById('editItemBody');
                editItemBody.appendChild(tr);
            });
        }
    } catch (error) {
        console.error('Error fetching items:', error);
    }
});

function updateItemModal(button) {
    const itemId = button.getAttribute('data-id');
    const itemName = document.getElementById('itemName').value;
    const itemAmount = document.getElementById('itemAmount').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemCategory = document.getElementById('itemCategory').value;

    // Fetch kérés konfigurálása
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: itemName,
            amount: itemAmount,
            price: itemPrice,
            category: itemCategory
        })
    };

    // Fetch kérés elküldése a szervernek
    fetch(`/items/${itemId}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Item updated successfully:', data);
            // Írd ide a megfelelő frissítési logikát a felületen
        })
        .catch(error => {
            console.error('Error updating item:', error);
            // Írd ide a megfelelő hiba kezelést a felületen
        });

    // Megjelenítjük a modal ablakot
    const modal = new bootstrap.Modal(document.getElementById('operatorModal'));
    modal.hide();
}
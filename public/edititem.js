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
                        onclick="openUpdateItemModal(this)">
                            Szerkesztés
                        </button>
                        <button class="btn btn-danger" onclick="deleteItem('${item._id}')" disabled>
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

function openUpdateItemModal(itemId, itemName, itemAmount, itemPrice, itemCategory) {
    // Beállítjuk a modal ablak tartalmát a paraméterekkel
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemAmount').value = itemAmount;
    document.getElementById('itemPrice').value = itemPrice;
    document.getElementById('itemCategory').value = itemCategory;

    // Megjelenítjük a modal ablakot
    const modal = new bootstrap.Modal(document.getElementById('operatorModal'));
    modal.show();
}

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
                        onclick="openUpdateItemModal(this)">
                            Szerkesztés
                        </button>
                        <button class="btn btn-danger" onclick="deleteItem('${item._id}')" disabled>
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

function openUpdateItemModal(button) {
    const itemId = button.getAttribute('data-id');
    const itemName = button.getAttribute('data-name');
    const itemAmount = button.getAttribute('data-amount');
    const itemPrice = button.getAttribute('data-price');
    const itemCategory = button.getAttribute('data-category');

    // Beállítjuk a modal ablak tartalmát a paraméterekkel
    document.getElementById('itemId').value = itemId;
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemAmount').value = itemAmount;
    document.getElementById('itemPrice').value = itemPrice;
    document.getElementById('itemCategory').value = itemCategory;

    // Megjelenítjük a modal ablakot
    const modal = new bootstrap.Modal(document.getElementById('operatorModal'));
    modal.show();
}

function updateItem() {
    const itemId = document.getElementById('itemId').value;
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
            // Frissítési logika a felületen
            // Például: frissítheted a táblázatot vagy más felhasználói visszajelzést adhatsz
            // Itt is lehetőség van a modal ablak elrejtésére, ha szükséges
        })
        .catch(error => {
            console.error('Error updating item:', error);
            // Hiba kezelése a felületen
        });
}


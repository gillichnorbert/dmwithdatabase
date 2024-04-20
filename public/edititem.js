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
                        <button class="btn btn-primary" data-name="${item.name}" data-amount="${item.amount}" data-price="${item.price}" data-category="${item.category}" 
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
    const itemName = button.getAttribute('data-name');
    const itemAmount = button.getAttribute('data-amount');
    const itemPrice = button.getAttribute('data-price');
    const itemCategory = button.getAttribute('data-category');

    // Beállítjuk a modal ablak tartalmát a gombhoz tartozó adatokkal
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemAmount').value = itemAmount;
    document.getElementById('itemPrice').value = itemPrice;
    document.getElementById('itemCategory').value = itemCategory;

    // Megjelenítjük a modal ablakot
    const modal = new bootstrap.Modal(document.getElementById('operatorModal'));
    modal.show();
}

document.getElementById('multiButton').addEventListener('click', async function(event) {
    event.preventDefault();

    // Adatok összegyűjtése a formból
    const itemName = document.getElementById('itemName').value;
    const itemAmount = document.getElementById('itemAmount').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemCategory = document.getElementById('itemCategory').value;

    // Írd ide az adatok adatbázisba mentését kezelő kódot
});

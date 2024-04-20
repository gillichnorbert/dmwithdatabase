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

    document.getElementById('itemId').value = itemId;
    document.getElementById('itemName').value = itemName;
    document.getElementById('itemAmount').value = itemAmount;
    document.getElementById('itemPrice').value = itemPrice;
    document.getElementById('itemCategory').value = itemCategory;

    const modal = new bootstrap.Modal(document.getElementById('operatorModal'));
    modal.show();
}

function updateItem() {
    const itemId = document.getElementById('itemId').value;
    const itemName = document.getElementById('itemName').value;
    const itemAmount = document.getElementById('itemAmount').value;
    const itemPrice = document.getElementById('itemPrice').value;
    const itemCategory = document.getElementById('itemCategory').value;

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

    fetch(`/items/${itemId}`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Item updated successfully:', data);
            // Itt frissíthetsz vagy újratöltést végezhetsz a felhasználói felületen
        })
        .catch(error => {
            console.error('Error updating item:', error);
        });
}

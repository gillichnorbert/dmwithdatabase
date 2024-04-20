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
                        onclick="updateItem(this)" data-bs-target="#operatorModal" data-bs-toggle="modal">
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
    function updateItem(button) {
        // Az adatok kinyerése a gomb adatattribútumaiból
        const name = button.getAttribute('data-name');
        const amount = button.getAttribute('data-amount');
        const price = button.getAttribute('data-price');
        const category = button.getAttribute('data-category');
    
        // Az adatok megjelenítése vagy feldolgozása a szerkesztéshez
        // Például itt megjelenítheted a szerkesztő űrlapot a modalban
        console.log('Szerkesztés gombra kattintva:', name, amount, price, category);
    }
});

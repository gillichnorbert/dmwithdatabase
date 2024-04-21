window.addEventListener('DOMContentLoaded', function() {
    // Ha nincs bejelentkezve, visszairányítjuk az index.html oldalra
    if (!window.isLoggedIn) {
        window.location.href = 'index.html';
    } else {

let itemList = [];
let items = []; // Itt definiáljuk az items változót

const summaryBody = document.getElementById('summeryBody');
const total = document.getElementById('total');
const clearListBtn = document.getElementById('clearListBtn');
const backButton = document.getElementById('backButton');
const multiplyButton2 = document.getElementById("szorzas2");
const multiplyButton3 = document.getElementById("szorzas3");
const multiplyButton4 = document.getElementById("szorzas4");
const multiplyInput = document.getElementById("multiplyInput");


document.addEventListener('DOMContentLoaded', function () {
    fetch('/items')
        .then(response => response.json())
        .then(data => {
            items = data; // A fetch kérés válaszként kapott adatokat mentjük az items változóba
            const itemPlace = document.getElementById('itemPlace');
            const cardContainer = document.createElement('div');
            cardContainer.className = 'row';
            itemPlace.appendChild(cardContainer);
            items.forEach(item => {
                const textColor = isLightColor(item.color) ? 'black' : 'white'; // Ha a szín világos, a szöveg legyen fekete, különben fehér
                const card = document.createElement('div');
                card.className = 'card-item';
                card.innerHTML = `
                    <div id="itemButton" style="background-color:${item.color}; color:${textColor};">
                        <div class="card-body">
                            <h5 class="card-title" id="itemName">${item.name}</h5>
                            <h6 class="card-subtitle" id="itemAmount">${item.amount}</h6>
                            <p class="card-text" id="itemPrice">${item.price} Ft</p>
                        </div>
                    </div>
                `;
                cardContainer.appendChild(card);
                card.addEventListener('click', function() {
                    addItemToList(item.name, item.price);
                });
            });

            // Régi kategória gombok generálása és eseménykezelőjük beállítása
            const categoryFilter = document.getElementById('categoryFilter');
            categories.forEach(category => {
                const button = document.createElement('button');
                button.textContent = categoryTranslations[category]; // Magyar fordítás használata
                button.classList.add('btn', 'btn-secondary','btn-lg', 'mx-2');
                button.addEventListener('click', function() {
                    filterItemsByCategory(category);
                });
                categoryFilter.appendChild(button);
            });
        })
        .catch(error => console.error('Error fetching items:', error));
});


const categoryTranslations = {
    "Soda": "Üdítő",
    "Shot": "Rövidital",
    "Longdrink": "Longdrink",
    "Water": "Víz",
    "Cocktail": "Koktél",
    "Cup": "Pohár",
    "Beer": "Sör",
    "Energydrink": "Energiaital",
    "Spritz": "Fröccs, Bor"
  };
  

multiplyButton2.addEventListener("click", () =>{
    if (itemList.length > 0) {
        const lastItem = itemList[itemList.length - 1];
        lastItem.piece *= 2;
        updateListAndTotal();
        saveItemListToSessionStorage();
    }
})

multiplyButton3.addEventListener("click", () =>{
    if (itemList.length > 0) {
        const lastItem = itemList[itemList.length - 1];
        lastItem.piece *= 3;
        updateListAndTotal();
        saveItemListToSessionStorage();
    }
})

multiplyButton4.addEventListener("click", () =>{
    if (itemList.length > 0) {
        const lastItem = itemList[itemList.length - 1];
        lastItem.piece *= 4;
        updateListAndTotal();
        saveItemListToSessionStorage();
    }
})


function isLightColor(hexColor) {
    // Kivonjuk az RGB értékeket a hexadecimális színből
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);
    
    // Számítjuk a szín fényerejét az RGB színtérben
    let brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Ha a fényerő értéke nagyobb, mint 125, akkor a szín világos
    return brightness > 125;
}




// Lista és végösszeg frissítése
function updateListAndTotal() {
    summaryBody.innerHTML = ""; // Lista tartalmának törlése
    let sum = 0; // Végösszeg nullázása

    itemList.forEach((item, index) => { // Az indexet is átadjuk
        var row =`
            <tr>
                <td>${item.name}</td>
                <td><input type="number" class="form form-control" id="pieceInput_${index}" value="${item.piece}" pattern="[0-9]" inputmode="numeric"></td> <!-- Egyedi id generálása az index alapján és darabszám beállítása -->
                <td>${item.price}</td>
                <td><img src="img/trash.svg" class="trashbin" data-index="${index}"></td> <!-- Az indexet adatattribútumként tároljuk -->
            </tr>
        `;
        summaryBody.innerHTML += row;
        sum += item.price * item.piece; // Darabszám figyelembevétele a végösszeg számításakor
    });

    total.innerText = ` ${sum} Ft`; // Végösszeg frissítése

    // Trashbin (kukás) ikonokhoz eseményfigyelők hozzáadása
    const trashbins = document.querySelectorAll('.trashbin');
    trashbins.forEach(trashbin => {
        trashbin.addEventListener('click', function(event) {
            const index = event.target.dataset.index; // Az index kinyerése az adatattribútumból
            deleteItem(index);
        });
    });

}

// 1. Darabszám input mező eseménykezelője
summaryBody.addEventListener('input', function(event) {
    const target = event.target;
    const index = target.id.split('_')[1]; // Az index kinyerése az input mező id-jéből
    const newValue = parseInt(target.value); // Az input mező új értéke

    if (!isNaN(newValue)) { // Ellenőrizzük, hogy a beírt érték szám-e
        itemList[index].piece = newValue; // Frissítjük az itemList darabszámát
        saveItemListToSessionStorage(); // Mentjük az új értéket a sessionStorage-be
        updateTotal(); // Végösszeg frissítése
    }
});



// Az oldal betöltésekor ellenőrizzük, hogy van-e mentett adat a sessionStorage-ben
window.addEventListener('DOMContentLoaded', function() {
    const savedItemList = sessionStorage.getItem('itemList');
    if (savedItemList) {
        itemList = JSON.parse(savedItemList);
        updateListAndTotal(); // Lista és végösszeg frissítése a mentett adatok alapján
    }
});

// Tétel törlése az index alapján
function deleteItem(index) {
    itemList.splice(index, 1); // Az adott indexű elem törlése a listából
    updateListAndTotal(); // Lista és végösszeg frissítése
    saveItemListToSessionStorage(); // Mentjük az üres itemList-et a sessionStorage-be
}

// 6. Tétel hozzáadása a listához vagy darabszám növelése
function addItemToList(name, price) {
    let existingItem = itemList.find(item => item.name === name);

    if (existingItem) {
        existingItem.piece++;
    } else {
        itemList.push({ name, price, piece: 1 });
    }

    updateListAndTotal();
    saveItemListToSessionStorage(); // Mentjük az itemList-et a sessionStorage-be
}

// Az itemList-et elmentjük a sessionStorage-be
function saveItemListToSessionStorage() {
    sessionStorage.setItem('itemList', JSON.stringify(itemList));
}

// Végösszeg frissítése
function updateTotal() {
    var sum = 0;
    itemList.forEach(item => {
        sum += item.price * item.piece; // Darabszámot is figyelembe vesszük
    });
    total.innerText = ` ${sum} Ft`;
}

// Lista törlése gomb eseménykezelője
clearListBtn.addEventListener('click', function() {
    itemList.length = 0; // Törlés az itemList tömbből
    updateListAndTotal(); // Lista és végösszeg frissítése
    saveItemListToSessionStorage(); 
});

// 1. Kategóriák meghatározása
let categories = [    "Soda",
"Shot",
"Longdrink",
"Water",
"Cocktail",
"Cup",
"Beer",
"Energydrink",
"Spritz"];

// 2. Felhasználói felület kialakítása
const categoryFilter = document.getElementById('categoryFilter');

// 3. Szűrés a kategóriák alapján
function filterItemsByCategory(category) {
    const filteredItems = items.filter(item => item.category === category);

    displayItems(filteredItems);
}

// 4. Eseménykezelés
function displayItems(itemsToDisplay) {
    const filteredItemsContainer = document.getElementById('itemPlace');
    filteredItemsContainer.innerHTML = ''; // Töröljük az előző termékeket

    itemsToDisplay.forEach(item => {
        const textColor = isLightColor(item.color) ? 'black' : 'white';

        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
            <div id="itemButton" style="background-color:${item.color}; color:${textColor};">
                <div class="card-body">
                    <h5 class="card-title" id="itemName">${item.name}</h5>
                    <h6 class="card-subtitle" id="itemAmount">${item.amount}</h6>
                    <p class="card-text" id="itemPrice">${item.price} Ft</p>
                </div>
            </div>
        `;

        filteredItemsContainer.appendChild(card);
        // Eseményfigyelő hozzáadása a kártyákhoz
        card.addEventListener('click', function() {
            addItemToList(item.name, item.price);
        });
    });
}

// 5. Az oldal betöltésekor ellenőrizzük, hogy van-e mentett adat a sessionStorage-ben
window.addEventListener('DOMContentLoaded', function() {
    const savedItemList = sessionStorage.getItem('itemList');
    if (savedItemList) {
        itemList = JSON.parse(savedItemList);
        updateListAndTotal(); // Lista és végösszeg frissítése a mentett adatok alapján
    }
});

// Vissza gomb eseménykezelője
backButton.addEventListener('click', function() {
    displayItems(items); // Minden termék megjelenítése
});

}});
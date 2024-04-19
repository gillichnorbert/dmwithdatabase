const { MongoClient } = require('mongodb');



const MongoUri = process.env.uri;
const client = new MongoClient(MongoUri);
const dbname = process.env.dbname;
const collectionname = process.env.collectionname;

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        console.log("Lekérdezés előtt");
        const items = await collection.find().toArray();
        console.log("Lekérdezés után");
        console.log(items);

        const itemPlace = document.getElementById('itemPlace');
        const cardContainer = document.createElement('div');
        cardContainer.className = 'row';
        itemPlace.appendChild(cardContainer);

        const cardElements = items.map(item => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <div class="card ${item.category}">
                    <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <h6 class="card-subtitle">${item.amount}</h6>
                        <p class="card-text">${item.price} Ft</p>
                    </div>
                </div>
            `;
            card.addEventListener('click', function() {
                addItemToList(item.name, item.price);
            });
            return card;
        });

        cardElements.forEach(card => {
            cardContainer.appendChild(card);
        });

        // Utolsó lépésként illeszd be az itemPlace-be
        itemPlace.appendChild(cardContainer);

    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

run().catch(console.error);

function addItemToList(name, price) {
    // Az új elem hozzáadása a listához
    var newItem = {
        name: name,
        price: price
    };
    items.push(newItem);

    // Frissítsd a megjelenítést, ha szükséges
    // Ehhez újra kell generálni a kártyákat
    cardContainer.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card-item';
        card.innerHTML = `
        <div class="card" id="itemButton">
        <div class="card-body">
        <h5 class="card-title" id="itemName">${item.name}</h5>
        <h6 class="card-subtitle" id="itemAmount">${item.amount}</h6>
        <p class="card-text" id="itemPrice">${item.price} Ft</p>
        </div>
        </div>
        `;
        card.addEventListener('click', function() {
            addItemToList(item.name, item.price);
        });
        cardContainer.appendChild(card);
    });
}

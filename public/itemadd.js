const nameInput = document.querySelector("#itemName");
const amountInput= document.querySelector("#itemAmount");
const priceInput= document.querySelector("#itemPrice");
const categoryInput= document.querySelector("#itemCategory");

const MongoClient = require('mongodb').MongoClient;

// MongoDB kapcsolat létrehozása
MongoClient.connect(MongoUri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
    if (err) {
        console.error('Failed to connect to MongoDB:', err);
        return;
    }
    
    console.log('Connected to MongoDB');

    // Adatbázis kiválasztása
    const db = client.db(dbname);

    // Kollekció kiválasztása
    const collection = db.collection(collectionname);

    // Beszúrandó dokumentum
    const newItem = {
        name: nameInput.value,
        amount: amountInput.value,
        price: priceInput.value,
        category: categoryInput.value
    };

    // Dokumentum beszúrása
    collection.insertOne(newItem, function(err, result) {
        if (err) {
            console.error('Failed to insert item into database:', err);
            return;
        }

        console.log('Item inserted into database:', result);
    });

    // MongoDB kapcsolat bezárása
    client.close();
});

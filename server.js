const { MongoClient, ObjectId } = require('mongodb');

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const MongoUri = process.env.uri;
const client = new MongoClient(MongoUri);
const dbname = process.env.dbname;
const collectionname = process.env.collectionname;

// Middleware a JSON testek kezelésére
app.use(express.json());

app.use(express.static('public')); // A public mappában lévő fájlokhoz való hozzáférés engedélyezése

// GET végpont a /items útvonalon az összes elem lekéréséhez
app.get('/items', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        console.log("Lekérdezés előtt");
        const items = await collection.find().toArray();
        console.log("Lekérdezés kész!");

        res.json(items); // Elküldjük az adatokat JSON formátumban
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST végpont az /items útvonalon az új elem beszúrásához
app.post('/items', async (req, res) => {
    try {
        const newItem = req.body; // Az új elem a POST kérés testéből érkezik

        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        const result = await collection.insertOne(newItem); // Beszúrjuk az új elemet az adatbázisba

        console.log("Item added:", result.insertedId);

        res.status(201).json({ message: 'Item added successfully', itemId: result.insertedId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    
    }
});



app.put('/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updatedItem = req.body;

        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        const result = await collection.updateOne(
            { _id: new ObjectId(itemId) }, // Itt hozzuk létre az ObjectId példányt a megadott ID-ből
            { $set: updatedItem }
        );

        console.log("Item updated:", itemId);

        res.status(200).json({ message: 'Item updated successfully', itemId: itemId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// ...

app.delete('/items/:id', async (req, res) => {
    try {
        const itemId = req.params.id;

        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        const result = await collection.deleteOne({ _id: new ObjectId(itemId) });

        if (result.deletedCount === 0) {
            console.log("Item not found:", itemId);
            res.status(404).json({ error: 'Item not found' });
        } else {
            console.log("Item deleted:", itemId);
            res.status(200).json({ message: 'Item deleted successfully', itemId: itemId });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

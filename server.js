const { MongoClient } = require('mongodb');
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
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
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
    } finally {
        await client.close();
        console.log("MongoDB connection closed.");
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

const { MongoClient } = require('mongodb');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

const MongoUri = process.env.uri;
const client = new MongoClient(MongoUri);
const dbname = process.env.dbname;
const collectionname = process.env.collectionname;

app.use(express.static('public')); // A public mappában lévő fájlokhoz való hozzáférés engedélyezése

app.get('/items', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const database = client.db(dbname);
        const collection = database.collection(collectionname);

        console.log("Lekérdezés előtt");
        const items = await collection.find().toArray();
        console.log("Lekérdezés után");
        console.log(items);

        res.json(items); // Elküldjük az adatokat JSON formátumban
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

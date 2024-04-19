const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dmadmin:56i4984TwAoHJykV@drinkmasters.ynee5at.mongodb.net/?retryWrites=true&w=majority&appName=Drinkmasters";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const database = client.db("drinkmaster");
    const collection = database.collection("items");

    console.log("Lekérdezés előtt");
    const items = await collection.find().toArray();
    console.log("Lekérdezés után");
    console.log(items);
  } finally {
    await client.close();
    console.log("MongoDB connection closed.");
  }
}

run().catch(console.error);

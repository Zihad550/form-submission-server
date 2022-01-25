const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const ObjectId = require("mongodb").ObjectId;

const port = process.env.PORT || 8000;

// middle ware
app.use(cors());
app.use(express.json());

// mongo client
const client = new MongoClient(process.env.URI);

async function run() {
  try {
    await client.connect();

    const database = client.db("formSubmission");
    const dataCollection = database.collection("data");
    app.get("/data", async (req, res) => {
      const result = await dataCollection.find({}).toArray();
      res.json(result);
    });

    // save data
    app.post("/data", async (req, res) => {
      const data = req.body;
      const result = await dataCollection.insertOne(data);
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Welcome to form submission server");
});

app.listen(port, () => {
  console.log("port running at localhost:", port);
});

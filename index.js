app.listen(process.env.PORT || 3000)
const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri);
app.get("/items/:my_item", async (req, res) => {
    let my_item = req.params.my_item;
    let item = await client.db("my_db")
                .collection("my_collection")
                .findOne({my_item: my_item})
    return res.json(item)
})
client.connect(err => {
    if(err){ console.error(err); return false;}
    // connection to mongo is successful, listen for requests
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
});

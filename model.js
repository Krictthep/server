const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');


const username = "krictthep";
const password = encodeURIComponent("dewkub071");


 // Replace the uri string with your connection string.
 const uri = `mongodb+srv://${username}:${password}@develop.efpydyz.mongodb.net/?retryWrites=true&w=majority&appName=Develop`;
//  const uri =
//    "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";
 const client = new MongoClient(uri);
 export default async function run(doc) {
   try {
    
     await client.connect();

     const database = client.db('db');
     const products = database.collection('products');
     // Query for a movie that has the title 'Back to the Future'

     const result = await products.insertOne(doc);
  
   } finally {
     // Ensures that the client will close when you finish/error
     await client.close();
   }
 }
 run().catch(console.dir);



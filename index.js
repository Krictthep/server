
const express = require('express')
const app = express()
const port = process.env.PORT || 10000;
const cors = require('cors')

var corsOptions = {
  origin: '*'
}

app.use(express.urlencoded({extends: true}))
app.use(express.json())
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const { MongoClient, ServerApiVersion } = require('mongodb');
// const { default: mongoose } = require('mongoose');

// you explicitly create the http server
//const server = require('http').createServer(app);
//server.listen(port);

 app.listen(port, ()=>{
   console.log('Server listening on port ' + port)
 })

const username = "krictthep";
const password = encodeURIComponent("dewkub071");
var ObjectId = require('mongodb').ObjectId


 // Replace the uri string with your connection string.
 const uri = `mongodb+srv://${username}:${password}@develop.efpydyz.mongodb.net/?retryWrites=true&w=majority&appName=Develop`;
//  const uri =

const client = new MongoClient(uri);

app.get('/', (req, res) => {
  res.send('Connected Service')
})

app.post('/api/db/create', cors(corsOptions) ,(req,res) => {
    res.set('Access-Control-Allow-Origin', '*');
    console.log('/api/db/create')
    let form = req.body
    let data = {
        name: form.name || '',
        price: form.price || 0,
        detail: form.detail || '',
        date_added: new Date(Date.parse(form.date_added)) || new Date()        
    }

    async function run() {
        try {
         
          await client.connect();
     
          const database = client.db('db1');
          const products = database.collection('products');
          // Query for a movie that has the title 'Back to the Future'
     
          const result = await products.insertOne(data);
          if(result != null){
            console.log('document saved')
            res.send(true)   
          }
          else{
            console.log(err)
            res.send(false)
          }
          console.log(result)
        } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
        }
      }
      run().catch(console.dir);

    // Product.create(data, err => {
    //     if(!err){
    //         console.log('document saved')
    //         response.send(true)            
    //     }
    //     else{
    //         console.log(err)
    //         response.send(false)
    //     }
    // })
})


app.get('/api/db/read', cors(corsOptions), (req,res) => {
  res.set('Access-Control-Allow-Origin', '*');
  async function run() {
    try {
      console.log('/api/db/read')
      await client.connect();
 
      const database = client.db('db1');
      const products = database.collection('products');
      // Query for a movie that has the title 'Back to the Future'
      const findResult = products.find({});
      const result = [];
      for await (const doc of findResult) {       
        result.push(doc)           
      }

      res.send(result)
      
          
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);
})


app.post('/api/db/update', cors(corsOptions), (req,res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('/api/db/update')
  let form = req.body
  let data = {
    name: form.name || '',
    price: form.price || 0,
    detail: form.detail || '',
    date_added: new Date(Date.parse(form.date_added) || new Date())
  }

  console.log("data " + data.name)
  async function run() {
    try {
     
      await client.connect();
 
      const database = client.db('db1');
      const products = database.collection('products');
      // Query for a movie that has the title 'Back to the Future'     

      const result = [];  

      console.log('before updateOne')
   
 
      var myquery = {_id: { $eq: new ObjectId(req.body._id)}};     
   
      var newvalues = { $set: data };

      //const resultUpdate = await products.updateOne({_id: { $eq: Object(form._id) }}, {$set: data});
      const resultUpdate = await products.updateOne( myquery,newvalues);
     
      if(resultUpdate != null){     
        console.log('after resultUpdate.matchedCount ' + resultUpdate.matchedCount)   
          const findResult = products.find({});
          for await (const doc of findResult) {       
            result.push(doc)           
          } 
      }



      // await products.updateOne(myquery, newvalues, function(err, res) {
      //   if (err){
      //     console.log(err)
      //   } 
      //   else{
      //     console.log("1 document updated");
      //   }
       
        
      // })


      res.send(result) 
   
      console.log(result)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);




    
})



app.post('/api/db/delete', cors(corsOptions), (req,res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log('/api/db/delete')
  let form = req.body

  async function run() {
    try {
     
      await client.connect();
 
      const database = client.db('db1');
      const products = database.collection('products');
      // Query for a movie that has the title 'Back to the Future'     

      const result = [];     

      var myquery = {_id: { $eq: new ObjectId(req.body._id)}};   


      const resultDelete = await products.deleteOne(myquery);
     
      if(resultDelete != null){     
        console.log('after resultDelete.matchedCount ' + resultDelete.matchedCount)   
          const findResult = products.find({});
          for await (const doc of findResult) {       
            result.push(doc)           
          } 
      }
 
      res.send(result) 
   
      console.log(result)
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);




    
})


// app.post('/api/db/paginate', (req,res) => {
    
// })

// app.post('/api/db/search', (req,res) => {
    
// })



// app.listen(port, ()=>{
//   console.log('Server listening on port ' + port)
// })

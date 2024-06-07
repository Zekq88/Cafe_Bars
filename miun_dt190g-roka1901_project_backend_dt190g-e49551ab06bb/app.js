// Import necessary modules
const express = require('express'); // for creating an Express server
const cors = require('cors'); // for enabling CORS support

/**
 * The Express server instance.
 */
const app = express();



const mongoose = require('mongoose');
 // MongoDB
const dotenv = require('dotenv').config();
const mongodb = require('mongodb');

// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({extended: false}));



const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dt190g-roka1901:1618033989@dt190g-cluster.zxzg3uh.mongodb.net/bira-db?retryWrites=true&w=majority&appName=dt190g-cluster";

  /**
 * The port on which the Express server will listen for incoming requests.
 * Uses the environment variable PORT, if it exists, or defaults to 3000 or 27017 for MongoDB.
 */
  const port = process.env.PORT || 3000;

//Riktiga MongoDB
//mongoose.connect('mongodb+srv://dt190g-roka1901:1618033989@dt190g-cluster.zxzg3uh.mongodb.net/bira-db')
mongoose.connect(url)
.then(() => {
    // Start server, binding it to specified port
app.listen(port, function() {
    // Log a message when server is successfully started

  
    console.log("MongoDB is connected!");
    console.log(`Server is running on port ${port}`);
});
        
}).catch((err) => {
    console.log(err);
});
//mongoose.connect(url);

const beerSchema = require("./models/models.beer.js");
const gradeSchema = require("./models/models.grade.js");



const file = "bira_db.json";
let biraData = [];
let newBirData = [];



// Add CORS middleware to server, allowing it to handle cross-origin requests
app.use(cors());

// Tell express to use a express.json, a built-in middleware in Express,
// that parses incoming requests with JSON payloads.
app.use(express.json());

// Tell express to use express.urlencoded, a built-in middleware in Express,
// that parses incoming requests with urlencoded payloads.
// The extended option is required. true is the default value and allows 
// for a JSON-like experience with URL-encoded.
//app.use(express.urlencoded({ extended: true }));

//MongoDb
//app.all('/*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
 //   res.header("Access-Control-Allow-Credentials", "true");
  //  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type");
  //  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
 //   next();
  //});


// Define a route for handling HTTP GET requests to root path
app.get('/', function(req, res) {
    res.send('Backend is running');
});


// Hämtar all öl
app.get('/api/v1/beers', async (req, res) => {
    try{
        const beers = await beerSchema.find({});
        res.status(200).json(beers);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});


// Denna tar bort från min array
app.delete('/api/v1/beers', async (req, res) => {
    try{
        const oldBeers = await beerSchema.find({});
        
        for(let i = 0; i < oldBeers.length; i++){
            if(oldBeers[i].name === req.body.name){
                const delBir = await beerSchema.findByIdAndDelete(oldBeers[i].id);
                
                console.log("Den delete ölen: " + req.body.name);
                res.status(200).send(delBir);
        }; 
    }; 

    }catch(error){
        res.status(500);
    }
});

//Lägger till hela ölen
app.post("/api/v1/beers", async (req, res) => {
    try{
        let finnsEj = true;
        const oldBeers = await beerSchema.find({});
        for(let i = 0; i < oldBeers.length; i++){

        if(oldBeers[i].name.includes(req.body.name)){
            finnsEj = false; 
        };     
    }

    
    if(finnsEj){
        console.log("Den lägger till ölen!")
        const newBir = await beerSchema.create(req.body);
       // newBirData.push(newBir);
        res.status(201).json(newBir);
        newBir.save();

    }else {
        console.log(`${req.body.name} already exists!`);
        res.status(409).send({message:  `${req.body.name} already exists!`});
    } ; 
}catch(error){res.status(500).json({message: error.message})}
});

// Hittar vald öl och lägger in nytt betyg
app.put('/api/v1/beers', async (req, res) => {

    try{
        const oldBeers = await beerSchema.find({});
        const newGrade = {grade: req.body.grade};
        console.log(req.body.name)
        console.log(req.body.grade)
        for(let i = 0; i < oldBeers.length; i++){
            if(oldBeers[i].name === req.body.name){
                const updateBir = await beerSchema.findByIdAndUpdate(oldBeers[i].id, newGrade);
             //       name: req.body.name,
             ////       type: oldBeers[i].type,
             //       information: oldBeers[i].information,
            //        grade: req.body.grade
              //  });

             // beerSchema.deleteOne(oldBeers[i]);
                
                console.log("Den update till ölen: " + req.body.name);
                res.status(201).json(updateBir);
            } else {
                res.status(404);
        } 
    } 
    }catch(error){
        res.status(500).send({"message": error.message});
    }
    });

// Denna hämtar specifik öl
app.get("/api/v1/beers/:name", async (req, res) => {
    try{
    const oldBeers = await beerSchema.find({name: req.params.name});
        console.log(req.params.name);
    for(let i = 0; i < oldBeers.length; i++){
        if(oldBeers[i].name === req.params.name){
    
            console.log("Den hittade ölen: " + (oldBeers[i]));
            res.status(200).send(oldBeers[i]);
        } else {
            res.status(404);
    } 
} 
}catch(error){
    console.log(req.body.name);
    res.status(500);
}
});


// Denna hämtar betyg
app.get('/api/v1/grades', async (req,res) => {
    try{
        const grades = await gradeSchema.find({});
        res.status(200).json(grades);
    }catch(error){
        res.status(500).json({message: error.message});
    }  
});



// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8080;

const path = require('path');
// GET - / - returns homepage
app.get('/', (req, res) => {
    // serve up the public folder as static index.html file

    // res.sendFile() is used to send the index.html file to the client
    // __dirname: This is a Node.js global variable that represents the directory name of the current module (i.e., the directory in which this script resides).
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
});

// hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    res.send(pets)
    // send the pets array as a response

});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // res.send("pet by owner name")
    // get the owner from the request
    const {owner} = req.query
    // console.log(owner)
    // res.send(owner)

    // const owner = req.query.owner
    // /api/v1/pets/owner?owner=John&pet=Fido
    


    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    res.send(pet)
    // console.log(pet)
    // http://localhost:8081/api/v1/pets/owner?owner=John

});

// get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // res.send("pet by name")
    // get the name from the request
   const name = req.params.name
 //    {name}=req.params
    


    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    res.send(pet)
    // http://localhost:8080/api/v1/pets/Fido

});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
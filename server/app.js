const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/schema');
const mongoose = require('mongoose');

//mongoose.set('strictQuery',true);
let mongoURI = "mongodb://127.0.0.1:27017/library-app";
mongoose.connect(mongoURI);
//MongoDB.on('error', function(err) { console.log(err.message); });
// MongoDB.once('open', function() {
//   console.log("mongodb connection open");
// });

const app = express();

// Get the default connection
//const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
// db.on("error", console.error.bind(console, "MongoDB connection error:"));

// db.once('open',()=>{
//     console.log("Connected with DB");
// });

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,function(){
    console.log("Server Listening on Port 4000");
});
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./Schema/schema');

const app = express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,function(){
    console.log("Server Listening on Port 400");
});
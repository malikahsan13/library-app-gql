const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema} = require('graphql');
const _ = require('lodash');

const books = [
    {name: 'Book1', genre: 'Action', id: '1'},
    {name: 'Book2', genre: 'Crime', id: '2'},
    {name: 'Book3', genre: 'Sci-Fi', id: '3'}
];

const authors = [
    {name: 'Mike', age: 32, id: '1'},
    {name: 'Harry', age: 45, id: '2'},
    {name: 'Jhon', age: 38, id: '3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString}
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        age:{type:GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
           type: BookType,
           args: {id: {type: GraphQLID}} ,
           resolve(parent, args){
                return _.find(books,{id: args.id});    
           }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors,{id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList} = require('graphql');
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');

const books = [
    {name: 'Book1', genre: 'Action', id: '1', authorId: '1'},
    {name: 'Book2', genre: 'Crime', id: '2', authorId: '2'},
    {name: 'Book3', genre: 'Sci-Fi', id: '3', authorId: '3'},
    {name: 'Book4', genre: 'Drama', id: '3', authorId: '2'},
    {name: 'Book5', genre: 'Crime', id: '3', authorId: '1'},
    {name: 'Book6', genre: 'Comedy', id: '3', authorId: '1'}

];

const authors = [
    {name: 'Mike', age: 32, id: '1'},
    {name: 'Harry', age: 45, id: '2'},
    {name: 'Jhon', age: 38, id: '3'}
];

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                //return _.find(authors,{id:parent.authorId});
                return Author.findById(parent.authorId);
            } 
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type:GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books,{authorId:parent.id})
                return Book.find({authorId: parent.id});
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    aurhorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
           type: BookType,
           args: {id: {type: GraphQLID}} ,
           resolve(parent, args){
                //return _.find(books, {id: args.id});    
                return Book.findById(args.id);
           }
        },
        author:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                //return _.find(authors, {id: args.id});
                return Author.findById(args.id);
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return books;
                return Book.find();
            }
        },
        authors:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                //return authors;
                return Author.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
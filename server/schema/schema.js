const graphql = require('graphql');
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema, GraphQLList } =
  graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      authorId: { type: GraphQLString },
      // authorId: {
      //   type: AuthorType,
      //   resolve(parent, args) {
      // return authors.find(cur => cur.id === parent.authorId);
      // },
      // },
    };
  },
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
          // return books.filter(cur => cur.authorId === parent.id);
        },
      },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // const findBook = books.find(cur => cur.id === args.id);
        // return findBook;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // const findAuthor = authors.find(cur => cur.id === args.id);
        // return findAuthor;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve(parent, args) {
        const author = Author.create({
          name: args.name,
          age: args.age,
        });
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLString },
      },
      resolve(parent, args) {
        const book = Book.create({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

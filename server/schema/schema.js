const graphql = require('graphql');
const Book = require('../models/bookModel');
const Author = require('../models/authorModel');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      // authorId: { type: GraphQLString },
      authorId: {
        type: AuthorType,
        resolve(parent, args) {
          // return authors.find(cur => cur.id === parent.authorId);
          return Author.findById(parent.authorId);
        },
      },
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
          return Book.find({ authorId: parent.id });
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
        return Book.findById(args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // const findAuthor = authors.find(cur => cur.id === args.id);
        // return findAuthor;
        return Author.findById(args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) },
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

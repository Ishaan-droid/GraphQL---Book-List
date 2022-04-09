const graphql = require('graphql');
const { books, authors } = require('../Data/data');

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields() {
    return {
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
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
        // code to get data from db
        const findBook = books.find(cur => cur.id === args.id);
        return findBook;
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        const findAuthor = authors.find(cur => cur.id === args.id);
        return findAuthor;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

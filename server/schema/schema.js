const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// DUMMY DATA
const books = [
  {
    name: 'Name of the wind',
    genre: 'Fantasy',
    id: '1',
  },
  {
    name: 'The Final Empire',
    genre: 'Fantasy',
    id: '2',
  },
  {
    name: 'The Long Earth',
    genre: 'Sci-Fi',
    id: '3',
  },
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields() {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
    };
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        const findBook = books.find(cur => cur.id === args.id);
        return findBook;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

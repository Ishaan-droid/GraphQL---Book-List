const express = require('express');
require('dotenv').config({ path: `${__dirname}/../config.env` });

const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { connectDB } = require('./Data/connectDB');
const schema = require('./schema/schema');

const app = express();

app.use(cors());

// CONNECTING TO DB
connectDB();

// GRAPHQL MIDDLEWARE
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

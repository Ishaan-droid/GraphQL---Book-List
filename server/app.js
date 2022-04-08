const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({}));

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

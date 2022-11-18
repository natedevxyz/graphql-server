const express = require('express');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const PORT = 5000;
const app = express();

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(
	process.env.PORT || PORT,
	console.log(`Server running on port ${PORT}`)
);

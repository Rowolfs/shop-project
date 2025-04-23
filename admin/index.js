const express = require('express');
const path = require('path');
const fs = require('fs');
const { buildSchema } = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const app = express();
const PORT = 3000;

// 1) Статика
app.use(express.static(__dirname));

// 2) GraphQL-схема из SDL
const schema = buildSchema(
  fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
);

// 3) Резолверы
const rootValue = {
  products: () =>
    JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8')),
};

// 4) Подключаем GraphQL
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

// 5) Оставляем корень для index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Client listening at http://localhost:${PORT}`)
);

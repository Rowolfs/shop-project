const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const PORT = 8080;
const DATA_FILE = path.join(__dirname, 'products.json');


// Раздаём статические файлы админки из public
app.use(express.static(path.join(__dirname, 'public')));

// Парсим JSON тело запросов
app.use(bodyParser.json());

// Swagger UI по /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Главная страница админки
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Функции чтения/записи
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

app.listen(PORT, () => {
  console.log(`Admin panel listening at http://localhost:${PORT}`);
});
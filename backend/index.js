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


// Функции чтения/записи
function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}
function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

// Получить все товары
app.get('/products', (req, res) => {
  res.json(readData());
});

// Добавить товар(ы)
app.post('/products', (req, res) => {
  const items = Array.isArray(req.body) ? req.body : [req.body];
  const data = readData();
  let maxId = data.reduce((m, i) => (i.id > m ? i.id : m), 0);
  items.forEach(item => {
    item.id = ++maxId;
    data.push(item);
  });
  writeData(data);
  res.status(201).json(items);
});

// Обновить товар по ID
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const data = readData();
  const idx = data.findIndex(i => i.id === id);
  if (idx === -1) return res.sendStatus(404);
  data[idx] = { ...data[idx], ...req.body, id };
  writeData(data);
  res.json(data[idx]);
});

// Удалить товар по ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  let data = readData();
  if (!data.find(i => i.id === id)) return res.sendStatus(404);
  data = data.filter(i => i.id !== id);
  writeData(data);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Backend at http://localhost:${PORT}`);
});
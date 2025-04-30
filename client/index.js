const express = require('express');
const path    = require('path');

const app = express();
const PORT = 3000;

// 1) Статика — отдаём все файлы из текущей папки
app.use(express.static(__dirname));

// 2) Корневой маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () =>
  console.log(`Client listening at http://localhost:${PORT}`)
);

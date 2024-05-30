const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/submitData', (req, res) => {
  const newData = req.body;

  
  let existingData = { "products": [] };
  try {
    existingData = JSON.parse(fs.readFileSync('db.json', 'utf8'));
  } catch (error) {
    console.error('Error reading db.json:', error);
  }


  existingData.products.push(newData);

 
  fs.writeFileSync('db.json', JSON.stringify(existingData, null, 2), 'utf8');

  res.send('Data submitted successfully');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
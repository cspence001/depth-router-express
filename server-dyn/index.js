// server/index.js
const express = require('express');
const cors= require('cors')
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 5000;

const filePath = path.join(__dirname, './database/careers.json');
const filePath2 = path.join(__dirname, './database/51block.json');

app.use(cors({origin: true}))

// Endpoint for fetching either all data or a specific item based on the dynamic value
app.get('/careers/:id?', (req, res) => {
  let { id } = req.params;

  // Read and parse the JSON file
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const selectArray = jsonData.careers;

  if (id) {
    // If a dynamic value is provided, filter the data based on the dynamic value
  const selectedItem = selectArray.filter(function(item) {
      return item.id == id
    });
    // const selectedItem = selectArray[id];
    console.log(selectedItem, "selected item")

    if (selectedItem) {
      res.json(selectedItem[0]);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    // If no dynamic value is provided, return all data
    res.json(selectArray);
  }
});
app.get('/state', (req, res) => {

  // Read and parse the JSON file
  const jsonData = JSON.parse(fs.readFileSync(filePath2, 'utf-8'));

  const selectArray = jsonData;

  if (selectArray) {

    // If no dynamic value is provided, return all data
    res.json(selectArray);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

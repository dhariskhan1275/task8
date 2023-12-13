const express = require('express');
const fileSystem = require('fs').promises;

const server = express();
const SERVER_PORT = 3000;

server.use(express.json());

// Endpoint to fetch content from a specified file
server.get('/fetchContent/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const content = await fileSystem.readFile(filename, 'utf-8');
    res.json({ content });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to save data to a specified file
server.post('/saveData/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    await fileSystem.writeFile(filename, JSON.stringify(data), 'utf-8');
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Endpoint to modify data in a specified file
server.put('/modifyFile/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    const { data } = req.body;

    if (!data) {
      return res.status(400).json({ error: 'No data provided in the request body' });
    }

    const existingData = await fileSystem.readFile(filename, 'utf-8');
    const updatedData = JSON.parse(existingData).concat(data);

    await fileSystem.writeFile(filename, JSON.stringify(updatedData), 'utf-8');
    res.json({ message: 'Data modified successfully' 

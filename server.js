const express = require('express');
const path = require('path')
const fs = require('fs');
const db = require('./Develop/db/db.json')

const PORT = 3001;
const app = express();

app.use(express.static(__dirname + '/Develop/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

app.get('/api/notes', (req, res) => res.json(db))
    
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)


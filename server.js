const express = require('express');
const path = require('path')
const fs = require('fs');
const db = require('./Develop/db/db.json');
const { readFromFile, readAndAppend, deleteFromFile } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + '/Develop/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

app.get('/api/notes', (req, res) => {
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
})

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const newNote = {
        title,
        text,
        id: uuid()
    }
    readAndAppend(newNote, `./Develop/db/db.json`)
    const response = {
        status: "Success",
        body: newNote
    }
    res.status(201).json(response)
})

app.delete('/api/notes/:id', (req, res) => {
    deleteFromFile(req.params.id, `./Develop/db/db.json`)
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})

app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)


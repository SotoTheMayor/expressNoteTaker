const express = require('express');
const path = require('path')

//connects files from the helpers dir
const { readFromFile, readAndAppend, deleteFromFile } = require('./helpers/fsUtils');
const uuid = require('./helpers/uuid')

//connects to heroku live url
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(__dirname + '/Develop/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//loads note page when button is clicked on index.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

//displays notes stored in db.json
app.get('/api/notes', (req, res) => {
    readFromFile('./Develop/db/db.json').then((data) => res.json(JSON.parse(data)))
})

//appends new notes to the db.json file 
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

//deletes notes from the db.json file
app.delete('/api/notes/:id', (req, res) => {
    deleteFromFile(req.params.id, `./Develop/db/db.json`)
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

//default all to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})


app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)


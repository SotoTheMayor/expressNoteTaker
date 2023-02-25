const express = require('express');
const path = require('path')
const fs = require('fs');
const db = require('./Develop/db/db.json');
const { stringify } = require('querystring');

const PORT = 3001;
const app = express();

app.use(express.static(__dirname + '/Develop/public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html')) 
})

app.get('/api/notes', (req, res) => res.json(db))

app.post('/api/notes', (req, res) => {
    console.log(req.body);
    const { title, text } = req.body;

    const newNote = {
        title,
        text
    }

    const noteString = JSON.stringify(newNote);

    fs.writeFile(`./Develop/db/db.json`, noteString, (err) =>
    err ? console.error(err) : console.log(`Review for ${newNote.title} has been written to file`)
    )

    const response = {
        status: "Success",
        body: newNote
    }

    res.status(201).json(response)
})


app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)


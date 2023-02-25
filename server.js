const express = require('express');
const path = require('path')
const fs = require('fs');

const PORT = 3001;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'Develop/public/notes.html'))
        
    })
    
app.listen(PORT, () => 
    console.log(`Listening at http://localhost:${PORT}`)
)


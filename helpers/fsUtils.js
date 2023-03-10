const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

//used when rewriting db.json both for adding and removing notes
const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`Note list updated`));

//function connected to server.js that appends new notes to existing db.json
const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    })
}

//function used in server.js to delete a note
const deleteFromFile = (id, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            for (i=0; i<parsedData.length; i++) {
                if (parsedData[i].id === id) {
                    const arr1 = parsedData.slice(0, i)
                    const arr2 = parsedData.slice(i+1, parsedData.length)
                    const remadeArr = arr1.concat(arr2)
                    writeToFile(file, remadeArr)
                }
            }            
        }
    })
}


module.exports = { writeToFile, readFromFile, readAndAppend, deleteFromFile }

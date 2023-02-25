const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nwritten to ${destination}`));

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err)
        } else {
            const parsedData = JSON.parse(data);
            
            // console.log('this is the data tag' + data)
            // console.log('this is the content tag' + JSON.stringify(content))
            // console.log('this is the file tag' + file)
            parsedData.push(content);
            writeToFile(file, parsedData)
        }
    })
}

module.exports = { writeToFile, readFromFile, readAndAppend }

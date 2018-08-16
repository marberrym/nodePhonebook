const fs = require('fs');

let saveToBook = (file, object) => {
    try {
        fs.writeFile(file, JSON.stringify(object), (success) => {
            console.log(`Okay additions have been saved in your phonebook.`);
        });
    }catch (e) {
        console.log('Cannot write file', e);
    }
}

let readFile = (file, callBack) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            let currentPhonebook = JSON.parse(data);
            callBack(currentPhonebook);
        }
    })
    
}

exports.saveEntry = saveToBook;
exports.readFile = readFile;
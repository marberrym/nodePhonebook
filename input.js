const fs = require('fs');

var saveToBook = function(file, object) {
    try {
        fs.writeFile(file, JSON.stringify(object), function(success) {
            console.log(`Okay additions have been saved in your phonebook.`);
        });
    }catch (e) {
        console.log('Cannot write file', e);
    }
}

var readFile = function(file, callBack) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var currentPhonebook = JSON.parse(data);
            callBack(currentPhonebook);
        }
    })
    
}

exports.saveEntry = saveToBook;
exports.readFile = readFile;
var phonebook = {
    7830: { id: '7830',
        name: 'Rick Sanchez',
        phone: '770-367-5775'},
    1517: { id: '1517',
        name: 'Lawyer Morty',
        phone: '898-292-1817'},
    9798: { id: '9798',
        name: 'Mr. Poopy Butthole',
        phone: '782-383-1812'},
    267: { id: '267',
        name: 'Sleepy Gary',
        phone: '738-891-1829'},
    4307: { id: '4307',
        name: 'Summer',
        phone: '213-313-4583'}
}



var http = require('http');
var fs = require('fs');

var getSuffix = function(url, prefix) {
    var regex = /,/gi
    var urlArray = url.split("");
    var splicedArray = urlArray.splice(prefix.length);
    var urlsubfix = splicedArray.toString('');
    return urlsubfix.replace(regex,"");
}    

var readBody = function(req, callback) {
    var body = '';
    req.on('data', function(chunk) {
        body += chunk.toString();
    });
    req.on('end', function() {
        callback(body);
    });
}


    

var server = http.createServer (function(req, res) {


    if(req.url === '/'){
        res.end("Hello Peon.");
    } else if (req.url === "/phonebook" && req.method === "GET"){
        res.end(JSON.stringify(phonebook));
    } else if (req.url === "/phonebook" && req.method === "POST") {
        readBody(req, function(body) {
            var newID = generateID();
            var newEntry = JSON.parse(body);
            newEntry.id = newID.toString();
            phonebook.newID = newEntry;
            res.end("Successful Post!");
        })
    } 
    else if (getSuffix(req.url, '/phonebook/') in phonebook && req.method==="GET") {
        var idNum = getSuffix(req.url, '/phonebook/');
        res.end(JSON.stringify(phonebook[idNum]));
    } else if (getSuffix(req.url, '/phonebook/') in phonebook && req.method==="DELETE") {
        var idNum = getSuffix(req.url, '/phonebook/');
        delete phonebook[idNum];
        res.end("Delete successful");
    } 
    else {
        console.log(getSuffix(req.url, '/phonebook/'));
        res.end("404 you twat hey")
    }

    
var generateID = function() {
    return Math.floor(Math.random() * 10000);
}
    
});

server.listen(7000);


let phonebook = {
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

let http = require('http');

let getSuffix = (url, prefix) => {
    let regex = /,/gi
    let urlArray = url.split("");
    let splicedArray = urlArray.splice(prefix.length);
    let urlsubfix = splicedArray.toString('');
    return urlsubfix.replace(regex,"");
}    

let readBody = (req, callback) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        callback(body);
    });
}

let server = http.createServer ((req, res) =>{


    if(req.url === '/'){
        res.end("Hello Peon.");
    } else if (req.url === "/phonebook" && req.method === "GET"){
        res.end(JSON.stringify(phonebook));
    } else if (req.url === "/phonebook" && req.method === "POST") {
        readBody(req, function(body) {
            let newID = generateID();
            let newEntry = JSON.parse(body);
            newEntry.id = newID.toString();
            phonebook.newID = newEntry;
            res.end("Successful Post!");
        })
    } 
    else if (getSuffix(req.url, '/phonebook/') in phonebook && req.method==="GET") {
        let idNum = getSuffix(req.url, '/phonebook/');
        res.end(JSON.stringify(phonebook[idNum]));
    } else if (getSuffix(req.url, '/phonebook/') in phonebook && req.method==="DELETE") {
        let idNum = getSuffix(req.url, '/phonebook/');
        delete phonebook[idNum];
        res.end("Delete successful");
    } 
    else {
        console.log(getSuffix(req.url, '/phonebook/'));
        res.end("404 you twat hey")
    }

    
let generateID = () => Math.floor(Math.random() * 10000);

    
});

server.listen(7000);


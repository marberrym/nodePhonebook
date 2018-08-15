const readline = require('readline');
const saveC = require('./input');

const rl = readline.createInterface(process.stdin, process.stdout);

var filepath = "phoneBook.txt";
var currentPhoneBook = {};

var savePB = function(phoneBook) {
    currentPhoneBook = phoneBook;
    mainLoop();
}

saveC.readFile(filepath, savePB);

var menuDisplay = function() {
    console.log(`
    |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
    |@ Welcome to your phone book. @|
    |@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@|
    |    Push 1 to add an entry.    |
    |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-|
    |   Push 2 to remove an entry.  |
    |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-|
    |   Push 3 to search by name.   |
    |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-|
    |  Push 4 to list all entries.  |
    |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-|
    |        Push 5 to exit.        |
    |-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-|
    `);
}

var prompt1 = function() {
    rl.question("Who would you like to add to your phonebook? ", (answerName) => {
        rl.question(`What is the number for ${answerName}? `, (answerNumber) => {
            currentPhoneBook[answerName] = answerNumber;
            mainLoop();
        })
    })
}

var prompt3 = function() {
    rl.question("Who are you looking for?", (answerName) => {
        console.log(currentPhoneBook[answerName]);
        mainLoop();
    })
}

var prompt2 = function() {
    rl.question("Who would you like to remove from your phonebook? ", (answerName) => {
        delete currentPhoneBook[answerName];
        mainLoop();
    })
}

var prompt4 = function() {
    console.log(currentPhoneBook);
    mainLoop();
}

var prompt5 = function() {
    console.log("Later Gator.")
    saveC.saveEntry(filepath, currentPhoneBook);
    rl.close();
}

var promptInvalid = function() {
    console.log("Sorry, that input is invalid.")
    mainLoop();
}

var promptOptions = [prompt1, prompt2, prompt3, prompt4, prompt5, promptInvalid];

var askForPrompt = function() {
    rl.question("What would you like to do? ", (answer) => {
        promptOptions[answer - 1]();
    });
}

var mainLoop = function() {  
    menuDisplay();
    askForPrompt(); 
};
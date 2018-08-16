const readline = require('readline');
const saveC = require('./input');

const rl = readline.createInterface(process.stdin, process.stdout);

let filepath = "phoneBook.txt";
let currentPhoneBook = {};

let savePB = (phoneBook) => {
    currentPhoneBook = phoneBook;
    mainLoop();
}

saveC.readFile(filepath, savePB);

let menuDisplay = () => {
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

let prompt1 = () => {
    rl.question("Who would you like to add to your phonebook? ", (answerName) => {
        rl.question(`What is the number for ${answerName}? `, (answerNumber) => {
            currentPhoneBook[answerName] = answerNumber;
            mainLoop();
        })
    })
}

let prompt3 = () => {
    rl.question("Who are you looking for?", (answerName) => {
        console.log(currentPhoneBook[answerName]);
        mainLoop();
    })
}

let prompt2 = () => {
    rl.question("Who would you like to remove from your phonebook? ", (answerName) => {
        delete currentPhoneBook[answerName];
        mainLoop();
    })
}

let prompt4 = () => {
    console.log(currentPhoneBook);
    mainLoop();
}

let prompt5 = () => {
    console.log("Later Gator.")
    saveC.saveEntry(filepath, currentPhoneBook);
    rl.close();
}

let promptInvalid = () => {
    console.log("Sorry, that input is invalid.")
    mainLoop();
}

let promptOptions = [prompt1, prompt2, prompt3, prompt4, prompt5, promptInvalid];

let askForPrompt = () => {
    rl.question("What would you like to do? ", (answer) => {
        promptOptions[answer - 1]();
    });
}

let mainLoop = () => {  
    menuDisplay();
    askForPrompt(); 
};
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = ["What is your GitHub username?"
];

function writeToFile(fileName, data) {
}

async function init() {
    let userName = await
        inquirer
            .prompt([
                {
                    type: "input",
                    message: questions[0],
                    name: "username"
                }
            ]).then((response) => response.username);
    
        axios.get(`https://api.github.com/users/${userName}`)
        .then((response) => console.log(response.data));
        

}

init();

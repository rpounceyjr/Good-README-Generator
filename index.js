const fs = require("fs");
const inquirer = require("inquirer");

const questions = ["What is your GitHub username?"

];

function writeToFile(fileName, data) {
}

function init() {
    inquirer
        .prompt([
            {
                type: "input",
                message: questions[0],
                name: "username"
            }
        ]
        )

}

init();

const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = ["What is your GitHub username?", "What is the name of this project?"
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("written!");
        }
    })
}

async function init() {
    // let userName = await
       await inquirer
            .prompt([
                {
                    type: "input",
                    message: questions[0],
                    name: "username"
                },
                {
                    type: "input",
                    message: questions[1],
                    name: "project"
                }

            ]).then((response) => {
                userName = response.username;
                projectName = response.project;

            });

    await axios.get(`https://api.github.com/users/${userName}`)
        .then((response) => {
            const allInfo =
                `#${projectName}\n
            by: ${response.data.name} \n
            ![Roger Pouncey picture](${response.data.avatar_url})`

            writeToFile("log.md", allInfo);
        });


}

init();

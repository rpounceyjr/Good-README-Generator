const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
// const badges = require("badges");

const questionsArray = ["What is your GitHub username?", "What is the name of this project?", "Describe the project.",
    "Please enter a Table of Contents.", "Installation", "Usage", "License", "Contributing", "Tests", "Questions"
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
    let userName;
    let projectName;
    let projectDescription;
    let tableOfContents;
    let installation;
    let usage;
    let license;
    let contributing;
    let tests;
    let questions;

    let licenseBadgeArray = ["![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)",
        "![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)",
        "![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)"];

    await inquirer
        .prompt([
            {
                type: "input",
                message: questionsArray[0],
                name: "username"
            },
            {
                type: "input",
                message: questionsArray[1],
                name: "project"
            },
            {
                type: "input",
                message: questionsArray[2],
                name: "description"
            },
            {
                type: "input",
                message: questionsArray[3],
                name: "contents"
            },
            {
                type: "input",
                message: questionsArray[4],
                name: "installation"
            },
            {
                type: "input",
                message: questionsArray[5],
                name: "usage"
            },
            {
                type: "list",
                name: "license",
                message: questionsArray[6],
                choices: ["MIT", "GPLv3", "AGPL"]
            },
            {
                type: "input",
                message: questionsArray[7],
                name: "contributing"
            },
            {
                type: "input",
                message: questionsArray[8],
                name: "tests"
            },
            {
                type: "input",
                message: questionsArray[9],
                name: "questions"
            }
        ]).then((response) => {
            //this code gets a license badge from license badge array corresponding to user's
            //inquirer choice for the license question
            if (response.license === "MIT") {
                license = licenseBadgeArray[0];
            } else if (response.license === "GPLv3") {
                license = licenseBadgeArray[1];
            } else {
                license = licenseBadgeArray[2];
            };

            userName = response.username;
            projectName = response.project;
            projectDescription = response.description;
            installation = response.installation;
            usage = response.usage;
            contributing = response.contributing;
            tests = response.tests;
            questions = response.questions;


        });

    await
        axios.get(`https://api.github.com/users/${userName}`,
            {
                headers: {
                    authorization: "token fcfa31803d9da336c53514f4ea13bd55ea249f8a"
                }
            })
            .then((response) => {
                console.log(response)
                console.log(response.data.email);
                const allInfo =
                    `# ${projectName}\n
### **by: ${response.data.name}** \n
${projectDescription}\n
![Roger Pouncey picture](${response.data.avatar_url})\n
${response.data.email}\n




${license}`

                writeToFile(projectName + ".md", allInfo);
            });
}

init();

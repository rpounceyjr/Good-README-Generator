require('dotenv').config();
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");


const questionsArray = ["What is your GitHub username?", "What is the name of this project?", "What is your email address?", "Describe the project.",
    "Installation", "Usage", "License", "Contributing", "Tests", "Questions"
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
                name: "email"
            },
            {
                type: "input",
                message: questionsArray[3],
                name: "description"
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
            email = response.email;
            installation = response.installation;
            usage = response.usage;
            contributing = response.contributing;
            tests = response.tests;
            questions = response.questions;


        });
    //The two commented out code blocks below are different methods of authorization used to 
    //authorize the api call to get user email from api response.  This app now retrieves user email
    //via inquirer prompt, but I'm leaving the code below for future reference.

    //Code to authorize the api call using a GitHub personal access token.
    // axios.get(`https://api.github.com/users/${userName}`,
    // {
    //   headers: {
    //             authorization: `token ${process.env.USER_TOKEN}`
    //         }
    //     })
    //Code to authorize api call using client id and client secret obtained from authorizing 
    //app with OAuth.  
    // axios.get(
    //     `https://api.github.com/users/${userName}?client_id=${
    //     process.env.CLIENT_ID
    //     }&client_secret=${process.env.CLIENT_SECRET}`
    //   )
    await
        axios.get(`https://api.github.com/users/${userName}`)
            .then((response) => {
                console.log(response);
                const allInfo =
                    `# ${projectName} readMe\n
### **by: ${response.data.name}** \n
${projectDescription}\n
![Roger Pouncey picture](${response.data.avatar_url})\n
${email}\n
#### **Table of Contents** \n
##### **Installation**\n
                ${installation}\n
##### **Usage**\n
                ${usage}\n
##### **Contributing**\n
                ${contributing}\n
##### **Tests**\n
                ${tests}\n
##### **Questions**\n
                ${questions}\n
##### **License**\n
${license}`

                writeToFile(projectName + ".md", allInfo);
            });
}

init();

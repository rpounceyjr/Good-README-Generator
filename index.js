const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const questions = ["What is your GitHub username?", "What is the name of this project?", "Describe the project.",
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
            },
            {
                type: "input",
                message: questions[2],
                name: "description"
            },
            {
                type: "input",
                message: questions[3],
                name: "contents"
            },
            {
                type: "input",
                message: questions[4],
                name: "installation"
            },
            {
                type: "input",
                message: questions[5],
                name: "usage"
            },
            {
                type: "input",
                message: questions[6],
                name: "license"
            },
            {
                type: "input",
                message: questions[7],
                name: "contributing"
            },
            {
                type: "input",
                message: questions[8],
                name: "tests"
            },
            {
                type: "input",
                message: questions[9],
                name: "questions"
            }
        ]).then((response) => {
            userName = response.username;
            projectName = response.project;
            projectDescription = response.description;

        });

    await
        axios.get(`https://api.github.com/users/${userName}`)
            .then((response) => {
                // console.log(response)
                console.log(response.data.email);
                const allInfo =
                    `# ${projectName}\n
### **by: ${response.data.name}** \n
${projectDescription} \n${response.data.email}
![Roger Pouncey picture]("${response.data.avatar_url}")`

                writeToFile(projectName + ".md", allInfo);
            });


}

init();

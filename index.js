//dotenv is not required for the current build of this app,
//but it is left in (commented out) for future versions, as is some code below that uses dotenv
// require('dotenv').config();

// necessary libraries are required
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

//Array that contains the prompts for inquirer
const questionsArray = ["What is your GitHub username?", "What is the name of this project?", "What is your email address?", "Describe the project.",
    "Installation", "Usage", "License", "Contributing", "Tests", "Questions"
];

//writeFile that writes data to fileName
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err)
        } else {
            console.log("README file generated!");
        }
    })
}

//This function declares variables, calls inquirer function, uses inquirer responses to 
//assign values to variables, one of which- userName- is used to call the GitHub api and 
//retrieve user's name and profile picture.  After that information is retrieved,
//variables are plugged into a variable that formats the information for an md file.  
//That formatted information is then passed to writeToFile which writes the info
//to README.md
async function init() {
    //variables are declared here, to be assigned with user responses to inquirer prompts
    let userName;
    let projectName;
    let projectDescription;
    let installation;
    let usage;
    let license;
    let contributing;
    let tests;
    let questions;

    //Array that contains md formatted license badges
    //One of these elements is assigned to the license variable, depending on user response
    //to inquirer prompt
    let licenseBadgeArray = ["![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)",
        "![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)",
        "![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)"];
    //the inquirer function that prompts questions about the project
    //questions are pulled from the question array, accessed by index
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
            //values are assigned to the previously delcared variables based
            //on user responses to inquirer prompts
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
    //======================================================================================//    
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
    //========================================================================================//

    //axios call that uses userName value pulled from inquirer prompt to access GitHub api
    //and retrieve the user's profile picture and name
    await axios.get(`https://api.github.com/users/${userName}`)
        .then((response) => {
            //this variable plugs all of the variables from above into a template for the README
            const allInfoFormattedAsMD =
                `# ${projectName} README\n
### **by ${response.data.name}** \n
${projectDescription}\n
![Roger Pouncey picture](${response.data.avatar_url})\n
Email: ${email}\n
## **Table of Contents** \n
#### i. [Installation](#installation)\n
#### ii. [Usage](#usage)\n
#### iii. [Contributing](#contributing)\n
#### iv. [Tests](#tests)\n
#### v. [Questions](#questions)\n
#### vi. [License](#license)\n

## **Installation** <a name="introduction"></a>\n 
                ${installation}\n
## **Usage** <a name="usage"></a>\n
${usage}\n
## **Contributing**\n
${contributing}\n
## **Tests**\n
${tests}\n
## **Questions**\n
${questions}\n
## **License**<a name="license"></a>\n
${license}`
            //the following function awaits the inquirer and axious functions then writes
            //the formatted content to the README.md file
            writeToFile("README.md", allInfoFormattedAsMD);
        });
}
//Finally, the init function is called.
init();

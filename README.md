# Good README generator 

### **by Roger Pouncey** 

A command line program that generates a good README file based on user input.

![Roger Pouncey picture](https://avatars2.githubusercontent.com/u/58075467?v=4)

Email: rpounceyjr@gmail.com

## **Table of Contents** 

#### i. [Installation](#installation)

#### ii. [Usage](#usage)

#### iii. [Contributing](#contributing)

#### iv. [Tests](#tests)

#### v. [Questions](#questions)

#### vi. [License](#license)


## **Installation** <a name="introduction"></a>
 
                $ npm i


## **Usage** <a name="usage"></a>

This app runs in the command line and is designed to create a neatly formatted README file based on user input.  Users are prompted, via the inquirer library, to answer various questions about themselves and the repo for which they are creating the README.  A call is made to the GitHub user API to retrieve the user's name and profile picture.  Once all of the information has been gathered from inquirer and the API call, it is plugged into a neatly formatted .md template.  This template is then written to a README file using the fs.writeFile method. A Table Of Contents with clickable links is included in the generated README to allow easy navigation for longer documents. 

## **Contributing** <a name="contributing"></a>

This project was created by Roger Pouncey.  Improvements can be made to the app by making a pull request on GitHub.

## **Tests** <a name="tests"></a>

No tests were performed on the current build of this app.  In the future, testing will be performed with Jest.

## **Questions** <a name="questions"></a>

Questions about this app can be addressed to Roger Pouncey, either through GitHub or via the above email address.

## **License** <a name="license"></a>

![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)
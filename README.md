# Generator for Frontend Projects

Perfectionist yeoman generator that scaffolds out different types of front-end apps

# Features

- Create all type of projects in fairly simple steps
- Uses SMACSS approach (BEM, OOCSS, ITCSS to be followed soon)
- Build in components, naming convention, directory structure to speed up your development

# Getting Started

This generator is build using Yeomen, Gulp & Bower. Please install those on your machine
- Install dependencies: `npm install --global yo bower gulp`

Install the generator globally to use it kick start your web projects
- Install the generator: `npm install --global generator-smacss`

Ready to create your project?
- Run `yo smacss` to scaffold your webapp
- Follow (3) simple questions in terminal

The generator will try to install the node modules for you, Make sure you have admin rights on your machine. You can also manually install using below command

- Run `sudo npm install` followed by your password

Showtime!
- Run `gulp` to run the server, You are all done.

# Docs

To be updated soon... stay tuned

# Options

- `--skip-install` Skips the automatic execution of bower and npm after scaffolding has finished.
- `--test-framework=<framework>` Defaults to `mocha`. Can be switched for another supported testing framework like `jasmine`.
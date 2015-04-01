# Generator for Frontend Projects

[![Join the chat at https://gitter.im/FuelFrontend/generator-smacss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/FuelFrontend/generator-smacss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Code Climate](https://codeclimate.com/github/FuelFrontend/generator-smacss/badges/gpa.svg)](https://codeclimate.com/github/FuelFrontend/generator-smacss)

[Work In Progress] Perfectionist generator that scaffolds out different types of Front-end application

# Features

- **Different Projects; One Generator** - Create your type of project in fairly simple steps
- **Highly Maintainable** - Uses [SMACSS](https://smacss.com/) approach (BEM, OOCSS, ITCSS to be followed soon)
- **Readymade** — Directory structure, Naming convention, Linking your app done right.
- **Speedy Workflow** - CSS Preprocessor (Sass), Partials, Browser Sync, Live reload.
- **Performance Matters**  - Minify HTML, CSS, & JS. Optimize Images.
- **Quick Commands** - Generate Build, Clean up, Zip project and more.

# App Types

- **Simple Web App** — Sometimes you just need a gulp server(localhost), scss compiler & browser-sync(live reload). Well that's exactly what this app is for.
- **Full Pack Web App** - Thinking of creating a solid frontend base with proper structure, well optimization; choose this applicaton type which comes with power features.
- **Angular App** - Work In Progress

# Directory Structure

Your directory structure will look like this

**Simple Web App**

``````````
├── app
│   ├── images
│   ├── fonts
│   ├── js
│   │   └── lib
│   │   │   └── third-party-files.js
│   │   └── application.js
│   ├── css
│   │   └── master.css
│   ├── scss
│   │   └── modules
│   │   │   └── module-name.scss
│   │   └── pages
│   │   │   └── page-landing.scss
│   │   └── base.scss
│   │   └── layout.css
│   │   └── mixins.css
│   │   └── master.css
│   │   └── reset.css
│   │   └── variables.css
│   └── index.html
├── node_modules
├── gulpfile.js
├── package.json
├── .gitattributes
└── .gitignore
``````````

**Full Pack Web App**

``````````
├── app
│   ├── bower_components
│   │   ├── jquery
│   │   └── modernizr
│   ├── images
│   ├── js
│   │   └── lib
│   │   │   └── third-party-files.js
│   │   └── application.js
│   ├── css
│   │   └── master.css
│   ├── partials
│   │   └── header.html
│   │   └── footer.html
│   ├── scss
│   │   └── modules
│   │   │   └── module-name.scss
│   │   └── pages
│   │   │   └── page-landing.scss
│   │   └── base.scss
│   │   └── layout.css
│   │   └── mixins.css
│   │   └── reset.css
│   │   └── variables.css
│   └── index.html
├── build
│   └── build-files
├── zip
│   └── compressed-files
├── node_modules
├── package.json
├── gulpfile.js
├── bower.json
├── .bowerrc
├── .gitattributes
└── .gitignore
``````````

**Angular App**

_WIP_


# Getting Started

**Installation**

You need to have [NodeJS](http://nodejs.org/) & [Yeoman](http://yeoman.io/) installed on your machine
```````
npm install -g yo
````````

Install smacss generator
```````
npm install --global generator-smacss
```````

**Creating project**

- Run `yo smacss`
- Answer simple questions in terminal
- Generator will automatically try to install dependencies in your project folder.

- You got your installation successfull 'You are lucky', run the server following the instruction in next section.
- In case you got any error you may not have admin rights
  	- a) cd to your project folder
  	- b) Run `sudo bower install & npm install` followed by your machine password in Mac/Linux environment; Windows user try running as administrator

**Run your project**

At this stage your project is setup and dependencies are installed, It's showtime!

- Run `gulp` to run the server, and you are good to start your development.

# Quick commands


**Angular App**

Use terminal to create controller, service, directive etc. Run following commands to create.

1) Controller

creates a controller in app/js/controllers

```````
	yo smacss:controller <name>
```````


2) Service

creates a service in app/js/services

```````
	yo smacss:service <name>
```````

3) Directive

creates a directive in app/js/directives

```````
	yo smacss:directive <name>
```````

4) Filter

creates a filter in app/js/filters

```````
	yo smacss:filter <name>
```````

# Docs

To be updated soon... stay tuned

# Options

- `--skip-welcome-message` Skips the welcome message and take you to question.
- `--skip-install` Skips the automatic execution of bower and npm after scaffolding has finished.

# Contributions

Contribution would be of great help to create a solid generator for frontend projects

* Fork the project
* Make your feature addition or bug fix
* Send pull request

**Active Contributers**

[![Logesh Paul](https://avatars3.githubusercontent.com/u/41541?v=3&s=72)](http:/www.github.com/logeshpaul) [![Gokulakrishnan](https://avatars0.githubusercontent.com/u/2944237?v=3&s=72)](https://github.com/gokulkrishh) [![Sugan Krishnan](https://avatars1.githubusercontent.com/u/680120?v=3&s=72)](https://github.com/rgksugan)


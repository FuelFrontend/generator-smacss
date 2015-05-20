# Generator for Frontend Projects

Perfectionist generator that scaffolds out different types of Frontend application

[![Join the chat at https://gitter.im/FuelFrontend/generator-smacss](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/FuelFrontend/generator-smacss?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Travis CI](https://api.travis-ci.org/FuelFrontend/generator-smacss.svg?branch=master)](https://travis-ci.org/FuelFrontend/generator-smacss) [![Code Climate](https://codeclimate.com/github/FuelFrontend/generator-smacss/badges/gpa.svg)](https://codeclimate.com/github/FuelFrontend/generator-smacss)

![Generator Smacss](https://raw.githubusercontent.com/FuelFrontend/generator-smacss/master/smacss-in-action.png "Generator Smacss")

# Features

- **Different Projects; One Generator** - Create your type of project in fairly simple steps
- **Highly Maintainable** - Uses [SMACSS](https://smacss.com/) approach (BEM, OOCSS, ITCSS in backlog)
- **Readymade** — Directory structure, Naming convention, Linking your app done right.
- **Speedy Workflow** - CSS Preprocessor (Sass), Partials, Browser Sync, Live reload.
- **Performance Matters**  - Minify HTML, CSS, & JS. Optimize Images.
- **Quick Commands** - Generate Build, Clean up, Zip project, Angular commands and lot more to come.

# App Types

- **Simple Web App** — Sometimes you just need a gulp server(localhost), scss compiler & browser-sync(live reload). Well that's exactly what this app is for.
- **Full Pack Web App** - Thinking of creating a solid frontend base with proper structure, well optimization; choose this applicaton type which comes with power features.
- **Angular App** - Angular app with basic configurations and quick commands for creating controllers, directives, services and filters. More to come!
- **Restify App** - API developer? Want to create REST API services with mongodb, This app type got your back which scaffolds basic files like models, controller, routes, db & config.
- **Admin Web App** - Create an Admin app with bootstrap integrated. Pages: Dashboard, Sidebar, Notfication, Forms, Tabular Data and Bootstrap Elements for quick use.

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

# Directory Structure

Your directory structure will look like this

![Directory Structure](https://raw.githubusercontent.com/FuelFrontend/generator-smacss/master/app-structure.png "Directory Structure")

# Quick commands

Terminal commands to speed up repetitive tasks you do in projects. Simple app idea is to maintain as minimal as possible; so quick commands won't work.

#### General - Applies to Full Pack and Angular

* **Clean** _Remove all files from your build folder_

  ```````
  gulp clean
  ```````

* **Zip** _Compress you app & save in `zip` folder with timestamp for quick sharing_

  ```````
  gulp zip
  ```````

#### Angular App

* **Controller** _Creates a controller in `app/js/controllers`_

  ```````
  yo smacss:controller <name>
  ```````

* **Service** _Creates a service in `app/js/services`_

  ```````
  yo smacss:service <name>
  ```````

* **Directive** _Creates a directive in `app/js/directives`_

  ```````
  yo smacss:directive <name>
  ```````

* **Filter** _Creates a filter in `app/js/filters`_

  ```````
  yo smacss:filter <name>
  ```````

# Environment

Generator Smacss comes with development and producution modes. In default it runs in development mode.

You can switch to production mode using the following command

```````
gulp prod
```````

# Bower Components

Tip: While installation additional bower components to your project, make sure your save your new component
in your `bower.json` file by installing like below

```````
bower install <bower-component-name> --save
```````

So that generator will automatically include your new bower component to `bower.js` file for usage

# Release Notes

You can find the detailed release notes [here](https://github.com/FuelFrontend/generator-smacss/blob/master/release.md)

<!-- TODO: Add documentaiton and enable this
# Docs

To be updated soon... stay tuned
-->

# Options

- `--skip-welcome-message` Skips the welcome message and take you to question.
- `--skip-install` Skips the automatic execution of bower and npm after scaffolding has finished.

# Contributions

Contribution would be of great help to create a solid generator for frontend projects

* Fork the project
* Make your feature addition or bug fix
* Send pull request

**Active Contributers**

[![Logesh Paul](https://avatars3.githubusercontent.com/u/41541?v=3&s=72)](http:/www.github.com/logeshpaul) [![Gokulakrishnan](https://avatars0.githubusercontent.com/u/2944237?v=3&s=72)](https://github.com/gokulkrishh) [![Thiyagarajan](https://avatars2.githubusercontent.com/u/9147343?v=3&s=72)](https://github.com/ThiyagarajanJ) [![Ritesh Babu](https://avatars3.githubusercontent.com/u/736660?v=3&s=72)](https://github.com/riteshbabu) [![Sugan Krishnan](https://avatars1.githubusercontent.com/u/680120?v=3&s=72)](https://github.com/rgksugan) [![Lubaib Gazir](https://avatars2.githubusercontent.com/u/6895882?v=3&s=72)](https://github.com/lubaibgazir)


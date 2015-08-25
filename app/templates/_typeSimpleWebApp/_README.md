# <%= site_name %>

**Project Setup**

## Installation

*You need to have [NodeJS](http://nodejs.org/)*

*Type below commands in terminal*

```````
npm install -g yo

npm install -g gulp
```````

### Install [smacss generator](https://github.com/FuelFrontend/generator-smacss)

*Type below commands in terminal*

```````
npm install -g generator-smacss
```````

**Clone the repo & cd into it**


```````
sudo npm install

```````

**Finally**

*Type below command in terminal*

```````
gulp
```````

**Application Directory Structure**

``````````
├── app
│   ├── images
│   ├── fonts
│   ├── js
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

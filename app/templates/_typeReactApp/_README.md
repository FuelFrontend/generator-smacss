# <%= site_name %>

**Project Setup**

## Installation

*You need to have [NodeJS](http://nodejs.org/)*

*Type below commands in terminal*

```````
npm install -g yo

npm install -g gulp

npm install -g bower
```````

### Install [smacss generator](https://github.com/FuelFrontend/generator-smacss)

*Type below commands in terminal*

```````
npm install -g generator-smacss
```````

**Clone the repo & cd into it**


```````
sudo npm install

bower install
```````

**Finally**

*Type below command in terminal*

```````
gulp
```````

**Application Directory Structure - React App**


````````
├── app
│   ├── bower_components
│   ├── images
│   ├── js
│   │   └── lib
│   │   │   └── third-party-files.js
│   │   └── controllers
│   │   └── directives
│   │   └── services
│   │   └── filters
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
````````

**Quick Commands**


* **Clean** _Remove all files from your build folder_

  ```````
  gulp clean
  ```````

* **Zip** _Compress you app & save in `zip` folder with timestamp for quick sharing_

  ```````
  gulp zip
  ```````

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

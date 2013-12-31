Building QUAIL
==============

For most purposes, you can simply `download the latest release of Quail <https://github.com/kevee/quail/releases>`_, which is pre-built. However, if you want to customize your build or use the `dev` branch of the project, you will need to use the following tools to build the project.

Quail is built using `Grunt <http://gruntjs.com/>`_ and `Bower <http://bower.io>`_, and hence requires having `Node.js <http://nodejs.org>`_ installed on your machine. Once you check out the code, follow the below commands:

```
cd quail
npm install
grunt build
```

This will install all the developer dependencies and create a new `dist` directory with a pre-built version of quail and all the guideline or test files exported to JSON format.
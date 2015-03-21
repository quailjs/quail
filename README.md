[![Build Status](https://secure.travis-ci.org/quailjs/quail.png?branch=master)](http://travis-ci.org/quailjs/quail)

# Quail: Accessibility Information Library

**The project website is [quailjs.io](http://quailjs.io/).**

Quail is a Node module and a jQuery plugin that lets you easily check HTML for adherence to accessibility standards. It comes with over 200 tests which implement Open Accessibility Tests and comes with WCAG 1.0, WCAG 2.0, and Section 508 guidelines.

Developers can build their own guidelines, or easily build a custom guideline that integrates with their project. While the project supports checking entire HTML pages, integration with a CMS to check partial HTML content is probably the most popular use case.

**Notice for developers working in the 2.2.x version.**

Please base your changes on the [```master-2.2.x```](https://github.com/quailjs/quail/tree/master-2.2.x) branch.

## Requirements

You will need the following installed on your system to run Quail.

1. [Node.js](https://nodejs.org/download/)
1. [Grunt & Grunt CLI](http://gruntjs.com/installing-grunt)
1. [Bower](http://bower.io/)
1. [Java JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) (To run Selenium Server)

## Using Quail

### Setup

Run the following commands to build Quail.

```bash
git clone https://github.com/quailjs/quail.git
cd quail
npm install
bower install
grunt build
```

### Using Quail from the command line

To see the Quail CLI API, run the following.

```bash
./bin/quail --help
```

Once the command is set up, you can run the following to test any addressable web page.

```bash
quail eval http://placekitten.com
```

Write the results as a JSON object out to file in an existing directory.

```bash
quail evaluate http://placekitten.com -o ./analyses
```

To work on an existing assessment in a browser (so that breakpoints can be set in the console), run the following.

```bash
quail dev aMustHaveTitle
```

The following is experimental, which means it probably won\'t work. You can generate a new assessment with this command.

```bash
quail gen someNewAssessment
```

## Testing

### Core unit tests in Karma

```bash
karma start ./config/karma-unit.conf.js
```

### Testing assessments in Selenium

All assessments. This takes about 10 minutes to run.

```bash
node ./test/assessmentSpecs/testRunner.js
```

An individual assessment. This takes about 2 seconds to run.

```bash
node ./test/assessmentSpecs/testRunner.js -I aMustHaveTitle
```

In a specific browser.

```bash
_BROWSER=chrome node ./test/assessmentSpecs/testRunner.js
```

## Documentation

[Full documentation is available via readthedocs.org](https://quail.readthedocs.org/en/latest/).

## Contributing

Pull requests should be made against the **master** branch.

## Credits

- Quail is maintained by [Jesse Renée Beach](http://twitter.com/jessebeach)
- The [Kwaliteitsinstituut Nederlandse Gemeenten (KING)](https://www.kinggemeenten.nl/), who have funded many developer hours.
- The [CKEditor development team](http://ckeditor.com/about) for their contributions.

## Legal

QUAIL is covered under the MIT License, and is copyright (c) 2015 by Jesse Beach. Current license is at http://quailjs.org/license.

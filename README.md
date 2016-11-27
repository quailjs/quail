[![Build Status](https://secure.travis-ci.org/quailjs/quail.png?branch=master)](http://travis-ci.org/quailjs/quail)

# Deprecation

All projects have a useful lifespan. Quail was born during a time when accessibility
testing, as a discipline, was maturing. There were numerous teams building solutions
in parallel -- Quail was just one of these. In the end, we were all orbiting around
the same general approach. Technology may have been a distinguishing factor a couple
years ago, but even these advantages have largely dissolved as solutions have evolved
and improved over time.

Given the realities of the market and the limited time that the Quail team can
devote to this project, we are initializing deprecation for this project. Folks
are welcome to fork it or volunteer to maintain it, but realistically, there are
better options out there.

If you are looking for one, we recommend [aXe: the Accessibility Engine](https://github.com/dequelabs/axe-core) by [Deque Labs](https://github.com/dequelabs).

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
1. [Karma](http://karma-runner.github.io/0.8/intro/installation.html)

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

To see the Quail CLI API, run the following. You can also add the Quail bin directory to your PATH if you are so inclined.

```bash
./bin/quail --help
```

Once the command is set up, you can run the following to test any addressable web page.

```bash
./bin/quail eval http://placekitten.com
```

Write the results as a JSON object out to file in an existing directory.

```bash
./bin/quail evaluate http://placekitten.com -o ./analyses
```

You can also pass configurations to the evaluator.

```bash
./bin/quail evaluate http://placekitten.com -c ~/path/to/myconfig.json -o ./analyses
```

This is the default set of configurations. Your configurations will replace the defaults.

```json
{
  "phantomjs": {
    "resourceTimeout": 5000
  },
  "blacklists": {
    "domains": [
      "fbstatic.com",
      "facebook.com",
      "twitter.com",
      "google-analytics.com",
      "googleadservices.com",
      "googlesyndication.com",
      "perfectaudience.com",
      "typekit.com",
      "sharethis.com",
      "doubleclick.com",
      "optimizely.com",
      "gigya.com"
    ],
    "mimetypes": [
      "application/x-shockwave-flash",
      "application/(ms)?(word|powerpoint|excel)"
    ],
    "headers": []
  }
}
```

The ```phantomjs``` configurations affect the PhantomJS runtime.

The ```blacklists``` block resource resource requests from PhantomJS by the resource's domain, its mime type or a header name in the request. Currently the only header value that can be blocked is the value of Accept (mime type).

To work on an existing assessment in a browser (so that breakpoints can be set in the console), run the following.

```bash
./bin/quail dev aMustHaveTitle
```

The following is experimental, which means it probably won\'t work. You can generate a new assessment with this command.

```bash
./bin/quail gen someNewAssessment
```

## Testing

### Core unit tests in Karma

```bash
./node_modules/karma/bin/karma start ./config/karma-unit.conf.js
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

We are currently looking for the following types of contritions.

1. Help with our current [Milestone objectives](https://github.com/quailjs/quail/milestones/Refactoring%20to%20a%20Selenium-based%20test%20runner%20and%20Mocha/Chai%20assessment%20tests).
1. JavaScript enthusiasts who want a chance to build out:
  1. A dependency injection load pattern: [Replace our load-order-depending spinup with an Inversion of Control pattern](https://github.com/quailjs/quail/issues/297)
  1. A pub/sub pattern: [Refactor the custom event bubbling code in the core Classes (e.g. TestCollection) to use a real event pub/sub library](https://github.com/quailjs/quail/issues/351)
  1. Improve an NPM package, better build and test scripts, etc: [Improve the Quail NPM package](https://github.com/quailjs/quail/issues/352)

## Credits

- Quail is maintained by [Jesse Renée Beach](http://twitter.com/jessebeach)
- The [Kwaliteitsinstituut Nederlandse Gemeenten (KING)](https://www.kinggemeenten.nl/), who have funded many developer hours.
- The [CKEditor development team](http://ckeditor.com/about) for their contributions.

## References

[HTML Test Suite for WCAG 2.0, Sorted by Guideline](http://www.w3.org/WAI/GL/WCAG20/tests/)

## Legal

QUAIL is covered under the MIT License, and is copyright (c) 2015 by Jesse Beach. Current license is at http://quailjs.org/license.

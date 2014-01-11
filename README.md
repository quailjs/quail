[![Build Status](https://secure.travis-ci.org/kevee/quail.png?branch=master)](http://travis-ci.org/kevee/quail) [![Selenium Test Status](https://saucelabs.com/browser-matrix/quailjs.svg)](https://saucelabs.com/u/quailjs)

Quail: Accessibility Information Library
========================================
**The project website is [quailjs.org](http://quailjs.org/).**

A jQuery plugin that lets you easily check HTML for adherence to accessibility standards. It comes with over 200 tests which implement Open Accessibility Tests and comes with WCAG 1.0, WCAG 2.0, and Section 508 guidelines.

Developers can build their own guidelines, or easily build a custom guideline that integrates with their project. While the project supports checking entire HTML pages, integration with a CMS to check partial HTML content is probably the most popular use case.

### Installing via [Bower](http://bower.io)
You can include Quail into your project using Bower by using the command `bower install quail`.

Building Quail
--------------
If you are not familiar with using grunt or just want to download a pre-built version of quail, [visit the releases page for the project](https://github.com/kevee/quail/releases). 

If you are checking out quail from a repository, you will notice there is no `/dist` directory, quail must be built using [Grunt](http://gruntjs.com/). Use the following steps to get started (this is assuming you already have [Node](http://nodejs.org/) installed on your machine):

```
cd quail
npm install
grunt build
```

This does two things: it downloads libraries (like qunit and jQuery) into the `/lib` directory, and builds quail (both a development version and a minified, production version) into the `/dist` directory.

Documentation
-------------

[Full documentation is available via readthedocs.org](https://quail.readthedocs.org/en/latest/).

Contributing
------------
Pull requests should be made against the **dev** branch, as master is only for tracking releases.

Credits
-------

- Quail is maintained by [Kevin Miller](http://twitter.com/kevinmiyar)
- Part of Quail development is supported by [Cal State Monterey Bay](http://csumb.edu)
- Many thanks to [Jesse Renée Beach](https://twitter.com/jessebeach) for promoting Quail and the many commits.
- Thanks to the hosts of [Chez JJ](http://chezjj.com/), who housed Kevin for a week while he worked on Quail 2.

Legal
-----

QUAIL is covered under the MIT License, and is copyright (c) 2013 by Kevin Miller. Current license is at http://quailjs.org/license.

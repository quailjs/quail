Quail Test plans
================

Unit Testing
------------
To maintain the quality of Quail, every component of quail should be
(and is) extensively tested. Quail uses a continuous integration
testing approach, through Travis CI. Each time a change is commited to
GitHub, Travis will detect the change and run all the tests,
displaying the result to the Quail github homepage.

New assessments and changes to assessments in Quail will only be
accepted if adequite unit tests are available for the assessment. Your
local version of Quail can be tested by executing the following
command:

grunt test

All tests are available in the `test` directory.
Test reports can be found on the Travis-ci website:
https://travis-ci.org/quailjs/quail

Code quality
------------
To prevent superficial errors from beint put into the code base, and
to ensure the highest posible quality of the code, JSHint is used
before any other test is executed. JSHint is a static code analyses
tool which looks to ensure best practices of for JavaScript.
Configuration of what options are and are not used are documented in
the `.jshint` file.

Features for testing code style have been deprecated for JSHint,
because of this, these properties will be tested using JavaScript Code
Style checker (JSCS) starting from Quail version 3.0.
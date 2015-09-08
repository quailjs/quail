How Quail Works
===============
Quail is an accessibility assessment tool. Quail is used inside a web
browser, where it will load a page and then look for certain patterns
of known accessibility problems on that page. Quail comes with a
command line interface, which allows the user to send the URL of a web
page to a headless browser, which after loading the page will run
Quail.

To start Quail, it is called as a jQuery plugin on the element that
should be tested (usually the entire document). Quail will then run
all the assessments, or if specified a subset of assessments. Once it
is done with every assessment, Quail will trigger an event indicating
that it is done. The results will then be send to the script that
initialized Quail. If this was the command line the results are saved
to a file.

General assessments
-------------------
All assessments Quail can run are defined in a file
`src/resources/tests.yml`. This file has different types of tests
(indicated by the `type` property). Tests that are fairly similar have
been given a shared 'type'. Each test of that type is then given a
configuration to run that specific test. For example a 'selector' test
is passed a selector and checks to make sure there are no elements on
the page that meet the selector. Custom assessments are the exception
to this. What they have in common is that each of these assessments
has it's own unique code.

The scripts for each type is stored at `src/js/components/*.js`. All
the custom tests are at `src/js/custom/*.js`.


WCAG 2.0 assessments
--------------------
Most assessments in Quail are designed to look for symptoms of
accessiiblity problems, as these are much easier to find. These are a
great tool for developers to avoid accessibility problems, but they
should not be used to assess the conformance of a web page to
accessibility guidelines.

For reliable conformance testin to web content accessibility
guidelines (WCAG) the test aggregator should be used. It selects only
those assessments of which we are reasonably certain that they are
correct in all common uses of web technologies, and combines their
results to come up with conformance information for WCAG 2.0.

Run Quail with the WCAG2 testrunner (`-R WCAG2`) from the command
line, or with the `guideline : 'wcag2'` option in it's jQuery plugin
to start conformance testing. The WCAG 2 conformance test is
configured using the `src/resources/wcag2.yml`, which describes which
(group of) assessments to use for which success criterion.

After the WCAG specific assessments are ready, the results are
combined and aggregated so that in addition to having a result for
different elements, the success criterion will be given an outcome.
The resulting data is based on the Evaluation And Report Language
(EARL) to support comaptibility with other accessibility tools.

Note that most success criteria can not be fully tested automatically
and will return cantTell (instead of passed) for those that are not
fully covered. No more then 25% of accessibility problems can be found
using this method! Additional (manual) assessment is required to get
the full picture.


Precondition assessments
------------------------
Precondition assessments (preconditions) are a type of assessment that
are used to test the applicability of a WCAG 2.0 success criterion.
For example, there is one that checks if there is no video. These
preconditions ensure that success criteria that do not require further
(human) assessment are not flagged as such.

The preconditions are documented in the
`src/resources/preconditions.yml` file and are in the
`src/resources/wcag2.yml` file indicated to with the `preconditions`
property of the success criteria. Preconditions assessments will only
ever return inapplicable or cantTell as outcomes.
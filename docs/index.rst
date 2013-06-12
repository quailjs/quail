.. QUAIL: Accessibility Information Library documentation master file, created by
   sphinx-quickstart on Wed Apr 11 20:34:30 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

QUAIL: Accessibility Information Library
========================================

QUAIL is a jQuery and Sizzle-comptable library for checking content against accessibility guidelines. It provides a flexible way to test for certain problems (say, images missing an alt text) and a collection of over **250** tests to get you started.

Tests
-----

At the core of QUAIL are **tests**. Tests search for a single type of accessibility problem, and they are all defined in the file `src/resources/tests.json`. For example, one of the most common accessibility problems out there is an image missing an `alt` attribute (which allows users with screen readers to hear a description of the image). The test definition in the `tests.json` file looks like this:

.. code-block:: js
   
    "imgHasAlt": {
        "type": "selector",
        "selector": "img:not(img[alt])",
        "severity": "severe"
    },
    ....

The **test name** in this example is "imgHasAlt," which is the unique label for the test. These are used in creating guidelines. There are at least two definitions for each test:
  - **Type** - QUAIL has some default test types to simplify the process of writing test definitions. The simplest is a *selector*, which just takes a jQuery/Sizzle-compatable selector and finds all items that match that selector. For *selector* tests, we also must define the selector to use (in this case, `img:not(img[alt])`).
  - **Severity** - The default severity level. Severity is a measure of how certain we are a test will not create false positives:
    - **Severe** - We are 100% certain that this test is always correct. If an image is missing its `alt` attribute, it's missing its `alt` attribute.
    - **Moderate** - We are mostly certain this test is correct. This is usually found for content-related tests, like testing to see if a block of text is written at or below a certain grade level.
    - **Suggestion** - We cannot test for this, but can suggest things to manually review. For exmaple, we cannot test that content in a Flash object is accessible, but we can point out that a flash object is there and link to appropriate guidelines on making accessible flash.

Guidelines
----------

Guidelines are simply a collection of tests. QUAIL comes with US Section 508 and WCAG guideline files in `src/resources/guidelines`. Every guideline is simply an array of test names, which means you can easily create your own guidelines. In the `examples/php` directory you can see a custom guideline being defined in a PHP script.

Usage
>>>>>>>>>>>>>>>>>

To use QUAIL, you will need to make a simple jQuery/Sizzle object (in this example, we are checking an element with the ID of `content`), then run the `quail` function against it:

.. code-block:: js

    $('#content').quail({ jsonPath : 'src/resources', 
                      guideline : 'wcag2a',
                      accessibilityTests : accessibilityTests,
                      testFailed : function(event) { ... },
                      customTests : {
                        myCustomTest : {
                          type : 'custom',
                          callback : function(quail) {
                            quail.html.find('.error').each(function() {
                              quail.testFails('myCustomTest', $(this));
                            })
                          }
                        }
                      },
                      complete : function(event) { ... },
                    });

The `quail` function accepts a single object with the following items:
  
  - **jsonPath** - *Required* - The path to the `resources` folder where QUAIL is located. Certain tests load additional strings like emoticons or filler words from JSON files to save space. If a test ends up needing to load additional resources, this will be required.
  - **guideline** - *Required* - Either the name of a guideline file that can be found in the *jsonPath* directive, or an array of test names.
  - **accessibilityTests** - *Optional* - If you wish to load your own custom test definitions, this will prevent QUAIL from using it's own `tests.json` file to load the tests. This is also useful if you are loading `tests.json` through your own method and don't want QUAIL to do it for you.
  - **testFailed** - *Optional* - A callback that will be called everytime an item fails a test. This callback recieves an object with the following items:
  
    - **element** - The native jQuery/Sizzle object that represents the DOM element.
    - **testName** - The name of the test that failed
    - **severity** - The severity of the test.
    - **options** - Additional options as passed by the test definition.
    
  - **customTests** - *Optional* - An object of tests that can be added to QUAIL on the fly. Tests should have a name, and either use some of the pre-defined callbacks in QUAIL (like "selector"), or a "custom" type, where you define a callback that accepts a QUAIL object.
  - **preFilter** - *Optional* - A callback that can be used to pre-filter out failed items. If this callback returns false, then the item is skipped and not considered failed. This callback receives the following argumetns:
    - **testName** - The name of the test that failed
    - **element** - A full jQuery/Sizzle object of the element
    - **options** - Any additional options set by the test
  - **complete** - *Optional* - Called when all the tests are completed. This is useful for reporting, as it gets a summary of all resutls. This callback gets a single object with the following items:
  
    - **totals** - An object with the total number of severe, moderate, and suggestion tests which failed.
    - **results** - An object with all the elements and tests that failed.
  

Available tests
===============

.. toctree::
   :maxdepth: 2
   :glob:
   
   tests/*



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


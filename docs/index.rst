.. QUAIL: Accessibility Information Library documentation master file, created by
   sphinx-quickstart on Wed Apr 11 20:34:30 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

QUAIL: Accessibility Information Library
========================================

Quickstart in PHP
>>>>>>>>>>>>>>>>>

.. code-block:: php

    //Take some HTML input and re-render it by styling errors with the HTML reporter
    require("quail/php/quail.php");
    
    $html = '<html><head><title>OMG No alt attribute!</title></head>';
    $html .= '<body><img src="rex.jpg"/></body></html>';
    
    $quail = new Quail($html, 'http://mywebsite.com/testpage, 'wcag2a');
		$quail->runTests();
    $report = $quail->getReport(new QuailHTMLReporter());

Quickstart in jQuery
>>>>>>>>>>>>>>>>>

.. code-block:: js

    $('body').quail({ jsonPath : '../../resources', 
                          guideline : 'wcag2a'
                    });

Available tests
===============

.. toctree::
   :maxdepth: 2
   
   tests/*



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


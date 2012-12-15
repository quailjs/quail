===============================
All data tables should have an adequate summary
===============================

*Severity code:* Information only

.. php:class:: tableSummaryIsSufficient


If a table contains data, it should have a "summary" attribute that completely communicates the function and use of the table.



Example
-------
Wrong
-----

.. code-block:: html

    <table summary="A table of stuff">



Right
-----

.. code-block:: html

    <table summary="A comparison of population rates amongst North American cities.">





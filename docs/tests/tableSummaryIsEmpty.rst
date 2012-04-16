===============================
All data tables should have a summary
===============================

*Severity code:* Possible error

.. php:class:: tableSummaryIsEmpty


If a table contains data, it should have a "summary" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;table&gt;



Right
-----

.. code-block:: html

    &lt;table summary="A table of data"&gt;





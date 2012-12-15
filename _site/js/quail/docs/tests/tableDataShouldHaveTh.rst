===============================
Data tables should contain "th" elements
===============================

*Severity code:* Severe error

.. php:class:: tableDataShouldHaveTh


Tables which contain data (as opposed to layout tables) should contain <code>th elements to mark headers for screen readers and enhance the structure of the document.



Example
-------
Wrong
-----

.. code-block:: html

    <table><tr><td>Header One</td><td>Header Two</td></tr><tr><td>1.30</td><td>4.50</td></tr></table>



Right
-----

.. code-block:: html

    <table><tr><th>Header One</th><th>Header Two</th></tr><tr><td>1.30</td><td>4.50</td></tr></table>





===============================
Layout tables should not contain "th" elements
===============================

*Severity code:* Information only

.. php:class:: tableLayoutDataShouldNotHaveTh


Tables which are used purely for layout (as opposed to data tables), <strong>should not</strong> contain <code>th elements, which would make the table appear to be a data table.



Example
-------
Wrong
-----

.. code-block:: html

    <table><tr><th>Sidebar</th><th>Content</th><tr><td>Navigation</td><td>Stuff</td></tr></table>



Right
-----

.. code-block:: html

    <table><tr><td>Sidebar</td><td>Content</td><tr><td>Navigation</td><td>Stuff</td></tr></table>





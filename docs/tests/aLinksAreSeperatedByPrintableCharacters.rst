===============================
Lists of links should be seperated by printable characters
===============================

*Severity code:* Severe error

.. php:class:: aLinksAreSeperatedByPrintableCharacters


If a list of links is provided within the same element, those links should be seperated by a non-linked, printable character. Structures like lists are not included in this.



Example
-------
Wrong
-----

.. code-block:: html

    <a href="a.html">Page A</a> <a href="b.html">Page B</a> <a href="c.html">Page C</a>



Right
-----

.. code-block:: html

    <a href="a.html">Page A</a> | <a href="b.html">Page B</a> | <a href="c.html">Page C</a>





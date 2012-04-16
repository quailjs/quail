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

    &lt;a href="a.html"&gt;Page A&lt;/a&gt; &lt;a href="b.html"&gt;Page B&lt;/a&gt; &lt;a href="c.html"&gt;Page C&lt;/a&gt;



Right
-----

.. code-block:: html

    &lt;a href="a.html"&gt;Page A&lt;/a&gt; | &lt;a href="b.html"&gt;Page B&lt;/a&gt; | &lt;a href="c.html"&gt;Page C&lt;/a&gt;





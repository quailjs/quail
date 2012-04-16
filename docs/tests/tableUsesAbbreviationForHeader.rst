===============================
Table headers over 20 characters should provide an "abbr" attribute
===============================

*Severity code:* Information only

.. php:class:: tableUsesAbbreviationForHeader


For long table headers, use an "abbr" attribute that is less than short (less than 20 characters long).



<h4>Examples</h4>Wrong
-----

.. code-block:: html

    &lt;th&gt;The total number of people who liked chocolate&lt;/th&gt;



Right
-----

.. code-block:: html

    &lt;th abbr="Like Chocolate"&gt;The total number of people who liked chocolate&lt;/th&gt;





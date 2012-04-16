===============================
Table headers over 20 characters should provide an "abbr" attribute
===============================

*Severity code:* Information only

.. php:class:: tableUsesAbbreviationForHeader


For long table headers, use an "abbr" attribute that is less than short (less than 20 characters long).



<h4>Examples</h4>Wrong
-----

.. code-block:: html

    <th>The total number of people who liked chocolate</th>



Right
-----

.. code-block:: html

    <th abbr="Like Chocolate">The total number of people who liked chocolate</th>





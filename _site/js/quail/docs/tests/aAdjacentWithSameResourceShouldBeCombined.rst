===============================
Adjacent links that point to the same location should be merged
===============================

*Severity code:* Severe error

.. php:class:: aAdjacentWithSameResourceShouldBeCombined

Because many users of screen-readers use links to navigate the page, providing two links right next to eachother that points to the same location can be confusing. Try combining the links.

Example
-------
 Wrong
-----

.. code-block:: html

    You can also <a href="article.html">read more of</a> <a href="article.html">my great article</a>.

 Right
-----
 
.. code-block:: html

    You can also <a href="article.html">read more of my great article</a>.

 
Example
-------

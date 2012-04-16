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

    You can also &lt;a href="article.html"&gt;read more of&lt;/a&gt; &lt;a href="article.html"&gt;my great article&lt;/a&gt;.

 Right
-----
 
.. code-block:: html

    You can also &lt;a href="article.html"&gt;read more of my great article&lt;/a&gt;.

 
Example
-------

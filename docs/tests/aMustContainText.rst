===============================
Links should contain text
===============================

*Severity code:* Severe error

.. php:class:: aMustContainText


Because many users of screen-readers use links to navigate the page, providing links with no text (or with images that have empty "alt" attributes and no other readable text) hinders these users.



Example
-------
 Wrong
-----

.. code-block:: html

    &lt;a href="home.png"&gt;&lt;/a&gt;



 
.. code-block:: html

    &lt;a href="home.png"&gt;&lt;img src="home.png" alt=""&gt;/&lt;/a&gt;



 Right
-----
 
.. code-block:: html

    &lt;a href="home.png"&gt;Return Home&lt;/a&gt;



 
.. code-block:: html

    &lt;a href="home.png"&gt;&lt;img src="home.png" alt="Return Home"&gt;/&lt;/a&gt;
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

    <a href="home.png"></a>



 
.. code-block:: html

    <a href="home.png"><img src="home.png" alt="">/</a>



 Right
-----
 
.. code-block:: html

    <a href="home.png">Return Home</a>



 
.. code-block:: html

    <a href="home.png"><img src="home.png" alt="Return Home">/</a>
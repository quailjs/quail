===============================
An image within a link cannot have an empty "alt" attribute if there is no other text within the link
===============================

*Severity code:* Severe error

.. php:class:: imgAltNotEmptyInAnchor


Any image that is within a link (an <code>a element) that has no other text cannot have an empty or missing "alt" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    &lt;a href="index.html"&gt;&lt;img src="home.png" alt=""&gt;</a>



Right
-----

.. code-block:: html

    &lt;a href="index.html"&gt;&lt;img src="home.png" alt="Return Home"&gt;&lt;/a&gt;





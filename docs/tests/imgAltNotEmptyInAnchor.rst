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

    <a href="index.html"><img src="home.png" alt=""></a>



Right
-----

.. code-block:: html

    <a href="index.html"><img src="home.png" alt="Return Home"></a>





===============================
Any non-decorative images should have a non-empty "alt" attribute
===============================

*Severity code:* Possible error

.. php:class:: imgNonDecorativeHasAlt


Any image that is not used decorativey or which is purely for layout purposes cannot have an empty "alt" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <img src="dog.jpg" alt="">



Right
-----

.. code-block:: html

    <img src="dog.jpg" alt="A photograph of a dog">





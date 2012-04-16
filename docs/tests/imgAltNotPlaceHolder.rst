===============================
Images should not have a simple placeholder text as an "alt" attribute
===============================

*Severity code:* Severe error

.. php:class:: imgAltNotPlaceHolder


Any image that is not used decorativey or which is purely for layout purposes cannot have an "alt" attribute that consists solely of placeholders. Placeholders include:



<ul><li>nbsp</li><li>&amp;nbsp;</li><li>spacer</li><li>image</li><li>img</li><li>photo</li></ul>Example
-------
Wrong
-----

.. code-block:: html

    <img src="dog.jpg" alt="image">



Right
-----

.. code-block:: html

    <img src="dog.jpg" alt="A photograph of a dog">





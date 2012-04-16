===============================
A "longdesc" attribute is required for any image where additional information not in the "alt" attribute is required
===============================

*Severity code:* Severe error

.. php:class:: imgHasLongDesc


Any image that has an "alt" attribute that does not fully convey the meaning of the image must have a "longdesc" attribute.



Example
-------
Wrong
-----

.. code-block:: html

    <img src="complexImage.png" alt="A complex image that cannot be described succinctly.">



Right
-----

.. code-block:: html

    <img src="complexImage.png" alt="A complex image that cannot be described succinctly." longdesc="longer_description.html">




